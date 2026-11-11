import type { Metadata } from "next";
import { PromiseKitPage, promiseKitMetadata } from "@/components/promise-kit/PromiseKitPage";

/**
 * Pet Promise Kit sales page (M6-S02), language "sl" only. Behind NEXT_PUBLIC_FEATURE_PROMISE_KIT=1
 * (src/lib/promiseKit.ts): switch off or any other language gives a 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "sl" }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/obljuba-o-ljubljencku">): Promise<Metadata> {
  const { locale } = await params;
  return locale === "sl" ? promiseKitMetadata(locale) : {};
}

export default async function Page({ params }: PageProps<"/[locale]/obljuba-o-ljubljencku">) {
  const { locale } = await params;
  return <PromiseKitPage locale={locale === "sl" ? locale : ""} />;
}
