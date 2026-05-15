# syntax=docker/dockerfile:1.6

# ---- Stage 1: regenerate the per-phase JSONs from the Markdown sources ----
FROM python:3.12-alpine AS builder
WORKDIR /build

# Only stdlib is needed by the converter, no pip install required.
COPY src/dima_convert.py ./src/dima_convert.py
COPY DETECT/   ./DETECT/
COPY INFORM/   ./INFORM/
COPY MEMORISE/ ./MEMORISE/
COPY ACT/      ./ACT/
COPY docs/     ./docs/

RUN python src/dima_convert.py md2json --all -o docs/data \
 && rm -rf docs/data/.gitkeep 2>/dev/null || true

# ---- Stage 2: serve the SPA via nginx (unprivileged image, listens on 8080) ----
FROM nginxinc/nginx-unprivileged:alpine

LABEL org.opencontainers.image.title="DIMA Navigator" \
      org.opencontainers.image.description="Static SPA serving the DIMA matrix (Detect/Inform/Memorise/Act)." \
      org.opencontainers.image.source="https://github.com/M82-project/DIMA" \
      org.opencontainers.image.licenses="see repository"

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/docs /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:8080/ >/dev/null || exit 1
