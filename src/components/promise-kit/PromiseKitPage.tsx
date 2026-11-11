import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pathFor, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content";
import { kitCopy } from "@/content/promise-kit/index.ts";
import { sales } from "@/content/promise-kit/sales.ts";
import { buildMetadataFor, pathAlternates } from "@/lib/seo";
import { breadcrumbsLd, faqLd, graph } from "@/lib/jsonld";
import { absoluteUrl, site } from "@/lib/site";
import { formatKitPrice, giftPageOf, isKitLocale, promiseKitAlternatePaths, promiseKitConfig, promiseKitPath, promiseKitUpdated, type KitLocale } from "@/lib/promiseKit";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";

/** Metadata of the sales page; empty for a language without the page or while the switch is off. */
export function promiseKitMetadata(locale: string): Metadata {
  if (!isKitLocale(locale) || !promiseKitConfig().enabled) return {};
  const s = sales[locale];
  const paths = promiseKitAlternatePaths();
  return buildMetadataFor({
    locale,
    path: promiseKitPath(locale),
    languages: pathAlternates(paths),
    title: s.metaTitle,
    description: s.metaDescription,
  });
}

const previews = ["cover", "promise", "cost"] as const;

export function PromiseKitPage({ locale: localeParam }: { locale: string }) {
  const cfg = promiseKitConfig();
  if (!cfg.enabled || !isKitLocale(localeParam)) notFound();
  const locale: KitLocale = localeParam;
  const s = sales[locale];
  const kit = kitCopy[locale];
  const dict = getDictionary(locale as Locale);
  const home = pathFor(locale as Locale, "home");
  const price = formatKitPrice(locale);
  const ld = graph(
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(promiseKitPath(locale))}#webpage`,
      url: absoluteUrl(promiseKitPath(locale)),
      name: s.metaTitle,
      description: s.metaDescription,
      inLanguage: locale,
      dateModified: promiseKitUpdated,
    },
    breadcrumbsLd([{ name: dict.common.breadcrumbHome, path: home }, { name: s.breadcrumb, path: promiseKitPath(locale) }]),
    faqLd(s.faq),
  );
  const buttons = (
    <div className="flex flex-wrap items-center gap-3">
      {cfg.buyUrl ? (
        <a href={cfg.buyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          {s.buy} · {price}
        </a>
      ) : null}
      {cfg.sampleUrl ? (
        <a href={cfg.sampleUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          {s.sample}
        </a>
      ) : null}
    </div>
  );
  return (
    <>
      <JsonLd data={ld} />
      <div className="container-page pb-24 pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex items-center gap-2">
            <li><Link href={home} className="hover:text-graphite">{dict.common.breadcrumbHome}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-graphite">{s.breadcrumb}</li>
          </ol>
        </nav>

        <div className="mb-16 grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,380px)]">
          <header className="flex max-w-3xl flex-col gap-5">
            <p className="eyebrow">{s.eyebrow}</p>
            <h1 className="h-display text-[clamp(38px,5.4vw,68px)]">{s.title}</h1>
            <p className="text-[19px] leading-relaxed text-muted">{s.lead}</p>
            <p className="font-display text-[34px] font-extrabold leading-none tracking-[-0.02em]">{price}</p>
            <p className="max-w-xl text-sm text-muted">{s.priceNote}</p>
            {buttons}
          </header>
          <div className="mx-auto w-full max-w-[380px] rounded-[30px] bg-mint p-6 sm:p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/promise-kit/preview-${locale}-cover.webp`} alt={s.previewAlt.cover} width={900} height={1273} className="h-auto w-full rounded-[10px] shadow-[0_8px_24px_rgba(18,22,20,0.18)]" />
          </div>
        </div>

        <section aria-labelledby="inside" className="mb-16 flex flex-col gap-6">
          <h2 id="inside" className="h-section">{s.insideHeading}</h2>
          <p className="max-w-3xl text-[17px] leading-relaxed text-muted">{s.insideIntro}</p>
          <ol className="grid gap-4 sm:grid-cols-2">
            {kit.sections.map((sec, i) => (
              <li key={sec.id} className="flex gap-4 rounded-[22px] border border-line bg-white p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint font-display text-[16px] font-extrabold">{i + 1}</span>
                <div className="flex flex-col gap-1">
                  <h3 className="h-card text-[19px]">{sec.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{sec.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="preview" className="mb-16 flex flex-col gap-6">
          <h2 id="preview" className="h-section">{s.previewHeading}</h2>
          <ul className="grid gap-5 sm:grid-cols-3">
            {previews.map((p) => (
              <li key={p} className="rounded-[22px] border border-line bg-white p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/promise-kit/preview-${locale}-${p}.webp`} alt={s.previewAlt[p]} width={900} height={1273} loading="lazy" className="h-auto w-full rounded-[14px] border border-line" />
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-[22px] border border-line bg-white p-7">
            <h2 className="h-card text-[26px]">{s.forHeading}</h2>
            <ul className="flex flex-col gap-3 text-[16px] leading-relaxed">{s.forItems.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="flex flex-col gap-4 rounded-[22px] bg-mint-tint p-7">
            <h2 className="h-card text-[26px]">{s.notHeading}</h2>
            <ul className="flex flex-col gap-3 text-[16px] leading-relaxed">{s.notItems.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </section>

        {cfg.sampleUrl ? (
          <section className="mb-16 flex flex-col gap-4 rounded-[30px] bg-mint px-6 py-10 sm:px-10">
            <h2 className="h-section">{s.sampleHeading}</h2>
            <p className="max-w-2xl text-[17px] leading-relaxed">{s.sampleText}</p>
            <div>
              <a href={cfg.sampleUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{s.sample}</a>
            </div>
            <p className="text-sm">{s.sampleNote}</p>
          </section>
        ) : null}

        <section aria-labelledby="faq" className="mb-12 flex flex-col gap-6">
          <h2 id="faq" className="h-section">{s.faqHeading}</h2>
          <Faq items={s.faq} locale={locale} />
        </section>

        {buttons}

        {cfg.gift ? (
          <p className="mt-10 text-[16px]">
            {s.giftText}{" "}
            <Link href={giftPageOf(locale)} className="rich-link">{s.giftLink}</Link>
          </p>
        ) : null}
        <p className="mt-6 text-sm text-muted">{site.name} · petprep.si</p>
      </div>
    </>
  );
}
