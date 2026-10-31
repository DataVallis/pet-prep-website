import "server-only";
import type { Metadata } from "next";
import Link from "next/link";
import { locales, pageSlugs, pathFor, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content";
import { registry, type Species } from "@/content/registry/registry";
import {
  careHref, careSpecies, careSpeciesBySlug, careSpeciesHref, careUpdated, foodBySlug, foodBySpeciesSlug, foodHref, foodsOf,
  levels, sourcesOf, allFoods, type Food, type Level,
} from "@/content/care/care";
import { getCareCopy, speciesWords } from "@/content/care/copy";
import { formatDay } from "@/lib/registry/views";
import { buildPathMetadata } from "@/lib/seo";
import { breadcrumbsLd, collectionLd, faqLd, graph } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { StoreButtons } from "@/components/Cta";

/* ─── shared ─────────────────────────────────────────────────────────────── */

const levelStyle: Record<Level, string> = {
  toxic: "bg-danger text-white",
  dangerous: "bg-danger-tint text-danger",
  not_recommended: "bg-warn-tint text-warn",
  small_amounts: "bg-mint-tint text-mint-text",
};

export function LevelBadge({ locale, level }: { locale: Locale; level: Level }) {
  return (
    <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[13px] font-semibold ${levelStyle[level]}`}>
      {getCareCopy(locale).levels[level].label}
    </span>
  );
}

const speciesOf = (id: string) => registry.species.find((s) => s.id === id)!;

/** Paths of one food in every locale that publishes it (hreflang); falls back to the species list. */
function foodPaths(f: Food): Record<Locale, string> {
  const sp = speciesOf(f.species);
  return Object.fromEntries(locales.map((l) => [l, f.locales.includes(l) ? foodHref(l, f) : careSpeciesHref(l, sp)])) as Record<Locale, string>;
}

/* ─── params (care lives under the localized "care" page slug) ─────────────── */

export function careSpeciesParams(locale: Locale) {
  return careSpecies(locale).map((s) => ({ slug: pageSlugs.care[locale], species: s.slug[locale] }));
}

export function careFoodParams(locale: Locale) {
  return careSpecies(locale).flatMap((s) =>
    foodsOf(s.id, locale).map((f) => ({ slug: pageSlugs.care[locale], species: s.slug[locale], breed: f.url_slug[locale]! })),
  );
}

/* ─── hub block (on /care) ──────────────────────────────────────────────── */

export function CareHub({ locale }: { locale: Locale }) {
  const c = getCareCopy(locale);
  const list = careSpecies(locale);
  return (
    <section className="grid gap-5 sm:grid-cols-2">
      {list.map((s) => {
        const w = speciesWords(locale, s.id);
        const foods = foodsOf(s.id, locale);
        return (
          <Link key={s.id} href={careSpeciesHref(locale, s)} className="group flex flex-col gap-3 rounded-[26px] border border-line bg-white p-6 hover:border-graphite">
            <span className="text-sm font-semibold text-muted">{c.hub.count(foods.length)}</span>
            <span className="font-display text-[26px] font-extrabold leading-tight group-hover:underline">{w.question}</span>
            <span className="leading-relaxed text-muted">{c.hub.foodsLead(w)}</span>
            <span className="mt-1 text-sm font-semibold">{c.hub.open} →</span>
          </Link>
        );
      })}
    </section>
  );
}

export function careHubMarkdown(locale: Locale): string {
  const c = getCareCopy(locale);
  return careSpecies(locale)
    .map((s) => {
      const w = speciesWords(locale, s.id);
      return `- **${w.question}** ${c.hub.foodsLead(w)} ${absoluteUrl(careSpeciesHref(locale, s))}`;
    })
    .join("\n");
}

/* ─── species page: /care/<species> ───────────────────────────────────────── */

export function resolveCareSpecies(locale: Locale, speciesSlug: string) {
  return careSpeciesBySlug(locale, speciesSlug);
}

export function careSpeciesMetadata(locale: Locale, sp: Species): Metadata {
  const c = getCareCopy(locale);
  const w = speciesWords(locale, sp.id);
  return buildPathMetadata({
    locale,
    paths: Object.fromEntries(locales.map((l) => [l, careSpeciesHref(l, sp)])) as Record<Locale, string>,
    title: c.species.metaTitle(w),
    description: c.species.metaDescription(w, foodsOf(sp.id, locale).length),
  });
}

export function CareSpeciesPage({ locale, species }: { locale: Locale; species: Species }) {
  const c = getCareCopy(locale);
  const dict = getDictionary(locale);
  const w = speciesWords(locale, species.id);
  const collator = new Intl.Collator(locale);
  const foods = [...foodsOf(species.id, locale)].sort((a, b) => collator.compare(a.name[locale]!, b.name[locale]!));
  const path = careSpeciesHref(locale, species);
  const ld = graph(
    collectionLd({
      locale,
      path,
      title: c.species.metaTitle(w),
      description: c.species.metaDescription(w, foods.length),
      items: foods.map((f) => ({ name: f.question[locale]!, path: foodHref(locale, f) })),
      dateModified: careUpdated(locale, species.id),
    }),
    breadcrumbsLd([
      { name: dict.common.breadcrumbHome, path: pathFor(locale, "home") },
      { name: c.breadcrumb, path: careHref(locale) },
      { name: w.question, path },
    ]),
  );
  return (
    <>
      <JsonLd data={ld} />
      <div className="container-page flex flex-col gap-12 pb-24 pt-10 sm:pt-14">
        <Crumbs locale={locale} items={[{ name: c.breadcrumb, href: careHref(locale) }, { name: species.name[locale].many }]} />
        <header className="flex max-w-4xl flex-col gap-5">
          <p className="eyebrow">{c.species.eyebrow}</p>
          <h1 className="h-display text-[clamp(38px,5.4vw,68px)]">{w.question}</h1>
          <p className="max-w-3xl text-[19px] leading-relaxed text-muted">{c.species.lead(w)}</p>
        </header>
        <Emergency locale={locale} />
        {levels.map((lv) => {
          const group = foods.filter((f) => f.level === lv);
          if (!group.length) return null;
          return (
            <section key={lv} aria-labelledby={`level-${lv}`} className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <h2 id={`level-${lv}`} className="h-card text-[28px] leading-tight sm:text-[34px]">{c.levels[lv].heading}</h2>
                <span className="text-sm text-muted">({group.length})</span>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((f) => (
                  <li key={f.slug}>
                    <Link href={foodHref(locale, f)} className="group flex h-full flex-col gap-2 rounded-[20px] border border-line bg-white p-4 hover:border-graphite">
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-display text-[19px] font-bold group-hover:underline">{f.name[locale]}</span>
                        <LevelBadge locale={locale} level={f.level} />
                      </span>
                      <span className="text-[15px] leading-relaxed text-muted">{firstSentence(f.answer[locale]!)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        <p className="max-w-3xl text-sm leading-relaxed text-muted">{c.food.notVetReviewed}</p>
        <AppCta locale={locale} speciesId={species.id} />
      </div>
    </>
  );
}

/* ─── food page: /care/<species>/<food> ──────────────────────────────────── */

export function resolveCareFood(locale: Locale, speciesSlug: string, foodSlug: string) {
  const species = careSpeciesBySlug(locale, speciesSlug);
  if (!species) return undefined;
  const food = foodBySlug(species.id, locale, foodSlug);
  return food ? { species, food } : undefined;
}

export function careFoodMetadata(locale: Locale, f: Food): Metadata {
  return buildPathMetadata({
    locale,
    paths: foodPaths(f),
    title: `${f.question[locale]} — PetPrep`,
    description: f.answer[locale]!,
  });
}

export function CareFoodPage({ locale, species, food: f }: { locale: Locale; species: Species; food: Food }) {
  const c = getCareCopy(locale);
  const dict = getDictionary(locale);
  const w = speciesWords(locale, species.id);
  const path = foodHref(locale, f);
  const sources = sourcesOf(f);
  const related = f.related.map((s) => foodBySpeciesSlug(f.species, s)).filter((x): x is Food => !!x && x.locales.includes(locale));
  const others = allFoods().filter((o) => o.slug === f.slug && o.species !== f.species && o.locales.includes(locale));
  const faq = f.faq.map((q) => ({ q: q.q[locale]!, a: q.a[locale]! }));
  const ld = graph(
    {
      "@type": "Article",
      "@id": `${absoluteUrl(path)}#article`,
      headline: f.question[locale],
      description: f.answer[locale],
      inLanguage: locale,
      url: absoluteUrl(path),
      dateModified: f.updated,
      author: { "@type": "Organization", name: "PetPrep", url: absoluteUrl("/") },
      publisher: { "@type": "Organization", name: "PetPrep", url: absoluteUrl("/") },
      about: [{ "@type": "Thing", name: f.name[locale] }, { "@type": "Thing", name: species.name[locale].many }],
      citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url, publisher: { "@type": "Organization", name: s.publisher } })),
    },
    ...(faq.length ? [faqLd(faq)] : []),
    breadcrumbsLd([
      { name: dict.common.breadcrumbHome, path: pathFor(locale, "home") },
      { name: c.breadcrumb, path: careHref(locale) },
      { name: w.question, path: careSpeciesHref(locale, species) },
      { name: f.name[locale]!, path },
    ]),
  );
  return (
    <>
      <JsonLd data={ld} />
      <article className="container-page flex flex-col gap-10 pb-24 pt-10 sm:pt-14">
        <Crumbs
          locale={locale}
          items={[{ name: c.breadcrumb, href: careHref(locale) }, { name: species.name[locale].many, href: careSpeciesHref(locale, species) }, { name: f.name[locale]! }]}
        />
        <header className="flex max-w-3xl flex-col gap-5">
          <LevelBadge locale={locale} level={f.level} />
          <h1 className="h-display text-[clamp(34px,5vw,60px)]">{f.question[locale]}</h1>
          <p className="text-[20px] leading-relaxed">{f.answer[locale]}</p>
          <p className="text-sm text-muted">
            {c.food.updated}: <time dateTime={f.updated}>{formatDay(locale, f.updated)}</time>
          </p>
        </header>

        <div className="grid max-w-3xl gap-8">
          <Section id="why" title={c.food.why}><p className="text-[17px] leading-relaxed">{f.why[locale]}</p></Section>
          {f.signs?.[locale] ? (
            <Section id="signs" title={c.food.signs}>
              <ul className="grid gap-2 text-[17px] leading-relaxed">
                {f.signs[locale]!.map((s) => (
                  <li key={s} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-graphite" />{s}</li>
                ))}
              </ul>
            </Section>
          ) : null}
          <Section id="what-to-do" title={c.food.whatToDo}>
            <p className={`rounded-[16px] px-4 py-3 text-[17px] leading-relaxed ${f.level === "toxic" || f.level === "dangerous" ? "bg-danger-tint" : "bg-fog"}`}>{f.what_to_do[locale]}</p>
          </Section>
          {f.serving?.[locale] ? <Section id="serving" title={c.food.serving}><p className="text-[17px] leading-relaxed">{f.serving[locale]}</p></Section> : null}
          <aside aria-labelledby="for-kids" className="flex flex-col gap-2 rounded-[22px] bg-mint-tint p-5">
            <h2 id="for-kids" className="font-display text-[20px] font-bold">{c.food.forKids}</h2>
            <p className="text-[17px] leading-relaxed">{f.child[locale]}</p>
          </aside>
          {faq.length ? (
            <Section id="faq" title={c.food.faq}>
              <div className="flex flex-col gap-4">
                {faq.map((q) => (
                  <div key={q.q} className="flex flex-col gap-1">
                    <h3 className="text-[18px] font-bold">{q.q}</h3>
                    <p className="text-[17px] leading-relaxed text-muted">{q.a}</p>
                  </div>
                ))}
              </div>
            </Section>
          ) : null}
        </div>

        {related.length || others.length ? (
          <section aria-labelledby="related" className="flex flex-col gap-4">
            <h2 id="related" className="h-card text-[26px] leading-tight">{c.food.related}</h2>
            <ul className="flex flex-wrap gap-3">
              {related.map((r) => (
                <li key={r.slug}><Link href={foodHref(locale, r)} className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 hover:border-graphite">{r.name[locale]}</Link></li>
              ))}
              {others.map((o) => (
                <li key={`${o.species}-${o.slug}`}><Link href={foodHref(locale, o)} className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 hover:border-graphite">{o.question[locale]}</Link></li>
              ))}
            </ul>
            <Link href={careSpeciesHref(locale, species)} className="w-fit text-sm font-semibold underline">{c.food.backTo}: {w.question}</Link>
          </section>
        ) : null}

        <section aria-labelledby="sources" className="flex max-w-3xl flex-col gap-3">
          <h2 id="sources" className="h-card text-[24px] leading-tight">{c.food.sources}</h2>
          <ol className="grid list-decimal gap-2 pl-5 text-[15px] leading-relaxed">
            {sources.map((s) => (
              <li key={s.id}><a href={s.url} rel="noopener" className="underline">{s.title}</a> — {s.publisher}</li>
            ))}
          </ol>
          <p className="rounded-[14px] bg-warn-tint px-4 py-3 text-sm leading-relaxed">{c.food.notVetReviewed}</p>
        </section>

        <AppCta locale={locale} speciesId={species.id} />
      </article>
    </>
  );
}

/* ─── link from a breed page (David 2026-10-31) ──────────────────────────── */

/** "What can dogs eat?" box on every breed page of a species that has published foods. */
export function CareFoodLink({ locale, speciesId }: { locale: Locale; speciesId: string }) {
  const sp = careSpecies(locale).find((s) => s.id === speciesId);
  if (!sp) return null;
  const c = getCareCopy(locale);
  const w = speciesWords(locale, sp.id);
  return (
    <Link href={careSpeciesHref(locale, sp)} className="group flex max-w-3xl flex-col gap-1 rounded-[22px] border border-line bg-white p-5 hover:border-graphite">
      <span className="text-sm font-semibold text-muted">{c.hub.count(foodsOf(sp.id, locale).length)}</span>
      <span className="font-display text-[22px] font-bold group-hover:underline">{w.question}</span>
      <span className="leading-relaxed text-muted">{c.hub.foodsLead(w)}</span>
    </Link>
  );
}

/* ─── small pieces ───────────────────────────────────────────────────────── */

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-3">
      <h2 id={id} className="h-card text-[26px] leading-tight">{title}</h2>
      {children}
    </section>
  );
}

function Crumbs({ locale, items }: { locale: Locale; items: { name: string; href?: string }[] }) {
  const dict = getDictionary(locale);
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
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

function Emergency({ locale }: { locale: Locale }) {
  const c = getCareCopy(locale);
  return (
    <aside className="flex max-w-3xl flex-col gap-1 rounded-[20px] bg-danger-tint px-5 py-4">
      <p className="font-display text-[18px] font-bold text-danger">{c.species.emergencyTitle}</p>
      <p className="leading-relaxed">{c.species.emergencyText}</p>
    </aside>
  );
}

function AppCta({ locale, speciesId }: { locale: Locale; speciesId: string }) {
  const c = getCareCopy(locale);
  const dict = getDictionary(locale);
  return (
    <div className="flex flex-wrap items-start justify-between gap-6 rounded-[30px] bg-mint px-6 py-10 sm:px-10">
      <div className="flex max-w-md flex-col gap-2">
        <p className="font-display text-[26px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[30px]">{c.food.simulates}</p>
        <p className="leading-relaxed">{c.food.simulatesText(speciesWords(locale, speciesId))}</p>
      </div>
      <div className="w-full max-w-[560px]"><StoreButtons locale={locale} dict={dict} /></div>
    </div>
  );
}

function firstSentence(t: string): string {
  const m = t.match(/^.+?[.!?](\s|$)/);
  return (m ? m[0] : t).trim();
}

/* ─── llms / markdown ────────────────────────────────────────────────────── */

export function careSpeciesMarkdown(locale: Locale, sp: Species): string {
  const c = getCareCopy(locale);
  const w = speciesWords(locale, sp.id);
  const foods = foodsOf(sp.id, locale);
  const out = [`# ${w.question}`, c.species.lead(w), `> ${c.food.notVetReviewed}`];
  for (const lv of levels) {
    const g = foods.filter((f) => f.level === lv);
    if (!g.length) continue;
    out.push(`## ${c.levels[lv].heading}`);
    for (const f of g) {
      const src = sourcesOf(f).map((s) => `[${s.publisher}](${s.url})`).join(", ");
      out.push(`### ${f.question[locale]}\n${f.answer[locale]} ${f.why[locale]}${f.signs?.[locale] ? `\n${c.food.signs}: ${f.signs[locale]!.join("; ")}.` : ""}\n${c.food.whatToDo}: ${f.what_to_do[locale]}\n${c.food.sources}: ${src}. ${absoluteUrl(foodHref(locale, f))}`);
    }
  }
  return out.join("\n\n");
}

export { careHref };
