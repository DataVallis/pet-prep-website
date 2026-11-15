import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadataFor } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { realCostAlternates, realCostCopy, realCostPath } from "@/content/realCost";
import { RealCostPage } from "@/components/real-cost/RealCostPage";

/**
 * /sl/koliko-dela-je-z-labradorcem — interactive 3D "How much work is a Labrador?" (M6-S04, David 2026-11-15).
 * Slovenian and English only, one static route folder per language (the twin is
 * ../how-much-work-is-a-labrador/page.tsx). In the sitemap; not in the header or footer.
 */
const LOCALE = "sl" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: LOCALE }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/koliko-dela-je-z-labradorcem">): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== LOCALE) return {};
  const c = realCostCopy[LOCALE];
  return buildMetadataFor({ locale: LOCALE, path: realCostPath(LOCALE), languages: realCostAlternates(absoluteUrl), title: c.meta.title, description: c.meta.description });
}

export default async function RealCost({ params }: PageProps<"/[locale]/koliko-dela-je-z-labradorcem">) {
  const { locale } = await params;
  if (locale !== LOCALE) notFound();
  return <RealCostPage locale={LOCALE} />;
}
