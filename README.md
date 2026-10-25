# PetPrep website — petprep.si

Marketing site for PetPrep: **“Ready for a pet. There for its whole life.”**
Next.js 16 (App Router, static generation), Tailwind CSS 4, brand system “Grafit in meta” (CGP v2).

## Develop

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build && npm run lint && npx tsc --noEmit
```

## Languages and URLs

| | English (default) | Slovenian |
|---|---|---|
| Home | `/` | `/sl` |
| Pages | `/how-it-works`, `/for-parents`, `/animals`, `/when-it-comes-home`, `/pricing`, `/faq`, `/partners`, `/investors`, `/contact`, `/privacy`, `/terms`, `/child-safety`, `/meet-curio` | `/sl/kako-deluje`, `/sl/za-starse`, `/sl/zivali`, `/sl/ko-pride-domov`, `/sl/cenik`, `/sl/pogosta-vprasanja`, `/sl/partnerji`, `/sl/vlagatelji`, `/sl/kontakt`, `/sl/zasebnost`, `/sl/pogoji`, `/sl/varnost-otrok`, `/sl/spoznaj-curia` |
| Animal register | `/animals/<species>` (`/animals/dogs`), `/animals/<species>/<breed>` (`/animals/dogs/labrador-retriever`), `/animals/<species>/compare?b=a,b,c` | `/sl/zivali/psi`, `/sl/zivali/psi/labradorec`, `/sl/zivali/psi/primerjava?b=…` |

- `src/proxy.ts` serves English from the root (internally `/en/...`) and redirects `/en/...` to the root, so every page has one URL.
- `/pogoji` and `/zasebnost` (linked from the app's sign-up screen) redirect to the Slovenian legal pages (`next.config.ts`).
- **Add a language:** add the code to `locales` and a slug per page in `src/i18n/config.ts`, add `src/content/<code>.ts` (typed by `Dictionary`, start from `en.ts`), register it in `src/content/index.ts`, add screens to `public/screens/<code>/`.

## Content

All copy lives in `src/content/en.ts` and `src/content/sl.ts` (same structure, type-checked).
Site-wide settings — domain, e-mail addresses, company details, launch state, store links, legal review flag — are in `src/lib/site.ts`. Values marked `TODO(David)` must be confirmed before launch.

- `launchState: "prelaunch"` → calls to action ask for early access by e-mail. Set `"live"` and fill `stores.ios` / `stores.android` at launch.
- `legalReviewed: false` → privacy policy and terms show a “being finalised with legal advisors” notice.

## Animal register (M5-R11)

Hub `/animals` → species catalogue `/animals/<species>` (search, filters, sort, 24 per page, pick up to 3 to compare, URL state `?q=&tag=&size=&exercise=&grooming=&av=&sort=&page=&b=`; without JavaScript a plain A–Z list) → breed page `/animals/<species>/<breed>`; comparison `/animals/<species>/compare?b=…` (noindex). Species, breeds, slugs, availability and facts come from `src/content/registry/registry.json`, a copy of the build-time export in the `pet-prep` repo; layout code is generic and only looks up words in `src/content/registry/{en,sl}.ts`. The client parts load static JSON built from the registry: `/registry/<species>/index.<locale>.json` (slim index) and `/registry/<species>/compare.<locale>.json`. One share image per species; every breed page has its own branded share card `/og/<species>/<breed>.<locale>.png` (AI portrait converted WebP → PNG with `sharp` at build, 2–3 facts, availability badge) and a **Share** button (copy link, X, Facebook, LinkedIn, WhatsApp, Telegram, e-mail, system share sheet; plain links, no third-party scripts). Old preview URLs `/breeds…` and `/sl/pasme…` redirect permanently. Availability changes (a new app release) arrive by themselves: `.github/workflows/registry-sync.yml` copies the pet-prep export hourly, checks it and deploys. How to refresh by hand (new breeds): `src/content/registry/README.md`.

## Mascot page (Curio)

`/meet-curio` · `/sl/spoznaj-curia` (David 2026-10-25), linked from the footer only (group Company), never the header. Curio is the brand mascot, **not** the pet in the app — the page says so next to a real app breed portrait. Content: `pages.curio` in `src/content/{en,sl}.ts`, with the optional page `hero` and the blocks `pair`, `gallery` (images; a tile with `video` becomes a player with a poster, never autoplay) and `downloads` (media kit + usage rules).
Images: `public/curio/*.webp` (display) and `public/curio/kit/` (download originals), copied from `brand/mascot/` in the `pet-prep` repo; `public/curio/petprep-curio-media-kit.zip` = everything in `kit/` (rebuild it when a kit file changes: `cd public/curio/kit && zip -X ../petprep-curio-media-kit.zip *`). Social profiles (`site.social`, also JSON-LD `sameAs`): TikTok and Instagram `@petprep.si`.

## App screens

`public/screens/<locale>/<screen>.png` (780×1688, i.e. 390×844 @2x): `pin`, `contract`, `hud`, `picker`, `parent`, `report`, `assistant`, `certificate`.
They are **product previews rendered in the CGP**, not captures from a device. Replace them with real screenshots (same file names and size) when available — `hud.png` shows a PetPrep AI-generated puppy (Nano Banana Pro, 2026-10-08) under the CGP HUD.

## Early access (Klaviyo)

Before launch the calls to action show an email form (`src/components/EarlyAccessForm.tsx`). It posts to `/api/subscribe`
(`src/app/api/subscribe/route.ts`), which validates the address, checks the origin, drops bots (honeypot field), limits
5 requests per IP per 10 minutes and calls Klaviyo server-side (`src/lib/klaviyo.ts`, API revision `2026-07-15`):
profile import with `petprep_language`, `petprep_signup_source`, `petprep_signup_page`, then a subscription to the list
with email marketing consent. If the list has double opt-in, Klaviyo sends the confirmation email.
Local test: `KLAVIYO_PRIVATE_API_KEY=pk_… KLAVIYO_LIST_ID=… npm run dev`.

## Cookies and analytics

- `src/components/ConsentAndAnalytics.tsx` (in `<head>` of every page): Google Consent Mode v2 defaults (all denied) → CookieYes banner → Google Analytics 4 (`G-CGSBN9N46F`). IDs live in `src/lib/site.ts`.
- GA sets cookies only after the visitor allows **Analytics** in the banner. In the CookieYes dashboard, **Google Consent Mode (GCM)** must be enabled, otherwise consent never reaches GA.
- Privacy page section “Cookies” contains `<div class="cky-audit-table-element">` — CookieYes fills it with the live cookie list from its latest scan. Any element with class `cky-banner-element` (footer “Cookie settings”) reopens the preferences.

## SEO and AI search

- Per-page `title`, `description`, canonical URL, `hreflang` (en, sl, x-default), Open Graph and Twitter cards (`src/lib/seo.ts`).
- Generated share images per page (`opengraph-image.tsx`, fonts in `src/og/`).
- JSON-LD: Organization, WebSite, MobileApplication with offers, WebPage, BreadcrumbList, FAQPage (`src/lib/jsonld.ts`).
- `sitemap.xml` with language alternates, `robots.txt` that explicitly allows search and AI crawlers, `manifest.webmanifest`.
- `/llms.txt` (summary + page index) and `/llms-full.txt` (all pages as Markdown) for AI assistants (`src/lib/llms.ts`).
- Static HTML, semantic headings, one `h1` per page, real links, `lang` per page, works without JavaScript.

## Deployment (production)

Same server as the API (`api.petprep.si`, Hetzner, Docker). Push to `main` → GitHub Actions (`.github/workflows/ci-deploy.yml`):

1. **checks** — lint, build, types, shellcheck; **image** — Docker build + smoke test.
2. **deploy** — rsync to `/opt/petprep/website/incoming` as `deploy@<host>`, then `deploy/deploy.sh`:
   builds `petprep-website:next`, smoke-tests it, promotes `:production` → `:previous` and `:next` → `:production`,
   recreates the `petprep-website` container (`deploy/compose.yaml`) on the API's Docker network `backend_petprep-network`
   (alias `website`), waits for the health check and rolls back to `:previous` on failure.

**Registry sync** (`.github/workflows/registry-sync.yml`, hourly + Run workflow, 2026-10-25): when pet-prep's `docs/research/breed-registry.json` differs from `src/content/registry/registry.json` and builds, the job commits it to `main` as `github-actions[bot]` and dispatches this workflow (a `GITHUB_TOKEN` push starts no run by itself). It needs no secret (pet-prep is public).

Caddy (in the API stack, `deployment/Caddyfile` of the `pet-prep` repo) terminates TLS for `petprep.si` / `www.petprep.si` and proxies to `website:3000`.

**Repository secrets** (Settings → Secrets and variables → Actions), the same values as in the `pet-prep` repo:

| Secret | Value |
|---|---|
| `PRODUCTION_SSH_PRIVATE_KEY` | private key of the `deploy` user (ed25519) |
| `PRODUCTION_HOST` | `138.199.172.97` (optional, default) |
| `PRODUCTION_USER` | `deploy` (optional, default) |
| `KLAVIYO_PRIVATE_API_KEY` | Klaviyo private API key (`pk_…`) with write access to Profiles, Lists and Subscriptions |
| `KLAVIYO_LIST_ID` | ID of the Klaviyo early-access list |

The two Klaviyo values are written to `/opt/petprep/website/.env` (mode 600) on every deploy and read by the container at start.
Without them the early-access form answers “not configured” (HTTP 503).

Manual deploy on the server: `bash /opt/petprep/website/incoming/deploy/deploy.sh /opt/petprep/website/incoming manual`.
Rollback: `docker tag petprep-website:previous petprep-website:production && docker compose -f /opt/petprep/website/incoming/deploy/compose.yaml up -d --force-recreate`.
