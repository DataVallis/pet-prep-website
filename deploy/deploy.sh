#!/usr/bin/env bash
# Deploys the PetPrep website on the production server.
#
#   deploy.sh <source-dir> [commit-sha]
#
# Called by GitHub Actions after it uploaded the commit to <source-dir>
# (/opt/petprep/website/incoming). Steps:
#   1. build petprep-website:next from the source (the live site keeps serving)
#   2. smoke-test the new image in a throwaway container on the API network
#   3. promote: :production -> :previous, :next -> :production
#   4. recreate the `website` container and wait until it is healthy
#   5. on failure after step 3: put :previous back and restart it
# Caddy (API stack) proxies petprep.si to website:3000 on the shared network.
set -Eeuo pipefail

SRC="${1:?usage: deploy.sh <source-dir> [commit-sha]}"
SHA="${2:-unknown}"
ROOT="${WEBSITE_ROOT:-/opt/petprep/website}"
IMAGE="petprep-website"
NETWORK="${API_NETWORK:-backend_petprep-network}"
SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://petprep.si}"
COMPOSE=(docker compose -f "${SRC}/deploy/compose.yaml")
SMOKE="petprep-website-smoke"

log() { printf '\n==> %s\n' "$*"; }
fail() { printf '\nERROR: %s\n' "$*" >&2; exit 1; }

[ -f "${SRC}/Dockerfile" ] || fail "no Dockerfile in ${SRC}"
docker network inspect "$NETWORK" >/dev/null 2>&1 \
  || fail "Docker network ${NETWORK} not found — is the API stack (project 'backend') running?"

log "1/5 Building ${IMAGE}:next (commit ${SHA})"
docker build --pull \
  --build-arg NEXT_PUBLIC_SITE_URL="${SITE_URL}" \
  --label "org.opencontainers.image.revision=${SHA}" \
  -t "${IMAGE}:next" "${SRC}"

log "2/5 Smoke test"
docker rm -f "$SMOKE" >/dev/null 2>&1 || true
docker run -d --name "$SMOKE" --network "$NETWORK" "${IMAGE}:next" >/dev/null
smoke_ok=false
for _ in $(seq 1 30); do
  if docker exec "$SMOKE" wget -q -O /dev/null http://127.0.0.1:3000/ \
    && docker exec "$SMOKE" wget -q -O /dev/null http://127.0.0.1:3000/sl \
    && docker exec "$SMOKE" wget -q -O /dev/null http://127.0.0.1:3000/sitemap.xml; then
    smoke_ok=true
    break
  fi
  sleep 1
done
docker logs --tail 20 "$SMOKE" || true
docker rm -f "$SMOKE" >/dev/null 2>&1 || true
$smoke_ok || fail "new image did not serve /, /sl and /sitemap.xml — nothing changed, the old site keeps running"

log "3/5 Promoting images"
had_previous=false
if docker image inspect "${IMAGE}:production" >/dev/null 2>&1; then
  docker tag "${IMAGE}:production" "${IMAGE}:previous"
  had_previous=true
fi
docker tag "${IMAGE}:next" "${IMAGE}:production"

rollback() {
  if $had_previous; then
    log "Rolling back to ${IMAGE}:previous"
    docker tag "${IMAGE}:previous" "${IMAGE}:production"
    WEBSITE_IMAGE_TAG=production "${COMPOSE[@]}" up -d --force-recreate website || true
  fi
}

log "4/5 Starting the new container"
if ! WEBSITE_IMAGE_TAG=production "${COMPOSE[@]}" up -d --force-recreate --remove-orphans website; then
  rollback
  fail "docker compose up failed"
fi

healthy=false
for _ in $(seq 1 40); do
  status="$(docker inspect -f '{{.State.Health.Status}}' petprep-website 2>/dev/null || echo missing)"
  if [ "$status" = "healthy" ]; then healthy=true; break; fi
  sleep 2
done
if ! $healthy; then
  docker logs --tail 50 petprep-website || true
  rollback
  fail "website container did not become healthy"
fi

log "5/5 Finishing"
mkdir -p "$ROOT"
printf '%s\n' "$SHA" > "${ROOT}/.deployed-sha"
# Through Caddy (works once the Caddyfile routes petprep.si to website:3000).
if curl -fsS -o /dev/null --max-time 10 --resolve "petprep.si:443:127.0.0.1" https://petprep.si/; then
  echo "https://petprep.si answers through Caddy."
else
  echo "WARNING: https://petprep.si did not answer through Caddy yet (Caddyfile change deployed? DNS?)."
fi
docker image prune -f >/dev/null || true
echo "Deployed ${SHA}."
