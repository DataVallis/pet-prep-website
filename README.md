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
| Pages | `/how-it-works`, `/for-parents`, `/after-adoption`, `/pricing`, `/faq`, `/partners`, `/investors`, `/contact`, `/privacy`, `/terms`, `/child-safety` | `/sl/kako-deluje`, `/sl/za-starse`, `/sl/po-posvojitvi`, `/sl/cenik`, `/sl/pogosta-vprasanja`, `/sl/partnerji`, `/sl/vlagatelji`, `/sl/kontakt`, `/sl/zasebnost`, `/sl/pogoji`, `/sl/varnost-otrok` |

- `src/proxy.ts` serves English from the root (internally `/en/...`) and redirects `/en/...` to the root, so every page has one URL.
- `/pogoji` and `/zasebnost` (linked from the app's sign-up screen) redirect to the Slovenian legal pages (`next.config.ts`).
- **Add a language:** add the code to `locales` and a slug per page in `src/i18n/config.ts`, add `src/content/<code>.ts` (typed by `Dictionary`, start from `en.ts`), register it in `src/content/index.ts`, add screens to `public/screens/<code>/`.

## Content

All copy lives in `src/content/en.ts` and `src/content/sl.ts` (same structure, type-checked).
Site-wide settings — domain, e-mail addresses, company details, launch state, store links, legal review flag — are in `src/lib/site.ts`. Values marked `TODO(David)` must be confirmed before launch.

- `launchState: "prelaunch"` → calls to action ask for early access by e-mail. Set `"live"` and fill `stores.ios` / `stores.android` at launch.
- `legalReviewed: false` → privacy policy and terms show a “being finalised with legal advisors” notice.

## App screens

`public/screens/<locale>/<screen>.png` (780×1688, i.e. 390×844 @2x): `pin`, `contract`, `hud`, `picker`, `parent`, `report`, `assistant`, `certificate`.
They are **product previews rendered in the CGP**, not captures from a device. Replace them with real screenshots (same file names and size) when available — especially `hud.png`, which should show the real AI pet video frame.

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
