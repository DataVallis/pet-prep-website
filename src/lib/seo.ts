import type { Metadata } from "next";
import { defaultLocale, locales, localeMeta, pathFor, type Locale, type RouteKey } from "@/i18n/config";
import { absoluteUrl, site } from "@/lib/site";

export function alternatesFor(key: RouteKey) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].htmlLang] = absoluteUrl(pathFor(l, key));
  languages["x-default"] = absoluteUrl(pathFor(defaultLocale, key));
  return languages;
}

export function buildMetadata(opts: {
  locale: Locale;
  key: RouteKey;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  const { locale, key, title, description } = opts;
  const url = absoluteUrl(pathFor(locale, key));
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: alternatesFor(key) },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      locale: localeMeta[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].og),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: opts.noIndex ? { index: false, follow: true } : { index: true, follow: true },
  };
}
