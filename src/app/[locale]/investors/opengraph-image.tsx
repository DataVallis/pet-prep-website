import { ogImage, ogSize } from "@/lib/og";
import { investorsCopy } from "@/content/investors";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "PetPrep for investors";

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export default async function Image() {
  return ogImage({ eyebrow: investorsCopy.eyebrow, title: investorsCopy.title, footer: "PetPrep · Ready for a pet. There for its whole life." });
}
