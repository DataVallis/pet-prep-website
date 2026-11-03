#!/usr/bin/env bash
# Harness for deploy/ci-reuse-image.sh — no GitHub, no network.
# A `gh` shim answers from fixtures and runs the REAL jq filters of the script:
#   …/actions/artifacts?name=…   → $FIX/artifacts.json
#   …/actions/runs/<id>          → $FIX/run-<id>.json (missing → error)
#   https://zip/<name>           → $FIX/<name>.zip (raw marker archive)
# GH_FAIL_MATCH (ERE over the path) makes matching calls fail.
# Run: bash deploy/tests/ci-reuse-image.test.sh   (needs bash, jq, python3)
set -Eeuo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="${HERE}/../ci-reuse-image.sh"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
FIX="$TMP/fix"; mkdir -p "$FIX" "$TMP/bin"
WF=".github/workflows/ci-deploy.yml"
TREE="$(printf 'a%.0s' $(seq 40))"
OTHER="$(printf 'b%.0s' $(seq 40))"
IMG="ghcr.io/datavallis/petprep-website@sha256:$(printf 'c%.0s' $(seq 64))"

cat > "$TMP/bin/gh" <<'SHIM'
#!/usr/bin/env bash
set -euo pipefail
[ "$1" = api ] || exit 64
path="$2"; shift 2
filter="."
while [ $# -gt 0 ]; do case "$1" in --jq) filter="$2"; shift 2 ;; *) shift ;; esac; done
echo "$path" >> "$FIX/gh.log"
if [ -n "${GH_FAIL_MATCH:-}" ] && [[ "$path" =~ $GH_FAIL_MATCH ]]; then exit 1; fi
case "$path" in
  https://zip/*) cat "$FIX/${path##*/}.zip"; exit 0 ;;
  */actions/artifacts\?name=*) file="$FIX/artifacts.json" ;;
  */actions/runs/*) file="$FIX/run-${path##*/}.json"; [ -f "$file" ] || exit 1 ;;
  *) exit 64 ;;
esac
jq -r "$filter" "$file"
SHIM
chmod +x "$TMP/bin/gh"

pass=0 fail=0
check() { if [ "$2" = "$3" ]; then pass=$((pass + 1)); else fail=$((fail + 1)); echo "  FAIL: $1 — expected '$2', got '$3'"; fi; }

reset() {
  rm -rf "${FIX:?}"/*; : > "$FIX/gh.log"
  jq -n '{artifacts:[{expired:false,archive_download_url:"https://zip/m77",workflow_run:{id:77,repository_id:1,head_repository_id:1}}]}' > "$FIX/artifacts.json"
  run 77 pull_request success
  marker m77 "$TREE 77
image=$IMG
"
}
run() { # run ID EVENT CONCLUSION [PATH]
  jq -n --argjson id "$1" --arg e "$2" --arg c "$3" --arg p "${4:-$WF}" \
    '{id:$id,event:$e,status:"completed",conclusion:$c,path:$p}' > "$FIX/run-$1.json"
}
marker() { # marker NAME CONTENT
  mkdir -p "$FIX/src-$1"; printf '%s' "$2" > "$FIX/src-$1/web-green.txt"
  python3 - "$FIX/$1.zip" "$FIX/src-$1/web-green.txt" <<'PY'
import sys, zipfile
with zipfile.ZipFile(sys.argv[1], 'w') as z: z.write(sys.argv[2], 'web-green.txt')
PY
}
reuse() { # reuse EVENT REF [ATTEMPT] [TREE] → "image|run|rc"
  local out="$TMP/out" rc=0
  : > "$out"
  PATH="$TMP/bin:$PATH" FIX="$FIX" EVENT_NAME="$1" GIT_REF="$2" RUN_ATTEMPT="${3:-1}" REPO=DataVallis/pet-prep-website \
    TREE="${4:-$TREE}" WORKFLOW_FILE=ci-deploy.yml GITHUB_OUTPUT="$out" bash "$SCRIPT" 2>"$TMP/err" || rc=$?
  echo "$(sed -n 's/^image=//p' "$out")|$(sed -n 's/^run=//p' "$out")|$rc"
}

reset; check "push to main, green PR run on the tree → its digest" "$IMG|77|0" "$(reuse push refs/heads/main)"
reset; check "Run workflow on main → its digest" "$IMG|77|0" "$(reuse workflow_dispatch refs/heads/main)"
reset; run 77 push success; check "earlier green main run → its digest" "$IMG|77|0" "$(reuse push refs/heads/main)"
reset; check "pull_request → build" "||0" "$(reuse pull_request refs/pull/3/merge)"
reset; check "… and no API call" "0" "$(wc -l < "$FIX/gh.log" | tr -d ' ')"
reset; check "push outside main → build" "||0" "$(reuse push refs/heads/feature)"
reset; check "re-run → build" "||0" "$(reuse push refs/heads/main 2)"
reset; check "no tree → build" "||0" "$(reuse push refs/heads/main 1 nope)"
reset; run 77 pull_request failure; check "failed run → build" "||0" "$(reuse push refs/heads/main)"
reset; jq '.status = "in_progress" | .conclusion = null' "$FIX/run-77.json" > "$FIX/r" && mv "$FIX/r" "$FIX/run-77.json"
check "run still in progress → build" "||0" "$(reuse push refs/heads/main)"
reset; run 77 pull_request success ".github/workflows/registry-sync.yml"; check "another workflow → build" "||0" "$(reuse push refs/heads/main)"
reset; run 77 pull_request success "$WF@refs/pull/3/merge"; check "path with @ref accepted" "$IMG|77|0" "$(reuse push refs/heads/main)"
reset; jq '.artifacts[0].workflow_run.head_repository_id = 2' "$FIX/artifacts.json" > "$FIX/a" && mv "$FIX/a" "$FIX/artifacts.json"
check "fork run → build" "||0" "$(reuse push refs/heads/main)"
reset; jq '.artifacts[0].expired = true' "$FIX/artifacts.json" > "$FIX/a" && mv "$FIX/a" "$FIX/artifacts.json"
check "expired marker → build" "||0" "$(reuse push refs/heads/main)"
reset; marker m77 "$OTHER 77
image=$IMG
"; check "marker names another tree → build" "||0" "$(reuse push refs/heads/main)"
reset; marker m77 "$TREE 77
image=ghcr.io/datavallis/petprep-website:t-1
"; check "a tag instead of a digest → build" "||0" "$(reuse push refs/heads/main)"
reset; marker m77 "$TREE 77
image=ghcr.io/datavallis/petprep-app@sha256:$(printf 'c%.0s' $(seq 64))
"; check "another image → build" "||0" "$(reuse push refs/heads/main)"
reset; marker m77 "$TREE 77
"; check "no image line → build" "||0" "$(reuse push refs/heads/main)"
reset; check "artifact API error → build, exit 0" "||0" "$(GH_FAIL_MATCH='artifacts' reuse push refs/heads/main)"
reset; check "run API error → build" "||0" "$(GH_FAIL_MATCH='runs/77' reuse push refs/heads/main)"
reset; check "download error → build" "||0" "$(GH_FAIL_MATCH='^https://zip/' reuse push refs/heads/main)"
reset; jq '.artifacts = [{expired:false,archive_download_url:"https://zip/m78",workflow_run:{id:78,repository_id:1,head_repository_id:1}}] + .artifacts' "$FIX/artifacts.json" > "$FIX/a" && mv "$FIX/a" "$FIX/artifacts.json"
run 78 push failure; check "first marker from a failed run, second green → the green one" "$IMG|77|0" "$(reuse push refs/heads/main)"
reset; jq '.artifacts[0].workflow_run.id = "77;id"' "$FIX/artifacts.json" > "$FIX/a" && mv "$FIX/a" "$FIX/artifacts.json"
check "non-numeric run id → build" "||0" "$(reuse push refs/heads/main)"

echo "ci-reuse-image harness: ${pass} passed, ${fail} failed"
[ "$fail" = 0 ]
