import type { Metadata } from "next";
import { assertGift, giftMetadata, ThanksPage } from "@/components/gift/GiftPages";
import { giftStaticLocale } from "@/lib/giftRoutes";

/** Gift voucher (M6-S01): sl route, only while NEXT_PUBLIC_FEATURE_GIFT=1 (otherwise no static params, so a 404). */
export const dynamicParams = false;

export function generateStaticParams() {
  return giftStaticLocale("sl");
}

export async function generateMetadata({ params }: PageProps<"/[locale]/darilni-bon/hvala">): Promise<Metadata> {
  const { locale } = await params;
  return giftMetadata("thanks", "sl", locale);
}

export default async function Page({ params }: PageProps<"/[locale]/darilni-bon/hvala">) {
  const { locale } = await params;
  assertGift("sl", locale);
  return <ThanksPage lang="sl" />;
}
