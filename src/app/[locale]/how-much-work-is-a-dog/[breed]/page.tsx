import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadataFor } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { realCostAlternates, realCostCopy, realCostPath } from "@/content/realCost";
import { realCostBreedBySlug, realCostBreeds } from "@/lib/realCostRoutes";
import { RealCostPage } from "@/components/real-cost/RealCostPage";

/**
 * /how-much-work-is-a-dog/<breed> — interactive 3D "How much work is a dog?" for one dog breed
 * (M6-S04, every breed of the register since M6-S07, David 2026-11-16). Slovenian and English only, one static
 * route folder per language (the twin is ../../koliko-je-dela-s-psom/[breed]/page.tsx).
 * A new breed in the register gets its page on the next build. In the sitemap; not in the header or footer.
 */
const LOCALE = "en" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return realCostBreeds().map(({ breed }) => ({ locale: LOCALE, breed: breed.slug[LOCALE] }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/how-much-work-is-a-dog/[breed]">): Promise<Metadata> {
  const { locale, breed: slug } = await params;
  const hit = locale === LOCALE ? realCostBreedBySlug(LOCALE, slug) : undefined;
  if (!hit) return {};
  const c = realCostCopy(LOCALE, hit.breed.name[LOCALE], hit.profile);
  return buildMetadataFor({
    locale: LOCALE,
    path: realCostPath(LOCALE, slug),
    languages: realCostAlternates(absoluteUrl, { en: hit.breed.slug.en, sl: hit.breed.slug.sl }),
    title: c.meta.title,
    description: c.meta.description,
  });
}

export default async function RealCost({ params }: PageProps<"/[locale]/how-much-work-is-a-dog/[breed]">) {
  const { locale, breed: slug } = await params;
  const hit = locale === LOCALE ? realCostBreedBySlug(LOCALE, slug) : undefined;
  if (!hit) notFound();
  return <RealCostPage locale={LOCALE} name={hit.breed.name[LOCALE]} profile={hit.profile} />;
}
