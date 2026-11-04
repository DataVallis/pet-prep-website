#!/usr/bin/env bash
# Harness for deploy/deploy.sh — disk preflight and old-image prune (incident 2026-11-04).
# No server, no Docker: `docker`, `df` and `curl` shims answer from state files in $FIX:
#   images.tsv     one image name per line: repo<TAB>tag<TAB>digest<TAB>id (like `docker image ls`)
#   containers     one container per line: <container id> <image id>
#   free_kb        free KiB that `df` reports; free_kb_after_cache_drop replaces it after
#                  `docker builder prune -af` (no --keep-storage); missing file → df fails
#   docker.log     every docker call
# DOCKER_FAIL_MATCH (ERE over the joined arguments) makes matching docker calls fail.
# Run: bash deploy/tests/deploy.test.sh   (needs bash, awk, grep)
set -Eeuo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="${HERE}/../deploy.sh"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
FIX="$TMP/fix"; SRC="$TMP/src"; ROOT="$TMP/root"
mkdir -p "$FIX" "$TMP/bin" "$SRC/deploy" "$ROOT" "$TMP/dockerroot"
touch "$SRC/Dockerfile" "$SRC/deploy/compose.yaml"

hex() { printf "$1%.0s" $(seq "$2"); }
TREE="$(hex a 40)"
NEW_DIGEST="sha256:$(hex 1 64)"
GHCR="ghcr.io/datavallis/petprep-website"
NEW_REF="${GHCR}@${NEW_DIGEST}"
ID_NEW="sha256:$(hex e 64)"   # the image the deploy pulls
ID_PROD="sha256:$(hex d 64)"  # live before the deploy
ID_PREV="sha256:$(hex c 64)"  # :previous before the deploy
ID_OLD1="sha256:$(hex b 64)"  # old pulled releases (only a ghcr digest name)
ID_OLD2="sha256:$(hex a 64)"
ID_USED="sha256:$(hex 9 64)"  # old website image a stopped container still uses
ID_APP="sha256:$(hex 8 64)"   # API images / others — never touched
ID_PG="sha256:$(hex 7 64)"

cat > "$TMP/bin/docker" <<'SHIM'
#!/usr/bin/env bash
set -euo pipefail
echo "$*" >> "$FIX/docker.log"
if [ -n "${DOCKER_FAIL_MATCH:-}" ] && [[ "$*" =~ $DOCKER_FAIL_MATCH ]]; then exit 1; fi
IMAGES="$FIX/images.tsv"
id_of() { # id_of REF → image id of repo:tag / repo@digest / bare id
  awk -F'\t' -v r="$1" '($1":"$2)==r || ($1"@"$3)==r || $4==r {print $4; exit}' "$IMAGES"
}
case "$1" in
  network) exit 0 ;;
  info) echo "$FIX/../dockerroot" ;;
  ps) awk '{print $1}' "$FIX/containers" ;;
  inspect)
    if [ "$2" = -f ]; then echo healthy; exit 0; fi   # health status of petprep-website
    shift 3
    for c in "$@"; do awk -v c="$c" '$1==c {print $2}' "$FIX/containers"; done ;;
  image)
    case "$2" in
      ls) cat "$IMAGES" ;;
      rm)
        [ -n "$(id_of "$3")" ] || exit 1
        awk -F'\t' -v r="$3" '!(($1":"$2)==r || ($1"@"$3)==r)' "$IMAGES" > "$IMAGES.n" && mv "$IMAGES.n" "$IMAGES" ;;
      inspect)
        if [ "$3" = -f ]; then echo "$EXPECT_TREE_LABEL"; exit 0; fi
        [ -n "$(id_of "$3")" ] ;;
      prune) exit 0 ;;
      *) exit 64 ;;
    esac ;;
  pull)
    ref="${*: -1}"
    printf '%s\t<none>\t%s\t%s\n' "${ref%@*}" "${ref#*@}" "$PULL_ID" >> "$IMAGES" ;;
  tag)
    id="$(id_of "$2")"; [ -n "$id" ] || exit 1
    repo="${3%:*}"; tag="${3##*:}"
    awk -F'\t' -v r="$repo" -v t="$tag" '!($1==r && $2==t)' "$IMAGES" > "$IMAGES.n" && mv "$IMAGES.n" "$IMAGES"
    printf '%s\t%s\t<none>\t%s\n' "$repo" "$tag" "$id" >> "$IMAGES" ;;
  builder)
    if [[ "$*" != *keep-storage* ]] && [ -f "$FIX/free_kb_after_cache_drop" ]; then
      cp "$FIX/free_kb_after_cache_drop" "$FIX/free_kb"
    fi ;;
  rm|run|exec|logs|rmi|compose|build|load) exit 0 ;;
  *) exit 64 ;;
esac
SHIM
cat > "$TMP/bin/df" <<'SHIM'
#!/usr/bin/env bash
[ -f "$FIX/free_kb" ] || exit 1
echo "Filesystem 1024-blocks Used Available Capacity Mounted on"
echo "/dev/sda1 39000000 1 $(cat "$FIX/free_kb") 50% /"
SHIM
printf '#!/usr/bin/env bash\nexit 0\n' > "$TMP/bin/curl"
chmod +x "$TMP/bin/docker" "$TMP/bin/df" "$TMP/bin/curl"

pass=0 fail=0
check() { if [ "$2" = "$3" ]; then pass=$((pass + 1)); else fail=$((fail + 1)); echo "  FAIL: $1 — expected '$2', got '$3'"; fi; }

GB=$((1024 * 1024))
reset() {
  rm -rf "${FIX:?}"/*; : > "$FIX/docker.log"
  echo $((20 * GB)) > "$FIX/free_kb"
  {
    printf 'petprep-website\tproduction\t<none>\t%s\n' "$ID_PROD"
    printf '%s\t<none>\tsha256:%s\t%s\n' "$GHCR" "$(hex d 64)" "$ID_PROD"
    printf 'petprep-website\tprevious\t<none>\t%s\n' "$ID_PREV"
    printf '%s\t<none>\tsha256:%s\t%s\n' "$GHCR" "$(hex c 64)" "$ID_PREV"
    printf '%s\t<none>\tsha256:%s\t%s\n' "$GHCR" "$(hex b 64)" "$ID_OLD1"
    printf '%s\t<none>\tsha256:%s\t%s\n' "$GHCR" "$(hex a 64)" "$ID_OLD2"
    printf 'petprep-website\tnext\t<none>\t%s\n' "$ID_OLD2"
    printf '%s\t<none>\tsha256:%s\t%s\n' "$GHCR" "$(hex 9 64)" "$ID_USED"
    printf 'petprep-website\t<none>\t<none>\t%s\n' "sha256:$(hex 6 64)"
    printf 'ghcr.io/datavallis/petprep-app\t<none>\tsha256:%s\t%s\n' "$(hex 8 64)" "$ID_APP"
    printf 'petprep-app\tproduction\t<none>\t%s\n' "$ID_APP"
    printf 'petprep-website-old\tx\t<none>\t%s\n' "$ID_APP"
    printf 'postgres\t18\t<none>\t%s\n' "$ID_PG"
  } > "$FIX/images.tsv"
  printf 'c1 %s\nc2 %s\nc3 %s\n' "$ID_PROD" "$ID_USED" "$ID_PG" > "$FIX/containers"
}
deploy() { # deploy [ENV=VAL…] → exit code; output in $TMP/out
  local rc=0
  env PATH="$TMP/bin:$PATH" FIX="$FIX" WEBSITE_ROOT="$ROOT" IMAGE_REF="$NEW_REF" EXPECT_TREE="$TREE" \
    EXPECT_TREE_LABEL="$TREE" PULL_ID="$ID_NEW" "$@" bash "$SCRIPT" "$SRC" "$(hex f 40)" > "$TMP/out" 2>&1 || rc=$?
  echo "$rc"
}
has() { grep -qxF -- "$1" "$FIX/images.tsv" && echo yes || echo no; }
ids_of() { awk -F'\t' -v i="$1" '$4==i' "$FIX/images.tsv" | wc -l | tr -d ' '; }
pulled() { grep -c '^pull ' "$FIX/docker.log" || true; }
tagged() { awk -F'\t' -v t="$1" '$1=="petprep-website" && $2==t {print $4}' "$FIX/images.tsv"; }

# --- 1. A normal deploy -------------------------------------------------------------------
reset; check "deploy succeeds" 0 "$(deploy)"
check "… pulls once" 1 "$(pulled)"
check "… :production is the new image" "$ID_NEW" "$(tagged production)"
check "… :previous is the old production" "$ID_PROD" "$(tagged previous)"
check "… the new ghcr digest name is kept" yes "$(has "$(printf '%s\t<none>\t%s\t%s' "$GHCR" "$NEW_DIGEST" "$ID_NEW")")"
check "… the old :previous is gone (all names)" 0 "$(ids_of "$ID_PREV")"
check "… old pulled releases are gone" "0 0" "$(ids_of "$ID_OLD1") $(ids_of "$ID_OLD2")"
check "… the stale :next of a failed deploy is gone" "$ID_NEW" "$(tagged next)"
check "… an image a stopped container uses is kept" 1 "$(ids_of "$ID_USED")"
check "… petprep-app / postgres / similar names untouched" "3 1" "$(ids_of "$ID_APP") $(ids_of "$ID_PG")"
check "… dangling left to image prune" 1 "$(ids_of "sha256:$(hex 6 64)")"
check "… never docker system prune / volume rm" 0 "$(grep -cE '^(system|volume) ' "$FIX/docker.log" || true)"
check "… prunes twice (preflight + after)" 2 "$(grep -c '^builder prune -af --keep-storage 1GB' "$FIX/docker.log")"
check "… preflight prune runs before the pull" 1 "$(awk '/^image rm /&&!r{r=NR} /^pull /{p=NR} END{print (r && r<p)?1:0}' "$FIX/docker.log")"
# Preflight: old 1, old 2 (digest) and its stale :next; after the deploy: the old :previous.
check "… preflight removed 3 names" 1 "$(grep -c 'Old website images: removed 3 name(s)' "$TMP/out")"
check "… after the deploy removed 1 name" 1 "$(grep -c 'Old website images: removed 1 name(s)' "$TMP/out")"

# --- 2. Disk preflight ----------------------------------------------------------------------
reset; echo $((3 * GB)) > "$FIX/free_kb"
check "3 GB free, still 3 after dropping the cache → refused" 1 "$(deploy)"
check "… nothing pulled" 0 "$(pulled)"
check "… whole build cache dropped once" 1 "$(grep -cx 'builder prune -af' "$FIX/docker.log")"
check "… :production unchanged" "$ID_PROD" "$(tagged production)"
check "… clear message" 1 "$(grep -c 'a website deploy needs at least 5 GB' "$TMP/out")"
reset; echo $((3 * GB)) > "$FIX/free_kb"; echo $((9 * GB)) > "$FIX/free_kb_after_cache_drop"
check "3 GB free, 9 after dropping the cache → deploys" 0 "$(deploy)"
check "… pulled" 1 "$(pulled)"
reset; echo $((3 * GB)) > "$FIX/free_kb"
check "DEPLOY_MIN_FREE_GB=2 → 3 GB is enough" 0 "$(deploy DEPLOY_MIN_FREE_GB=2)"
reset; echo 1 > "$FIX/free_kb"
check "DEPLOY_MIN_FREE_GB=0 → no check" 0 "$(deploy DEPLOY_MIN_FREE_GB=0)"
check "… but the prune still runs" 0 "$(ids_of "$ID_OLD1")"
reset
check "DEPLOY_MIN_FREE_GB=abc → refused" 1 "$(deploy DEPLOY_MIN_FREE_GB=abc)"
check "… nothing pulled or removed" "0 0" "$(pulled) $(grep -c '^image rm' "$FIX/docker.log" || true)"
reset; rm "$FIX/free_kb"
check "free space unmeasurable → warning, deploys" 0 "$(deploy)"
check "… warned" 1 "$(grep -c 'could not measure the free disk space' "$TMP/out")"

# --- 3. Fail safe ---------------------------------------------------------------------------
reset; check "docker ps fails → deploy continues" 0 "$(deploy DOCKER_FAIL_MATCH='^ps ')"
check "… nothing removed" 0 "$(grep -c '^image rm' "$FIX/docker.log" || true)"
reset; check "container inspect fails → deploy continues" 0 "$(deploy DOCKER_FAIL_MATCH='^inspect --format')"
check "… nothing removed" 0 "$(grep -c '^image rm' "$FIX/docker.log" || true)"
reset; check "image ls fails → deploy continues" 0 "$(deploy DOCKER_FAIL_MATCH='^image ls')"
check "… nothing removed" 0 "$(grep -c '^image rm' "$FIX/docker.log" || true)"
reset; check "image rm fails → warning, deploy continues" 0 "$(deploy DOCKER_FAIL_MATCH='^image rm ')"
check "… warned" 1 "$(grep -c 'old website image name(s) could not be removed' "$TMP/out" | head -1 | awk '{print ($1>0)?1:0}')"
reset; check "builder prune fails → deploy continues" 0 "$(deploy DOCKER_FAIL_MATCH='^builder ')"

# --- 4. A failed pull changes nothing (but the preflight prune already ran) ------------------
reset; check "pull fails → refused" 1 "$(deploy DOCKER_FAIL_MATCH='^pull ')"
check "… :production and :previous unchanged" "$ID_PROD $ID_PREV" "$(tagged production) $(tagged previous)"

echo "deploy.sh harness: ${pass} passed, ${fail} failed"
[ "$fail" = 0 ]
