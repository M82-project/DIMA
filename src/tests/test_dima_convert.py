"""Tests pytest pour dima_convert."""

from __future__ import annotations

import json
from pathlib import Path
from textwrap import dedent

import pytest

from dima_convert import (
    MISP_GALAXY_UUID,
    json_to_md,
    main,
    md2misp,
    md_to_json,
    parse_markdown,
    render_markdown,
    to_misp_cluster,
    to_misp_galaxy,
)


# ---------- parse_markdown -------------------------------------------------


def test_parse_simple_tactic_with_one_technique() -> None:
    md = dedent(
        """
        # TA0041 Valorisation individuelle
        Tactique qui valorise.

        ## TE0411 : biais d'exces de confiance
        Surestimation.

        **Exemples:**
        - "Vous etes intelligent"
        - "Vous savez mieux"
        """
    ).strip()

    data = parse_markdown(md, phase="ACT")

    assert data["phase"] == "ACT"
    assert len(data["tactics"]) == 1
    tac = data["tactics"][0]
    assert tac["id"] == "TA0041"
    assert tac["name"] == "Valorisation individuelle"
    assert tac["description"] == "Tactique qui valorise."
    assert tac["sections"] == []

    assert len(tac["techniques"]) == 1
    tech = tac["techniques"][0]
    assert tech["id"] == "TE0411"
    assert tech["name"] == "biais d'exces de confiance"
    assert tech["description"] == "Surestimation."
    assert tech["sections"] == [
        {
            "title": "Exemples",
            "items": ['"Vous etes intelligent"', '"Vous savez mieux"'],
        }
    ]


@pytest.mark.parametrize(
    "heading,expected_sep,expected_name",
    [
        ("# TA0041 Valorisation", " ", "Valorisation"),
        ("# TA0011: Information", ": ", "Information"),
        ("## TE0411 : biais", " : ", "biais"),
        ("## TE0231-Biais d'homogeneite", "-", "Biais d'homogeneite"),
        ("## TE0232 Biais", " ", "Biais"),
    ],
)
def test_heading_separator_variants(heading: str, expected_sep: str, expected_name: str) -> None:
    if heading.startswith("# TA"):
        data = parse_markdown(heading + "\n")
        entry = data["tactics"][0]
    else:
        data = parse_markdown("# TA9999 parent\n" + heading + "\n")
        entry = data["tactics"][0]["techniques"][0]
    assert entry["separator"] == expected_sep
    assert entry["name"] == expected_name


def test_orphan_technique_creates_phantom_tactic() -> None:
    md = "## TE0001 orpheline\nDescription."
    data = parse_markdown(md)
    assert len(data["tactics"]) == 1
    assert data["tactics"][0]["id"] == "TA0000"
    assert data["tactics"][0]["techniques"][0]["id"] == "TE0001"


def test_section_with_inline_text_after_title() -> None:
    md = dedent(
        """
        # TA0001 X
        ## TE0011 Y
        **Note:** Texte sur la meme ligne.
        Et la suite.
        """
    ).strip()
    data = parse_markdown(md)
    sec = data["tactics"][0]["techniques"][0]["sections"][0]
    assert sec["title"] == "Note"
    assert sec["text"] == "Texte sur la meme ligne.\nEt la suite."
    assert "items" not in sec


def test_section_with_text_then_bullets() -> None:
    md = dedent(
        """
        # TA0001 X
        ## TE0011 Y
        **References:**
        Lecture preliminaire.
        - Cialdini 1984
        - Kahneman 2011
        """
    ).strip()
    data = parse_markdown(md)
    sec = data["tactics"][0]["techniques"][0]["sections"][0]
    assert sec["title"] == "References"
    assert sec["text"] == "Lecture preliminaire."
    assert sec["items"] == ["Cialdini 1984", "Kahneman 2011"]


def test_multiple_tactics_and_techniques() -> None:
    md = dedent(
        """
        # TA0001 Un
        Desc 1.
        ## TE0011 Tech un
        ## TE0012 Tech deux
        # TA0002 Deux
        Desc 2.
        ## TE0021 Tech trois
        """
    ).strip()
    data = parse_markdown(md)
    assert [t["id"] for t in data["tactics"]] == ["TA0001", "TA0002"]
    assert [t["id"] for t in data["tactics"][0]["techniques"]] == ["TE0011", "TE0012"]
    assert [t["id"] for t in data["tactics"][1]["techniques"]] == ["TE0021"]


# ---------- render_markdown -----------------------------------------------


def test_render_basic() -> None:
    data = {
        "phase": "ACT",
        "tactics": [
            {
                "id": "TA0041",
                "separator": " ",
                "name": "Valorisation",
                "description": "Tactique X.",
                "sections": [],
                "techniques": [
                    {
                        "id": "TE0411",
                        "separator": " : ",
                        "name": "biais",
                        "description": "Surestimation.",
                        "sections": [
                            {"title": "Exemples", "items": ["a", "b"]},
                        ],
                    }
                ],
            }
        ],
    }
    md = render_markdown(data)
    assert "# TA0041 Valorisation" in md
    assert "## TE0411 : biais" in md
    assert "**Exemples:**" in md
    assert "- a" in md
    assert "- b" in md
    assert md.endswith("\n")


# ---------- round-trip ----------------------------------------------------


def test_roundtrip_preserves_structure() -> None:
    md = dedent(
        """
        # TA0041 Valorisation individuelle
        Tactique qui valorise.

        ## TE0411 : biais d'exces de confiance
        Surestimation.

        **Exemples:**
        - "A"
        - "B"

        **References:**
        - Cialdini 1984

        ## TE0412: Effet Peltzman
        Compensation.

        # TA0042 Renforcement
        Suite.

        ## TE0421 : couts irrecuperables
        Tendance.
        """
    ).strip()

    first = parse_markdown(md, phase="ACT")
    rendered = render_markdown(first)
    second = parse_markdown(rendered, phase="ACT")
    assert first == second


def test_roundtrip_real_files_if_present() -> None:
    repo = Path(__file__).resolve().parents[2]
    phases = [repo / p / f"{p}.md" for p in ("DETECT", "INFORM", "MEMORISE", "ACT")]
    found = [p for p in phases if p.exists()]
    if not found:
        pytest.skip("Aucun fichier de phase trouve")
    for md_path in found:
        original = md_path.read_text(encoding="utf-8")
        first = parse_markdown(original, phase=md_path.stem)
        rendered = render_markdown(first)
        second = parse_markdown(rendered, phase=md_path.stem)
        assert first == second, f"Round-trip instable pour {md_path.name}"


# ---------- IO helpers ----------------------------------------------------


def test_md_to_json_writes_file(tmp_path: Path) -> None:
    md_file = tmp_path / "ACT.md"
    md_file.write_text(
        "# TA0001 X\nDesc.\n## TE0011 Y\nTech.\n", encoding="utf-8"
    )
    out = md_to_json(md_file, None)
    assert out == md_file.with_suffix(".json")
    payload = json.loads(out.read_text(encoding="utf-8"))
    assert payload["phase"] == "ACT"
    assert payload["tactics"][0]["id"] == "TA0001"


def test_json_to_md_writes_file(tmp_path: Path) -> None:
    data = {
        "phase": "ACT",
        "tactics": [
            {
                "id": "TA0001",
                "separator": " ",
                "name": "X",
                "description": "Desc.",
                "sections": [],
                "techniques": [],
            }
        ],
    }
    src = tmp_path / "ACT.json"
    src.write_text(json.dumps(data), encoding="utf-8")
    out = json_to_md(src, None)
    assert out == src.with_suffix(".md")
    text = out.read_text(encoding="utf-8")
    assert "# TA0001 X" in text
    assert "Desc." in text


# ---------- CLI ----------------------------------------------------------


def test_cli_md2json_single(tmp_path: Path, capsys: pytest.CaptureFixture[str]) -> None:
    md_file = tmp_path / "ACT.md"
    md_file.write_text("# TA0001 X\n## TE0011 Y\n", encoding="utf-8")
    out_file = tmp_path / "out.json"
    code = main(["md2json", str(md_file), "-o", str(out_file)])
    assert code == 0
    assert out_file.exists()
    payload = json.loads(out_file.read_text(encoding="utf-8"))
    assert payload["tactics"][0]["techniques"][0]["id"] == "TE0011"
    assert "->" in capsys.readouterr().out


def test_cli_json2md_single(tmp_path: Path) -> None:
    src = tmp_path / "ACT.json"
    src.write_text(
        json.dumps(
            {
                "phase": "ACT",
                "tactics": [
                    {
                        "id": "TA0001",
                        "separator": " ",
                        "name": "X",
                        "description": "",
                        "sections": [],
                        "techniques": [],
                    }
                ],
            }
        ),
        encoding="utf-8",
    )
    out_file = tmp_path / "out.md"
    code = main(["json2md", str(src), "-o", str(out_file)])
    assert code == 0
    assert "# TA0001 X" in out_file.read_text(encoding="utf-8")


def test_cli_md2json_all(tmp_path: Path) -> None:
    for phase in ("DETECT", "INFORM", "MEMORISE", "ACT"):
        d = tmp_path / phase
        d.mkdir()
        (d / f"{phase}.md").write_text(f"# TA0001 {phase}\n", encoding="utf-8")
    out_dir = tmp_path / "json"
    code = main(["md2json", "--all", "--root", str(tmp_path), "-o", str(out_dir)])
    assert code == 0
    for phase in ("DETECT", "INFORM", "MEMORISE", "ACT"):
        f = out_dir / f"{phase}.json"
        assert f.exists()
        payload = json.loads(f.read_text(encoding="utf-8"))
        assert payload["phase"] == phase


def test_cli_md2json_all_writes_next_to_source_when_no_output(tmp_path: Path) -> None:
    for phase in ("DETECT", "INFORM", "MEMORISE", "ACT"):
        d = tmp_path / phase
        d.mkdir()
        (d / f"{phase}.md").write_text(f"# TA0001 {phase}\n", encoding="utf-8")
    code = main(["md2json", "--all", "--root", str(tmp_path)])
    assert code == 0
    for phase in ("DETECT", "INFORM", "MEMORISE", "ACT"):
        f = tmp_path / phase / f"{phase}.json"
        assert f.exists()


def test_cli_json2md_all_finds_json_in_phase_subdirs(tmp_path: Path) -> None:
    for phase in ("DETECT", "INFORM", "MEMORISE", "ACT"):
        d = tmp_path / phase
        d.mkdir()
        (d / f"{phase}.json").write_text(
            json.dumps(
                {
                    "phase": phase,
                    "tactics": [
                        {
                            "id": "TA0001",
                            "separator": " ",
                            "name": phase,
                            "description": "",
                            "sections": [],
                            "techniques": [],
                        }
                    ],
                }
            ),
            encoding="utf-8",
        )
    code = main(["json2md", "--all", "--root", str(tmp_path)])
    assert code == 0
    for phase in ("DETECT", "INFORM", "MEMORISE", "ACT"):
        f = tmp_path / phase / f"{phase}.md"
        assert f.exists()
        assert f"# TA0001 {phase}" in f.read_text(encoding="utf-8")


def test_cli_md2json_all_no_files_returns_error(tmp_path: Path) -> None:
    code = main(["md2json", "--all", "--root", str(tmp_path), "-o", str(tmp_path / "out")])
    assert code == 1


# ---------- MISP export ---------------------------------------------------


def _sample_parsed_phase() -> dict[str, object]:
    return parse_markdown(
        dedent(
            """
            # TA0011 : Tactique exemple
            Description tactique.

            ## TE0111 : Technique exemple
            Description technique. [source](https://example.com/te0111)

            **Exemples:**
            - "Voici un exemple"
            """
        ).strip(),
        phase="DETECT",
    )


def test_to_misp_galaxy_descriptor_has_fixed_uuid() -> None:
    g = to_misp_galaxy()
    assert g["uuid"] == MISP_GALAXY_UUID
    assert g["name"] == "DIMA"
    assert g["type"] == "dima"


def test_to_misp_cluster_emits_ta_and_te_values_with_relation() -> None:
    cluster = to_misp_cluster([_sample_parsed_phase()])
    assert cluster["uuid"] == MISP_GALAXY_UUID
    values = cluster["values"]
    assert len(values) == 2

    ta = next(v for v in values if v["meta"]["type"] == "tactic")
    te = next(v for v in values if v["meta"]["type"] == "technique")

    assert ta["meta"]["external_id"] == "TA0011"
    assert ta["meta"]["phase"] == "DETECT"
    assert ta["value"].startswith("TA0011 - ")

    assert te["meta"]["external_id"] == "TE0111"
    assert te["meta"]["tactic"] == "TA0011"
    assert te["meta"]["refs"] == ["https://example.com/te0111"]
    assert te["related"] == [{"dest-uuid": ta["uuid"], "type": "subtechnique-of"}]


def test_misp_uuids_are_deterministic() -> None:
    a = to_misp_cluster([_sample_parsed_phase()])
    b = to_misp_cluster([_sample_parsed_phase()])
    assert [v["uuid"] for v in a["values"]] == [v["uuid"] for v in b["values"]]


def test_cli_md2misp_writes_galaxy_and_cluster(tmp_path: Path) -> None:
    for phase in ("DETECT", "INFORM", "MEMORISE", "ACT"):
        d = tmp_path / phase
        d.mkdir()
        (d / f"{phase}.md").write_text(
            f"# TA0001 : Tactique {phase}\nDesc.\n\n## TE0001 : Tech {phase}\nDesc tech.\n",
            encoding="utf-8",
        )
    out_dir = tmp_path / "misp"
    code = main(["md2misp", "--root", str(tmp_path), "-o", str(out_dir)])
    assert code == 0

    galaxy = json.loads((out_dir / "galaxies" / "dima.json").read_text(encoding="utf-8"))
    cluster = json.loads((out_dir / "clusters" / "dima.json").read_text(encoding="utf-8"))
    assert galaxy["uuid"] == cluster["uuid"] == MISP_GALAXY_UUID
    # 4 phases * (1 TA + 1 TE) = 8 values
    assert len(cluster["values"]) == 8
    # Each TE should reference its TA via a related entry
    for v in cluster["values"]:
        if v["meta"]["type"] == "technique":
            assert v["related"][0]["type"] == "subtechnique-of"


def test_cli_md2misp_no_files_returns_error(tmp_path: Path) -> None:
    code = main(["md2misp", "--root", str(tmp_path), "-o", str(tmp_path / "misp")])
    assert code == 1


def test_cli_requires_input_without_all() -> None:
    with pytest.raises(SystemExit):
        main(["md2json"])
