import type { Metadata } from "next";
import { defaultLocale, locales, localeMeta, pathFor, type Locale, type RouteKey } from "@/i18n/config";
import { absoluteUrl, site } from "@/lib/site";

export function alternatesFor(key: RouteKey) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].htmlLang] = absoluteUrl(pathFor(l, key));
  languages["x-default"] = absoluteUrl(pathFor(defaultLocale, key));
  return languages;
}

/** hreflang map for a page whose path differs per locale (animal register pages). */
export function pathAlternates(paths: Record<Locale, string>) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].htmlLang] = absoluteUrl(paths[l]);
  languages["x-default"] = absoluteUrl(paths[defaultLocale]);
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

/** Metadata of an animal register page (species catalogue, breed, comparison). */
export function buildPathMetadata(opts: {
  locale: Locale;
  paths: Record<Locale, string>;
  title: string;
  description: string;
  noIndex?: boolean;
  /** Share image at another path (breed portrait, generated breed card, or the species image). */
  image?: { path: string; width: number; height: number; alt: string };
}): Metadata {
  const m = buildMetadataFor({ ...opts, path: opts.paths[opts.locale], languages: pathAlternates(opts.paths) });
  if (!opts.image) return m;
  const image = { url: absoluteUrl(opts.image.path), width: opts.image.width, height: opts.image.height, alt: opts.image.alt || site.name };
  return { ...m, openGraph: { ...m.openGraph, images: [image] }, twitter: { ...m.twitter, images: [image.url] } };
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
    // A noindex page (breed comparison) keeps its canonical but announces no language alternates.
    alternates: opts.noIndex ? { canonical: url } : { canonical: url, languages: opts.languages },
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
