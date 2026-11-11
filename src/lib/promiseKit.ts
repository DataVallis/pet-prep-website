/**
 * Pet Promise Kit (M6-S02) — switch, URLs and sitemap entries of the sales page, in all 15 site languages
 * (David 2026-11-11): `/promise-kit` (en), `/sl/obljuba-o-ljubljencku`, `/de/haustier-versprechen`, … one localized slug
 * per language (src/i18n/config.ts → salesSlugs). Pure functions with the env passed in, so `npm test` can check every
 * case; the callers pass `process.env.NEXT_PUBLIC_…` literally (Next inlines those at build time).
 *
 * - NEXT_PUBLIC_FEATURE_PROMISE_KIT === "1"  page, sitemap, llms.txt and footer link exist; otherwise none of them.
 * - NEXT_PUBLIC_LS_KIT_URL / NEXT_PUBLIC_LS_SAMPLE_URL  Lemon Squeezy checkout links; a missing or non-https
 *   value hides that button.
 * - NEXT_PUBLIC_FEATURE_GIFT === "1"  the page links to the gift page (owned by M6-S01).
 */
import { isLocale, locales, salesSlugs, type Locale } from "../i18n/config.ts";
import { formatEuro, giftPath, promiseKitHref } from "./gift.ts";

export type KitLocale = Locale;
export const kitLocales: readonly KitLocale[] = locales;
/** Price of the kit (one constant; the page formats it per language with Intl). */
export const KIT_PRICE_EUR = 6.9;
export const promiseKitUpdated = "2026-11-11";

export const isKitLocale = (l: string): l is KitLocale => isLocale(l);
export const promiseKitEnabled = (flag: string | undefined) => flag === "1";
export const giftEnabled = (flag: string | undefined) => flag === "1";

export function promiseKitPath(l: KitLocale): string {
  return promiseKitHref(l);
}

/** "6,90 €" (sl, de, fr, …), "€6.90" (en). */
export function formatKitPrice(l: KitLocale): string {
  return formatEuro(KIT_PRICE_EUR, l);
}

/** Gift page path (M6-S01) in a language, used only when the gift switch is on. */
export function giftPageOf(l: KitLocale): string {
  return giftPath(l, "gift");
}

/** A checkout URL is used only when it is a non-empty https URL. */
export function checkoutUrl(raw: string | undefined): string | undefined {
  const v = raw?.trim();
  if (!v) return undefined;
  try {
    return new URL(v).protocol === "https:" ? v : undefined;
  } catch {
    return undefined;
  }
}

/** Current switch state, read from the build environment. */
export function promiseKitConfig() {
  return {
    enabled: promiseKitEnabled(process.env.NEXT_PUBLIC_FEATURE_PROMISE_KIT),
    buyUrl: checkoutUrl(process.env.NEXT_PUBLIC_LS_KIT_URL),
    sampleUrl: checkoutUrl(process.env.NEXT_PUBLIC_LS_SAMPLE_URL),
    gift: giftEnabled(process.env.NEXT_PUBLIC_FEATURE_GIFT),
  };
}

/** Locales that have a page while the switch is on; none while it is off. */
export function promiseKitLocales(enabled: boolean): KitLocale[] {
  return enabled ? [...kitLocales] : [];
}

/** Static params `{ locale, slug }` of the sales page: none while the switch is off. */
export function promiseKitSlugParams(enabled: boolean): { locale: KitLocale; slug: string }[] {
  return promiseKitLocales(enabled).map((locale) => ({ locale, slug: salesSlugs.promiseKit[locale] }));
}

/** Paths per language for the hreflang map. */
export function promiseKitAlternatePaths(): Record<KitLocale, string> {
  return Object.fromEntries(kitLocales.map((l) => [l, promiseKitPath(l)])) as Record<KitLocale, string>;
}

export type KitSitemapEntry = { locale: KitLocale; path: string; lastModified: string };

/** Sitemap rows (paths, not absolute URLs): empty while the switch is off. The hreflang map is `pathAlternates(promiseKitAlternatePaths())`. */
export function promiseKitSitemapEntries(enabled: boolean): KitSitemapEntry[] {
  return promiseKitLocales(enabled).map((l) => ({ locale: l, path: promiseKitPath(l), lastModified: promiseKitUpdated }));
}

/** Footer link for a locale: undefined when the switch is off. */
export function promiseKitFooterHref(enabled: boolean, locale: Locale | string): string | undefined {
  return promiseKitLocales(enabled).find((l) => l === locale) ? promiseKitPath(locale as KitLocale) : undefined;
}
