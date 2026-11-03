import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadataFor } from "@/lib/seo";
import { breadcrumbLd, graph, webPageLd } from "@/lib/jsonld";
import { getDictionary } from "@/content";
import { investorsCopy } from "@/content/investors";
import { JsonLd } from "@/components/JsonLd";
import { InvestorsPage } from "@/components/investors/InvestorsPage";
import { getInvestorStats } from "@/lib/investorStats";

/**
 * /investors (David 2026-11-01): English only — other languages' investor URLs redirect here
 * (next.config.ts). Public, linked from the footer only, noindex and kept out of sitemap, llms and
 * IndexNow. Live numbers rebuild on every deploy; the page revalidates hourly (YouTube data is cached a
 * day, the Web Summit card hides itself after the event).
 */
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/investors">): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};
  return buildMetadataFor({ locale: "en", path: "/investors", languages: {}, title: investorsCopy.meta.title, description: investorsCopy.meta.description, noIndex: true });
}

export default async function Investors({ params }: PageProps<"/[locale]/investors">) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  const dict = getDictionary("en");
  const ld = graph(webPageLd("en", "investors", investorsCopy.meta.title, investorsCopy.meta.description), breadcrumbLd("en", dict, "investors", investorsCopy.eyebrow));
  return (
    <>
      <JsonLd data={ld} />
      <InvestorsPage stats={await getInvestorStats()} />
    </>
  );
}
