import "server-only";
import type { Metadata } from "next";
import Link from "next/link";
import { locales, pageSlugs, pathFor, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content";
import { registry } from "@/content/registry/registry";
import { foodBySpeciesSlug, foodHref, sourcesOf } from "@/content/care/care";
import { coloringBySlug, coloringCopy, coloringPages, coloringSize, coloringUpdated, type ColoringPage } from "@/content/coloring/coloring";
import { breedHref, ownerMistakes } from "@/lib/registry/views";
import { buildPathMetadata } from "@/lib/seo";
import { breadcrumbsLd, collectionLd, graph, splitSourcePublisher } from "@/lib/jsonld";
import { absoluteUrl, site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { PrintButton } from "@/components/coloring/PrintButton";

/* ─── paths ──────────────────────────────────────────────────────────────── */

export const coloringHref = (locale: Locale) => pathFor(locale, "coloring");
export const coloringPageHref = (locale: Locale, p: ColoringPage) => `${coloringHref(locale)}/${p.slug[locale]}`;
export const isColoringSlug = (locale: Locale, slug: string) => slug === pageSlugs.coloring[locale];
export const coloringParams = (locale: Locale) => coloringPages.map((p) => ({ slug: pageSlugs.coloring[locale], species: p.slug[locale] }));
export const resolveColoring = (locale: Locale, slug: string) => coloringBySlug(locale, slug);
const file = (p: ColoringPage, ext: "png" | "a4.pdf" | "letter.pdf") => `/coloring/${p.id}.${ext}`;
const bookFile = (size: "a4" | "letter") => `/coloring/petprep-coloring-pages.${size}.pdf`;

/* ─── tip (one sourced fact, linked to the page that holds it) ─────────────── */

type Tip = { title: string; text: string; href: string; sources: string[] };

export function coloringTip(locale: Locale, p: ColoringPage): Tip | null {
  const t = p.tip;
  if (t.kind === "food") {
    const f = foodBySpeciesSlug(t.species, t.slug);
    if (!f || !f.locales.includes(locale)) return null;
    return { title: f.question[locale]!, text: f.answer[locale]!, href: foodHref(locale, f), sources: [...new Set(sourcesOf(f).map((s) => splitSourcePublisher(s.publisher).publisher.replace(/\s*\(.*\)$/, "")))].slice(0, 3) };
  }
  if (t.kind === "breed") {
    const b = registry.breeds.find((x) => x.id === t.breed);
    const m = b ? ownerMistakes(locale, b).find((x) => x.key === t.key) : undefined;
    if (!b || !m) return null;
    return { title: b.name[locale], text: m.text, href: `${breedHref(locale, b)}#mistakes`, sources: [...new Set(m.sources.map((s) => s.publisher))] };
  }
  const words = coloringCopy[locale].pageTip[t.page];
  return words ? { title: words.title, text: words.text, href: pathFor(locale, t.page), sources: [] } : null;
}

/* ─── hub block (on /coloring-pages) ─────────────────────────────────────── */

export function ColoringHub({ locale }: { locale: Locale }) {
  const c = coloringCopy[locale];
  return (
    <div className="flex flex-col gap-12">
      <p className="text-sm font-semibold text-muted">{c.count(coloringPages.length)}</p>
      <ul className="-mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {coloringPages.map((p) => (
          <li key={p.id}>
            <Link href={coloringPageHref(locale, p)} className="group flex h-full flex-col gap-3 rounded-[22px] border border-line bg-white p-3 hover:border-graphite">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={file(p, "png")} alt={p.alt[locale]} width={coloringSize.width} height={coloringSize.height} loading="lazy" className="h-auto w-full rounded-[14px]" />
              <span className="px-1 pb-1 font-display text-[17px] font-bold leading-snug group-hover:underline">{p.title[locale]}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Book locale={locale} />
      <HowAndShare locale={locale} />
    </div>
  );
}

export function coloringHubMarkdown(locale: Locale): string {
  const c = coloringCopy[locale];
  return [
    ...coloringPages.map((p) => `- **${p.title[locale]}** — ${absoluteUrl(coloringPageHref(locale, p))} (PDF A4: ${absoluteUrl(file(p, "a4.pdf"))})`),
    `- ${c.all.title}: ${absoluteUrl(bookFile("a4"))}`,
    "",
    c.licence,
  ].join("\n");
}

/* ─── one page: /coloring-pages/<page> ──────────────────────────────────── */

export function coloringPageMetadata(locale: Locale, p: ColoringPage): Metadata {
  const c = coloringCopy[locale];
  return buildPathMetadata({
    locale,
    paths: Object.fromEntries(locales.map((l) => [l, coloringPageHref(l, p)])) as Record<Locale, string>,
    title: c.page.metaTitle(p.title[locale]),
    description: c.page.metaDescription(p.title[locale]),
  });
}

export function ColoringPageView({ locale, page: p }: { locale: Locale; page: ColoringPage }) {
  const c = coloringCopy[locale];
  const dict = getDictionary(locale);
  const tip = coloringTip(locale, p);
  const path = coloringPageHref(locale, p);
  const others = coloringPages.filter((x) => x.id !== p.id);
  const start = coloringPages.findIndex((x) => x.id === p.id);
  const more = [...others.slice(start), ...others.slice(0, start)].slice(0, 4);
  const hubName = dict.pages.coloring.navLabel ?? dict.pages.coloring.eyebrow;
  const ld = graph(
    {
      "@type": "ImageObject",
      "@id": `${absoluteUrl(path)}#image`,
      name: p.title[locale],
      description: p.alt[locale],
      contentUrl: absoluteUrl(file(p, "png")),
      width: coloringSize.width,
      height: coloringSize.height,
      encodingFormat: "image/png",
      inLanguage: locale,
      isAccessibleForFree: true,
      creditText: site.name,
      copyrightNotice: `© ${site.name}`,
      creator: { "@type": "Organization", name: site.name },
      acquireLicensePage: absoluteUrl(path),
      license: absoluteUrl(path),
      dateModified: coloringUpdated,
    },
    breadcrumbsLd([
      { name: dict.common.breadcrumbHome, path: pathFor(locale, "home") },
      { name: hubName, path: coloringHref(locale) },
      { name: p.title[locale], path },
    ]),
  );
  const btn = "inline-flex h-12 items-center justify-center rounded-xl border border-line bg-white px-5 font-semibold hover:border-graphite";
  return (
    <>
      <JsonLd data={ld} />
      <div className="container-page flex flex-col gap-14 pb-24 pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href={pathFor(locale, "home")} className="hover:text-graphite">{dict.common.breadcrumbHome}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={coloringHref(locale)} className="hover:text-graphite">{hubName}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-graphite">{p.title[locale]}</li>
          </ol>
        </nav>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-14">
          <figure className="print-sheet rounded-[26px] border border-line bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={file(p, "png")} alt={p.alt[locale]} width={coloringSize.width} height={coloringSize.height} fetchPriority="high" className="h-auto w-full" />
            <figcaption className="print-only mt-2 text-center text-[11px] text-muted">petprep.si · #walkyourpet · @petprep.si</figcaption>
          </figure>
          <div className="flex flex-col gap-7">
            <header className="flex flex-col gap-4">
              <p className="eyebrow">{dict.pages.coloring.eyebrow}</p>
              <h1 className="h-display text-[clamp(34px,4.6vw,56px)]">{p.title[locale]}</h1>
              <p className="max-w-xl text-[18px] leading-relaxed text-muted">{c.page.lead}</p>
            </header>
            <div className="flex flex-wrap gap-3">
              <PrintButton label={c.page.print} />
              <a href={file(p, "a4.pdf")} download className={btn}>{c.page.pdfA4}</a>
              <a href={file(p, "letter.pdf")} download className={btn}>{c.page.pdfLetter}</a>
              <a href={file(p, "png")} download className={btn}>{c.page.png}</a>
            </div>
            {tip ? (
              <aside className="flex max-w-xl flex-col gap-2 rounded-[22px] bg-mint-tint p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-mint-text">{c.page.didYouKnow}</p>
                <p className="font-display text-[20px] font-bold leading-snug">{tip.title}</p>
                <p className="leading-relaxed">{tip.text}</p>
                {tip.sources.length ? <p className="text-sm text-muted">{tip.sources.join(" · ")}</p> : null}
                <Link href={tip.href} className="w-fit text-sm font-semibold underline">{c.page.readMore} →</Link>
              </aside>
            ) : null}
            <Share locale={locale} />
            <p className="max-w-xl text-sm leading-relaxed text-muted">{c.licence}</p>
          </div>
        </div>
        <section aria-labelledby="more" className="flex flex-col gap-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="more" className="h-card text-[28px] leading-tight">{c.page.more}</h2>
            <Link href={coloringHref(locale)} className="text-sm font-semibold underline">{c.page.back} →</Link>
          </div>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {more.map((x) => (
              <li key={x.id}>
                <Link href={coloringPageHref(locale, x)} className="group flex h-full flex-col gap-2 rounded-[22px] border border-line bg-white p-3 hover:border-graphite">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={file(x, "png")} alt={x.alt[locale]} width={coloringSize.width} height={coloringSize.height} loading="lazy" className="h-auto w-full rounded-[14px]" />
                  <span className="px-1 pb-1 font-display text-[16px] font-bold leading-snug group-hover:underline">{x.title[locale]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <Book locale={locale} />
      </div>
    </>
  );
}

/** ItemList for the hub page (used by the [slug] page's JSON-LD). */
export function coloringHubLd(locale: Locale, title: string, description: string) {
  return collectionLd({
    locale,
    path: coloringHref(locale),
    title,
    description,
    items: coloringPages.map((p) => ({ name: p.title[locale], path: coloringPageHref(locale, p) })),
    dateModified: coloringUpdated,
  });
}

/* ─── small pieces ───────────────────────────────────────────────────────── */

function Book({ locale }: { locale: Locale }) {
  const c = coloringCopy[locale];
  return (
    <section className="flex flex-wrap items-center justify-between gap-6 rounded-[30px] bg-mint px-6 py-8 sm:px-10">
      <div className="flex max-w-md flex-col gap-2">
        <h2 className="font-display text-[26px] font-extrabold leading-tight tracking-[-0.02em]">{c.all.title}</h2>
        <p className="leading-relaxed">{c.all.text}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={bookFile("a4")} download className="inline-flex h-12 items-center rounded-xl bg-graphite px-5 font-semibold text-white hover:opacity-90">{c.all.a4}</a>
        <a href={bookFile("letter")} download className="inline-flex h-12 items-center rounded-xl border border-graphite px-5 font-semibold hover:bg-white">{c.all.letter}</a>
      </div>
    </section>
  );
}

function Share({ locale }: { locale: Locale }) {
  const c = coloringCopy[locale];
  return (
    <aside className="flex max-w-xl flex-col gap-1 rounded-[22px] border border-line bg-white p-5">
      <p className="font-display text-[18px] font-bold">{c.share.title}</p>
      <p className="leading-relaxed">{c.share.text}</p>
    </aside>
  );
}

function HowAndShare({ locale }: { locale: Locale }) {
  const c = coloringCopy[locale];
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="flex flex-col gap-3 rounded-[26px] border border-line bg-white p-6">
        <h2 className="h-card text-[24px] leading-tight">{c.how.title}</h2>
        <ol className="flex list-decimal flex-col gap-2 pl-5 leading-relaxed">
          {c.how.steps.map((s) => <li key={s}>{s}</li>)}
        </ol>
        <p className="text-sm leading-relaxed text-muted">{c.licence}</p>
      </section>
      <section className="flex flex-col gap-3 rounded-[26px] bg-fog p-6 ring-1 ring-line">
        <h2 className="h-card text-[24px] leading-tight">{c.share.title}</h2>
        <p className="leading-relaxed">{c.share.text}</p>
      </section>
    </div>
  );
}
