import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppPromptHint } from "@/components/AppPromptHint";
import { buildMetadataFor } from "@/lib/seo";
import { groupsCopy } from "@/content/groups";
import { GroupsPage } from "@/components/groups/GroupsPage";

/**
 * /groups — "PetPrep for Groups" pilot page (David 2026-11-15). English only.
 * HIDDEN: linked from nowhere, `noindex, nofollow`, not in the sitemap, llms files or IndexNow, no
 * structured data. The address is sent by hand to pilot partners. Do not add it to the header or footer
 * before the pilot is over and David decides to publish it.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/groups">): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};
  const m = buildMetadataFor({ locale: "en", path: "/groups", languages: {}, title: groupsCopy.meta.title, description: groupsCopy.meta.description, noIndex: true });
  return { ...m, robots: { index: false, follow: false } };
}

export default async function Groups({ params }: PageProps<"/[locale]/groups">) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return <><AppPromptHint variant="none" /><GroupsPage /></>;
}
