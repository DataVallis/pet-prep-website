#!/usr/bin/env bash
# Daily website deploy (.github/workflows/daily-deploy.yml, incident 2026-11-04 + David:
# »načeloma ni treba deployat tako pogosto«). Mirrors pet-prep scripts/daily-deploy.sh.
#
# A push to main runs CI only. Every day at 03:47 Europe/Ljubljana (GitHub may start a scheduled
# run late): when main has commits that petprep.si does not run yet AND CI on the main head is
# green, start exactly what David starts by hand — "CI & Deploy" → Run workflow on main with
# target production. That run reuses the image CI built and tested for the tree (ci-reuse-image.sh)
# and deploys it; IndexNow follows.
#
#   a. schedule: GitHub cron is UTC only; the workflow fires at 01:47 and 02:47 UTC. Only the cron
#      whose hour is DEPLOY_LOCAL_HOUR (03) in Europe/Ljubljana today proceeds (01 UTC in CEST,
#      02 UTC in CET), the other exits 0. Judged by the cron string (SCHEDULE), so a late start
#      still counts; without SCHEDULE the current local hour must be 03.
#   b. what petprep.si runs: the sha of the newest GitHub deployment to the `production`
#      environment (the deploy job has `environment: production`) whose latest status is
#      success. main head == that sha → nothing new, exit 0. No such deployment → deploy.
#   c. CI on the main head: the runs of ci-deploy.yml for that sha on main (push = merge, or
#      workflow_dispatch = the sync jobs' CI-only dispatch, or an earlier Run workflow). One
#      completed with success → green. None finished yet / none created yet → wait (up to
#      WAIT_SECONDS, re-reading the head every poll; none created within MISSING_GRACE_SECONDS
#      counts as missing). All finished and none green, or still unfinished / missing after the
#      wait → no deploy, ::error + summary, exit 1 (the run turns red so it is noticed).
#   d. gh workflow run ci-deploy.yml --ref main -f target=production; the run goes to the summary.
#      A merge between the last head check and the dispatch makes that run deploy the newer
#      head — it reuses the tree's green image or builds + tests first (deploy needs green).
#   e. DRY_RUN=true: decide and print, dispatch nothing.
# Any GitHub API error → no deploy (exit 1).
#
# Env: EVENT_NAME (schedule | workflow_dispatch), SCHEDULE (github.event.schedule), DRY_RUN,
# REPO (owner/name), GH_TOKEN, GITHUB_STEP_SUMMARY (optional), WORKFLOW_FILE (ci-deploy.yml),
# ENVIRONMENT (production), WAIT_SECONDS (1800), POLL_SECONDS (60), MISSING_GRACE_SECONDS (300).
# Test hooks: DAILY_DEPLOY_GH (gh binary), DAILY_DEPLOY_NOW (date -d string), DAILY_DEPLOY_SLEEP.
# Harness: deploy/tests/daily-deploy.test.sh
set -Eeuo pipefail

EVENT_NAME="${EVENT_NAME:?EVENT_NAME is required}"
REPO="${REPO:?REPO is required}"
DRY_RUN="${DRY_RUN:-false}"
SCHEDULE="${SCHEDULE:-}"
WORKFLOW_FILE="${WORKFLOW_FILE:-ci-deploy.yml}"
ENVIRONMENT="${ENVIRONMENT:-production}"
WAIT_SECONDS="${WAIT_SECONDS:-1800}"
POLL_SECONDS="${POLL_SECONDS:-60}"
MISSING_GRACE_SECONDS="${MISSING_GRACE_SECONDS:-300}"
GH="${DAILY_DEPLOY_GH:-gh}"
SLEEP="${DAILY_DEPLOY_SLEEP:-sleep}"
NOW="${DAILY_DEPLOY_NOW:-now}"
SUMMARY="${GITHUB_STEP_SUMMARY:-/dev/null}"
LOCAL_TZ="Europe/Ljubljana"
DEPLOY_LOCAL_HOUR="03" # keep in sync with the crons in daily-deploy.yml (47 1 / 47 2 UTC)

log() { echo "daily-deploy: $*"; }
summary() { echo "$*" >> "$SUMMARY"; }
done_ok() {
  echo "::notice title=Daily website deploy::$1"
  summary "**No deploy:** $1"
  exit 0
}
refuse() {
  echo "::error title=Daily website deploy::$1"
  summary "**No deploy — CI on main is not green:** $1"
  exit 1
}
api_fail() {
  echo "::error title=Daily website deploy::GitHub API error while reading $1 — not deploying"
  summary "**No deploy:** GitHub API error while reading $1."
  exit 1
}

summary "### Daily website deploy"
summary ""
summary "event \`${EVENT_NAME}\` · dry run \`${DRY_RUN}\`${SCHEDULE:+ · cron \`${SCHEDULE}\`}"
summary ""

# --- a. 03:xx Europe/Ljubljana --------------------------------------------------------------
if [ "$EVENT_NAME" = schedule ]; then
  if [ -n "$SCHEDULE" ]; then
    read -r cron_min cron_hour _ <<< "$SCHEDULE"
    if ! [[ "$cron_min" =~ ^[0-9]+$ && "$cron_hour" =~ ^[0-9]+$ ]]; then
      echo "::error::unexpected cron '${SCHEDULE}'"; exit 1
    fi
    today_utc="$(date -u -d "$NOW" +%F)"
    local_hour="$(TZ="$LOCAL_TZ" date -d "${today_utc} $(printf '%02d:%02d' "$cron_hour" "$cron_min") UTC" +%H)"
    what="cron '${SCHEDULE}' (UTC) is ${local_hour}:$(printf '%02d' "$cron_min") in ${LOCAL_TZ} today"
  else
    local_hour="$(TZ="$LOCAL_TZ" date -d "$NOW" +%H)"
    what="it is ${local_hour}:xx in ${LOCAL_TZ}"
  fi
  if [ "$local_hour" != "$DEPLOY_LOCAL_HOUR" ]; then
    done_ok "${what}, not ${DEPLOY_LOCAL_HOUR} — the other daily cron deploys (CET / CEST)."
  fi
  log "$what"
fi

# --- helpers --------------------------------------------------------------------------------
main_head() {
  "$GH" api "repos/${REPO}/branches/main" --jq '.commit.sha' 2>/dev/null
}

# deployed_sha: sha of the newest deployment to ENVIRONMENT whose latest status is success
# (GitHub marks older ones inactive). Empty when none of the last 30; returns 1 on API error.
deployed_sha() {
  local list id sha state
  list="$("$GH" api "repos/${REPO}/deployments?environment=${ENVIRONMENT}&per_page=30" \
        --jq '.[] | "\(.id) \(.sha)"' 2>/dev/null)" || return 1
  while read -r id sha; do
    [[ "${id:-}" =~ ^[0-9]+$ ]] || continue
    state="$("$GH" api "repos/${REPO}/deployments/${id}/statuses?per_page=1" --jq '.[0].state // "none"' 2>/dev/null)" || return 1
    if [ "$state" = success ]; then
      echo "$sha"
      return 0
    fi
  done <<< "$list"
}

# ci_state SHA: "green <url>" when a run of the workflow for SHA on main (push or
# workflow_dispatch, same repository) succeeded; "running <url>" when none did but one is not
# finished; "red <conclusion> <url>" when all finished without success; "" when there is none.
# Returns 1 on API error.
ci_state() {
  "$GH" api "repos/${REPO}/actions/workflows/${WORKFLOW_FILE}/runs?branch=main&head_sha=$1&per_page=30" \
    --jq '[.workflow_runs[] | select(.head_sha == "'"$1"'")
            | select(.event == "push" or .event == "workflow_dispatch")
            | select(.head_repository.full_name == "'"${REPO}"'")] | sort_by(.created_at) | reverse
          | if length == 0 then ""
            elif any(.[]; .status == "completed" and .conclusion == "success")
              then "green \(map(select(.status == "completed" and .conclusion == "success"))[0].html_url)"
            elif any(.[]; .status != "completed")
              then "running \(map(select(.status != "completed"))[0].html_url)"
            else "red \(.[0].conclusion // "none") \(.[0].html_url)" end' 2>/dev/null
}

# --- b + c ----------------------------------------------------------------------------------
waited=0
while :; do
  if ! head="$(main_head)" || ! [[ "$head" =~ ^[0-9a-f]{40}$ ]]; then api_fail "the head of main"; fi
  deployed="$(deployed_sha)" || api_fail "the last production deployment"
  if [ "$head" = "$deployed" ]; then
    done_ok "nothing new — petprep.si already runs the main head ${head:0:7}."
  fi
  log "main head ${head:0:7}, petprep.si runs ${deployed:-unknown (no successful production deployment listed)}"

  ci="$(ci_state "$head")" || api_fail "the CI runs of ${head:0:7}"
  read -r verdict rest <<< "${ci:-}"
  case "${verdict:-}" in
    green)
      if ! now_head="$(main_head)" || [ -z "$now_head" ]; then api_fail "the head of main"; fi
      if [ "$now_head" = "$head" ]; then ci_url="$rest"; break; fi
      log "main moved to ${now_head:0:7} — checking its CI"
      continue ;;
    red)
      refuse "CI of main head ${head:0:7} concluded '${rest%% *}' — run ${rest#* }" ;;
    running)
      state="CI of main head ${head:0:7} is not finished — run ${rest}" ;;
    *)
      state="no CI run of ${WORKFLOW_FILE} for main head ${head:0:7}"
      [ "$waited" -lt "$MISSING_GRACE_SECONDS" ] || refuse "${state} (waited ${waited}s)." ;;
  esac
  if [ "$waited" -ge "$WAIT_SECONDS" ]; then
    refuse "${state}; gave up after ${waited}s."
  fi
  log "${state}; waiting ${POLL_SECONDS}s (${waited}s / ${WAIT_SECONDS}s)"
  "$SLEEP" "$POLL_SECONDS"
  waited=$((waited + POLL_SECONDS))
done
log "CI green: ${ci_url}"
summary "- main head \`${head}\` · petprep.si runs \`${deployed:-unknown}\`"
summary "- CI green: ${ci_url}"

# --- d / e. dispatch -----------------------------------------------------------------------
if [ "$DRY_RUN" = true ]; then
  msg="dry run — would deploy ${head:0:7} (Run workflow on main, target production)."
  echo "::notice title=Daily website deploy::${msg}"
  summary "**Decision:** ${msg}"
  exit 0
fi

started="$(date -u -d "-30 seconds" +%Y-%m-%dT%H:%M:%SZ)" # tolerate clock skew
"$GH" workflow run "$WORKFLOW_FILE" --repo "$REPO" --ref main -f target=production
log "dispatched ${WORKFLOW_FILE} on main (target production) for ${head:0:7}"

run_url=""
for _ in 1 2 3 4 5 6; do
  run_url="$("$GH" api "repos/${REPO}/actions/workflows/${WORKFLOW_FILE}/runs?event=workflow_dispatch&branch=main&per_page=10" \
        --jq '[.workflow_runs[] | select(.event == "workflow_dispatch" and .created_at >= "'"${started}"'")] | .[0] // empty | .html_url' \
        2>/dev/null)" || run_url=""
  [ -n "$run_url" ] && break
  "$SLEEP" 5
done
echo "::notice title=Daily website deploy::dispatched the production deploy of ${head:0:7}: ${run_url:-run not listed yet — see Actions → CI & Deploy}"
summary "**Dispatched:** production deploy of \`${head:0:7}\` — ${run_url:-run not listed yet, see Actions → CI & Deploy}"
