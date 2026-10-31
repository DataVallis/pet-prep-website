import { isLocale, pageSlugs } from "@/i18n/config";
import { getDictionary } from "@/content";
import { registry, speciesBySlug } from "@/content/registry/registry";
import { getRegistryCopy } from "@/lib/registry/views";
import { ogImage, ogSize } from "@/lib/og";
import { careSpeciesParams, emergencyParams, isEmergencySlug } from "@/components/care/CarePages";
import { emergencyCopy } from "@/content/care/emergency";
import { careSpeciesBySlug, isCareSlug } from "@/content/care/care";
import { getCareCopy, speciesWords } from "@/content/care/copy";
import { coloringParams, isColoringSlug, resolveColoring } from "@/components/coloring/ColoringPages";

/** One share image per species and locale; breed and comparison pages below inherit it (cheap at 300 breeds). */
export const size = ogSize;
export const contentType = "image/png";
export const alt = "PetPrep";

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  const locale = params.locale;
  return [...registry.species.map((s) => ({ slug: pageSlugs.animals[locale], species: s.slug[locale] })), ...careSpeciesParams(locale), ...emergencyParams(locale), ...coloringParams(locale)];
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string; species: string }> }) {
  const { locale: l, slug, species } = await params;
  const locale = isLocale(l) ? l : "en";
  if (isColoringSlug(locale, slug)) {
    const dict = getDictionary(locale);
    return ogImage({ eyebrow: dict.pages.coloring.eyebrow, title: resolveColoring(locale, species)?.title[locale] ?? dict.pages.coloring.title, footer: `PetPrep · ${dict.meta.slogan}` });
  }
  if (isCareSlug(locale, slug)) {
    const sp = careSpeciesBySlug(locale, species);
    const em = isEmergencySlug(locale, species);
    return ogImage({
      eyebrow: em ? emergencyCopy[locale].eyebrow : getCareCopy(locale).species.eyebrow,
      title: em ? emergencyCopy[locale].title : sp ? speciesWords(locale, sp.id).question : getCareCopy(locale).breadcrumb,
      footer: `PetPrep · ${getDictionary(locale).meta.slogan}`,
    });
  }
  const sp = speciesBySlug(locale, species);
  const c = getRegistryCopy(locale);
  return ogImage({
    eyebrow: c.catalogue.eyebrow,
    title: sp ? c.catalogue.title(sp.name[locale].many) : c.catalogue.eyebrow,
    footer: `PetPrep · ${getDictionary(locale).meta.slogan}`,
  });
}
