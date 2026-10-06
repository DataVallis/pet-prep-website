import { isLocale, locales, pageKeyFromSlug, pageKeys, pageSlugs } from "@/i18n/config";
import { getDictionary } from "@/content";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "PetPrep";

export function generateStaticParams() {
  return locales.flatMap((locale) => pageKeys.map((key) => ({ locale, slug: pageSlugs[key][locale] })));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: l, slug } = await params;
  const locale = isLocale(l) ? l : "en";
  const dict = getDictionary(locale);
  const key = pageKeyFromSlug(locale, slug);
  const page = key ? dict.pages[key] : undefined;
  return ogImage({
    eyebrow: page?.eyebrow ?? "PetPrep",
    title: page?.title ?? dict.meta.slogan,
    footer: `PetPrep · ${dict.meta.slogan}`,
  });
}
