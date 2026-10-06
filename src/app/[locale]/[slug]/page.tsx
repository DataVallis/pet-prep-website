import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, pageKeyFromSlug, pageKeys, pageSlugs, pathFor, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content";
import type { Block } from "@/content/types";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, faqLd, graph, webPageLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Blocks } from "@/components/Blocks";
import { PrimaryCta } from "@/components/Cta";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => pageKeys.map((key) => ({ locale, slug: pageSlugs[key][locale] })));
}

function resolve(localeParam: string, slug: string) {
  if (!isLocale(localeParam)) return undefined;
  const key = pageKeyFromSlug(localeParam, slug);
  if (!key) return undefined;
  return { locale: localeParam as Locale, key };
}

const legalKeys = new Set(["privacy", "terms"]);

export async function generateMetadata({ params }: PageProps<"/[locale]/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const r = resolve(locale, slug);
  if (!r) return {};
  const page = getDictionary(r.locale).pages[r.key];
  return buildMetadata({ locale: r.locale, key: r.key, title: page.meta.title, description: page.meta.description });
}

function formatDate(locale: Locale, iso: string) {
  return new Intl.DateTimeFormat(locale === "sl" ? "sl-SI" : "en-GB", { dateStyle: "long" }).format(new Date(iso));
}

export default async function SubPage({ params }: PageProps<"/[locale]/[slug]">) {
  const { locale: localeParam, slug } = await params;
  const r = resolve(localeParam, slug);
  if (!r) notFound();
  const { locale, key } = r;
  const dict = getDictionary(locale);
  const page = dict.pages[key];
  const isLegal = legalKeys.has(key);

  const faqBlocks = page.blocks.filter((b): b is Extract<Block, { type: "faq" }> => b.type === "faq");
  const faqItems = faqBlocks.flatMap((b) => b.items);
  const ld = graph(
    webPageLd(locale, key, page.meta.title, page.meta.description),
    breadcrumbLd(locale, dict, key, page.navLabel ?? page.eyebrow),
    ...(faqItems.length ? [faqLd(faqItems)] : []),
  );

  return (
    <>
      <JsonLd data={ld} />
      <div className="container-page pb-24 pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex items-center gap-2">
            <li><Link href={pathFor(locale, "home")} className="hover:text-graphite">{dict.common.breadcrumbHome}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-graphite">{page.navLabel ?? page.eyebrow}</li>
          </ol>
        </nav>

        <header className="mb-14 flex max-w-4xl flex-col gap-5 sm:mb-16">
          <p className="eyebrow flex flex-wrap items-center gap-3">
            {page.eyebrow}
            {page.planned ? (
              <span className="rounded-full bg-graphite px-2.5 py-1 text-[11px] tracking-[0.08em] text-mint">{dict.common.planned}</span>
            ) : null}
          </p>
          <h1 className={`h-display ${isLegal ? "text-[clamp(36px,5vw,56px)]" : "text-[clamp(38px,5.4vw,68px)]"}`}>{page.title}</h1>
          <p className="max-w-3xl text-[19px] leading-relaxed text-muted">{page.lead}</p>
          {isLegal ? (
            <p className="text-sm text-muted">
              {dict.common.lastUpdated}: <time dateTime={site.legalUpdated}>{formatDate(locale, site.legalUpdated)}</time>
            </p>
          ) : null}
          {isLegal && !site.legalReviewed ? (
            <p className="max-w-3xl rounded-[14px] bg-warn-tint px-4 py-3 text-sm leading-relaxed">{dict.common.legalDraft}</p>
          ) : null}
          {page.planned ? <p className="max-w-3xl rounded-[14px] bg-mint-tint px-4 py-3 text-sm leading-relaxed">{dict.common.plannedNote}</p> : null}
        </header>

        <Blocks blocks={page.blocks} locale={locale} dict={dict} />

        {!isLegal && key !== "contact" ? (
          <div className="mt-20 flex flex-wrap items-center justify-between gap-6 rounded-[30px] bg-mint px-8 py-10 sm:px-10">
            <p className="font-display text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[34px]">{dict.home.final.title}</p>
            <PrimaryCta dict={dict} />
          </div>
        ) : null}
      </div>
    </>
  );
}
