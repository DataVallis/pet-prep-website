import type { Metadata } from "next";
import { breedSlugs, defaultLocale, locales, localeMeta, pathFor, pathForBreed, type BreedId, type Locale, type RouteKey } from "@/i18n/config";
import { absoluteUrl, site } from "@/lib/site";

export function alternatesFor(key: RouteKey) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].htmlLang] = absoluteUrl(pathFor(l, key));
  languages["x-default"] = absoluteUrl(pathFor(defaultLocale, key));
  return languages;
}

export function breedAlternates(id: BreedId) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].htmlLang] = absoluteUrl(pathForBreed(l, id));
  languages["x-default"] = absoluteUrl(pathForBreed(defaultLocale, id));
  return languages;
}

export function buildMetadata(opts: {
  locale: Locale;
  key: RouteKey;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  return buildMetadataFor({ ...opts, path: pathFor(opts.locale, opts.key), languages: alternatesFor(opts.key) });
}

/** Metadata of a breed register page (/breeds/<slug>, /sl/pasme/<slug>). */
export function buildBreedMetadata(opts: { locale: Locale; id: BreedId; title: string; description: string }): Metadata {
  if (!breedSlugs[opts.id]) throw new Error(`unknown breed ${opts.id}`);
  return buildMetadataFor({ ...opts, path: pathForBreed(opts.locale, opts.id), languages: breedAlternates(opts.id) });
}

function buildMetadataFor(opts: {
  locale: Locale;
  path: string;
  languages: Record<string, string>;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  const { locale, title, description } = opts;
  const url = absoluteUrl(opts.path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: opts.languages },
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
