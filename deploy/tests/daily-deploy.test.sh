#!/usr/bin/env bash
# Harness for deploy/daily-deploy.sh — no GitHub, no network.
# A `gh` shim answers from fixtures and runs the REAL jq filters of the script:
#   repos/R/branches/main                     → next line of $FIX/heads (the last line repeats)
#   repos/R/deployments?…                     → $FIX/deployments.json
#   repos/R/deployments/<id>/statuses?…       → $FIX/status-<id>.json
#   …/workflows/ci-deploy.yml/runs?branch=main&head_sha=… → $FIX/runs.json
#   …/workflows/ci-deploy.yml/runs?event=workflow_dispatch… → $FIX/dispatched.json
#   gh workflow run …                         → logged as "DISPATCH …" in $FIX/gh.log
# The sleep shim copies $FIX/runs-after.json over runs.json (CI finishing during the wait).
# GH_FAIL_MATCH (ERE over the path) makes matching calls fail.
# Run: bash deploy/tests/daily-deploy.test.sh   (needs bash, jq, GNU date)
set -Eeuo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="${HERE}/../daily-deploy.sh"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
FIX="$TMP/fix"; mkdir -p "$FIX" "$TMP/bin"
REPO=DataVallis/pet-prep-website
HEAD="$(printf 'a%.0s' $(seq 40))"
OLD="$(printf 'b%.0s' $(seq 40))"
NEWER="$(printf 'c%.0s' $(seq 40))"

cat > "$TMP/bin/gh" <<'SHIM'
#!/usr/bin/env bash
set -euo pipefail
if [ "$1" = workflow ]; then echo "DISPATCH $*" >> "$FIX/gh.log"; exit 0; fi
[ "$1" = api ] || exit 64
path="$2"; shift 2
filter="."
while [ $# -gt 0 ]; do case "$1" in --jq) filter="$2"; shift 2 ;; *) shift ;; esac; done
echo "$path" >> "$FIX/gh.log"
if [ -n "${GH_FAIL_MATCH:-}" ] && [[ "$path" =~ $GH_FAIL_MATCH ]]; then exit 1; fi
case "$path" in
  */branches/main)
    sha="$(head -n1 "$FIX/heads")"
    [ "$(wc -l < "$FIX/heads")" -gt 1 ] && sed -i '1d' "$FIX/heads"
    jq -n --arg s "$sha" '{commit:{sha:$s}}' | jq -r "$filter"; exit 0 ;;
  */deployments/*/statuses*) id="${path#*/deployments/}"; file="$FIX/status-${id%%/*}.json" ;;
  */deployments\?*) file="$FIX/deployments.json" ;;
  */runs\?branch=main\&head_sha=*) file="$FIX/runs.json" ;;
  */runs\?event=workflow_dispatch*) file="$FIX/dispatched.json" ;;
  *) exit 64 ;;
esac
[ -f "$file" ] || exit 1
jq -r "$filter" "$file"
SHIM
cat > "$TMP/bin/sleep" <<'SHIM'
#!/usr/bin/env bash
echo "SLEEP $1" >> "$FIX/gh.log"
if [ -f "$FIX/runs-after.json" ]; then cp "$FIX/runs-after.json" "$FIX/runs.json"; fi
SHIM
chmod +x "$TMP/bin/gh" "$TMP/bin/sleep"

pass=0 fail=0
check() { if [ "$2" = "$3" ]; then pass=$((pass + 1)); else fail=$((fail + 1)); echo "  FAIL: $1 — expected '$2', got '$3'"; fi; }

runs() { # runs FILE "event status conclusion [sha]"… → workflow_runs fixture
  local file="$1"; shift
  local items="[]" i=0 e s c sha
  for r in "$@"; do
    read -r e s c sha <<< "$r"
    i=$((i + 1))
    items="$(jq --arg e "$e" --arg s "$s" --arg c "$c" --arg h "${sha:-$HEAD}" --argjson i "$i" --arg r "$REPO" \
      '. + [{id:$i,event:$e,status:$s,conclusion:(if $c == "null" then null else $c end),head_sha:$h,
             created_at:("2026-11-04T0\($i):00:00Z"),html_url:("https://run/\($i)"),head_repository:{full_name:$r}}]' <<< "$items")"
  done
  jq -n --argjson w "$items" '{workflow_runs:$w}' > "$file"
}
reset() {
  rm -rf "${FIX:?}"/*; : > "$FIX/gh.log"; : > "$TMP/summary"
  echo "$HEAD" > "$FIX/heads"
  jq -n --arg o "$OLD" '[{id:12,sha:$o},{id:11,sha:"x"}]' > "$FIX/deployments.json"
  echo '[{"state":"success"}]' > "$FIX/status-12.json"
  echo '[{"state":"inactive"}]' > "$FIX/status-11.json"
  runs "$FIX/runs.json" "push completed success"
  jq -n '{workflow_runs:[{event:"workflow_dispatch",created_at:"2999-01-01T00:00:00Z",html_url:"https://run/new"}]}' > "$FIX/dispatched.json"
}
daily() { # daily EVENT [SCHEDULE] [NOW] [DRY] → exit code; output in $TMP/out
  local rc=0
  PATH="$TMP/bin:$PATH" FIX="$FIX" DAILY_DEPLOY_GH="$TMP/bin/gh" DAILY_DEPLOY_SLEEP="$TMP/bin/sleep" \
    EVENT_NAME="$1" SCHEDULE="${2:-}" DAILY_DEPLOY_NOW="${3:-now}" DRY_RUN="${4:-false}" REPO="$REPO" \
    WAIT_SECONDS=180 POLL_SECONDS=60 MISSING_GRACE_SECONDS=120 GITHUB_STEP_SUMMARY="$TMP/summary" \
    bash "$SCRIPT" > "$TMP/out" 2>&1 || rc=$?
  echo "$rc"
}
dispatched() { grep -c '^DISPATCH workflow run ci-deploy.yml --repo DataVallis/pet-prep-website --ref main -f target=production$' "$FIX/gh.log" || true; }
sleeps() { grep -c '^SLEEP ' "$FIX/gh.log" || true; }

# --- a. local hour (CEST in July: 01:47 UTC = 03:47; CET in November: 02:47 UTC = 03:47) ---
reset; check "CEST, cron 47 1 → deploys" "0 1" "$(daily schedule '47 1 * * *' '2026-07-01 01:50 UTC') $(dispatched)"
reset; check "CEST, cron 47 2 → skips" "0 0" "$(daily schedule '47 2 * * *' '2026-07-01 02:50 UTC') $(dispatched)"
reset; check "CET, cron 47 2 → deploys" "0 1" "$(daily schedule '47 2 * * *' '2026-11-05 02:50 UTC') $(dispatched)"
reset; check "CET, cron 47 1 → skips" "0 0" "$(daily schedule '47 1 * * *' '2026-11-05 01:50 UTC') $(dispatched)"
reset; check "CET, cron 47 2 started 5 h late → still deploys" "0 1" "$(daily schedule '47 2 * * *' '2026-11-05 07:55 UTC') $(dispatched)"
reset; check "schedule without cron string at 03:xx local → deploys" "0 1" "$(daily schedule '' '2026-11-05 02:10 UTC') $(dispatched)"
reset; check "schedule without cron string at 09:xx local → skips" "0 0" "$(daily schedule '' '2026-11-05 08:10 UTC') $(dispatched)"
reset; check "bad cron → error" "1 0" "$(daily schedule 'x y * * *' '2026-11-05 02:50 UTC') $(dispatched)"

# --- b. what the site runs ------------------------------------------------------------------
reset; check "manual run, head new, CI green → deploys" "0 1" "$(daily workflow_dispatch) $(dispatched)"
reset; check "dry run → decides, no dispatch" "0 0" "$(daily workflow_dispatch '' now true) $(dispatched)"
check "… says so" 1 "$(grep -c 'dry run — would deploy aaaaaaa' "$TMP/out")"
reset; jq -n --arg h "$HEAD" '[{id:12,sha:$h}]' > "$FIX/deployments.json"
check "head already deployed → nothing" "0 0" "$(daily workflow_dispatch) $(dispatched)"
reset; jq -n --arg h "$HEAD" --arg o "$OLD" '[{id:13,sha:$h},{id:12,sha:$o}]' > "$FIX/deployments.json"
echo '[{"state":"failure"}]' > "$FIX/status-13.json"
check "last deployment of head failed → the one before counts, deploys" "0 1" "$(daily workflow_dispatch) $(dispatched)"
reset; echo '[]' > "$FIX/deployments.json"
check "no deployment yet → deploys" "0 1" "$(daily workflow_dispatch) $(dispatched)"
reset; check "deployments API error → no deploy" "1 0" "$(GH_FAIL_MATCH='deployments' daily workflow_dispatch) $(dispatched)"
reset; check "branch API error → no deploy" "1 0" "$(GH_FAIL_MATCH='branches' daily workflow_dispatch) $(dispatched)"

# --- c. CI on the head ----------------------------------------------------------------------
reset; runs "$FIX/runs.json" "workflow_dispatch completed success"
check "sync commit: CI-only dispatch green → deploys" "0 1" "$(daily workflow_dispatch) $(dispatched)"
reset; runs "$FIX/runs.json" "push completed failure"
check "CI red → refuses" "1 0" "$(daily workflow_dispatch) $(dispatched)"
check "… names the run" 1 "$(grep -c "concluded 'failure' — run https://run/1" "$TMP/out")"
reset; runs "$FIX/runs.json" "push completed failure" "workflow_dispatch completed success"
check "one red, a later green on the same sha → deploys" "0 1" "$(daily workflow_dispatch) $(dispatched)"
reset; runs "$FIX/runs.json" "push completed cancelled"
check "only a cancelled run → refuses" "1 0" "$(daily workflow_dispatch) $(dispatched)"
reset; runs "$FIX/runs.json" "pull_request completed success"
check "only a PR run → none → refuses after the grace" "1 0" "$(daily workflow_dispatch) $(dispatched)"
reset; runs "$FIX/runs.json" "push completed success $OLD"
check "green run of another sha does not count" "1 0" "$(daily workflow_dispatch) $(dispatched)"
reset; runs "$FIX/runs.json" "push in_progress null"; runs "$FIX/runs-after.json" "push completed success"
check "CI running, then green → waits, deploys" "0 1 1" "$(daily workflow_dispatch) $(dispatched) $(sleeps)"
reset; runs "$FIX/runs.json" "push in_progress null"
check "CI still running after WAIT_SECONDS → refuses" "1 0 3" "$(daily workflow_dispatch) $(dispatched) $(sleeps)"
reset; runs "$FIX/runs.json"; runs "$FIX/runs-after.json" "push completed success"
check "run not created yet, appears → deploys" "0 1" "$(daily workflow_dispatch) $(dispatched)"
reset; runs "$FIX/runs.json"
check "no run within the grace → refuses" "1 0 2" "$(daily workflow_dispatch) $(dispatched) $(sleeps)"
reset; check "runs API error → no deploy" "1 0" "$(GH_FAIL_MATCH='head_sha' daily workflow_dispatch) $(dispatched)"
reset; printf '%s\n%s\n' "$HEAD" "$NEWER" > "$FIX/heads"
runs "$FIX/runs.json" "push completed success" "push completed success $NEWER"
check "main moved while checking → checks the new head, deploys" "0 1" "$(daily workflow_dispatch) $(dispatched)"
check "… summary names the new head" 1 "$(grep -c "main head \`${NEWER}\`" "$TMP/summary")"

# --- d. dispatch ----------------------------------------------------------------------------
reset; daily workflow_dispatch > /dev/null
check "dispatched run is reported" 1 "$(grep -c 'https://run/new' "$TMP/summary")"

echo "daily-deploy harness: ${pass} passed, ${fail} failed"
[ "$fail" = 0 ]
