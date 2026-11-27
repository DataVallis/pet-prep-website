# App sign-up prompt — bar + pop-up on every page

**Decision (David, 2026-11-27):** organic search brought ~500 clicks and no early-access sign-ups. The site ranks, the
funnel does not convert. Goal of every page: **the visitor leaves an e-mail because the app interests them → app
download → payment.** No lead magnets, no other "page on the page": the bar and the pop-up ask for exactly the same
thing as the page's own call to action. Content is never locked behind the e-mail (that would cost the rankings that
work today).

Code: `src/components/AppPrompt.tsx` (client, mounted once in the locale layout), rules `src/lib/appPrompt.ts`
(tested: `src/lib/appPrompt.test.ts`), page marker `src/components/AppPromptHint.tsx`, copy `appPrompt` in every
dictionary (15 languages).

## What the visitor sees

| | When | Where |
|---|---|---|
| **Bar** (bottom of the screen: one sentence + button + ×) | after 240 px of scrolling; hidden while one of the page's own e-mail forms is on screen | every page except "none" pages |
| **Pop-up** (bottom sheet on phones, centred dialog on desktop) | once per visit: after 8 s on the page **and** half of the page seen, or when the pointer leaves through the top of the window (desktop); also when the bar's button is pressed | every page except "none" and "quiet" pages |

Neither appears over the cookie banner, over another dialog, or (pop-up) while the visitor is typing or one of the
page's own e-mail forms is on screen. The pop-up is never a full-screen wall on a phone and never opens on arrival
(Google's intrusive-interstitial rule).

**The offer is the same everywhere; only the first sentence follows the page:**

| Page | Marker | Headline (EN) | Picture |
|---|---|---|---|
| any page without a marker (home, how it works, for kids, colouring pages, register lists …) | – (`default`) | Is your child asking for a pet? | app screen |
| breed page | `breed` + the breed | *Breed name* · Thinking about this breed? | that breed's own portrait (without one: default wording) |
| care knowledge, species care page, food page | `care` | Planning a pet for your family? | app screen |
| breed quiz, »How much work is a dog?« | `quiet` | bar only (the visitor is mid-tool) | – |
| emergency page, gift / redeem / kit and their thank-you pages, privacy, terms, child safety, delete account, accessibility, contact, partners, investors, groups, `/auth/return` | `none` | nothing | – |

A new page that must stay quiet renders `<AppPromptHint variant="none" />`; nothing else to maintain (no URL lists).
The breed name is shown above the headline in its dictionary form, so no language has to decline it.

**Once the app is live** (`site.launchState === "live"` with both store links) the pop-up shows the two store buttons
instead of the e-mail form and the bar's button carries `cta.primary`. Not built yet: showing only the visitor's own
store (iPhone → App Store) — do it with the launch switch.

## Remembering the answer

`localStorage["petprep.prompt"]` — `{ signedUp?, popupClosedAt?, barClosedAt? }`, no address, no identifier, never
sent anywhere; listed in the privacy policy (section Cookies, all 15 languages, `legalUpdated` 2026-11-27).

- e-mail left in **any** early-access form on the site → bar and pop-up never again on this browser;
- pop-up closed → not again for 30 days (and never twice in one visit);
- bar closed → back after 7 days.

## Sign-ups and measuring

The pop-up uses `EarlyAccessForm`, so an address goes to our database and to Klaviyo exactly like the other forms:
`purpose: early_access`, **`source: app_prompt`**, `section: popup_default | popup_breed | popup_care | bar_default |
bar_breed | bar_care` (opened by itself or from the bar × wording), plus page, language, breed, UTM and referrer as
usual. Admin → E-mails (website) → filter by source `app_prompt`.

Google Analytics events (consent mode applies): `app_prompt_view`, `app_prompt_close`, `app_prompt_signup`,
`app_prompt_store` with `prompt` (popup | bar) and `wording`.

**What to expect:** a prompt like this usually turns 1–3 % of visitors into sign-ups. Judge it after ~1,000 organic
visits; if it stays under 1 %, change the wording first (one variable at a time), then the trigger.

## Decisions Claude made (David can change)

- Trigger numbers: 8 s + half the page; quiet periods 30 / 7 days (`src/lib/appPrompt.ts`).
- Which pages are "none" / "quiet" (table above).
- Button: »Tell me when it's out« (bar on phones: the short form »Notify me«); the header keeps »Get early access«.
- Picture: a real app screen (`/screens/<en|sl>/hud.webp`; other languages show the English screen like the rest of
  the site). A short screen recording of the app would say more — replace the image when David supplies one.

## Follow-ups

- pet-prep (API): readable label for source `app_prompt` in `EmailSignup::sourceLabel()` (the raw value shows until then).
- After the App Store transfer: flip `launchState`, show the visitor's own store first.
- Welcome e-mail in Klaviyo right after the sign-up (app clip + what is free), so sign-ups do not go cold before launch.

## Design review

Independent review (design-review skill), 2026-11-27: FAIL in round 1 (breed pop-up showed another breed's picture,
desktop field too narrow, phone layout was the desktop layout shrunk), **PASS in round 2**. The medium notes of
round 2 (portrait crop, no phone bezel on the band, visible focus ring, launch wording in the bar from 640 px) were
applied afterwards and checked by eye, not re-reviewed.
