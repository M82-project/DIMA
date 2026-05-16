# DIMA

DIMA is a framework to identify attempts to exploit cognitive biases in information flow.

## How does it work?

The matrix is divided into four phases (**D**etect — **I**nform — **M**emorise — **A**ct).
Each phase contains tactics (**TA**xxxx) which exploit cognitive biases, themselves
implemented as techniques (**TE**xxxx).

Source of truth: one Markdown file per phase, under [`DETECT/`](DETECT/),
[`INFORM/`](INFORM/), [`MEMORISE/`](MEMORISE/) and [`ACT/`](ACT/).

## Quick start

| Vous voulez…                                  | Allez voir                                                                 |
|-----------------------------------------------|----------------------------------------------------------------------------|
| Parcourir la matrice dans le navigateur       | [DIMA Navigator](https://m82-project.github.io/DIMA/)                      |
| Lire le détail d'une phase                    | `DETECT/DETECT.md`, `INFORM/INFORM.md`, `MEMORISE/MEMORISE.md`, `ACT/ACT.md` |
| Convertir Markdown ↔ JSON                     | Section [Convertisseur Python](#convertisseur-python) ci-dessous           |
| Bâtir un rapport de campagne PDF / JSON       | Section [Rapport de campagne](#rapport-de-campagne) ci-dessous             |
| Auto-héberger le navigateur (Docker)          | Section [Image Docker](#image-docker) ci-dessous                           |

---

## DIMA Navigator (SPA)

Une mini-application HTML, hébergée sur GitHub Pages, qui rend la matrice
sous la forme de 4 colonnes colorées (orange / bleu / violet / vert) et
charge dynamiquement les JSON par phase :

🔗 <https://m82-project.github.io/DIMA/>

**Fonctionnalités :**

- Recherche globale (id, nom, description) avec compteur de résultats live.
- Clic sur une technique → panneau détail (description complète + sections
  *Exemples*, *Références*, *Fondements psychologiques*, etc.).
- Sélection d'un sous-ensemble de techniques pour bâtir un rapport de
  campagne (voir plus bas).
- Export PDF de la matrice complète via le bouton **PDF** : une feuille de
  style `@media print` repagine en noir-sur-blanc, A4, une phase par page.
- Responsive : 4 colonnes → 2 colonnes → 1 colonne selon la largeur.

L'app est un **fichier unique** : [`docs/index.html`](docs/index.html).
Les données viennent de [`docs/data/<PHASE>.json`](docs/data/), régénérées
automatiquement par la CI à chaque push qui touche les Markdown sources.

### Lancer en local

```powershell
python -m http.server 8000 --directory docs
# puis ouvrir http://localhost:8000
```

(Un simple double-clic sur `docs/index.html` ne marche pas : `fetch()`
refuse le schéma `file://`.)

---

## Rapport de campagne

Use case : un analyste observe une opération d'influence et veut documenter
quelles techniques DIMA y ont été employées.

1. Dans le SPA, cocher la case à gauche du nom de chaque technique
   observée.
   - La case à droite de chaque **tactique** coche/décoche **toutes ses
     techniques** d'un coup (état mixte représenté par un trait
     horizontal).
   - La sélection persiste en `localStorage` (survivre à un refresh).
2. Cliquer le bouton **Rapport** dans l'en-tête.
3. Remplir le formulaire : *nom de campagne*, *période d'observation*,
   *contexte général*, et une *observation* libre par technique.
4. Choisir un export :
   - **Imprimer / PDF** — feuille de style print dédiée : un titre en
     h1, métadonnées, contexte général dans un encart, puis chaque
     technique avec sa description complète + sections + l'observation
     analyste mise en évidence en jaune.
   - **Exporter JSON** — téléchargement d'un fichier nommé d'après le
     titre de campagne (slugifié), contenant le payload complet.
   - **Importer JSON** — recharge un rapport précédent pour le modifier
     (ignore les IDs inconnus si la matrice a évolué).

---

## Convertisseur Python

[`src/dima_convert.py`](src/dima_convert.py) est un script standalone (zéro
dépendance hors stdlib) qui fait office de pivot entre les formats.

### Usage

Tout passe par [`uv`](https://docs.astral.sh/uv/). L'en-tête PEP 723 du
script permet `uv run` direct, sans environnement à provisionner.

```powershell
# 1. Markdown -> JSON (à côté de chaque .md source)
uv run src/dima_convert.py md2json --all

# 2. JSON -> Markdown (pour reformatter le markdown depuis le JSON)
uv run src/dima_convert.py json2md --all

# Mono-fichier
uv run src/dima_convert.py md2json DETECT/DETECT.md -o /tmp/detect.json
uv run src/dima_convert.py json2md /tmp/detect.json -o /tmp/detect.md
```

### Format JSON

```json
{
  "phase": "ACT",
  "tactics": [
    {
      "id": "TA0041",
      "name": "Valorisation individuelle",
      "description": "Tactique qui valorise…",
      "sections": [],
      "techniques": [
        {
          "id": "TE0411",
          "name": "biais d'excès de confiance",
          "description": "Surestimation…",
          "sections": [
            { "title": "Exemples", "items": ["…", "…"] },
            { "title": "Références", "text": "…" }
          ]
        }
      ]
    }
  ]
}
```

Round-trip stable : `parse → render → parse` produit un JSON identique,
testé sur les 4 fichiers réels du repo.

### Convention markdown

Les 4 fichiers de phase suivent la même convention (voir PR #39) :

- Titres : `# TAxxxx : Nom` et `## TExxxx : Nom` (espace-deux-points-espace).
- Liens sources : `[source](url)` en fin de description.
- Sous-sections : `**Titre:**` suivi d'un texte libre et/ou d'une liste à puces.
- Pas de doublon d'identifiant TA/TE entre phases.

---

## Tests

```powershell
uv sync --group dev    # premier lancement
uv run pytest          # parser, round-trip, CLI
```

Une image Docker dédiée permet aussi de lancer la suite sans installer
Python (voir [Image Docker](#image-docker)).

---

## Image Docker

Le SPA se déploie clé en main via une image GHCR construite par la CI :

```bash
# Récupère la dernière version et la sert sur http://localhost:8080
docker run --rm -p 8080:8080 ghcr.io/m82-project/dima:latest
```

Une **image-sœur** embarque pytest et le code source pour faire tourner
les tests dans un environnement reproductible :

```bash
# Joue toute la suite
docker run --rm ghcr.io/m82-project/dima:latest-tests

# Filtre, mode verbeux, etc. (le CMD par défaut est `pytest -v`)
docker run --rm ghcr.io/m82-project/dima:latest-tests pytest -v -k roundtrip
```

### Tags publiés

| Évènement                | Image runtime                       | Image tests                          |
|--------------------------|-------------------------------------|--------------------------------------|
| push sur `main`          | `ghcr.io/m82-project/dima:latest`   | `ghcr.io/m82-project/dima:latest-tests` |
| push d'un tag `v1.2.3`   | `ghcr.io/m82-project/dima:v1.2.3`   | `ghcr.io/m82-project/dima:v1.2.3-tests` |

- L'image runtime est **multi-arch** (`linux/amd64` + `linux/arm64`).
- L'image tests est `linux/amd64` uniquement (pas la peine d'émuler arm64
  juste pour pytest).
- Les deux flux ne s'écrasent jamais : un merge sur `main` rafraîchit
  `:latest`, un tag `vX.Y.Z` publie cette version sans toucher à `:latest`.

### Construire localement

```bash
# Image runtime
docker build -f docker/Dockerfile -t dima:dev .
docker run --rm -p 8080:8080 dima:dev

# Image tests (le pytest s'exécute pendant le build : échec = build cassé)
docker build --target tests -f docker/Dockerfile -t dima-tests:dev .
docker run --rm dima-tests:dev
```

Le `Dockerfile` est multi-stage :

1. `builder` — regénère `docs/data/*.json` depuis les `.md` sources avec
   le script Python (stdlib only, pas de `pip install` dans cette étape).
2. `tests` — installe pytest et joue la suite. Le `RUN pytest` casse le
   build si un test échoue.
3. `runtime` — `nginxinc/nginx-unprivileged:alpine` qui sert sur le port
   **8080** avec un [`nginx.conf`](docker/nginx.conf) custom (gzip,
   no-cache HTML/JSON, cache long sur assets statiques).

---

## CI / CD

Workflows GitHub Actions :

| Workflow                                       | Déclencheurs                                                | Rôle                                                                                          |
|------------------------------------------------|-------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| [`tests.yml`](.github/workflows/tests.yml)     | push `main`, PR `main`                                      | Exécute pytest sur Python 3.10 / 3.11 / 3.12.                                                 |
| [`pages.yml`](.github/workflows/pages.yml)     | push `main` touchant `docs/`, les `.md` ou le script        | Régénère `docs/data/*.json` depuis les `.md` puis déploie `docs/` sur GitHub Pages.            |
| [`docker.yml`](.github/workflows/docker.yml)   | push `main`, tag `v*`, PR touchant `docker/` ou les sources | Build & push runtime (multi-arch) et tests (amd64) vers GHCR — voir [Image Docker](#image-docker). |
| [`create-release.yml`](.github/workflows/create-release.yml) | tag `v*`                                          | Publie la release et attache l'archive ZIP du plugin Chrome.                                  |

---

## Layout du repo

```
DETECT/   INFORM/   MEMORISE/   ACT/      # sources Markdown (un .md par phase)
src/
  dima_convert.py                         # convertisseur md ↔ json
  tests/test_dima_convert.py              # suite pytest
docs/
  index.html                              # SPA navigator
  data/<PHASE>.json                       # JSONs servis sur Pages
docker/
  Dockerfile                              # multi-stage : builder + tests + runtime
  nginx.conf                              # config nginx servant la SPA
.github/workflows/                        # CI / CD
pyproject.toml                            # config uv + pytest
```

---

contact : contact@M82-project.org
