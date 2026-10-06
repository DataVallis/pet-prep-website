# Emails

Hand-coded HTML emails for Klaviyo. Edit the copy in `build.py`, then run `python3 emails/build.py`;
it writes `early-access-welcome.<lang>.html` and a plain-text version `.txt` for every language.
Images are served from `public/brand/email/` → `https://petprep.si/brand/email/…` (PNG only: Gmail and
Outlook don't show SVG).

## Early-access welcome ("Ste na seznamu" / "You're on the list")

Sent once, right after someone joins the early-access list on the website.

**Language.** `/api/subscribe` stores the page language on the Klaviyo profile as the custom property
`petprep_language` (`sl` or `en`; anything unknown is stored as `en`). Use it in Klaviyo:

1. Flow → trigger **Added to list** = the early-access list (`KLAVIYO_LIST_ID`).
2. **Conditional split**: `Properties about someone` → `petprep_language` **equals** `sl`.
   - YES → email "Ste na seznamu 🎉" (paste `early-access-welcome.sl.html` in the code editor).
   - NO → email "You're on the list 🎉" (paste `early-access-welcome.en.html`). Profiles without the
     property (rare: the profile import is best effort) get English.
3. Sender name "PetPrep", sender `hello@petprep.si` (needs a verified sending domain for petprep.si).
4. Preview text is already in the HTML (hidden preheader); Klaviyo's "Preview text" field can repeat it.

Every later campaign uses the same rule: one campaign per language, audience = segment
`petprep_language = sl` / everyone else. A new website language only needs a new `COPY` entry here and a new
branch in the split.

**Double opt-in.** If the list uses double opt-in, Klaviyo first sends its own confirmation email (one
template per list, one language) and "Added to list" fires only after the click. Either switch the list to
single opt-in, or make the confirmation email bilingual.

**Klaviyo tags** in the templates: `{% unsubscribe %}`, `{{ organization.name }}`,
`{{ organization.full_address }}` (set in the Klaviyo account settings — legally required footer).
