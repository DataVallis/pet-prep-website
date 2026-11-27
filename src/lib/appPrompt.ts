/**
 * App sign-up prompt (David 2026-11-27: »vpišejo maile, ker jih aplikacija zanima … prenos aplikacije in plačila«):
 * a bottom bar and one pop-up on every page that ask for the same thing as the page's own call to action — an e-mail
 * for early access to the app (store buttons once `site.launchState` is "live"). Only the first sentence follows the
 * page. Pure helpers (no alias imports, no DOM) so node --test can run them; the component is components/AppPrompt.tsx.
 * Spec: docs/APP_SIGNUP_PROMPT.md.
 */

/**
 * What a page allows, declared by the page itself with `<AppPromptHint>` (a hidden marker, components/AppPromptHint.tsx):
 * - "default": bar + pop-up, parent wording (»Is your child asking for a pet?«) — also when a page has no marker;
 * - "breed":   bar + pop-up, breed wording (a breed page; the marker carries the breed);
 * - "care":    bar + pop-up, care wording (care knowledge, food pages);
 * - "quiet":   bar only (the visitor is in the middle of a tool: breed quiz, »How much work is a dog?«);
 * - "none":    nothing (emergency page, buying / redeeming, legal pages, investors, partners, sign-in).
 */
export const PROMPT_VARIANTS = ["default", "breed", "care", "quiet", "none"] as const;
export type PromptVariant = (typeof PROMPT_VARIANTS)[number];

export function isPromptVariant(v: unknown): v is PromptVariant {
  return typeof v === "string" && (PROMPT_VARIANTS as readonly string[]).includes(v);
}

/** Pop-up: not before the visitor spent this long on the page … */
export const POPUP_MIN_MS = 8_000;
/** … and scrolled through half of it (or moved the pointer out of the top of the window on a desktop). */
export const POPUP_SCROLL_SHARE = 0.5;
/** A closed pop-up stays away this long (it never opens twice in one visit either). */
export const POPUP_QUIET_DAYS = 30;
/** A closed bar stays away this long. */
export const BAR_QUIET_DAYS = 7;
/** The bar appears after this much scrolling (px). */
export const BAR_SCROLL_PX = 240;

/** localStorage entry (listed in the privacy policy, section Cookies): only these three values, no identifier. */
export const PROMPT_STORE_KEY = "petprep.prompt";
export type PromptMemory = {
  /** The visitor left an e-mail on this browser (any early-access form): never ask again. */
  signedUp?: boolean;
  /** When the pop-up was last closed (ms since epoch). */
  popupClosedAt?: number;
  /** When the bar was last closed (ms since epoch). */
  barClosedAt?: number;
};

type Store = Pick<Storage, "getItem" | "setItem"> | null | undefined;
const DAY = 86_400_000;
const time = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v > 0 ? v : undefined);

/** Never throws; anything unreadable is an empty memory. */
export function readMemory(store: Store): PromptMemory {
  try {
    const raw = store?.getItem(PROMPT_STORE_KEY);
    if (!raw) return {};
    const v = JSON.parse(raw) as Record<string, unknown>;
    if (!v || typeof v !== "object") return {};
    return { signedUp: v.signedUp === true ? true : undefined, popupClosedAt: time(v.popupClosedAt), barClosedAt: time(v.barClosedAt) };
  } catch { return {}; }
}

/** Merges `patch` into the stored memory. Never throws (private mode: the prompt then simply shows again next visit). */
export function writeMemory(store: Store, patch: PromptMemory): void {
  try {
    if (!store) return;
    store.setItem(PROMPT_STORE_KEY, JSON.stringify({ ...readMemory(store), ...patch }));
  } catch { /* storage blocked */ }
}

export function popupAllowed(variant: PromptVariant, memory: PromptMemory, now: number): boolean {
  if (variant === "none" || variant === "quiet" || memory.signedUp) return false;
  return !memory.popupClosedAt || now - memory.popupClosedAt >= POPUP_QUIET_DAYS * DAY;
}

export function barAllowed(variant: PromptVariant, memory: PromptMemory, now: number): boolean {
  if (variant === "none" || memory.signedUp) return false;
  return !memory.barClosedAt || now - memory.barClosedAt >= BAR_QUIET_DAYS * DAY;
}

/** True once the visitor has seen at least POPUP_SCROLL_SHARE of the page (a page shorter than two screens counts at its end). */
export function scrolledEnough(scrollY: number, viewportH: number, pageH: number): boolean {
  if (pageH <= 0 || viewportH <= 0) return false;
  if (pageH <= viewportH * 1.2) return false; // nothing to scroll: wait for exit intent instead
  return (scrollY + viewportH) / pageH >= POPUP_SCROLL_SHARE && scrollY > viewportH * 0.25;
}

/** The headline / text pair of a variant ("quiet" and anything without its own wording use the default one). */
export function copyKey(variant: PromptVariant, hasBreed: boolean): "default" | "breed" | "care" {
  if (variant === "breed" && hasBreed) return "breed";
  return variant === "care" ? "care" : "default";
}

/** `section` sent with the sign-up: where it was opened from and on what kind of page, e.g. popup_breed, bar_care. */
export function promptSection(opened: "popup" | "bar", variant: PromptVariant, hasBreed: boolean): string {
  return `${opened}_${copyKey(variant, hasBreed)}`;
}

/** `source` of these sign-ups in our e-mail database (^[a-z0-9_]{1,32}$). */
export const PROMPT_SOURCE = "app_prompt";

/** Fired on `window` by every early-access form once an address was accepted: the bar and pop-up then stay away. */
export const SIGNED_UP_EVENT = "petprep:signed-up";
