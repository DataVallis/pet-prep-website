/**
 * Pet Promise Kit (M6-S02) — switch, URLs and sitemap entries of the sales page.
 * `/promise-kit` · `/sl/obljuba-o-ljubljencku`, English and Slovenian only (the other 13 languages get a 404 and
 * no sitemap or hreflang entry). Pure functions with the env passed in, so `npm test` can check every case;
 * the callers pass `process.env.NEXT_PUBLIC_…` literally (Next inlines those at build time).
 *
 * - NEXT_PUBLIC_FEATURE_PROMISE_KIT === "1"  page, sitemap, llms.txt and footer link exist; otherwise none of them.
 * - NEXT_PUBLIC_LS_KIT_URL / NEXT_PUBLIC_LS_SAMPLE_URL  Lemon Squeezy checkout links; a missing or non-https
 *   value hides that button.
 * - NEXT_PUBLIC_FEATURE_GIFT === "1"  the page links to the gift page (owned by M6-S01).
 */
import type { Locale } from "@/i18n/config";

export type KitLocale = "en" | "sl";
export const kitLocales: readonly KitLocale[] = ["en", "sl"];
export const promiseKitSlug: Record<KitLocale, string> = { en: "promise-kit", sl: "obljuba-o-ljubljencku" };
/** Gift page paths (M6-S01), used only when the gift switch is on. */
export const giftPath: Record<KitLocale, string> = { en: "/gift", sl: "/sl/darilni-bon" };
export const promiseKitUpdated = "2026-11-11";

export const isKitLocale = (l: string): l is KitLocale => (kitLocales as readonly string[]).includes(l);
export const promiseKitEnabled = (flag: string | undefined) => flag === "1";
export const giftEnabled = (flag: string | undefined) => flag === "1";

export function promiseKitPath(l: KitLocale): string {
  return `${l === "en" ? "" : "/sl"}/${promiseKitSlug[l]}`;
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

/** Paths per language for the hreflang map (only the languages that have the page). */
export function promiseKitAlternatePaths(): Record<KitLocale, string> {
  return { en: promiseKitPath("en"), sl: promiseKitPath("sl") };
}

export type KitSitemapEntry = { path: string; lastModified: string; languages: Record<string, string> };

/** Sitemap rows (paths, not absolute URLs): empty while the switch is off. */
export function promiseKitSitemapEntries(enabled: boolean): KitSitemapEntry[] {
  const paths = promiseKitAlternatePaths();
  return promiseKitLocales(enabled).map((l) => ({
    path: paths[l],
    lastModified: promiseKitUpdated,
    languages: { en: paths.en, sl: paths.sl, "x-default": paths.en },
  }));
}

/** Footer link for a locale: undefined when the switch is off or the language has no page. */
export function promiseKitFooterHref(enabled: boolean, locale: Locale | string): string | undefined {
  return promiseKitLocales(enabled).find((l) => l === locale) ? promiseKitPath(locale as KitLocale) : undefined;
}
