#!/usr/bin/env bash
# Harness for deploy/deploy.sh — disk preflight and old-image prune (incidents 2026-11-04 / -05).
# No server, no Docker: `docker`, `df` and `curl` shims answer from state files in $FIX.
# The docker shim behaves like the production host (Docker with the containerd image store):
# a digest-pulled image is listed as `ghcr.io/datavallis/petprep-website` tag `<none>`, its only
# reference being `…@sha256:<digest>`; `docker image ls` renders whatever --format it is given
# (12-hex ids without `sha256:` unless --no-trunc), so
#   docker image ls --format '{{.Repository}}:{{.Tag}} {{.ID}} {{.CreatedSince}} {{.Size}}'
# prints exactly what the server printed on 2026-11-05 (`ghcr.io/…:<none> 233f540489d4 30 hours ago 2.85GB`).
#   images.tsv     one name per line: full id<TAB>repository<TAB>tag<TAB>digest
#   containers     one container per line: <container id> <image as `docker ps` prints it: name or short id>
#   free_kb        free KiB that `df` reports; free_kb_after_cache_drop replaces it after
#                  `docker builder prune -af` (no --keep-storage); missing file → df fails
#   docker.log     every docker call
# STUB_NO_DIGEST=1 renders {{.Digest}} as <none> (containerd store without --digests).
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
# full_id <12-hex short id> <pad char> → sha256:<64 hex> starting with that short id
full_id() { printf 'sha256:%s%s' "$1" "$(hex "$2" 52)"; }
TREE="$(hex a 40)"
GHCR="ghcr.io/datavallis/petprep-website"
NEW_DIGEST="sha256:$(hex 1 64)"
NEW_REF="${GHCR}@${NEW_DIGEST}"
ID_NEW="$(full_id f00dfeed0001 0)"   # the image this deploy pulls
# The server on 2026-11-05 (ids as printed there): :production = :next, :previous …
ID_PROD="$(full_id e374e63eb021 0)"
ID_PREV="$(full_id 33df91cfc852 0)"
# … and 8 old digest-pulled releases, listed only as ghcr.io/…:<none> — the old prune removed 0.
OLD_SHORT=(233f540489d4 2a1b3c4d5e6f 3b2c4d5e6f70 4c3d5e6f7081 5d4e6f708192 6e5f708192a3 7f608192a3b4 80718293a4b5)
OLD_IDS=(); for s in "${OLD_SHORT[@]}"; do OLD_IDS+=("$(full_id "$s" 0)"); done
ID_USED="$(full_id 9a9a9a9a9a9a 0)"  # old website image a stopped container still uses (ps prints its short id)
ID_TWO="$(full_id b0b0b0b0b0b0 0)"   # old website image with two names → docker refuses rm by id
ID_APP="$(full_id a99a99a99a99 0)"   # API images — never touched
ID_WEB="$(full_id a88a88a88a88 0)"
ID_PG="$(full_id 777777777777 0)"
ID_MIRROR="$(full_id c1c1c1c1c1c1 0)" # a website digest that also has a name in another repository

cat > "$TMP/bin/docker" <<'SHIM'
#!/usr/bin/env bash
set -euo pipefail
echo "$*" >> "$FIX/docker.log"
if [ -n "${DOCKER_FAIL_MATCH:-}" ] && [[ "$*" =~ $DOCKER_FAIL_MATCH ]]; then exit 1; fi
IMAGES="$FIX/images.tsv"
id_of() { # id_of REF → full id of repo:tag / repo@digest / full or short id (with or without sha256:)
  local r="${1#sha256:}"
  awk -F'\t' -v ref="$1" -v r="$r" '
    ($2":"$3)==ref || ($2"@"$4)==ref || $1==ref || (length(r)>=12 && index(substr($1,8), r)==1) {print $1; exit}' "$IMAGES"
}
case "$1" in
  network) exit 0 ;;
  info) echo "$FIX/../dockerroot" ;;
  ps) awk '{print $2}' "$FIX/containers" ;;   # ps -a --format '{{.Image}}'
  inspect) echo healthy ;;                    # health status of petprep-website
  image)
    case "$2" in
      ls)
        shift 2; fmt='{{.Repository}}\t{{.Tag}}\t{{.ID}}'; trunc=1
        while [ $# -gt 0 ]; do
          case "$1" in --no-trunc) trunc=0 ;; --format) fmt="$2"; shift ;; *) exit 64 ;; esac; shift
        done
        awk -F'\t' -v fmt="$fmt" -v trunc="$trunc" -v nodig="${STUB_NO_DIGEST:-}" '{
          id=$1; if (trunc) id=substr($1, 8, 12)
          o=fmt; gsub(/\\t/, "\t", o)
          gsub(/\{\{\.ID\}\}/, id, o); gsub(/\{\{\.Repository\}\}/, $2, o); gsub(/\{\{\.Tag\}\}/, $3, o)
          gsub(/\{\{\.Digest\}\}/, (nodig ? "<none>" : $4), o); gsub(/\{\{\.CreatedSince\}\}/, "30 hours ago", o)
          gsub(/\{\{\.CreatedAt\}\}/, "2026-11-04 01:47:00 +0100 CET", o); gsub(/\{\{\.Size\}\}/, "2.85GB", o)
          print o }' "$IMAGES" ;;
      rm)
        [ "$3" != -f ] || exit 65                       # the prune must never force
        id="$(id_of "$3")"; [ -n "$id" ] || exit 1
        # like docker without -f: refuse an image a container uses or one with several names
        while read -r _ img; do [ "$(id_of "$img")" != "$id" ] || exit 1; done < "$FIX/containers"
        [ "$(awk -F'\t' -v i="$id" '$1==i' "$IMAGES" | wc -l)" -eq 1 ] || exit 1
        awk -F'\t' -v i="$id" '$1!=i' "$IMAGES" > "$IMAGES.n" && mv "$IMAGES.n" "$IMAGES" ;;
      inspect)
        if [ "$3" = -f ]; then echo "$EXPECT_TREE_LABEL"; exit 0; fi
        ref="${*: -1}"; id="$(id_of "$ref")"; [ -n "$id" ] || exit 1
        if [ "$3" = --format ]; then echo "$id"; fi ;;
      prune) exit 0 ;;
      *) exit 64 ;;
    esac ;;
  pull)
    ref="${*: -1}"
    printf '%s\t%s\t<none>\t%s\n' "$PULL_ID" "${ref%@*}" "${ref#*@}" >> "$IMAGES" ;;
  tag)
    id="$(id_of "$2")"; [ -n "$id" ] || exit 1
    repo="${3%:*}"; tag="${3##*:}"
    awk -F'\t' -v r="$repo" -v t="$tag" '!($2==r && $3==t)' "$IMAGES" > "$IMAGES.n" && mv "$IMAGES.n" "$IMAGES"
    printf '%s\t%s\t%s\t<none>\n' "$id" "$repo" "$tag" >> "$IMAGES" ;;
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
dig() { printf 'sha256:%s' "$(hex "$1" 64)"; }
reset() {
  rm -rf "${FIX:?}"/*; : > "$FIX/docker.log"
  echo $((20 * GB)) > "$FIX/free_kb"
  {
    printf '%s\tpetprep-website\tproduction\t<none>\n' "$ID_PROD"
    printf '%s\tpetprep-website\tnext\t<none>\n' "$ID_PROD"
    printf '%s\t%s\t<none>\t%s\n' "$ID_PROD" "$GHCR" "$(dig d)"
    printf '%s\tpetprep-website\tprevious\t<none>\n' "$ID_PREV"
    printf '%s\t%s\t<none>\t%s\n' "$ID_PREV" "$GHCR" "$(dig c)"
    local i=0
    for id in "${OLD_IDS[@]}"; do i=$((i + 1)); printf '%s\t%s\t<none>\tsha256:%s%s\n' "$id" "$GHCR" "$i" "$(hex 0 63)"; done
    printf '%s\t%s\t<none>\t%s\n' "$ID_USED" "$GHCR" "$(dig 9)"
    printf '%s\t%s\t<none>\t%s\n' "$ID_TWO" "$GHCR" "$(dig b)"
    printf '%s\tpetprep-website\tmanual\t<none>\n' "$ID_TWO"
    printf '%s\t%s\t<none>\t%s\n' "$ID_MIRROR" "$GHCR" "$(dig 5)"
    printf '%s\tmirror.example/website\tkeep\t<none>\n' "$ID_MIRROR"
    printf '%s\tghcr.io/datavallis/petprep-app\t<none>\t%s\n' "$ID_APP" "$(dig 8)"
    printf '%s\tpetprep-app\tproduction\t<none>\n' "$ID_APP"
    printf '%s\tpetprep-app\tprevious\t<none>\n' "$ID_APP"
    printf '%s\tpetprep-web\tproduction\t<none>\n' "$ID_WEB"
    printf '%s\tpetprep-website-old\tx\t<none>\n' "$ID_WEB"
    printf '%s\tpostgres\t18\t<none>\n' "$ID_PG"
  } > "$FIX/images.tsv"
  # docker ps -a prints the tag for current images and the short id when the tag moved on.
  printf 'c1 petprep-website:production\nc2 %s\nc3 postgres:18\nc4 petprep-app:production\n' \
    "${ID_USED:7:12}" > "$FIX/containers"
}
deploy() { # deploy [ENV=VAL…] → exit code; output in $TMP/out
  local rc=0
  env PATH="$TMP/bin:$PATH" FIX="$FIX" WEBSITE_ROOT="$ROOT" IMAGE_REF="$NEW_REF" EXPECT_TREE="$TREE" \
    EXPECT_TREE_LABEL="$TREE" PULL_ID="$ID_NEW" "$@" bash "$SCRIPT" "$SRC" "$(hex f 40)" > "$TMP/out" 2>&1 || rc=$?
  echo "$rc"
}
ids_of() { awk -F'\t' -v i="$1" '$1==i' "$FIX/images.tsv" | wc -l | tr -d ' '; }
pulled() { grep -c '^pull ' "$FIX/docker.log" || true; }
tagged() { awk -F'\t' -v t="$1" '$2=="petprep-website" && $3==t {print $1}' "$FIX/images.tsv"; }
old_left() { local n=0 id; for id in "${OLD_IDS[@]}"; do n=$((n + $(ids_of "$id"))); done; echo "$n"; }
rm_before_pull() { awk -v two="$ID_TWO" '/^pull /{exit} /^image rm / && $3!=two {n++} END{print n+0}' "$FIX/docker.log"; }

# --- 0. The stub prints what the server printed (2026-11-05) -------------------------------
reset
check "stub: digest-pulled image shows as <none>, 12-hex id" \
  "ghcr.io/datavallis/petprep-website:<none> 233f540489d4 30 hours ago 2.85GB" \
  "$(env FIX="$FIX" "$TMP/bin/docker" image ls --format '{{.Repository}}:{{.Tag}} {{.ID}} {{.CreatedSince}} {{.Size}}' | grep -m1 233f540489d4)"
check "stub: petprep-website:production e374e63eb021" 1 \
  "$(env FIX="$FIX" "$TMP/bin/docker" image ls --format '{{.Repository}}:{{.Tag}} {{.ID}}' | grep -cx 'petprep-website:production e374e63eb021')"

# --- 1. Regression: 8 old <none> releases are removed (the name-based prune removed 0) ------
reset; check "deploy succeeds" 0 "$(deploy)"
check "… all 8 old ghcr.io/…:<none> releases removed" 0 "$(old_left)"
check "… removed by the preflight, before the pull" 8 "$(rm_before_pull)"
check "… preflight reports 8 (not 0)" 1 "$(grep -c 'Old website images: removed 8 image(s)' "$TMP/out")"
check "… removed by id, never by name" 0 "$(grep '^image rm ' "$FIX/docker.log" | grep -vcE '^image rm sha256:[0-9a-f]{64}$' || true)"
check "… never forced" 0 "$(grep -cE '^(image rm|rmi) .*-f' "$FIX/docker.log" || true)"
check "… pulls once" 1 "$(pulled)"
check "… :production is the new image" "$ID_NEW" "$(tagged production)"
check "… :previous is the old production" "$ID_PROD" "$(tagged previous)"
check "… the new image keeps its ghcr digest name" 1 "$(awk -F'\t' -v i="$ID_NEW" -v d="$NEW_DIGEST" '$1==i && $4==d' "$FIX/images.tsv" | wc -l | tr -d ' ')"
check "… the old production (now :previous; :next moved on) kept" 2 "$(ids_of "$ID_PROD")"
check "… the old :previous removed after the deploy" 0 "$(ids_of "$ID_PREV")"
check "… after the deploy removed 1" 1 "$(grep -c 'Old website images: removed 1 image(s)' "$TMP/out")"
check "… image a stopped container uses (ps: short id) kept" 1 "$(ids_of "$ID_USED")"
check "… id with a name in another repository kept" 2 "$(ids_of "$ID_MIRROR")"
check "… image with two website names: refused → kept, warned" "2 1" "$(ids_of "$ID_TWO") $(grep -c 'could not be removed' "$TMP/out" | awk '{print ($1>0)?1:0}')"
check "… API / postgres / similar names untouched" "3 2 1" "$(ids_of "$ID_APP") $(ids_of "$ID_WEB") $(ids_of "$ID_PG")"
check "… never touches API images" 0 "$(grep -cE "^image rm (${ID_APP}|${ID_WEB}|${ID_PG})$" "$FIX/docker.log" || true)"
check "… never docker system prune / volume rm" 0 "$(grep -cE '^(system|volume) ' "$FIX/docker.log" || true)"
check "… builder prune twice (preflight + after)" 2 "$(grep -c '^builder prune -af --keep-storage 1GB' "$FIX/docker.log")"

# Same with {{.Digest}} printed as <none> (no name of an old release can be built at all —
# the old prune skipped them as "dangling" and reported "removed 0").
reset; check "digest column <none> → deploy succeeds" 0 "$(deploy STUB_NO_DIGEST=1)"
check "… all 8 old releases still removed" 0 "$(old_left)"
check "… preflight reports 8" 1 "$(grep -c 'Old website images: removed 8 image(s)' "$TMP/out")"

# :next is kept (a failed deploy leaves it pointing somewhere else than :production).
reset
printf '%s\tpetprep-website\tnext\t<none>\n' "${OLD_IDS[0]}" >> "$FIX/images.tsv"
awk -F'\t' -v p="$ID_PROD" '!($2=="petprep-website" && $3=="next" && $1==p)' "$FIX/images.tsv" > "$FIX/x" && mv "$FIX/x" "$FIX/images.tsv"
deploy DOCKER_FAIL_MATCH='^pull ' >/dev/null
check ":next kept by the preflight (its id is not removed)" 2 "$(ids_of "${OLD_IDS[0]}")"

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
check "… but the prune still runs" 0 "$(old_left)"
reset
check "DEPLOY_MIN_FREE_GB=abc → refused" 1 "$(deploy DEPLOY_MIN_FREE_GB=abc)"
check "… nothing pulled or removed" "0 0" "$(pulled) $(grep -c '^image rm' "$FIX/docker.log" || true)"
reset; rm "$FIX/free_kb"
check "free space unmeasurable → warning, deploys" 0 "$(deploy)"
check "… warned" 1 "$(grep -c 'could not measure the free disk space' "$TMP/out")"

# --- 3. Fail safe: cannot list / resolve → remove nothing, deploy continues -----------------
reset; check "docker ps fails → deploy continues" 0 "$(deploy DOCKER_FAIL_MATCH='^ps ')"
check "… nothing removed" "0 8" "$(grep -c '^image rm' "$FIX/docker.log" || true) $(old_left)"
reset; check "image ls fails → deploy continues" 0 "$(deploy DOCKER_FAIL_MATCH='^image ls')"
check "… nothing removed" 0 "$(grep -c '^image rm' "$FIX/docker.log" || true)"
reset; echo "c9 gone-image:1" >> "$FIX/containers"
check "a container's image cannot be resolved → deploy continues" 0 "$(deploy)"
check "… nothing removed" 0 "$(grep -c '^image rm' "$FIX/docker.log" || true)"
check "… warned" 1 "$(grep -c "cannot resolve the image 'gone-image:1'" "$TMP/out" | awk '{print ($1>0)?1:0}')"
reset; check "image rm fails → warning, deploy continues" 0 "$(deploy DOCKER_FAIL_MATCH='^image rm ')"
check "… warned" 1 "$(grep -c 'old website image(s) could not be removed' "$TMP/out" | awk '{print ($1>0)?1:0}')"
reset; check "builder prune fails → deploy continues" 0 "$(deploy DOCKER_FAIL_MATCH='^builder ')"

# --- 4. A failed pull changes nothing (but the preflight prune already ran) ------------------
reset; check "pull fails → refused" 1 "$(deploy DOCKER_FAIL_MATCH='^pull ')"
check "… :production and :previous unchanged" "$ID_PROD $ID_PREV" "$(tagged production) $(tagged previous)"

echo "deploy.sh harness: ${pass} passed, ${fail} failed"
[ "$fail" = 0 ]
