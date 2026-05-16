# syntax=docker/dockerfile:1.6

# ---- Stage 1: regenerate the per-phase JSONs from the Markdown sources ----
# Uses the official uv image (Python 3.12 on Alpine) so the same toolchain
# is used in every stage. The converter itself depends on stdlib only,
# so we invoke python directly via `uv run --no-project`.
FROM ghcr.io/astral-sh/uv:python3.12-alpine AS builder
WORKDIR /build

COPY src/dima_convert.py ./src/dima_convert.py
COPY DETECT/   ./DETECT/
COPY INFORM/   ./INFORM/
COPY MEMORISE/ ./MEMORISE/
COPY ACT/      ./ACT/
COPY docs/     ./docs/

RUN uv run --no-project python src/dima_convert.py md2json --all -o docs/data

# ---- Stage 2: pytest runner (build standalone with --target tests) ----
# Pytest version comes from pyproject.toml's [dependency-groups].dev,
# so the build stays reproducible (no implicit pytest latest).
FROM ghcr.io/astral-sh/uv:python3.12-alpine AS tests
WORKDIR /app

COPY pyproject.toml uv.lock ./
COPY src/      ./src/
COPY DETECT/   ./DETECT/
COPY INFORM/   ./INFORM/
COPY MEMORISE/ ./MEMORISE/
COPY ACT/      ./ACT/

# Synchronise the dev group (pytest) into /app/.venv with the exact
# versions resolved in uv.lock (--frozen). The image is reproducible:
# rebuilding from the same commit always pulls the same pytest.
RUN uv sync --group dev --frozen

# Run the suite at build time so `docker build --target tests` fails on regression.
RUN uv run pytest

# And keep the same entrypoint for interactive runs (docker run --rm <image>).
CMD ["uv", "run", "pytest", "-v"]

# ---- Stage 3: nginx runtime (default target) ----
FROM nginxinc/nginx-unprivileged:alpine AS runtime

LABEL org.opencontainers.image.title="DIMA Navigator" \
      org.opencontainers.image.description="Static SPA serving the DIMA matrix (Detect/Inform/Memorise/Act)." \
      org.opencontainers.image.source="https://github.com/M82-project/DIMA" \
      org.opencontainers.image.licenses="see repository"

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/docs /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:8080/ >/dev/null || exit 1
