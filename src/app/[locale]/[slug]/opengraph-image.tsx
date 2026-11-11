import { isLocale, locales, pageKeyFromSlug, pageSlugs, salesPageFromSlug, sitePageKeys } from "@/i18n/config";
import { giftCopy } from "@/content/gift";
import { sales } from "@/content/promise-kit/sales.ts";
import { giftSlugParams } from "@/lib/giftRoutes";
import { promiseKitConfig, promiseKitSlugParams } from "@/lib/promiseKit";
import { getDictionary } from "@/content";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "PetPrep";

export function generateStaticParams() {
  return [
    ...locales.flatMap((locale) => sitePageKeys.map((key) => ({ locale, slug: pageSlugs[key][locale] }))),
    ...giftSlugParams(),
    ...promiseKitSlugParams(promiseKitConfig().enabled),
  ];
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: l, slug } = await params;
  const locale = isLocale(l) ? l : "en";
  const dict = getDictionary(locale);
  const key = pageKeyFromSlug(locale, slug);
  const page = key ? dict.pages[key] : undefined;
  // Gift voucher and promise kit sales pages (every language): their own title.
  const salesKey = salesPageFromSlug(locale, slug);
  if (salesKey) {
    const c = salesKey === "promiseKit" ? sales[locale] : giftCopy[locale];
    return ogImage({ eyebrow: c.eyebrow, title: c.title, footer: `PetPrep · ${dict.meta.slogan}` });
  }
  return ogImage({
    eyebrow: page?.eyebrow ?? "PetPrep",
    title: page?.title ?? dict.meta.slogan,
    footer: `PetPrep · ${dict.meta.slogan}`,
  });
}
