import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/content";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "PetPrep";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return ogImage({ eyebrow: dict.home.hero.eyebrow, title: dict.meta.slogan, footer: "petprep.si" });
}
