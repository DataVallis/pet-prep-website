import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthReturn } from "@/components/gift/AuthReturn";
import { authReturnParams } from "@/lib/giftRoutes";
import { isGiftEnabled } from "@/lib/gift";

export const dynamicParams = false;

/** One URL for all languages (`/auth/return`, served from the English tree); none while the gift switch is off (404). */
export function generateStaticParams() {
  return authReturnParams();
}

export const metadata: Metadata = {
  title: "PetPrep",
  robots: { index: false, follow: false },
};

export default function AuthReturnPage() {
  if (!isGiftEnabled()) notFound();
  return <AuthReturn />;
}
