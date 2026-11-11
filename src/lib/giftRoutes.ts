/**
 * Routing of the gift voucher pages (M6-S01, contract §8): SL + EN only, everything behind
 * NEXT_PUBLIC_FEATURE_GIFT. Pure (no alias imports) so next.config.ts, the sitemap and the unit tests
 * share it. Switch off → no static params, no redirects, no sitemap entry: the URLs answer the branded 404.
 */
import { locales } from "../i18n/config.ts";
import { giftPaths, isGiftEnabled, type GiftPageKey } from "./gift.ts";

const pageKeys: GiftPageKey[] = ["gift", "thanks", "redeem"];

/** Locales that get a static page for one key: English for the EN route, Slovenian for the SL route. */
export function giftStaticLocale(lang: "en" | "sl", enabled: boolean = isGiftEnabled()): { locale: string }[] {
  return enabled ? [{ locale: lang }] : [];
}

/**
 * The 13 other site languages (D8): their prefixed URL 308-redirects to the English page. They use the
 * English slug, e.g. /de/gift → /gift. Not emitted while the switch is off.
 */
export function giftRedirects(enabled: boolean = isGiftEnabled()): { source: string; destination: string; permanent: true }[] {
  if (!enabled) return [];
  return pageKeys.flatMap((key) =>
    locales
      .filter((l) => l !== "en" && l !== "sl")
      .map((l) => ({ source: `/${l}${giftPaths[key].en}`, destination: giftPaths[key].en, permanent: true as const })),
  );
}

/** Only the sales page is indexable; thanks and redeem never reach the sitemap. */
export function giftSitemapPaths(enabled: boolean = isGiftEnabled()): { en: string; sl: string } | null {
  return enabled ? { en: giftPaths.gift.en, sl: giftPaths.gift.sl } : null;
}
