#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Convertisseur bidirectionnel Markdown <-> JSON pour la matrice DIMA.

Usage:
    python dima_convert.py md2json <fichier.md> [-o sortie.json]
    python dima_convert.py json2md <fichier.json> [-o sortie.md]
    python dima_convert.py md2json --all [-o dossier_sortie]
    python dima_convert.py json2md --all <dossier_json> [-o dossier_md]

Format JSON produit:
{
  "phase": "ACT",
  "tactics": [
    {
      "id": "TA0041",
      "separator": " ",            # separateur entre id et nom dans le md d'origine
      "name": "Valorisation individuelle",
      "description": "Tactique...",
      "techniques": [
        {
          "id": "TE0411",
          "separator": " : ",
          "name": "biais d'exces de confiance",
          "description": "Surestimation...",
          "sections": [
            {"title": "Exemples", "items": ["...", "..."]},
            {"title": "References", "text": "ligne libre"}
          ]
        }
      ]
    }
  ]
}
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

PHASES = ("DETECT", "INFORM", "MEMORISE", "ACT")

HEADING_RE = re.compile(
    r"^(?P<hashes>#{1,2})\s+(?P<id>(?:TA|TE)\d+)(?P<sep>\s*[:\-]?\s*)(?P<name>.*?)\s*$"
)
BOLD_SECTION_RE = re.compile(r"^\*\*(?P<title>[^*]+?):\*\*\s*(?P<rest>.*)$")
BULLET_RE = re.compile(r"^\s*[-*]\s+(?P<item>.+?)\s*$")


def _parse_section_body(lines: list[str]) -> tuple[str, list[dict[str, Any]]]:
    """Separe la description (texte avant toute section **Titre:**) et les sections."""
    description_lines: list[str] = []
    sections: list[dict[str, Any]] = []
    current: dict[str, Any] | None = None
    text_buffer: list[str] = []
    items_buffer: list[str] = []

    def flush_current() -> None:
        nonlocal current, text_buffer, items_buffer
        if current is None:
            return
        if items_buffer:
            current["items"] = items_buffer
        text = "\n".join(text_buffer).strip()
        if text:
            current["text"] = text
        sections.append(current)
        current = None
        text_buffer = []
        items_buffer = []

    for raw in lines:
        line = raw.rstrip()
        match = BOLD_SECTION_RE.match(line)
        if match:
            flush_current()
            current = {"title": match.group("title").strip()}
            rest = match.group("rest").strip()
            if rest:
                text_buffer.append(rest)
            continue

        if current is None:
            description_lines.append(line)
            continue

        bullet = BULLET_RE.match(line)
        if bullet:
            items_buffer.append(bullet.group("item"))
        else:
            text_buffer.append(line)

    flush_current()
    description = "\n".join(description_lines).strip()
    return description, sections


def parse_markdown(md_text: str, phase: str | None = None) -> dict[str, Any]:
    lines = md_text.splitlines()
    tactics: list[dict[str, Any]] = []
    current_tactic: dict[str, Any] | None = None
    current_block: list[str] = []
    current_target: dict[str, Any] | None = None  # tactic ou technique en cours

    def flush_block() -> None:
        if current_target is None:
            return
        description, sections = _parse_section_body(current_block)
        current_target["description"] = description
        current_target["sections"] = sections

    for raw in lines:
        match = HEADING_RE.match(raw)
        if not match:
            current_block.append(raw)
            continue

        # On a trouve un nouveau titre: on cloture le bloc precedent
        flush_block()
        current_block = []

        kind = match.group("id")[:2]
        entry: dict[str, Any] = {
            "id": match.group("id"),
            "separator": match.group("sep"),
            "name": match.group("name").strip(),
        }

        if kind == "TA":
            entry["techniques"] = []
            tactics.append(entry)
            current_tactic = entry
            current_target = entry
        else:  # TE
            if current_tactic is None:
                # technique orpheline -> on cree une tactique fantome
                current_tactic = {
                    "id": "TA0000",
                    "separator": " ",
                    "name": "(sans tactique)",
                    "description": "",
                    "sections": [],
                    "techniques": [],
                }
                tactics.append(current_tactic)
            current_tactic["techniques"].append(entry)
            current_target = entry

    flush_block()

    return {"phase": phase or "", "tactics": tactics}


def _render_sections(sections: list[dict[str, Any]]) -> list[str]:
    out: list[str] = []
    for sec in sections:
        title = sec.get("title", "").strip()
        out.append(f"**{title}:**")
        text = sec.get("text", "").strip()
        if text:
            out.append(text)
        for item in sec.get("items", []) or []:
            out.append(f"- {item}")
        out.append("")
    return out


def render_markdown(data: dict[str, Any]) -> str:
    lines: list[str] = []
    for tactic in data.get("tactics", []):
        sep = tactic.get("separator", " ")
        lines.append(f"# {tactic['id']}{sep}{tactic.get('name', '').strip()}".rstrip())
        desc = (tactic.get("description") or "").strip()
        if desc:
            lines.append(desc)
        lines.extend(_render_sections(tactic.get("sections", []) or []))
        if not lines or lines[-1] != "":
            lines.append("")

        for tech in tactic.get("techniques", []) or []:
            tsep = tech.get("separator", " : ")
            lines.append(f"## {tech['id']}{tsep}{tech.get('name', '').strip()}".rstrip())
            tdesc = (tech.get("description") or "").strip()
            if tdesc:
                lines.append(tdesc)
            lines.extend(_render_sections(tech.get("sections", []) or []))
            if not lines or lines[-1] != "":
                lines.append("")

    text = "\n".join(lines).rstrip() + "\n"
    return text


def _infer_phase(path: Path) -> str:
    stem = path.stem.upper()
    if stem in PHASES:
        return stem
    parent = path.parent.name.upper()
    if parent in PHASES:
        return parent
    return stem


def md_to_json(md_path: Path, out_path: Path | None) -> Path:
    md_text = md_path.read_text(encoding="utf-8")
    data = parse_markdown(md_text, phase=_infer_phase(md_path))
    target = out_path or md_path.with_suffix(".json")
    target.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return target


def json_to_md(json_path: Path, out_path: Path | None) -> Path:
    data = json.loads(json_path.read_text(encoding="utf-8"))
    md_text = render_markdown(data)
    target = out_path or json_path.with_suffix(".md")
    target.write_text(md_text, encoding="utf-8")
    return target


def _iter_phase_md(root: Path) -> list[Path]:
    found: list[Path] = []
    for phase in PHASES:
        candidate = root / phase / f"{phase}.md"
        if candidate.exists():
            found.append(candidate)
    return found


def _iter_phase_json(root: Path) -> list[Path]:
    return sorted(p for p in root.glob("*.json") if p.stem.upper() in PHASES)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_md = sub.add_parser("md2json", help="Convertit un .md (ou tous les .md du projet) en JSON")
    p_md.add_argument("input", nargs="?", help="Fichier .md a convertir")
    p_md.add_argument("--all", action="store_true", help="Convertit DETECT/INFORM/MEMORISE/ACT")
    p_md.add_argument("--root", default=".", help="Racine du projet DIMA (defaut: .)")
    p_md.add_argument("-o", "--output", help="Fichier ou dossier de sortie")

    p_js = sub.add_parser("json2md", help="Convertit un .json (ou un dossier de JSON) en Markdown")
    p_js.add_argument("input", nargs="?", help="Fichier .json a convertir")
    p_js.add_argument("--all", action="store_true", help="Convertit tous les .json d'un dossier")
    p_js.add_argument("--root", default=".", help="Dossier contenant les .json (defaut: .)")
    p_js.add_argument("-o", "--output", help="Fichier ou dossier de sortie")

    args = parser.parse_args(argv)

    if args.cmd == "md2json":
        if args.all:
            out_dir = Path(args.output) if args.output else Path(args.root)
            out_dir.mkdir(parents=True, exist_ok=True)
            paths = _iter_phase_md(Path(args.root))
            if not paths:
                print(f"Aucun fichier de phase trouve sous {args.root}", file=sys.stderr)
                return 1
            for md in paths:
                target = out_dir / f"{md.stem}.json"
                md_to_json(md, target)
                print(f"{md} -> {target}")
            return 0
        if not args.input:
            parser.error("input requis (ou utilisez --all)")
        in_path = Path(args.input)
        out_path = Path(args.output) if args.output else None
        result = md_to_json(in_path, out_path)
        print(f"{in_path} -> {result}")
        return 0

    if args.cmd == "json2md":
        if args.all:
            out_dir = Path(args.output) if args.output else Path(args.root)
            out_dir.mkdir(parents=True, exist_ok=True)
            paths = _iter_phase_json(Path(args.root))
            if not paths:
                print(f"Aucun .json de phase trouve sous {args.root}", file=sys.stderr)
                return 1
            for js in paths:
                target = out_dir / f"{js.stem}.md"
                json_to_md(js, target)
                print(f"{js} -> {target}")
            return 0
        if not args.input:
            parser.error("input requis (ou utilisez --all)")
        in_path = Path(args.input)
        out_path = Path(args.output) if args.output else None
        result = json_to_md(in_path, out_path)
        print(f"{in_path} -> {result}")
        return 0

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
