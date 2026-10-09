import { breedIdFromSlug, breedIds, breedSlugs, isLocale, pageSlugs } from "@/i18n/config";
import { getBreedCopy } from "@/content/breeds";
import { getDictionary } from "@/content";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "PetPrep";

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  const locale = params.locale;
  return breedIds.map((id) => ({ slug: pageSlugs.breeds[locale], breed: breedSlugs[id][locale] }));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string; breed: string }> }) {
  const { locale: l, breed } = await params;
  const locale = isLocale(l) ? l : "en";
  const c = getBreedCopy(locale);
  const id = breedIdFromSlug(locale, breed);
  const dict = getDictionary(locale);
  return ogImage({
    eyebrow: c.page.eyebrow,
    title: id ? c.breeds[id].name : c.page.eyebrow,
    footer: `PetPrep · ${dict.meta.slogan}`,
  });
}
