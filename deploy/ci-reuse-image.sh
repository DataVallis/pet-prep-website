#!/usr/bin/env bash
# Reuse a tested image for a push to main (David 2026-11-03, B) — job "plan" in
# .github/workflows/ci-deploy.yml.
#
# Every green run of the workflow uploads the marker artifact "web-green-<git tree>" holding
# "<tree> <run id>" and "image=ghcr.io/<owner>/petprep-website@sha256:…" (job "green", only after
# checks + build passed). A push / Run workflow on main (attempt 1) whose tree already has such a
# marker from a SUCCESSFUL run of this workflow in this repository (a PR run when the PR was up
# to date with main, or an earlier main run) deploys that digest without building again.
# Anything else — no marker, a failed / other-workflow / fork run, a malformed marker, an API or
# download error, a re-run, a PR, a digest no longer in GHCR (pruned) — prints image= (empty): the
# run builds and tests as usual.
#
# Env: EVENT_NAME, GIT_REF, RUN_ATTEMPT, REPO (owner/name), TREE (40 hex), WORKFLOW_FILE,
#      GH_TOKEN; GITHUB_OUTPUT. Test hook: CI_REUSE_GH (gh binary).
# Output: image=<digest ref or empty>, run=<run id or empty>.
set -Euo pipefail

GH="${CI_REUSE_GH:-gh}"
OUT="${GITHUB_OUTPUT:-/dev/stdout}"
WORKFLOW_PATH=".github/workflows/${WORKFLOW_FILE:-ci-deploy.yml}"
REF_RE='^ghcr\.io/[a-z0-9-]+/petprep-website@sha256:[0-9a-f]{64}$'

log() { echo "ci-reuse-image: $*" >&2; }
emit() { printf 'image=%s\nrun=%s\n' "$1" "$2" >> "$OUT"; exit 0; }

case "${EVENT_NAME:-}" in push|workflow_dispatch) ;; *) log "event ${EVENT_NAME:-?}: build"; emit "" "" ;; esac
[ "${GIT_REF:-}" = "refs/heads/main" ] || { log "not main: build"; emit "" ""; }
[ "${RUN_ATTEMPT:-1}" = 1 ] || { log "re-run: build"; emit "" ""; }
[[ "${TREE:-}" =~ ^[0-9a-f]{40}$ ]] || { log "no tree: build"; emit "" ""; }

ids="$("$GH" api "repos/${REPO}/actions/artifacts?name=web-green-${TREE}&per_page=30" \
      --jq '.artifacts[] | select(.expired | not) | select(.workflow_run.head_repository_id == .workflow_run.repository_id) | "\(.workflow_run.id) \(.archive_download_url)"' \
      2>/dev/null)" || { log "artifact lookup failed: build"; emit "" ""; }

dir="$(mktemp -d)"
trap 'rm -rf "$dir"' EXIT
while read -r id url; do
  [[ "${id:-}" =~ ^[0-9]+$ ]] || continue
  ok="$("$GH" api "repos/${REPO}/actions/runs/${id}" \
        --jq 'select((.event == "pull_request" or .event == "push" or .event == "workflow_dispatch") and .status == "completed" and .conclusion == "success" and ((.path // "") | split("@")[0]) == "'"${WORKFLOW_PATH}"'") | .id' \
        2>/dev/null)" || continue
  [ "$ok" = "$id" ] || { log "run ${id} not a successful run of this workflow"; continue; }
  rm -rf "${dir:?}"/*
  if ! "$GH" api "$url" > "${dir}/m.zip" 2>/dev/null || ! unzip -q -o "${dir}/m.zip" -d "$dir" 2>/dev/null \
     || [ ! -f "${dir}/web-green.txt" ]; then
    log "marker of run ${id} unreadable"; continue
  fi
  mtree="$(head -n1 "${dir}/web-green.txt" | cut -d' ' -f1)"
  image="$(sed -n 's/^image=//p' "${dir}/web-green.txt" | head -n1)"
  [ "$mtree" = "$TREE" ] || { log "marker of run ${id} names tree ${mtree}"; continue; }
  [[ "$image" =~ $REF_RE ]] || { log "marker of run ${id} has no valid image digest"; continue; }
  # QA #210 m4: the version may have been pruned (newest 40 kept) while the marker lives 14 days.
  if ! "$GH" api "orgs/${REPO%%/*}/packages/container/petprep-website/versions?per_page=100" --jq '.[].name' 2>/dev/null \
       | grep -qx "${image#*@}"; then
    log "digest of run ${id} is no longer in GHCR (or the lookup failed)"; continue
  fi
  log "tree ${TREE} already built and tested in run ${id}: deploying ${image}"
  emit "$image" "$id"
done <<< "$ids"
log "no green run for tree ${TREE}: build"
emit "" ""
