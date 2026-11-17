import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, pathFor, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content";
import { shopCopy } from "@/content/shop";
import { sales } from "@/content/promise-kit/sales.ts";
import { buildMetadataFor, pathAlternates } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { promiseKitConfig, promiseKitPath } from "@/lib/promiseKit";
import { kitThanksPath, kitThanksPathsOf } from "@/lib/shop";
import { KitThanksClient } from "./KitThanksClient";

/** Metadata of the kit thank-you page (M6-S09): never indexed, no referrer (the address carries the Stripe session id). */
export function kitThanksMetadata(locale: Locale): Metadata {
  if (!promiseKitConfig().enabled) return {};
  const c = shopCopy[locale].kitThanks;
  const paths = kitThanksPathsOf();
  const base = buildMetadataFor({ locale, path: kitThanksPath(locale), languages: pathAlternates(paths), title: c.metaTitle, description: c.metaDescription, noIndex: true });
  return {
    ...base,
    alternates: { canonical: absoluteUrl(paths[locale]), languages: pathAlternates(paths) },
    robots: { index: false, follow: false },
    referrer: "no-referrer",
  };
}

export function KitThanksPage({ locale }: { locale: Locale }) {
  if (!promiseKitConfig().enabled || !locales.includes(locale)) notFound();
  const c = shopCopy[locale].kitThanks;
  const dict = getDictionary(locale);
  return (
    <div className="container-page pb-24 pt-10 sm:pt-14">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex items-center gap-2">
          <li><Link href={pathFor(locale, "home")} className="hover:text-graphite">{dict.common.breadcrumbHome}</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={promiseKitPath(locale)} className="hover:text-graphite">{sales[locale].breadcrumb}</Link></li>
        </ol>
      </nav>
      <header className="mb-12 flex max-w-4xl flex-col gap-5">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1 className="h-display text-[clamp(36px,5vw,60px)]">{c.title}</h1>
        <p className="max-w-3xl text-[19px] leading-relaxed text-muted">{c.lead}</p>
      </header>
      <KitThanksClient locale={locale} />
    </div>
  );
}
