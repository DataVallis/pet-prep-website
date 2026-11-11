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
| Pages | `/how-it-works`, `/for-parents`, `/animals`, `/when-it-comes-home`, `/pricing`, `/faq`, `/partners`, `/investors`, `/contact`, `/privacy`, `/terms`, `/child-safety`, `/meet-curio`, `/walkyourpet` | `/sl/kako-deluje`, `/sl/za-starse`, `/sl/zivali`, `/sl/ko-pride-domov`, `/sl/cenik`, `/sl/pogosta-vprasanja`, `/sl/partnerji`, `/sl/vlagatelji`, `/sl/kontakt`, `/sl/zasebnost`, `/sl/pogoji`, `/sl/varnost-otrok`, `/sl/spoznaj-curia`, `/sl/walkyourpet` |
| Animal register | `/animals/<species>` (`/animals/dogs`), `/animals/<species>/<breed>` (`/animals/dogs/labrador-retriever`), `/animals/<species>/compare?b=a,b,c` | `/sl/zivali/psi`, `/sl/zivali/psi/labradorec`, `/sl/zivali/psi/primerjava?b=…` |

- `src/proxy.ts` serves English from the root (internally `/en/...`) and redirects `/en/...` to the root, so every page has one URL.
- `/pogoji` and `/zasebnost` (linked from the app's sign-up screen) redirect to the Slovenian legal pages (`next.config.ts`).
- **Add a language:** add the code to `locales` and a slug per page in `src/i18n/config.ts`, add `src/content/<code>.ts` (typed by `Dictionary`, start from `en.ts`), register it in `src/content/index.ts`; `npx tsc --noEmit` lists every other text (register, care, emergency) — full steps in pet-prep `docs/engineering/LANGUAGE_RUNBOOK.md`. App screens: languages without `public/screens/<code>/` show the English screens (`screenLocale()` in `src/i18n/config.ts`) until the app itself is translated.
- **Languages live:** English, Slovenian, German (`/de`, since 2026-10-31; legal pages marked „Übersetzung – verbindlich ist die englische Fassung.“), French (`/fr`, since 2026-10-31; legal pages marked « Traduction – seule la version anglaise fait foi. »), Spanish (`/es`, since 2026-10-31; legal pages marked «Traducción: la versión en inglés es la única vinculante.»), Italian (`/it`, since 2026-10-31; legal pages marked «Traduzione: fa fede esclusivamente la versione inglese.»), Portuguese (`/pt`, since 2026-11-01; legal pages marked «Tradução: apenas a versão inglesa é vinculativa.»), Dutch (`/nl`, since 2026-11-01; legal pages marked “Vertaling – alleen de Engelse versie is bindend.”), Polish (`/pl`, since 2026-11-01; legal pages marked „Tłumaczenie – wiążąca jest wyłącznie wersja angielska.”), Czech (`/cs`, since 2026-11-01; legal pages marked „Překlad – závazné je pouze anglické znění.“), Croatian (`/hr`, since 2026-11-02; legal pages marked „Prijevod – obvezujuća je samo engleska verzija.“), Swedish (`/sv`, since 2026-11-02; legal pages marked ”Översättning – endast den engelska versionen är bindande.”), Danish (`/da`, since 2026-11-02; legal pages marked »Oversættelse – kun den engelske version er juridisk bindende.«), Finnish (`/fi`, since 2026-11-02; legal pages marked ”Käännös – vain englanninkielinen versio on sitova.”), Norwegian Bokmål (`/nb`, since 2026-11-02; legal pages marked «Oversettelse – kun den engelske versjonen er juridisk bindende.»).

## Content

All copy lives in `src/content/<locale>.ts` — `en.ts`, `sl.ts`, `de.ts` (same structure, type-checked).
Site-wide settings — domain, e-mail addresses, company details, launch state, store links, legal review flag — are in `src/lib/site.ts`. Values marked `TODO(David)` must be confirmed before launch.

- `launchState: "prelaunch"` → calls to action ask for early access by e-mail. Set `"live"` and fill `stores.ios` / `stores.android` at launch.
- `legalReviewed: false` → privacy policy and terms show a “being finalised with legal advisors” notice.

## Animal register (M5-R11)

Hub `/animals` → species catalogue `/animals/<species>` (search, filters, sort, 24 per page, pick up to 3 to compare, URL state `?q=&tag=&size=&exercise=&grooming=&av=&sort=&page=&b=`; without JavaScript a plain A–Z list) → breed page `/animals/<species>/<breed>`; comparison `/animals/<species>/compare?b=…` (noindex). Species, breeds, slugs, availability and facts come from `src/content/registry/registry.json`, a copy of the build-time export in the `pet-prep` repo; layout code is generic and only looks up words in `src/content/registry/{en,sl}.ts`. The client parts load static JSON built from the registry: `/registry/<species>/index.<locale>.json` (slim index) and `/registry/<species>/compare.<locale>.json`. One share image per species; every breed page has its own branded share card `/og/<species>/<breed>.<locale>.png` (AI portrait converted WebP → PNG with `sharp` at build, 2–3 facts, availability badge) and a **Share** button (copy link, X, Facebook, LinkedIn, WhatsApp, Telegram, e-mail, system share sheet; plain links, no third-party scripts). Old preview URLs `/breeds…` and `/sl/pasme…` redirect permanently.

**Search (SEO, 2026-10-27, from Search Console):** every breed page has **Similar breeds** above the sources (`relatedBreeds()` in `src/lib/registry/views.ts`: up to 4 breeds of the same species, in-app first, then same FCI group = 2 points + each shared facet = 1 point, then registry order) — internal links between breed pages, automatic for every breed, no per-breed work. The size question of the generated Q&A (and FAQPage JSON-LD) names the weight too ("… in koliko tehta?" / "… and how much does it weigh?"), because people search for weight. Every breed has a hand-written intro (`intros.<key>` in `src/content/registry/{en,sl}.ts`); its `aka` lists the names people actually type, including colloquial and ASCII spellings ("bengalka", "majkun") — the build does not check this, the breed runbook (pet-prep `docs/engineering/ADD_BREED_RUNBOOK.md` §9) does. Availability changes (a new app release) arrive by themselves: `.github/workflows/registry-sync.yml` copies the pet-prep export hourly and checks it; it goes live with the next daily deploy (03:47 Europe/Ljubljana, `DEPLOY.md`). How to refresh by hand (new breeds): `src/content/registry/README.md`.

## Mascot page (Curio)

`/meet-curio` · `/sl/spoznaj-curia` (David 2026-10-25), linked from the footer only (group Company), never the header. Curio is the brand mascot, **not** the pet in the app — the page says so next to a real app breed portrait. Content: `pages.curio` in `src/content/{en,sl}.ts`, with the optional page `hero` and the blocks `pair`, `gallery` (images; a tile with `video` becomes a player with a poster, never autoplay) and `downloads` (media kit + usage rules).
Images: `public/curio/*.webp` (display) and `public/curio/kit/` (download originals), copied from `brand/mascot/` in the `pet-prep` repo; `public/curio/petprep-curio-media-kit.zip` = everything in `kit/` (rebuild it when a kit file changes: `cd public/curio/kit && zip -X ../petprep-curio-media-kit.zip *`). Social profiles (`site.social`, also JSON-LD `sameAs`): TikTok and Instagram `@petprep.si`.

## Partner and sponsor page (M6-S03)
`/partners` · `/sl/partnerji` (live, no switch). Slovenian and English only: the other 13 languages keep their earlier, shorter partner text unchanged (no form, no new sections). Copy: `pages.partners` in `src/content/sl.ts` and `en.ts` (audience, forms of cooperation, "what we do not do", media kit downloads) plus `src/content/partners.ts` (form, numbers and media kit texts).
- **Numbers** (`PartnerStatsBlock`, `src/lib/partnerStats.ts`): only values counted from the repo at build time (breeds in `registry.json`, site languages), shown with the build date. Series views and audience size are not measurable yet: a `TODO(David)` placeholder that renders in development only, never in production.
- **Inquiry form** (`PartnerInquiryForm`, logic in `src/lib/partnerInquiry.ts`, tests in `partnerInquiry.test.ts`): posts JSON `{company, contact_name, email, type, message, website, locale}` straight from the browser to `<NEXT_PUBLIC_PETPREP_API_URL>/api/partner-inquiries` (default `https://api.petprep.si`; the site had no API base variable before; it is inlined at build time). `website` is the hidden honeypot. 201 = thanks; 422 = field errors; 429 = try later; 404 / 503 / network error = "write to david@petprep.si". The API must allow the site's origin (CORS). Nothing is logged in the console.
- **Media kit**: `public/media/petprep-media-kit-{sl,en}.pdf`, built by `node scripts/build-media-kit.mjs [--png <dir>]` (system Chrome, `CHROME=` overrides; needs `pdftoppm` only for `--png`). Re-run it when the numbers or copy change and commit the PDFs. No Data Vallis; "PetPrep (v ustanavljanju)".
- Privacy policy (SL + EN): a line on the partner form (12 months, then deleted).

## Pet Promise Kit (M6-S02)

Printable A4 kit »Obljuba o ljubljenčku« / "Pet Promise Kit" (6,90 €, 11 pages, Slovenian and English) plus a free sample (the Promise page only). **Sales page** `/promise-kit` · `/sl/obljuba-o-ljubljencku`, English and Slovenian only: its own routes `src/app/[locale]/{promise-kit,obljuba-o-ljubljencku}/` (not under `[slug]`); every other language gets a 404 and no sitemap or hreflang entry. Switch, URLs and sitemap rows: `src/lib/promiseKit.ts` (unit test `src/lib/promiseKit.test.ts`).

| Env var (build time, `NEXT_PUBLIC_*`) | Effect |
|---|---|
| `NEXT_PUBLIC_FEATURE_PROMISE_KIT=1` | Page exists and is in `sitemap.xml`, `llms.txt` and the footer (Product group). Anything else: 404 and nowhere listed. David flips it after reading the kit text. |
| `NEXT_PUBLIC_LS_KIT_URL` | Lemon Squeezy checkout of the kit. Missing or not https: the buy button is hidden. |
| `NEXT_PUBLIC_LS_SAMPLE_URL` | Lemon Squeezy checkout of the free sample (e-mail with consent). Missing: the sample button and block are hidden. |
| `NEXT_PUBLIC_FEATURE_GIFT=1` | The page links to the gift page (`/gift`, `/sl/darilni-bon`, M6-S01). |

They are inlined at build, so set them where the site is built (CI / the daily deploy build), then rebuild.

**Text:** the kit's own copy is `src/content/promise-kit/{en,sl}.ts` (type `types.ts`); the sales-page copy is `sales.ts`. One text, two uses: the print HTML (`print.ts`) and the page. Rules: no ages, no health advice, no amounts (the cost sheet has empty fields), nothing about a child except what the family writes by hand, Curio is the mascot, Slovenian parents are addressed formally and the child pages have no gendered verb forms.

**Rebuild the PDFs** after any text or layout change: `npm run kit:build` (needs `google-chrome`, or `CHROME_BIN=…`; `pdfinfo` to print page counts). Writes `out/promise-kit/petprep-promise-kit-{sl,en}.pdf` and `petprep-promise-sample-{sl,en}.pdf`. `out/` is git-ignored and the PDFs are **not** served from `public/`: they are sold, so upload them to Lemon Squeezy (kit product: SL + EN files; free product: the sample) and to the Google Drive folder PetPrep (`MEDIA_DRIVE.md`). `npm run kit:build -- --previews` also renders page PNGs (`out/promise-kit/png/`, needs `pdftoppm`) and refreshes the three sales-page previews `public/promise-kit/preview-{sl,en}-{cover,promise,cost}.webp` (page 1, 3 and 8; commit those). Fonts and colours come from `src/fonts/` and the CGP; Curio from `public/curio/kit/`.

## Investors page

`/investors` (David 2026-11-01, design `docs/design/investors-design.html`) — **English only**, its own route `src/app/[locale]/investors/` (not built under `[slug]`); every other language's investor URL redirects 308 to it (`englishOnlyPages` in `src/i18n/config.ts` → `next.config.ts`). On it the language switcher says "This page is available in English only" and sends other languages to their home page; footer links in other languages show "(EN)" (David 2026-11-03). Linked from the footer only, `noindex, follow`, not in `sitemap.xml`, `llms*.txt` or IndexNow. Copy: `src/content/investors.ts`. Video tiles ("More to watch"): Curio pilot, Curio playlist, "PetPrep in 60 seconds" and the **PetPrep Reels** playlist (`youtube.reels`, David 2026-11-06). **Every number is computed** (`src/lib/investorStats.ts` → pure `investorStatsCore.ts`, unit test `npm test`): breeds (registry), unique sources (registry + care, deduplicated by URL), verified foods, live languages, vet-directory countries, colouring pages, and "12 Weeks" episodes + views from the YouTube Data API v3 (env `YOUTUBE_API_KEY`: passed to the CI build so the prerendered page already has the counts — a BuildKit secret in the manual full-build `Dockerfile` — and the server `.env` via the deploy secret for the hourly revalidation; cached a day). A link to the YouTube channel sits next to the "12 Weeks" playlist. A value that cannot be computed hides its card — never 0 or a placeholder. The page revalidates hourly; the Web Summit card hides itself after 12 November 2026. YouTube embeds load only after a click (youtube-nocookie.com); the tiles show the video thumbnails, fetched by our server via `/api/yt-thumb/<id>` (only our own video ids, cached a day), so the browser makes no request to YouTube before play.

## #walkyourpet page

`/walkyourpet` · `/sl/walkyourpet` (David 2026-10-30) — home of the #walkyourpet movement: how the phrase started (a real child's sentence, story card in `public/walkyourpet/`), what it means in the app (dog walks = real steps; not for cats), how families join (parents post, no children's faces or names, repost only with permission) and FAQ. The phrase is never translated, so the slug is the same in every language. Footer link only (group Company). Add new real moments as they come in — never invented quotes. Rules: `WALKYOURPET.md` (pet-prep docs).

## App screens

Screens: `pin`, `contract`, `hud`, `picker`, `parent`, `report`, `assistant`, `certificate`. Sources are `public/screens/<locale>/<screen>.png` (780×1688, i.e. 390×844 @2x); the site serves the pre-sized `<screen>.webp` next to each (600×1298, quality 82, `unoptimized` — no request-time image optimisation, so a fresh container never shows a black phone). After replacing a PNG run:
`python3 -c "from PIL import Image;import glob;[Image.open(p).convert('RGB').resize((600,1298),Image.LANCZOS).save(p[:-4]+'.webp','WEBP',quality=82,method=6) for p in glob.glob('public/screens/*/*.png')]"`

Promo video (home, after the dark promise band, player on a mint slab like the hero): `public/video/petprep-promo.mp4` (720×1280, H.264 CRF 25 veryfast, AAC 128k, faststart) + poster `petprep-promo-poster.webp`; click to play, `preload="none"`, English only.
They are **product previews rendered in the CGP**, not captures from a device. Replace them with real screenshots (same file names and size) when available — `hud.png` shows a PetPrep AI-generated puppy (Nano Banana Pro, 2026-10-08) under the CGP HUD.

## Early access (Klaviyo)

Before launch the calls to action show an email form (`src/components/EarlyAccessForm.tsx`). It posts to `/api/subscribe`
(`src/app/api/subscribe/route.ts`), which validates the address, checks the origin, drops bots (honeypot field), limits
5 requests per IP per 10 minutes and calls Klaviyo server-side (`src/lib/klaviyo.ts`, API revision `2026-07-15`):
profile import with `petprep_language`, `petprep_signup_source`, `petprep_signup_page`, then a subscription to the list
with email marketing consent. If the list has double opt-in, Klaviyo sends the confirmation email.
Local test: `KLAVIYO_PRIVATE_API_KEY=pk_… KLAVIYO_LIST_ID=… npm run dev`.

## Cookies and analytics

- Cookie banner: **Kockica** (`@datavallis/consent`, replaced CookieYes 2026-11-04) — `src/components/Kockica.tsx`, initialised at module top level (before next/script). Controller = `site.company.legalName, city`; cookie policy = the "Cookies" section of each language's privacy page (`/<privacy slug>#cookies`). Built-in texts for all 15 of our languages (sv, fi, nb since Kockica 0.4.0). Branding credit ("Powered by Kockica · Data Vallis") on — David 2026-11-05.
- `src/components/ConsentAndAnalytics.tsx`: `<ConsentDefaults />` in `<head>` (Kockica's Consent Mode v2 defaults, all denied, + GA4 config `G-CGSBN9N46F`), `<GoogleAnalytics />` loads gtag.js and `<GoogleTagManager />` loads GTM `GTM-5JBNQD93` (David 2026-11-05) via next/script `afterInteractive`; tags in GTM follow Consent Mode. Do not add a second GA4 tag inside GTM (GA4 already loads directly — it would count visits twice). GA runs cookieless until the visitor allows **Analytics** (Consent Mode "advanced"); `services: ["ga4"]` is declared because gtag.js loads after Kockica starts.
- Privacy page "Cookies": `KockicaCookieTable` mounts `<div data-kockica-cookie-table>` after hydration (filling it before hydration made React re-render the document and drop the banner). `data-kockica-preferences` on the footer "Cookie settings" link and the privacy-page button reopens the settings; a small corner button does too.
- `/investors` YouTube players are gated (`data-kockica-category="marketing"` + `data-src`): after the click they load only with consent to advertising cookies, else Kockica shows "Allow and show".
- Testing in headless Chromium: Kockica hides the banner from bots (`hideFromBots`) — launch with `--disable-blink-features=AutomationControlled` and a normal user agent.

## SEO and AI search

- Per-page `title`, `description`, canonical URL, `hreflang` (en, sl, x-default), Open Graph and Twitter cards (`src/lib/seo.ts`).
- Generated share images per page (`opengraph-image.tsx`, fonts in `src/og/`).
- JSON-LD: Organization, WebSite, MobileApplication with offers, WebPage, BreadcrumbList, FAQPage (`src/lib/jsonld.ts`).
- `sitemap.xml` with language alternates, `robots.txt` that explicitly allows search and AI crawlers, `manifest.webmanifest`.
- `/llms.txt` (summary + page index) and `/llms-full.txt` (all pages as Markdown) for AI assistants (`src/lib/llms.ts`).
- Static HTML, semantic headings, one `h1` per page, real links, `lang` per page, works without JavaScript.

## Deployment (production)

Same server as the API (`api.petprep.si`, Hetzner, Docker). **When it deploys, disk rules, rollback: [`DEPLOY.md`](DEPLOY.md).** In short (since 2026-11-04): a PR or push to `main` (including the hourly sync commits) runs **CI only and deploys nothing**; petprep.si is deployed **once a day at 03:47 Europe/Ljubljana** (`.github/workflows/daily-deploy.yml` → `deploy/daily-deploy.sh`, only when `main` has commits the site does not run yet and their CI is green) or by hand: Actions → CI & Deploy → Run workflow on `main`, target `production`. Pipeline (`.github/workflows/ci-deploy.yml`, since 2026-11-03 — David: faster deploys):

1. **plan** — on a push / Run workflow on `main` (first attempt), `deploy/ci-reuse-image.sh` looks for the marker `web-green-<git tree>` of a successful run of this workflow on the **same tree** (an up-to-date PR, or an earlier main run) whose digest is still in GHCR. Found → **checks and build are skipped** and a production run deploys that run's image digest. Otherwise (and always on PRs) the run builds.
2. **checks** — lint, `npm test`, `next typegen` + `tsc`, shellcheck + the harnesses `deploy/tests/{ci-reuse-image,deploy,daily-deploy}.test.sh`.
3. **build** — the run's **only** `next build` (~7,600 prerendered pages, ~5 min; `YOUTUBE_API_KEY` passed in for the prerendered /investors counts, never stored in the image), inside `node:22-alpine` (the runtime's libc, so sharp's native binary matches); `deploy/Dockerfile.prebuilt` packages the output (traced `node_modules` in their own layer, every mtime fixed so unchanged files give an unchanged layer); the smoke test (`/`, `/sl`, sitemap, register pages, share card with the AI portrait, uid 1001, health check); **after** it, same-repo runs push to `ghcr.io/datavallis/petprep-website` (per-run tag; newest 40 versions kept on main).
4. **Website CI OK** — green only when checks **and** build passed; uploads the marker (tree + image digest). This is the one check PRs and the breed / language automations wait for. Fork PRs build and test but do not push, so this check is skipped there (no forks in use).
5. **deploy** (only a Run workflow on `main` with target `production` — the daily job or by hand; never a push) — rsyncs the source (deploy scripts) to `/opt/petprep/website/incoming`, writes the runtime secrets, logs the server in to ghcr.io with the job's token over ssh stdin — into a private `mktemp` docker config, never the `deploy` user's `~/.docker`, which the API deploy uses at the same time — and runs `IMAGE_REF=<digest> EXPECT_TREE=<tree> deploy/deploy.sh`: disk preflight (removes old website images, refuses to pull with < 5 GB free — `DEPLOY.md` »Disk«), pulls exactly that digest (and deletes the private config), checks the image's `org.petprep.tree` label, smoke-tests it, promotes `:production` → `:previous` and `:next` → `:production`, recreates the `petprep-website` container (`deploy/compose.yaml`) on the API's Docker network `backend_petprep-network` (alias `website`), waits for the health check and rolls back to `:previous` on failure, then prunes again (by image id — removes every other `petprep-website` / `ghcr.io/datavallis/petprep-website` image, keeps `:production`, `:previous`, `:next` and images containers use). A failed pull changes nothing (the server never builds by itself). Then IndexNow.

**Before (2026-11-02 … 11-03):** the site was built twice per run (the »Lint, types, build« job and again in the Docker image job, which also exported ~500 MB of build cache), `main` repeated the whole PR pipeline and the deploy shipped a 450 MB `docker save` tarball — PR ~13 min, merge → live 17–20 min.

**Registry sync** (`.github/workflows/registry-sync.yml`, hourly + Run workflow, 2026-10-25): when pet-prep's `docs/research/breed-registry.json` differs from `src/content/registry/registry.json` and builds, the job commits it to `main` as `github-actions[bot]` and dispatches this workflow with target `none` = CI only (a `GITHUB_TOKEN` push starts no run by itself); the change goes live with the next daily deploy (up to ~1 day). **Care sync** (`care-sync.yml`, hourly at :47) does the same for `src/content/care/care-knowledge.json`. Neither needs a secret (pet-prep is public).

Caddy (in the API stack, `deployment/Caddyfile` of the `pet-prep` repo) terminates TLS for `petprep.si` / `www.petprep.si` and proxies to `website:3000`.

**Repository secrets** (Settings → Secrets and variables → Actions), the same values as in the `pet-prep` repo:

| Secret | Value |
|---|---|
| `PRODUCTION_SSH_PRIVATE_KEY` | private key of the `deploy` user (ed25519) |
| `PRODUCTION_HOST` | `138.199.172.97` (optional, default) |
| `PRODUCTION_USER` | `deploy` (optional, default) |
| `KLAVIYO_PRIVATE_API_KEY` | Klaviyo private API key (`pk_…`) with write access to Profiles, Lists and Subscriptions |
| `KLAVIYO_LIST_ID` | ID of the Klaviyo early-access list |

The two Klaviyo values (and `YOUTUBE_API_KEY`) are written to `/opt/petprep/website/.env` (mode 600) on every deploy and read by the container at start.
Without them the early-access form answers “not configured” (HTTP 503).

**Why not build on the server (2026-11-02):** with 15 languages `next build` prerenders ~7,600 pages, takes ~10 min and peaks at ~2 GB RAM; on the 4 GB API server the build was killed mid-way (deploy step ended with ssh exit 255, no error message). Building in CI keeps the API's memory untouched.

Manual deploy on the server (fallback — the normal manual deploy is Run workflow, target `production`; builds there with the full-build `Dockerfile` — needs ~2 GB free RAM): `bash /opt/petprep/website/incoming/deploy/deploy.sh /opt/petprep/website/incoming manual`. A specific CI image instead: `IMAGE_REF=ghcr.io/datavallis/petprep-website@sha256:… bash …/deploy.sh …` (log in to ghcr.io first).
Rollback: `docker tag petprep-website:previous petprep-website:production && docker compose -f /opt/petprep/website/incoming/deploy/compose.yaml up -d --force-recreate`.
