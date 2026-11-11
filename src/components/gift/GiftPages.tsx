import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { giftCopy } from "@/content/gift";
import { isLocale, pathFor } from "@/i18n/config";
import { buildMetadataFor, pathAlternates } from "@/lib/seo";
import { breadcrumbsLd, faqLd, graph } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";
import { formatGiftPrice, giftBuyUrl, giftPath, giftPathsOf, isGiftEnabled, isPromiseKitEnabled, promiseKitHref, type GiftLocale, type GiftPageKey } from "@/lib/gift";
import { Faq } from "../Faq";
import { JsonLd } from "../JsonLd";
import { BuyButton } from "./BuyButton";
import { RedeemForm } from "./RedeemForm";
import { ThanksClient } from "./ThanksClient";

/** The `[slug]` routes call this: the language of a gift page, or a 404 while the switch is off. */
export function assertGift(locale: string): GiftLocale {
  if (!isGiftEnabled() || !isLocale(locale)) notFound();
  return locale;
}

export function giftMetadata(page: GiftPageKey, locale: string): Metadata {
  if (!isGiftEnabled() || !isLocale(locale)) return {};
  const lang: GiftLocale = locale;
  const copy = giftCopy[lang];
  const meta = page === "gift" ? copy.meta : page === "thanks" ? copy.thanks.meta : copy.redeem.meta;
  // Thanks and redeem are never indexed; the sales page is not either while its checkout URL is missing (dead buy button).
  const noIndex = page !== "gift" || giftBuyUrl() === null;
  const paths = giftPathsOf(page);
  const base = buildMetadataFor({
    locale: lang,
    path: paths[lang],
    languages: pathAlternates(paths),
    title: meta.title,
    description: meta.description,
    noIndex,
  });
  // noindex pages keep their language alternates: the language switcher reads them from <head>.
  return noIndex
    ? { ...base, alternates: { canonical: absoluteUrl(paths[lang]), languages: pathAlternates(paths) }, robots: { index: false, follow: false } }
    : base;
}

function Breadcrumb({ lang, label }: { lang: GiftLocale; label: string }) {
  const dict = getDictionary(lang);
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
      <ol className="flex items-center gap-2">
        <li><Link href={pathFor(lang, "home")} className="hover:text-graphite">{dict.common.breadcrumbHome}</Link></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="font-medium text-graphite">{label}</li>
      </ol>
    </nav>
  );
}

function PageHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <header className="mb-12 flex max-w-4xl flex-col gap-5 sm:mb-14">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="h-display text-[clamp(36px,5vw,60px)]">{title}</h1>
      <p className="max-w-3xl text-[19px] leading-relaxed text-muted">{lead}</p>
    </header>
  );
}

export function GiftPage({ lang }: { lang: GiftLocale }) {
  const c = giftCopy[lang];
  const buyUrl = giftBuyUrl();
  if (!buyUrl && process.env.NODE_ENV === "development") {
    console.warn("[gift] NEXT_PUBLIC_LS_GIFT_URL is not set: the buy button is disabled.");
  }
  const kitHref = isPromiseKitEnabled() ? promiseKitHref(lang) : null;
  const path = giftPath(lang, "gift");
  const dict = getDictionary(lang);
  const ld = graph(
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#webpage`,
      url: absoluteUrl(path),
      name: c.meta.title,
      description: c.meta.description,
      inLanguage: lang,
    },
    breadcrumbsLd([
      { name: dict.common.breadcrumbHome, path: pathFor(lang, "home") },
      { name: c.breadcrumb, path },
    ]),
    faqLd(c.faq.items),
  );
  return (
    <>
      <JsonLd data={ld} />
      <div className="container-page pb-24 pt-10 sm:pt-14">
        <Breadcrumb lang={lang} label={c.breadcrumb} />

        <div className="mb-16 grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-14">
          <div className="flex flex-col gap-8">
            <header className="flex max-w-3xl flex-col gap-5">
              <p className="eyebrow">{c.eyebrow}</p>
              <h1 className="h-display text-[clamp(38px,5.4vw,68px)]">{c.title}</h1>
              <p className="text-[19px] leading-relaxed text-muted">{c.lead}</p>
            </header>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <BuyButton href={buyUrl} locale={lang} label={`${c.buy.button} · ${formatGiftPrice(lang)}`} soon={c.buy.soon} newTab={c.buy.newTab} />
                <p className="font-display text-[28px] font-extrabold tracking-[-0.02em]">{formatGiftPrice(lang)}</p>
              </div>
              <ul className="flex flex-col gap-1 text-[15px] text-muted">
                <li>{c.buy.priceNote}</li>
                <li>{c.buy.validity}</li>
                <li>{c.buy.refund}</li>
              </ul>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[380px] rounded-[30px] bg-mint p-6 sm:p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/curio/curio-waving.webp" alt="" width={720} height={948} fetchPriority="high" className="h-auto w-full" />
          </div>
        </div>

        <section aria-labelledby="gift-what" className="mb-20 grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
          <h2 id="gift-what" className="h-section">{c.what.heading}</h2>
          <div className="flex max-w-3xl flex-col gap-4 text-[18px] leading-relaxed">
            {c.what.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="gift-how" className="mb-20 flex flex-col gap-8">
          <h2 id="gift-how" className="h-section">{c.how.heading}</h2>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.how.steps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-3 rounded-[22px] border border-line bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mint font-display text-[18px] font-extrabold">{i + 1}</span>
                <h3 className="h-card text-[20px]">{s.title}</h3>
                <p className="leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="gift-included" className="mb-20 rounded-[30px] bg-graphite p-8 text-fog on-dark sm:p-12">
          <h2 id="gift-included" className="h-section mb-8">{c.included.heading}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {c.included.items.map((it) => (
              <li key={it} className="flex gap-3 text-[17px] leading-relaxed">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-mint)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-1 shrink-0">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                <span>{it}</span>
              </li>
            ))}
          </ul>
          {kitHref ? (
            <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[17px]">
              <span>{c.kit.text}</span>
              <Link href={kitHref} className="rich-link">{c.kit.button}</Link>
            </p>
          ) : null}
        </section>

        <section aria-labelledby="gift-audience" className="mb-20 flex flex-col gap-8">
          <h2 id="gift-audience" className="h-section">{c.audience.heading}</h2>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-[22px] bg-mint-tint p-6 sm:p-8">
              <h3 className="h-card text-[22px]">{c.audience.forTitle}</h3>
              <ul className="flex flex-col gap-3 leading-relaxed">
                {c.audience.forItems.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 rounded-[22px] border border-line bg-white p-6 sm:p-8">
              <h3 className="h-card text-[22px]">{c.audience.notTitle}</h3>
              <ul className="flex flex-col gap-3 leading-relaxed text-muted">
                {c.audience.notItems.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="gift-faq" className="mb-20 flex flex-col gap-8">
          <h2 id="gift-faq" className="h-section">{c.faq.heading}</h2>
          <Faq items={c.faq.items} locale={lang} />
        </section>

        <section aria-labelledby="gift-redeem" className="flex flex-wrap items-center justify-between gap-6 rounded-[30px] bg-mint px-6 py-10 sm:px-10">
          <div className="flex max-w-xl flex-col gap-2">
            <h2 id="gift-redeem" className="font-display text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[34px]">{c.redeemLink.heading}</h2>
            <p className="leading-relaxed">{c.redeemLink.text}</p>
          </div>
          <Link href={giftPath(lang, "redeem")} className="btn btn-primary">{c.redeemLink.button}</Link>
        </section>
      </div>
    </>
  );
}

export function ThanksPage({ lang }: { lang: GiftLocale }) {
  const c = giftCopy[lang];
  return (
    <div className="container-page pb-24 pt-10 sm:pt-14">
      <Breadcrumb lang={lang} label={c.breadcrumb} />
      <PageHead eyebrow={c.thanks.eyebrow} title={c.thanks.title} lead={c.thanks.lead} />
      <ThanksClient locale={lang} promiseKitHref={isPromiseKitEnabled() ? promiseKitHref(lang) : null} />
    </div>
  );
}

export function RedeemPage({ lang }: { lang: GiftLocale }) {
  const c = giftCopy[lang];
  return (
    <div className="container-page pb-24 pt-10 sm:pt-14">
      <Breadcrumb lang={lang} label={c.breadcrumb} />
      <PageHead eyebrow={c.redeem.eyebrow} title={c.redeem.title} lead={c.redeem.lead} />
      <RedeemForm locale={lang} />
    </div>
  );
}
