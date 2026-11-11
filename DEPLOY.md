# Deploying petprep.si

Runbook for the website deploy. Pipeline details: `README.md` → *Deployment (production)*.
The site runs on the **same Hetzner server as the PetPrep API** (`api.petprep.si`, 38 GB root disk,
4 GB RAM) — a website deploy that fills the disk or the memory takes the app down too.

## When does the site deploy? (since 2026-11-04)

| Event | What runs | Deploys? |
|---|---|---|
| Pull request | CI (`ci-deploy.yml`: lint, tests, tsc, shellcheck + harnesses, one `next build`, smoke test, image to GHCR) | no |
| Push / merge to `main` | CI (or reuses the green image of the same git tree) | **no** |
| Registry sync / care sync (hourly bots) | commit to `main` + dispatch `ci-deploy.yml` with target `none` = CI only | **no** |
| **Daily** — `.github/workflows/daily-deploy.yml`, **03:47 Europe/Ljubljana** | `deploy/daily-deploy.sh`: when `main` has commits the site does not run yet **and** CI on the `main` head is green → Run workflow on `main`, target `production` | **yes** |
| **By hand** — Actions → CI & Deploy → Run workflow, branch `main`, target `production` | reuses the tested image of the tree (or builds + tests first) and deploys it | **yes** |

- `gh workflow run ci-deploy.yml --ref main -f target=production` = the manual deploy from a terminal.
- Target `none` (the default) = a CI run on `main` only.
- *What the site runs* = the newest GitHub deployment to the `production` environment whose status is
  `success` (repo → Environments → production). The daily job compares it with the `main` head.
- The daily job only waits for CI that is still running (up to 30 min); red, cancelled or missing CI →
  no deploy, the daily run turns red (Actions tab). A manual Run workflow then deploys once CI is fixed.
- GitHub may start scheduled runs late (hours, at busy times). Turn the daily deploy off: Actions →
  Daily website deploy → Disable workflow. Check its decision without deploying: Run workflow with
  `dry_run` ticked (the default).
- IndexNow (Bing / ChatGPT / Copilot) is notified in the deploy job, so it runs once per actual deploy.

**Why (incident 2026-11-04, second outage that day, ~11:00–12:35):** every push to `main` deployed —
~7 website deploys in 8 hours (merges, hourly syncs, agents adding vet directories / languages). Each
pulled `ghcr.io/datavallis/petprep-website@sha256:…` (~2.85 GB) and nothing removed the old ones →
9 website images ≈ 25 GB, root disk 100 %, postgres unhealthy, the PetPrep app down. David removed 7
old images by hand (55 % used). David: »načeloma ni treba deployat tako pogosto«.

### Latency of content changes

Nothing on the site needs near-real-time deploys. A change merged or synced to `main` reaches
petprep.si with the **next daily deploy — at most ~1 day later** (plus any GitHub delay):

- **Animal register** (`registry-sync.yml`, hourly): a breed flipping to "in the app" after an app
  release shows on the site the next morning, not within the hour.
- **Care knowledge** (`care-sync.yml`, hourly): same.
- **Vet directories / countries, languages, breeds, copy** (agent / human PRs): same.
- Unaffected: `/investors` counts revalidate hourly at runtime (YouTube, cached a day) — no deploy needed.

Need it live now (a launch, a fix)? Run workflow → target `production`.

## Build-time switches (gift voucher, M6-S01)

`NEXT_PUBLIC_*` values are inlined when the site is built, so changing one needs a new build. Production is built by CI from the committed `.env.production`:

| value | meaning |
|---|---|
| `NEXT_PUBLIC_FEATURE_GIFT` | exactly `1` = gift, thank-you and redeem pages on; anything else = off (404, no sitemap entry) |
| `NEXT_PUBLIC_LS_GIFT_URL` | Lemon Squeezy checkout URL of the gift product |
| `NEXT_PUBLIC_PETPREP_API_URL` | API for the redeem form, default `https://api.petprep.si` |

- **Flip = a pull request** that edits `.env.production`. Do not use a repository variable: CI reuses the image of a green run per git tree (`plan` job), so an unchanged tree would ship the old image.
- The manual full build takes the same names as `docker build --build-arg` (`Dockerfile`) and as environment of `deploy/deploy.sh`; `.dockerignore` keeps `.env*` out of that build context on purpose.
- Order for go-live (David): app in the stores → Lemon Squeezy product + webhook + server env → server switch "Gift vouchers" on → this switch. Then check `/gift`, `/redeem` and that `sitemap.xml` lists `/gift` and `/sl/darilni-bon` only.

## Disk (every deploy)

`deploy/deploy.sh` (same keep rule as the API's `prune_release_images`, pet-prep DEPLOYMENT.md D31):

1. **Disk preflight (step 0, before anything is pulled or built):** removes old website images (below),
   dangling images and caps the build cache at 1 GB. Then the Docker disk must have at least
   **`DEPLOY_MIN_FREE_GB` (default 5) GB free**; below it the whole build cache is dropped once more,
   and if it is still below, the deploy **stops before pulling** — nothing changed, the live site keeps
   running, the deploy job fails with the numbers and what to check (`df -h /`, `docker system df`,
   `docker image ls`). `DEPLOY_MIN_FREE_GB=0` skips the check (the prune still runs). The variable is
   read on the server, so it applies to manual runs; for CI deploys change the default in `deploy.sh`.
2. **After a successful deploy:** the same prune again.

**Pruned — by image id** (`docker image rm <id>`, never `-f`): every image of
`ghcr.io/datavallis/petprep-website` or `petprep-website` whose id is **not kept**. By id because on the
server (Docker with the containerd image store) a digest-pulled image is listed as
`ghcr.io/datavallis/petprep-website:<none>` — its only reference is `…@sha256:<digest>`; the first,
name-based version (2026-11-04) therefore removed **0** images and the disk climbed to 89 % (2026-11-05).
**Kept:** the ids of `petprep-website:production` (live), `:previous` (rollback) and `:next`, every image
any container uses (running or stopped — `docker ps -a` prints a name or an id, resolved with
`docker image inspect`) and any id that also has a name in another repository. Older releases come back
by deploying them again (GHCR keeps the newest 40 versions).
**Never touched:** other repositories (`petprep-app`, `petprep-web`, `petprep-backend`, postgres,
redis, caddy …), any volume (`website-next-cache`, the API's), no `docker system prune`.
**Fail safe:** when the images or containers cannot be listed, or a container's image cannot be
resolved, nothing is removed (warning only); a refused `docker image rm` (in use, several names) only
warns, and a prune problem never fails the deploy. The log line says how many were removed
(`Old website images: removed N image(s)`). The API deploy prunes only its own images, so the two deploys can
run at the same time.

Tests (no server, stubbed docker / df / curl): `bash deploy/tests/deploy.test.sh`; daily decision:
`bash deploy/tests/daily-deploy.test.sh`; image reuse: `bash deploy/tests/ci-reuse-image.test.sh`.
All three run in CI (job *Lint, types, tests*).

## Rollback

On the server (as `deploy`):

```bash
docker tag petprep-website:previous petprep-website:production
docker compose -f /opt/petprep/website/incoming/deploy/compose.yaml up -d --force-recreate
```

`deploy.sh` does this by itself when the new container does not become healthy.
