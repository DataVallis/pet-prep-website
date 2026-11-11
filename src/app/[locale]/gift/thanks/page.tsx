import type { Metadata } from "next";
import { assertGift, giftMetadata, ThanksPage } from "@/components/gift/GiftPages";
import { giftStaticLocale } from "@/lib/giftRoutes";

/** Gift voucher (M6-S01): en route, only while NEXT_PUBLIC_FEATURE_GIFT=1 (otherwise no static params, so a 404). */
export const dynamicParams = false;

export function generateStaticParams() {
  return giftStaticLocale("en");
}

export async function generateMetadata({ params }: PageProps<"/[locale]/gift/thanks">): Promise<Metadata> {
  const { locale } = await params;
  return giftMetadata("thanks", "en", locale);
}

export default async function Page({ params }: PageProps<"/[locale]/gift/thanks">) {
  const { locale } = await params;
  assertGift("en", locale);
  return <ThanksPage lang="en" />;
}
