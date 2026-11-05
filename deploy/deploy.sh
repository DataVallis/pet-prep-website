#!/usr/bin/env bash
# Deploys the PetPrep website on the production server.
#
#   deploy.sh <source-dir> [commit-sha]
#
# Called by GitHub Actions after it uploaded the commit to <source-dir>
# (/opt/petprep/website/incoming) — only for a Run workflow on main with target production (the
# daily deploy or by hand; a push to main deploys nothing since 2026-11-04, DEPLOY.md). Steps:
#   0. disk preflight: prune old website images, refuse to pull with < DEPLOY_MIN_FREE_GB free (DISK)
#   1. pull petprep-website:next from $IMAGE_REF — the digest CI pushed to GHCR after its checks
#      (the normal path since 2026-11-03; CI logs in over ssh stdin into a PRIVATE docker config dir
#      $PULL_DOCKER_CONFIG — never ~/.docker, shared with the API deploy — that this script deletes
#      right after the pull; with $EXPECT_TREE the image's org.petprep.tree label must match),
#      or load it from $IMAGE_TAR (2026-11-02 path), or build it from the source when neither is
#      given (manual fallback — needs ~2 GB free RAM; the live site keeps serving either way)
#   2. smoke-test the new image in a throwaway container on the API network
#   3. promote: :production -> :previous, :next -> :production
#   4. recreate the `website` container and wait until it is healthy
#   5. on failure after step 3: put :previous back and restart it
# Caddy (API stack) proxies petprep.si to website:3000 on the shared network.
#
# DISK (incident 2026-11-04, ~11:00–12:35 Europe/Ljubljana: the shared root disk reached 100 %,
#   postgres went unhealthy and the PetPrep API was down). Every deploy pulls
#   ghcr.io/datavallis/petprep-website@sha256:… (~2.85 GB); a digest-pulled image keeps that
#   name, so it is never "dangling" and `docker image prune -f` never removed it — 9 website
#   images ≈ 25 GB had piled up. Same rule as the API (pet-prep scripts/deploy-production.sh
#   prune_release_images, DEPLOYMENT.md D31):
#   prune_release_images removes, BY IMAGE ID (`docker image rm <id>`, never -f), every
#   petprep-website / ghcr.io/datavallis/petprep-website image that is NOT kept. By id because
#   with the containerd image store a digest-pulled image is listed with tag <none> — the first,
#   name-based version (2026-11-04) removed 0 images and the disk reached 89 % (2026-11-05).
#   KEPT: the ids of petprep-website:production (live), :previous (rollback), :next, every image
#   any container uses (running or stopped; `docker ps -a` name or id resolved via
#   `docker image inspect`) and any id that also has a name in another repository. Fail safe:
#   images or containers cannot be listed / resolved → nothing is removed; a refused rm only
#   warns. Never touched: other repositories (petprep-app, petprep-web,
#   petprep-backend, postgres, redis, caddy, …) and volumes (website-next-cache, the API's);
#   no `docker system prune`. It runs (a) in the disk preflight (step 0, before anything is
#   pulled / built) and (b) after a successful deploy, followed by `docker image prune -f`
#   (dangling) and `docker builder prune -af --keep-storage 1GB` — all warn-only.
#   Preflight: after that prune the Docker disk needs >= DEPLOY_MIN_FREE_GB (default 5) GB
#   free; below it the whole build cache is dropped once more, and if it is still below, the
#   deploy stops BEFORE pulling (nothing changed, the live site keeps running).
#   DEPLOY_MIN_FREE_GB=0 skips the check (the prune still runs).
#
# Test harness (stubbed docker / df / curl, no server): deploy/tests/deploy.test.sh
set -Eeuo pipefail

SRC="${1:?usage: deploy.sh <source-dir> [commit-sha]}"
SHA="${2:-unknown}"
ROOT="${WEBSITE_ROOT:-/opt/petprep/website}"
IMAGE="petprep-website"
NETWORK="${API_NETWORK:-backend_petprep-network}"
SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://petprep.si}"
COMPOSE=(docker compose -f "${SRC}/deploy/compose.yaml")
SMOKE="petprep-website-smoke"
# Release images (DISK above): the local tags and the GHCR digest-pulled images — nothing else.
RELEASE_REPO_RE='^(petprep-website|ghcr\.io/datavallis/petprep-website)$'
MIN_FREE_GB="${DEPLOY_MIN_FREE_GB:-5}"

log() { printf '\n==> %s\n' "$*"; }
fail() { printf '\nERROR: %s\n' "$*" >&2; exit 1; }
warn() { printf 'WARNING: %s\n' "$*" >&2; }

# ---- Disk (DISK above) -----------------------------------------------------------------
# short_id: sha256:<64 hex> / <64 hex> / <12 hex> → the 12-hex short id (how ids are compared).
short_id() { local i="${1#sha256:}"; printf '%s\n' "${i:0:12}"; }

# prune_release_images: remove (by IMAGE ID) every petprep-website image that is not kept
# (:production, :previous, :next, or used by any container). Works on ids because on the server
# (Docker with the containerd image store) a digest-pulled image is listed as
# `ghcr.io/datavallis/petprep-website:<none>` — the old name-based prune matched nothing and
# removed 0 images (2026-11-05, disk at 89 %). Returns 1 (prunes nothing) when the containers
# or images cannot be listed or resolved — never guess what is in use.
prune_release_images() {
  local listing used ref rid keep="" foreign="" id repo tag removed=0 failed=0 seen=""
  if ! listing="$(docker image ls --no-trunc --format '{{.ID}}\t{{.Repository}}\t{{.Tag}}\t{{.Digest}}')"; then
    warn "cannot list images — old website images not pruned."
    return 1
  fi
  # Keep: what the release tags point at (a missing tag is fine — e.g. no :previous yet).
  for tag in production previous next; do
    if rid="$(docker image inspect --format '{{.Id}}' "${IMAGE}:${tag}" 2>/dev/null)"; then
      keep+="$(short_id "$rid")"$'\n'
    fi
  done
  # Keep: every image a container (running or stopped) uses. `docker ps` prints a name or an id.
  if ! used="$(docker ps -a --format '{{.Image}}')"; then
    warn "cannot list containers — old website images not pruned."
    return 1
  fi
  while IFS= read -r ref; do
    [ -n "$ref" ] || continue
    if ! rid="$(docker image inspect --format '{{.Id}}' "$ref")" || [ -z "$rid" ]; then
      warn "cannot resolve the image '${ref}' of a container — old website images not pruned."
      return 1
    fi
    keep+="$(short_id "$rid")"$'\n'
  done <<< "$(sort -u <<< "$used")"
  # Never touch an id that also has a name outside the website repositories.
  while IFS=$'\t' read -r id repo tag _; do
    [ -n "$id" ] || continue
    [[ "$repo" =~ $RELEASE_REPO_RE ]] || foreign+="$(short_id "$id")"$'\n'
  done <<< "$listing"
  while IFS=$'\t' read -r id repo tag _; do
    [ -n "$id" ] || continue
    [[ "$repo" =~ $RELEASE_REPO_RE ]] || continue
    rid="$(short_id "$id")"
    if grep -qxF -- "$rid" <<< "${keep}${foreign}${seen}"; then continue; fi
    seen+="${rid}"$'\n'
    if docker image rm "$id" >/dev/null; then
      removed=$((removed + 1))
    else
      failed=$((failed + 1))
    fi
  done <<< "$listing"
  echo "Old website images: removed ${removed} image(s) (kept: petprep-website:production, :previous, :next and every image a container uses)."
  if [ "$failed" -gt 0 ]; then warn "${failed} old website image(s) could not be removed (docker image ls; docker refuses images that are in use or have several names)."; fi
  return 0
}

prune_disk() {
  prune_release_images || true
  docker image prune -f >/dev/null || warn "docker image prune failed."
  # Build cache: always capped (disk hygiene, David 2026-10-15) — the old age filter let it grow
  # to ~20 GB with several builds a day. Keeps the most recently used 1 GB.
  docker builder prune -af --keep-storage 1GB >/dev/null || warn "docker builder prune failed."
}

# Free KiB on the file system of Docker's data root (falls back to /); empty = unknown.
disk_free_kb() {
  local dir
  dir="$(docker info --format '{{.DockerRootDir}}' 2>/dev/null || true)"
  if [ -z "$dir" ] || [ ! -e "$dir" ]; then dir=/; fi
  df -Pk "$dir" 2>/dev/null | awk 'NR==2 {print $4}' || true
}

[ -f "${SRC}/Dockerfile" ] || fail "no Dockerfile in ${SRC}"
docker network inspect "$NETWORK" >/dev/null 2>&1 \
  || fail "Docker network ${NETWORK} not found — is the API stack (project 'backend') running?"

[[ "$MIN_FREE_GB" =~ ^[0-9]+$ ]] || fail "DEPLOY_MIN_FREE_GB must be a whole number of GB (found '${MIN_FREE_GB}') — nothing changed"

# ---- 0. Disk preflight (DISK above) — nothing changed yet ------------------------------
log "0/5 Disk preflight: pruning old website images and the build cache"
prune_disk
if [ "$MIN_FREE_GB" -gt 0 ]; then
  need_kb=$((MIN_FREE_GB * 1024 * 1024))
  free_kb="$(disk_free_kb)"
  if [[ "$free_kb" =~ ^[0-9]+$ ]] && [ "$free_kb" -lt "$need_kb" ]; then
    warn "only $((free_kb / 1024 / 1024)) GB free — dropping the whole build cache too."
    docker builder prune -af >/dev/null || warn "docker builder prune failed."
    free_kb="$(disk_free_kb)"
  fi
  if ! [[ "$free_kb" =~ ^[0-9]+$ ]]; then
    warn "could not measure the free disk space — continuing without the disk check."
  elif [ "$free_kb" -lt "$need_kb" ]; then
    fail "only $((free_kb / 1024 / 1024)) GB free on the Docker disk after pruning old website images and the build cache;
       a website deploy needs at least ${MIN_FREE_GB} GB (DEPLOY_MIN_FREE_GB; the image is ~3 GB). Nothing was changed,
       the old site keeps running. The disk is shared with the PetPrep API — check on the server:
       df -h /; docker system df; docker image ls (DEPLOY.md »Disk«; pet-prep DEPLOYMENT.md D31)."
  else
    echo "Disk preflight OK ($((free_kb / 1024 / 1024)) GB free, need ${MIN_FREE_GB} GB)."
  fi
fi

IMAGE_REF="${IMAGE_REF:-}"
IMAGE_TAR="${IMAGE_TAR:-}"
if [ -n "$IMAGE_REF" ]; then
  [[ "$IMAGE_REF" =~ ^[a-z0-9.-]+(/[a-z0-9._-]+)+@sha256:[0-9a-f]{64}$ ]] || fail "IMAGE_REF must be a digest reference (…@sha256:<64 hex>)"
  log "1/5 Pulling ${IMAGE_REF} (commit ${SHA})"
  pulled=true
  if [ -n "${PULL_DOCKER_CONFIG:-}" ]; then
    DOCKER_CONFIG="$PULL_DOCKER_CONFIG" docker pull -q "$IMAGE_REF" >/dev/null || pulled=false
    rm -rf "$PULL_DOCKER_CONFIG" # the login was only for this pull
  else
    docker pull -q "$IMAGE_REF" >/dev/null || pulled=false
  fi
  $pulled || fail "could not pull ${IMAGE_REF} — nothing changed, the old site keeps running"
  docker tag "$IMAGE_REF" "${IMAGE}:next"
  if [ -n "${EXPECT_TREE:-}" ]; then
    tree="$(docker image inspect -f '{{index .Config.Labels "org.petprep.tree"}}' "${IMAGE}:next" 2>/dev/null || true)"
    [ "$tree" = "$EXPECT_TREE" ] || fail "pulled image is tree '${tree}', expected ${EXPECT_TREE} — nothing changed, the old site keeps running"
  fi
elif [ -n "$IMAGE_TAR" ]; then
  log "1/5 Loading ${IMAGE}:next from ${IMAGE_TAR} (commit ${SHA})"
  [ -f "$IMAGE_TAR" ] || fail "image archive ${IMAGE_TAR} not found"
  docker rmi "${IMAGE}:next" >/dev/null 2>&1 || true
  gunzip -c "$IMAGE_TAR" | docker load
  rm -f "$IMAGE_TAR"
  rev="$(docker image inspect -f '{{index .Config.Labels "org.opencontainers.image.revision"}}' "${IMAGE}:next" 2>/dev/null || true)"
  if [ "$SHA" != "unknown" ] && [ "$rev" != "$SHA" ]; then
    fail "loaded image is commit '${rev}', expected ${SHA} — nothing changed, the old site keeps running"
  fi
else
  log "1/5 Building ${IMAGE}:next (commit ${SHA}) — needs ~2 GB free RAM"
  docker build --pull \
    --build-arg NEXT_PUBLIC_SITE_URL="${SITE_URL}" \
    --label "org.opencontainers.image.revision=${SHA}" \
    -t "${IMAGE}:next" "${SRC}"
fi

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
# Old releases (DISK above): every petprep-website image (by id) except :production (this
# release), :previous (the rollback), :next and images a container uses; then dangling images and the build
# cache (capped at 1 GB).
prune_disk
echo "Deployed ${SHA}."
