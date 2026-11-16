import type { Metadata } from "next";
import Link from "next/link";
import { locales, pathFor, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content";
import { quizCopy, quizEmailStrings, quizSponsorStrings, quizThanks } from "@/content/quiz";
import { quizAlternates, quizHubAlternates, quizHubPath, quizPath, quizSlugs, quizUpdated } from "@/content/quiz/slugs";
import { registry } from "@/content/registry/registry";
import { buildMetadataFor } from "@/lib/seo";
import { breadcrumbsLd, collectionLd, graph } from "@/lib/jsonld";
import { quizBreedViews } from "@/lib/breedQuizData";
import { absoluteUrl, site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { PrimaryCta, earlyAccessHref } from "@/components/Cta";
import { BreedFinder } from "./BreedFinder";
import { BreedQuiz } from "./BreedQuiz";

const card = "rounded-[22px] bg-white shadow-[0_1px_2px_rgba(18,22,20,0.04),0_10px_30px_rgba(18,22,20,0.06)]";

/** Static params of the hub (`[slug]`) and of the quiz (`[slug]/[species]`). */
export const quizHubParams = () => locales.map((locale) => ({ locale, slug: quizSlugs.hub[locale] }));
export const quizChildParams = (locale: Locale) => ({ slug: quizSlugs.hub[locale], species: quizSlugs.quiz[locale] });

export function quizHubMetadata(locale: Locale): Metadata {
  const c = quizCopy[locale];
  return buildMetadataFor({ locale, path: quizHubPath(locale), languages: quizHubAlternates(absoluteUrl), title: c.hubMetaTitle, description: c.hubMetaDesc });
}

export function quizMetadata(locale: Locale): Metadata {
  const c = quizCopy[locale];
  return buildMetadataFor({ locale, path: quizPath(locale), languages: quizAlternates(absoluteUrl), title: c.quizMetaTitle, description: c.quizMetaDesc });
}

/** The site's early-access / store link (the same call to action as the rest of the site). */
const appHref = (locale: Locale) => (site.launchState === "live" && site.stores.ios ? site.stores.ios : earlyAccessHref(locale));

function Crumbs({ locale, items }: { locale: Locale; items: { name: string; href?: string }[] }) {
  const dict = getDictionary(locale);
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href={pathFor(locale, "home")} className="hover:text-graphite">{dict.common.breadcrumbHome}</Link></li>
        {items.map((it) => (
          <li key={it.name} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {it.href ? <Link href={it.href} className="hover:text-graphite">{it.name}</Link> : <span aria-current="page" className="font-medium text-graphite">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function QuizHubPage({ locale }: { locale: Locale }) {
  const c = quizCopy[locale];
  const dict = getDictionary(locale);
  const breeds = quizBreedViews(locale);
  const sponsor = quizSponsorStrings(locale);
  const ld = graph(
    collectionLd({ locale, path: quizHubPath(locale), title: c.hubMetaTitle, description: c.hubMetaDesc, items: [{ name: c.cardQuizTitle, path: quizPath(locale) }], dateModified: quizUpdated }),
    breadcrumbsLd([{ name: dict.common.breadcrumbHome, path: pathFor(locale, "home") }, { name: c.nav, path: quizHubPath(locale) }]),
  );
  const toolCard = "group flex h-full flex-col gap-3 p-6 sm:p-7";
  return (
    <>
      <JsonLd data={ld} />
      <div className="container-page pb-24 pt-10 sm:pt-14">
        <Crumbs locale={locale} items={[{ name: c.nav }]} />
        <header className="mb-12 flex max-w-4xl flex-col gap-5">
          <p className="eyebrow">{c.hubEyebrow}</p>
          <h1 className="h-display text-[clamp(36px,5.2vw,64px)]">{c.hubTitle}</h1>
          <p className="max-w-3xl text-[19px] leading-relaxed text-muted">{c.hubLead}</p>
        </header>

        <ul className="grid gap-5 md:grid-cols-2">
          <li>
            <Link href={quizPath(locale)} className={`${card} ${toolCard} border-2 border-transparent hover:border-graphite`}>
              <span className="font-display text-[26px] font-bold leading-tight">{c.cardQuizTitle}</span>
              <span className="text-[17px] leading-relaxed text-muted">{c.cardQuizText}</span>
              <span className="btn btn-primary mt-auto w-fit">{c.cardQuizCta}</span>
            </Link>
          </li>
          <li>
            <Link href="#breed-list" className={`${card} ${toolCard} border-2 border-transparent hover:border-graphite`}>
              <span className="font-display text-[26px] font-bold leading-tight">{c.cardWorkTitle}</span>
              <span className="text-[17px] leading-relaxed text-muted">{c.cardWorkText}</span>
              <span className="btn btn-secondary mt-auto w-fit">{c.cardWorkCta}</span>
            </Link>
          </li>
          <li>
            <div className={`${card} ${toolCard} opacity-90`}>
              <span className="w-fit rounded-full bg-graphite px-3 py-1 text-[13px] font-semibold text-mint">{c.soon}</span>
              <span className="font-display text-[26px] font-bold leading-tight">{c.cardSizeTitle}</span>
              <span className="text-[17px] leading-relaxed text-muted">{c.cardSizeText}</span>
            </div>
          </li>
          <li>
            <div className={`${card} ${toolCard} opacity-90`}>
              <span className="w-fit rounded-full bg-graphite px-3 py-1 text-[13px] font-semibold text-mint">{c.soon}</span>
              <span className="font-display text-[26px] font-bold leading-tight">{c.cardHomeTitle}</span>
              <span className="text-[17px] leading-relaxed text-muted">{c.cardHomeText}</span>
              <Link href={pathFor(locale, "partners")} className="rich-link mt-auto w-fit">{sponsor.sponsor_h} {sponsor.sponsor_cta}</Link>
            </div>
          </li>
        </ul>

        <section id="breed-list" aria-labelledby="hub-list" className="mt-16 flex scroll-mt-24 flex-col gap-4">
          <h2 id="hub-list" className="font-display text-[clamp(26px,3vw,36px)] font-bold leading-[1.1]">{c.listTitle}</h2>
          <p className="text-[17px] text-muted">{c.listIntro}</p>
          <BreedFinder
            locale={locale}
            items={breeds.flatMap((b) => (b.calc ? [{ id: b.id, name: b.name, href: b.calc }] : []))}
            labels={{ search: c.listSearch, placeholder: c.listPlaceholder, none: c.listNone }}
          />
        </section>

        <section aria-labelledby="hub-why" className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-[30px] bg-mint px-6 py-10 sm:px-10">
          <div className="flex max-w-xl flex-col gap-2">
            <h2 id="hub-why" className="font-display text-[clamp(26px,3vw,34px)] font-extrabold leading-tight tracking-[-0.02em]">{c.whyTitle}</h2>
            <p className="text-[17px] leading-relaxed">{c.whyText}</p>
          </div>
          <PrimaryCta locale={locale} dict={dict} />
        </section>
      </div>
    </>
  );
}

export function QuizPage({ locale }: { locale: Locale }) {
  const c = quizCopy[locale];
  const dict = getDictionary(locale);
  const labels = registry.suitability_labels[locale];
  const ld = graph(
    { "@type": "WebPage", "@id": `${absoluteUrl(quizPath(locale))}#webpage`, url: absoluteUrl(quizPath(locale)), name: c.quizMetaTitle, description: c.quizMetaDesc, dateModified: quizUpdated },
    breadcrumbsLd([{ name: dict.common.breadcrumbHome, path: pathFor(locale, "home") }, { name: c.nav, path: quizHubPath(locale) }, { name: c.quizTitle, path: quizPath(locale) }]),
  );
  return (
    <>
      <JsonLd data={ld} />
      <div className="container-page pb-24 pt-10 sm:pt-14">
        <Crumbs locale={locale} items={[{ name: c.nav, href: quizHubPath(locale) }, { name: c.quizTitle }]} />
        <header className="mb-8 flex max-w-3xl flex-col gap-4">
          <p className="eyebrow">{c.quizEyebrow}</p>
          <h1 className="h-display text-[clamp(34px,5vw,56px)]">{c.quizTitle}</h1>
        </header>
        <BreedQuiz
          locale={locale}
          copy={c}
          breeds={quizBreedViews(locale)}
          labels={{ suitsTitle: labels.suits_title, considerTitle: labels.consider_title, tags: labels.tags }}
          appHref={appHref(locale)}
          partnersHref={pathFor(locale, "partners")}
          path={quizPath(locale)}
          email={quizEmailStrings(locale)}
          sponsor={quizSponsorStrings(locale)}
          thanks={quizThanks[locale]}
        />
        <noscript><p className="mt-4 text-[16px] text-muted">{c.noScript}</p></noscript>
      </div>
    </>
  );
}
