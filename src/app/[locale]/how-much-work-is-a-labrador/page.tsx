import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadataFor } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { realCostAlternates, realCostCopy, realCostPath } from "@/content/realCost";
import { RealCostPage } from "@/components/real-cost/RealCostPage";

/**
 * /how-much-work-is-a-labrador — interactive 3D "How much work is a Labrador?" (M6-S04, David 2026-11-15).
 * Slovenian and English only, one static route folder per language (the twin is
 * ../koliko-dela-je-z-labradorcem/page.tsx). In the sitemap; not in the header or footer.
 */
const LOCALE = "en" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: LOCALE }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/how-much-work-is-a-labrador">): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== LOCALE) return {};
  const c = realCostCopy[LOCALE];
  return buildMetadataFor({ locale: LOCALE, path: realCostPath(LOCALE), languages: realCostAlternates(absoluteUrl), title: c.meta.title, description: c.meta.description });
}

export default async function RealCost({ params }: PageProps<"/[locale]/how-much-work-is-a-labrador">) {
  const { locale } = await params;
  if (locale !== LOCALE) notFound();
  return <RealCostPage locale={LOCALE} />;
}
