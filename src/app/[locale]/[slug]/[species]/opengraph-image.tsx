import { isLocale, pageSlugs } from "@/i18n/config";
import { getDictionary } from "@/content";
import { registry, speciesBySlug } from "@/content/registry/registry";
import { getRegistryCopy } from "@/lib/registry/views";
import { ogImage, ogSize } from "@/lib/og";

/** One share image per species and locale; breed and comparison pages below inherit it (cheap at 300 breeds). */
export const size = ogSize;
export const contentType = "image/png";
export const alt = "PetPrep";

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  const locale = params.locale;
  return registry.species.map((s) => ({ slug: pageSlugs.animals[locale], species: s.slug[locale] }));
}

export default async function Image({ params }: { params: Promise<{ locale: string; species: string }> }) {
  const { locale: l, species } = await params;
  const locale = isLocale(l) ? l : "en";
  const sp = speciesBySlug(locale, species);
  const c = getRegistryCopy(locale);
  return ogImage({
    eyebrow: c.catalogue.eyebrow,
    title: sp ? c.catalogue.title(sp.name[locale].many) : c.catalogue.eyebrow,
    footer: `PetPrep · ${getDictionary(locale).meta.slogan}`,
  });
}
