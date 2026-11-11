import type { Metadata } from "next";
import { assertGift, giftMetadata, RedeemPage } from "@/components/gift/GiftPages";
import { giftStaticLocale } from "@/lib/giftRoutes";

/** Gift voucher (M6-S01): sl route, only while NEXT_PUBLIC_FEATURE_GIFT=1 (otherwise no static params, so a 404). */
export const dynamicParams = false;

export function generateStaticParams() {
  return giftStaticLocale("sl");
}

export async function generateMetadata({ params }: PageProps<"/[locale]/unovci">): Promise<Metadata> {
  const { locale } = await params;
  return giftMetadata("redeem", "sl", locale);
}

export default async function Page({ params }: PageProps<"/[locale]/unovci">) {
  const { locale } = await params;
  assertGift("sl", locale);
  return <RedeemPage lang="sl" />;
}
