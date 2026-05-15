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
    python dima_convert.py md2misp [--root .] [-o misp/]

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
import uuid
from pathlib import Path
from typing import Any

PHASES = ("DETECT", "INFORM", "MEMORISE", "ACT")

# Namespace UUID fixe pour deriver les UUID des clusters MISP de maniere
# deterministe (uuid5). Genere une seule fois -- ne pas le modifier sous
# peine de casser les uuid des clusters deja diffuses.
MISP_NAMESPACE = uuid.UUID("4dbf1d7a-3b5e-5d4a-9d2f-1c1a5dd2b8f0")
MISP_GALAXY_UUID = "5e6c2f7a-7d3b-5a6d-9d2c-aef4b7d6e1c2"


def _write_text(path: Path, content: str) -> None:
    """Ecrit un fichier en UTF-8 avec des sauts de ligne LF, peu importe l'OS."""
    with path.open("w", encoding="utf-8", newline="\n") as fh:
        fh.write(content)

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
    _write_text(target, json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    return target


def json_to_md(json_path: Path, out_path: Path | None) -> Path:
    data = json.loads(json_path.read_text(encoding="utf-8"))
    md_text = render_markdown(data)
    target = out_path or json_path.with_suffix(".md")
    _write_text(target, md_text)
    return target


def _iter_phase_md(root: Path) -> list[Path]:
    found: list[Path] = []
    for phase in PHASES:
        candidate = root / phase / f"{phase}.md"
        if candidate.exists():
            found.append(candidate)
    return found


def _misp_uuid(slug: str) -> str:
    return str(uuid.uuid5(MISP_NAMESPACE, slug))


_URL_RE = re.compile(r"https?://[^\s)]+")
_MD_LINK_RE = re.compile(r"\[[^\]]+\]\((https?://[^)\s]+)\)")


def _extract_refs(*texts: str) -> list[str]:
    """Recupere les URLs de descriptions et de sections (links markdown + URLs nues)."""
    refs: list[str] = []
    seen: set[str] = set()
    for t in texts:
        if not t:
            continue
        for m in _MD_LINK_RE.finditer(t):
            url = m.group(1)
            if url not in seen:
                refs.append(url)
                seen.add(url)
        # URLs nues (en ignorant celles deja dans un [..](..))
        without_md_links = _MD_LINK_RE.sub("", t)
        for m in _URL_RE.finditer(without_md_links):
            url = m.group(0).rstrip(".,;:!?")
            if url not in seen:
                refs.append(url)
                seen.add(url)
    return refs


def _section_to_text(section: dict[str, Any]) -> str:
    parts: list[str] = []
    title = section.get("title", "").strip()
    if title:
        parts.append(f"## {title}")
    text = section.get("text", "").strip()
    if text:
        parts.append(text)
    for item in section.get("items", []) or []:
        parts.append(f"- {item}")
    return "\n".join(parts)


def _build_description(data: dict[str, Any]) -> str:
    """Combine la description et les sections en un seul bloc markdown."""
    parts: list[str] = []
    desc = (data.get("description") or "").strip()
    if desc:
        parts.append(desc)
    for sec in data.get("sections", []) or []:
        body = _section_to_text(sec)
        if body:
            parts.append(body)
    return "\n\n".join(parts)


def to_misp_cluster(parsed_phases: list[dict[str, Any]]) -> dict[str, Any]:
    """Construit un cluster MISP a partir des JSON parses de chaque phase."""
    values: list[dict[str, Any]] = []

    for data in parsed_phases:
        phase = (data.get("phase") or "").upper()
        for tactic in data.get("tactics", []):
            tac_id = tactic["id"]
            tac_uuid = _misp_uuid(f"dima:{phase}:{tac_id}")
            tac_refs = _extract_refs(
                tactic.get("description", ""),
                *[_section_to_text(s) for s in tactic.get("sections", []) or []],
            )
            tac_meta: dict[str, Any] = {
                "external_id": tac_id,
                "phase": phase,
                "type": "tactic",
            }
            if tac_refs:
                tac_meta["refs"] = tac_refs
            values.append({
                "value": f"{tac_id} - {tactic.get('name', '').strip()}",
                "description": _build_description(tactic),
                "uuid": tac_uuid,
                "meta": tac_meta,
            })

            for tech in tactic.get("techniques", []) or []:
                te_id = tech["id"]
                te_uuid = _misp_uuid(f"dima:{phase}:{tac_id}:{te_id}")
                te_refs = _extract_refs(
                    tech.get("description", ""),
                    *[_section_to_text(s) for s in tech.get("sections", []) or []],
                )
                te_meta: dict[str, Any] = {
                    "external_id": te_id,
                    "phase": phase,
                    "tactic": tac_id,
                    "type": "technique",
                }
                if te_refs:
                    te_meta["refs"] = te_refs
                values.append({
                    "value": f"{te_id} - {tech.get('name', '').strip()}",
                    "description": _build_description(tech),
                    "uuid": te_uuid,
                    "meta": te_meta,
                    "related": [{
                        "dest-uuid": tac_uuid,
                        "type": "subtechnique-of",
                    }],
                })

    return {
        "authors": ["M82 Project"],
        "category": "tactic",
        "description": "DIMA — cadre d'identification de tentatives d'exploitation des biais cognitifs (Detect, Inform, Memorise, Act).",
        "name": "DIMA",
        "source": "https://github.com/M82-project/DIMA",
        "type": "dima",
        "uuid": MISP_GALAXY_UUID,
        "values": values,
        "version": 1,
    }


def to_misp_galaxy() -> dict[str, Any]:
    return {
        "description": "DIMA — cadre d'identification de tentatives d'exploitation des biais cognitifs (Detect, Inform, Memorise, Act).",
        "icon": "shield-halved",
        "name": "DIMA",
        "namespace": "m82-project",
        "type": "dima",
        "uuid": MISP_GALAXY_UUID,
        "version": 1,
    }


def md2misp(md_root: Path, out_dir: Path) -> tuple[Path, Path]:
    """Lit les .md des 4 phases et ecrit le couple galaxy+cluster MISP."""
    paths = _iter_phase_md(md_root)
    parsed: list[dict[str, Any]] = []
    for md_path in paths:
        parsed.append(parse_markdown(md_path.read_text(encoding="utf-8"), phase=md_path.stem))

    galaxies_dir = out_dir / "galaxies"
    clusters_dir = out_dir / "clusters"
    galaxies_dir.mkdir(parents=True, exist_ok=True)
    clusters_dir.mkdir(parents=True, exist_ok=True)

    galaxy_path = galaxies_dir / "dima.json"
    cluster_path = clusters_dir / "dima.json"

    _write_text(galaxy_path, json.dumps(to_misp_galaxy(), ensure_ascii=False, indent=2) + "\n")
    _write_text(cluster_path, json.dumps(to_misp_cluster(parsed), ensure_ascii=False, indent=2) + "\n")
    return galaxy_path, cluster_path


def _iter_phase_json(root: Path) -> list[Path]:
    found: list[Path] = []
    for phase in PHASES:
        for candidate in (root / phase / f"{phase}.json", root / f"{phase}.json"):
            if candidate.exists():
                found.append(candidate)
                break
    return found


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_md = sub.add_parser("md2json", help="Convertit un .md (ou tous les .md du projet) en JSON")
    p_md.add_argument("input", nargs="?", help="Fichier .md a convertir")
    p_md.add_argument("--all", action="store_true", help="Convertit DETECT/INFORM/MEMORISE/ACT")
    p_md.add_argument("--root", default=".", help="Racine du projet DIMA (defaut: .)")
    p_md.add_argument("-o", "--output", help="Fichier ou dossier de sortie")

    p_mp = sub.add_parser("md2misp", help="Exporte les 4 phases en galaxy MISP (galaxies/dima.json + clusters/dima.json)")
    p_mp.add_argument("--root", default=".", help="Racine du projet DIMA (defaut: .)")
    p_mp.add_argument("-o", "--output", default="misp", help="Dossier de sortie (defaut: misp/)")

    p_js = sub.add_parser("json2md", help="Convertit un .json (ou un dossier de JSON) en Markdown")
    p_js.add_argument("input", nargs="?", help="Fichier .json a convertir")
    p_js.add_argument("--all", action="store_true", help="Convertit tous les .json d'un dossier")
    p_js.add_argument("--root", default=".", help="Dossier contenant les .json (defaut: .)")
    p_js.add_argument("-o", "--output", help="Fichier ou dossier de sortie")

    args = parser.parse_args(argv)

    if args.cmd == "md2json":
        if args.all:
            paths = _iter_phase_md(Path(args.root))
            if not paths:
                print(f"Aucun fichier de phase trouve sous {args.root}", file=sys.stderr)
                return 1
            out_dir = Path(args.output) if args.output else None
            if out_dir is not None:
                out_dir.mkdir(parents=True, exist_ok=True)
            for md in paths:
                target = (out_dir / f"{md.stem}.json") if out_dir else md.with_suffix(".json")
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

    if args.cmd == "md2misp":
        root = Path(args.root)
        if not _iter_phase_md(root):
            print(f"Aucun fichier de phase trouve sous {root}", file=sys.stderr)
            return 1
        out_dir = Path(args.output)
        galaxy_path, cluster_path = md2misp(root, out_dir)
        print(f"galaxy  -> {galaxy_path}")
        print(f"cluster -> {cluster_path}")
        return 0

    if args.cmd == "json2md":
        if args.all:
            paths = _iter_phase_json(Path(args.root))
            if not paths:
                print(f"Aucun .json de phase trouve sous {args.root}", file=sys.stderr)
                return 1
            out_dir = Path(args.output) if args.output else None
            if out_dir is not None:
                out_dir.mkdir(parents=True, exist_ok=True)
            for js in paths:
                target = (out_dir / f"{js.stem}.md") if out_dir else js.with_suffix(".md")
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
