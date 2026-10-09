import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, pathFor } from "@/i18n/config";
import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { appLd, faqLd, graph, webPageLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { HeroVisual } from "@/components/HeroVisual";
import { EARLY_ACCESS_ID, PrimaryCta, StoreButtons } from "@/components/Cta";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { site } from "@/lib/site";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Screen } from "@/components/Screen";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({ locale, key: "home", title: dict.home.meta.title, description: dict.home.meta.description });
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const realismIcons = [
  <path key="a" d="M4 16v-2.4C4 11.5 3 10.5 3 8c0-2.7 1.5-6 4.5-6C9.4 2 10 3.8 10 5.5c0 3.1-2 5.7-2 8.7V16a2 2 0 1 1-4 0ZM20 20v-2.4c0-2.1 1-3.1 1-5.6 0-2.7-1.5-6-4.5-6C14.6 6 14 7.8 14 9.5c0 3.1 2 5.7 2 8.7V20a2 2 0 1 0 4 0Z" />,
  <path key="b" d="M3 3v18h18M7 15l4-4 3 3 6-6" />,
  <path key="c" d="M12 2a10 10 0 1 0 10 10M12 6v6l4 2" />,
  <path key="d" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  <path key="e" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />,
  <path key="f" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
];

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const h = dict.home;
  const faqItems = (dict.pages.faq.blocks.find((b) => b.type === "faq") as { items: { q: string; a: string }[] }).items.slice(0, 5);

  return (
    <>
      <JsonLd data={graph(webPageLd(locale, "home", h.meta.title, h.meta.description), appLd(locale, dict), faqLd(faqItems))} />

      {/* Hero */}
      <section className="container-page grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1fr_1.05fr] lg:pt-16">
        <div className="flex flex-col gap-6">
          <p className="inline-flex items-center gap-2 self-start rounded-full bg-mint-tint py-1.5 pl-2 pr-3 text-[13px] font-semibold">
            <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
            {h.hero.eyebrow}
          </p>
          <h1 className="h-display text-[clamp(44px,6vw,76px)]">{h.hero.title}</h1>
          <p className="max-w-[540px] text-[19px] leading-relaxed text-muted sm:text-xl">{h.hero.lead}</p>
          {site.launchState === "live" ? (
            <div className="flex flex-wrap gap-3">
              <PrimaryCta locale={locale} dict={dict} className="!min-h-14 !px-6 !text-[17px]" />
              <Link href={pathFor(locale, "howItWorks")} className="btn btn-secondary !min-h-14 !px-6 !text-[17px]">
                {dict.cta.secondary}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <EarlyAccessForm locale={locale} copy={dict.earlyAccess} privacyHref={pathFor(locale, "privacy")} size="lg" />
              <Link href={pathFor(locale, "howItWorks")} className="inline-flex items-center gap-2 self-start font-semibold text-mint-text hover:underline">
                {dict.cta.secondary} <Arrow />
              </Link>
            </div>
          )}
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {h.hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-1.5"><Check className="text-mint-text" />{t}</li>
            ))}
          </ul>
        </div>
        <HeroVisual locale={locale} dict={dict} />
      </section>

      {/* Promise */}
      <section className="on-dark bg-graphite text-fog">
        <div className="container-page flex flex-wrap items-center justify-between gap-10 py-16 sm:py-20">
          <p className="flex-[1_1_560px] font-display text-[clamp(26px,3.4vw,42px)] font-bold leading-[1.15] tracking-[-0.02em]">
            {h.promise.quote} <span className="text-mint">{h.promise.highlight}</span>.
          </p>
          <p className="flex-[1_1_320px] text-[17px] leading-relaxed text-muted-dark">{h.promise.text}</p>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page flex flex-col gap-12 py-24" aria-labelledby="how-title">
        <div className="flex max-w-3xl flex-col gap-3.5">
          <p className="eyebrow">{h.how.eyebrow}</p>
          <h2 id="how-title" className="h-section">{h.how.title}</h2>
        </div>
        <ol className="grid gap-5 md:grid-cols-3">
          {h.how.steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-3.5 rounded-[22px] border border-line bg-white p-7">
              <span className={`flex h-11 w-11 items-center justify-center rounded-[14px] font-display text-xl font-extrabold ${i === 2 ? "bg-mint text-graphite" : "bg-graphite text-mint"}`} aria-hidden="true">{i + 1}</span>
              <h3 className="h-card text-2xl">{s.title}</h3>
              <p className="leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="grid justify-items-center gap-10 rounded-[30px] bg-mint-tint px-5 py-10 sm:grid-cols-3 sm:px-10">
          <Screen locale={locale} screen="picker" caption={dict.screens.picker} />
          <Screen locale={locale} screen="contract" caption={dict.screens.contract} />
          <Screen locale={locale} screen="certificate" caption={dict.screens.certificate} />
        </div>
        <Link href={pathFor(locale, "howItWorks")} className="inline-flex items-center gap-2 self-start font-semibold text-mint-text hover:underline">
          {h.how.link} <Arrow />
        </Link>
      </section>

      {/* Realism */}
      <section className="container-page flex flex-col gap-10 pb-24" aria-labelledby="realism-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="realism-title" className="h-section flex-[1_1_520px]">{h.realism.title}</h2>
          <p className="flex-[1_1_340px] text-[17px] leading-relaxed text-muted">{h.realism.text}</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {h.realism.items.map((item, i) => {
            const dark = i === 5;
            const mint = i === 0;
            return (
              <li key={item.title} className={`flex min-h-[180px] flex-col gap-2.5 rounded-[22px] p-6 ${mint ? "bg-mint" : dark ? "on-dark bg-graphite text-fog" : "border border-line bg-white"}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={dark ? "text-mint" : ""}>
                  {realismIcons[i]}
                </svg>
                <h3 className="h-card text-[22px]">{item.title}</h3>
                <p className={`text-[15px] leading-relaxed ${mint ? "" : dark ? "text-muted-dark" : "text-muted"}`}>{item.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Parents */}
      <section className="border-y border-line bg-white" aria-labelledby="parents-title">
        <div className="container-page grid items-center gap-14 py-24 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <p className="eyebrow">{h.parents.eyebrow}</p>
            <h2 id="parents-title" className="h-section">{h.parents.title}</h2>
            <p className="text-lg leading-relaxed text-muted">{h.parents.text}</p>
            <ul className="mt-2 flex flex-col gap-3.5">
              {h.parents.points.map((p) => (
                <li key={p.strong} className="flex gap-3 leading-relaxed"><Check className="mt-1 text-mint-text" /><span><strong>{p.strong}</strong> — {p.text}</span></li>
              ))}
            </ul>
            <Link href={pathFor(locale, "parents")} className="mt-2 inline-flex items-center gap-2 self-start font-semibold text-mint-text hover:underline">
              {h.parents.link} <Arrow />
            </Link>
          </div>
          <div className="grid justify-items-center gap-8 rounded-[30px] bg-fog px-5 py-10 sm:grid-cols-2">
            <Screen locale={locale} screen="parent" caption={dict.screens.parent} />
            <Screen locale={locale} screen="report" caption={dict.screens.report} />
          </div>
        </div>
      </section>

      {/* Adults trying a breed */}
      <section className="container-page pt-24" aria-labelledby="adults-title">
        <div className="grid gap-10 rounded-[30px] bg-mint-tint p-8 sm:p-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-5">
            <p className="eyebrow">{h.adults.eyebrow}</p>
            <h2 id="adults-title" className="h-section">{h.adults.title}</h2>
            <p className="text-lg leading-relaxed text-muted">{h.adults.text}</p>
          </div>
          <div className="flex flex-col gap-5">
            <ul className="flex flex-col gap-3.5">
              {h.adults.points.map((p) => (
                <li key={p.strong} className="flex gap-3 leading-relaxed"><Check className="mt-1 text-mint-text" /><span><strong>{p.strong}</strong> — {p.text}</span></li>
              ))}
            </ul>
            <p className="rounded-[18px] bg-white p-4 leading-relaxed">{h.adults.how}</p>
            <p className="text-sm text-muted">{h.adults.note}</p>
            <Link href={pathFor(locale, "faq")} className="inline-flex items-center gap-2 self-start font-semibold text-mint-text hover:underline">
              {h.adults.link} <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* When the real pet comes home */}
      <section className="container-page grid items-center gap-14 py-24 lg:grid-cols-[1fr_1.1fr]" aria-labelledby="after-title">
        <div className="order-2 flex justify-center rounded-[30px] bg-graphite px-5 py-10 lg:order-1">
          <div className="on-dark text-fog [&_figcaption]:text-muted-dark">
            <Screen locale={locale} screen="assistant" caption={dict.screens.assistant} />
          </div>
        </div>
        <div className="order-1 flex flex-col gap-5 lg:order-2">
          <p className="eyebrow flex items-center gap-3">
            {h.after.eyebrow}
            <span className="rounded-full bg-graphite px-2.5 py-1 text-[11px] tracking-[0.08em] text-mint">{h.after.planned}</span>
          </p>
          <h2 id="after-title" className="h-section">{h.after.title}</h2>
          <p className="text-lg leading-relaxed text-muted">{h.after.text}</p>
          <ul className="mt-1 grid gap-3 sm:grid-cols-2">
            {h.after.features.map((f) => (
              <li key={f.title} className="rounded-[18px] border border-line bg-white p-4">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
              </li>
            ))}
          </ul>
          <Link href={pathFor(locale, "afterAdoption")} className="mt-1 inline-flex items-center gap-2 self-start font-semibold text-mint-text hover:underline">
            {h.after.link} <Arrow />
          </Link>
        </div>
      </section>

      {/* Species and languages */}
      <section className="container-page pb-24">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[30px] bg-mint-tint p-8">
          <div className="flex flex-[1_1_380px] flex-col gap-2">
            <h2 className="h-card text-[30px] font-extrabold tracking-[-0.02em]">{h.species.title}</h2>
            <p className="text-muted">{h.species.text}</p>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {h.species.chips.map((c) => (
              <li key={c.label} className={`rounded-full px-4 py-2.5 text-[15px] font-semibold ${c.active ? "bg-graphite text-white" : "bg-white"}`}>{c.label}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section className="container-page flex flex-col gap-10 pb-24" aria-labelledby="pricing-title">
        <div className="flex max-w-3xl flex-col gap-3.5">
          <p className="eyebrow">{h.pricing.eyebrow}</p>
          <h2 id="pricing-title" className="h-section">{h.pricing.title}</h2>
        </div>
        <Pricing locale={locale} dict={dict} />
      </section>

      {/* FAQ */}
      <section className="container-page flex flex-col gap-8 pb-24" aria-labelledby="faq-title">
        <h2 id="faq-title" className="h-section">{h.faq.title}</h2>
        <Faq items={faqItems} />
        <Link href={pathFor(locale, "faq")} className="inline-flex items-center gap-2 self-start font-semibold text-mint-text hover:underline">
          {h.faq.link} <Arrow />
        </Link>
      </section>

      {/* Final CTA */}
      <section id={EARLY_ACCESS_ID} className="container-page scroll-mt-24 pb-24">
        <div className="relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[36px] bg-mint px-6 py-14 sm:px-12 sm:py-16">
          <div className="flex flex-[1_1_460px] flex-col gap-4">
            <h2 className="h-display text-[clamp(36px,4.6vw,60px)]">{h.final.title}</h2>
            <p className="max-w-[460px] text-lg leading-relaxed">{h.final.text}</p>
            <div className="mt-2"><StoreButtons locale={locale} dict={dict} /></div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/petprep-mark.svg" alt="" width={220} height={220} className="h-auto w-[180px] sm:w-[220px]" />
        </div>
      </section>
    </>
  );
}
