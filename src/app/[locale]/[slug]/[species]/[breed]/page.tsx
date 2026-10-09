import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compareSlug, isLocale, locales, pageSlugs, pathFor, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content";
import { breedBySlug, breedsOf, registry, speciesBySlug, type Breed, type Species } from "@/content/registry/registry";
import { breedHref, buildBreedView, compareHref, getRegistryCopy, registryUpdated, speciesHref } from "@/lib/registry/views";
import { buildPathMetadata } from "@/lib/seo";
import { breadcrumbsLd, breedPageLd, graph } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { StoreButtons } from "@/components/Cta";
import { Cite, FactList, TagChips } from "@/components/registry/Facts";
import { CompareView } from "@/components/registry/CompareView";

export const dynamicParams = false;

/** Every breed of every species, plus the comparison page of each species (same segment). */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  const locale = params.locale;
  return registry.species.flatMap((s) => [
    ...breedsOf(s.id).map((b) => ({ slug: pageSlugs.animals[locale], species: s.slug[locale], breed: b.slug[locale] })),
    { slug: pageSlugs.animals[locale], species: s.slug[locale], breed: compareSlug[locale] },
  ]);
}

type Resolved = { locale: Locale; species: Species; breed: Breed | null };

function resolve(localeParam: string, slug: string, speciesSlug: string, breedSlug: string): Resolved | undefined {
  if (!isLocale(localeParam) || slug !== pageSlugs.animals[localeParam]) return undefined;
  const species = speciesBySlug(localeParam, speciesSlug);
  if (!species) return undefined;
  if (breedSlug === compareSlug[localeParam]) return { locale: localeParam, species, breed: null };
  const breed = breedBySlug(species.id, localeParam, breedSlug);
  return breed ? { locale: localeParam, species, breed } : undefined;
}

const each = (fn: (l: Locale) => string) => Object.fromEntries(locales.map((l) => [l, fn(l)])) as Record<Locale, string>;

export async function generateMetadata({ params }: PageProps<"/[locale]/[slug]/[species]/[breed]">): Promise<Metadata> {
  const p = await params;
  const r = resolve(p.locale, p.slug, p.species, p.breed);
  if (!r) return {};
  const c = getRegistryCopy(r.locale);
  const sp = r.species;
  if (!r.breed) {
    return buildPathMetadata({
      locale: r.locale,
      paths: each((l) => compareHref(l, sp)),
      title: c.compare.metaTitle(sp.name[r.locale].many),
      description: c.compare.intro,
      noIndex: true,
      imagePath: `${speciesHref(r.locale, sp)}/opengraph-image`,
    });
  }
  const b = r.breed;
  return buildPathMetadata({
    locale: r.locale,
    paths: each((l) => breedHref(l, b)),
    title: c.page.metaTitle(b.name[r.locale], sp.name[r.locale].one),
    description: c.page.metaDescription(b.name[r.locale], sp.name[r.locale].one),
    imagePath: `${speciesHref(r.locale, sp)}/opengraph-image`,
  });
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-[22px] border border-line bg-white p-6">
      <h3 className="h-card text-xl">{title}</h3>
      {children}
    </section>
  );
}

function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {it.href ? (
              <Link href={it.href} className="hover:text-graphite">{it.name}</Link>
            ) : (
              <span aria-current="page" className="font-medium text-graphite">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default async function BreedOrComparePage({ params }: PageProps<"/[locale]/[slug]/[species]/[breed]">) {
  const p = await params;
  const r = resolve(p.locale, p.slug, p.species, p.breed);
  if (!r) notFound();
  const { locale, species } = r;
  const dict = getDictionary(locale);
  const c = getRegistryCopy(locale);
  const many = species.name[locale].many;
  const animals = { name: dict.pages.animals.navLabel ?? dict.pages.animals.eyebrow, href: pathFor(locale, "animals") };
  const home = { name: dict.common.breadcrumbHome, href: pathFor(locale, "home") };
  const catalogue = { name: many, href: speciesHref(locale, species) };

  if (!r.breed) {
    return (
      <div className="container-page pb-24 pt-10 sm:pt-14">
        <Crumbs items={[home, animals, catalogue, { name: c.catalogue.compareGo }]} />
        <header className="mb-8 flex max-w-4xl flex-col gap-4">
          <p className="eyebrow">{c.catalogue.eyebrow}</p>
          <h1 className="h-display text-[clamp(34px,5vw,60px)]">{c.compare.title(many)}</h1>
          <p className="max-w-3xl text-[18px] leading-relaxed text-muted">{c.compare.intro}</p>
        </header>
        <CompareView
          dataUrl={`/registry/${species.id}/compare.${locale}.json`}
          catalogueHref={speciesHref(locale, species)}
          strings={{ pick: c.compare.pick, back: c.compare.back, remove: c.compare.remove, note: c.compare.note, loading: c.catalogue.loading }}
        />
        <noscript>
          <p className="mt-6 text-[15px]">
            <Link href={speciesHref(locale, species)} className="underline">{c.compare.back}</Link>
          </p>
        </noscript>
      </div>
    );
  }

  const v = buildBreedView(locale, r.breed);
  const labels = registry.suitability_labels[locale];
  const cite = c.page.sourceLabel;

  const ld = graph(
    breedPageLd({
      locale,
      path: v.href,
      title: c.page.metaTitle(v.name, species.name[locale].one),
      description: c.page.metaDescription(v.name, species.name[locale].one),
      breedName: v.name,
      sources: v.sources,
      dateModified: registryUpdated,
    }),
    breadcrumbsLd([
      { name: home.name, path: home.href },
      { name: animals.name, path: animals.href },
      { name: many, path: catalogue.href },
      { name: v.name, path: v.href },
    ]),
  );

  return (
    <>
      <JsonLd data={ld} />
      <div className="container-page pb-24 pt-10 sm:pt-14">
        <Crumbs items={[home, animals, catalogue, { name: v.name }]} />

        <header className="mb-12 flex max-w-4xl flex-col gap-5 sm:mb-14">
          <p className="eyebrow flex flex-wrap items-center gap-3">
            {c.page.eyebrow} · {species.name[locale].one}
            <span className={`rounded-full px-2.5 py-1 text-[11px] tracking-[0.08em] ${v.availability.key === "in_app" ? "bg-graphite text-mint" : "bg-white text-graphite ring-1 ring-line"}`}>
              {v.availability.label}
            </span>
          </p>
          <h1 className="h-display text-[clamp(40px,6vw,72px)]">{v.name}</h1>
          {v.aka ? <p className="-mt-2 text-[17px] text-muted">{v.aka}</p> : null}
          {v.intro.length ? (
            <div className="flex max-w-3xl flex-col gap-4 text-[19px] leading-relaxed text-[#2a312d]">
              {v.intro.map((t) => <p key={t}>{t}</p>)}
            </div>
          ) : (
            <p className="max-w-3xl text-[19px] leading-relaxed text-[#2a312d]">{c.page.metaDescription(v.name, species.name[locale].one)}</p>
          )}
          <p className="max-w-3xl rounded-[14px] bg-mint-tint px-4 py-3 text-sm leading-relaxed">{v.availability.text}</p>
        </header>

        <div className="flex flex-col gap-16 sm:gap-20">
          <section aria-labelledby="suits" className="flex flex-col gap-5">
            <h2 id="suits" className="h-card text-[28px] leading-tight sm:text-[34px]">{c.page.suitabilityTitle}</h2>
            {v.suits.length || v.consider.length ? (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-3 rounded-[22px] border border-line bg-white p-6">
                    <h3 className="text-sm font-semibold">{labels.suits_title}</h3>
                    <TagChips tags={v.suits} tone="suits" sourceLabel={cite} />
                  </div>
                  <div className="flex flex-col gap-3 rounded-[22px] border border-line bg-white p-6">
                    <h3 className="text-sm font-semibold">{labels.consider_title}</h3>
                    <TagChips tags={v.consider} tone="consider" sourceLabel={cite} />
                  </div>
                </div>
                <p className="max-w-3xl text-sm leading-relaxed text-muted">{c.page.suitabilityNote}</p>
              </>
            ) : (
              <p className="text-[15px] text-muted">{c.page.suitabilityNone}</p>
            )}
          </section>

          <section aria-labelledby="needs" className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 id="needs" className="h-card text-[28px] leading-tight sm:text-[34px]">{c.page.needsTitle}</h2>
              <p className="max-w-3xl text-[17px] leading-relaxed text-muted">{c.page.needsIntro}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {v.groups.map((g) => (
                <Card key={g.key} title={g.title}>
                  {g.lines.length ? <FactList lines={g.lines} empty={c.page.noData} sourceLabel={cite} /> : null}
                  {g.general.length ? (
                    <>
                      <p className="text-sm text-muted">{c.page.general(many)}</p>
                      <FactList lines={g.general} empty={c.page.noData} sourceLabel={cite} />
                    </>
                  ) : null}
                </Card>
              ))}
            </div>
          </section>

          <section aria-labelledby="simulation" className="on-dark flex flex-col gap-6 rounded-[30px] bg-graphite px-5 py-10 text-fog sm:px-10">
            <div className="flex flex-col gap-3">
              <p className="w-fit rounded-full bg-mint px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-graphite">{c.page.simBadge}</p>
              <h2 id="simulation" className="h-card text-[28px] leading-tight sm:text-[34px]">{c.page.simTitle}</h2>
              <p className="max-w-3xl text-[17px] leading-relaxed text-muted-dark">{v.game ? c.page.simIntro : c.page.simInfoOnly}</p>
            </div>
            {v.game ? (
              <>
                <div className="overflow-x-auto rounded-[22px] bg-graphite-2" tabIndex={0} role="region" aria-labelledby="simulation">
                  <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
                    <thead>
                      <tr className="border-b border-graphite-3 text-sm text-muted-dark">
                        <th scope="col" className="p-4 font-semibold">{c.page.simTable.stage}</th>
                        <th scope="col" className="p-4 font-semibold">{c.page.simTable.starts}</th>
                        <th scope="col" className="p-4 font-semibold">{c.page.simTable.meals}</th>
                        <th scope="col" className="p-4 font-semibold">{v.game.activityHeader}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {v.game.rows.map((row) => (
                        <tr key={row.stage} className="border-b border-graphite-3 align-top last:border-0">
                          <th scope="row" className="p-4 font-display text-base font-bold">{row.stage}</th>
                          <td className="p-4">{row.starts}</td>
                          <td className="p-4">{row.meals}</td>
                          <td className="p-4">{row.activity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="grid max-w-4xl gap-2.5 text-[16px] leading-relaxed">
                  {v.game.rules.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="text-sm leading-relaxed text-muted-dark">
                  {c.page.simDecisions}
                  <Cite sources={v.game.basis} sourceLabel={cite} dark />
                </p>
              </>
            ) : null}
          </section>

          <section aria-labelledby="health" className="flex flex-col gap-4">
            <h2 id="health" className="h-card text-[28px] leading-tight sm:text-[34px]">{c.page.healthTitle}</h2>
            <p className="max-w-3xl rounded-[14px] bg-warn-tint px-4 py-3 text-sm font-medium leading-relaxed">{c.page.healthNote}</p>
            <div className="max-w-3xl">
              <FactList lines={v.health} empty={c.page.healthNone} sourceLabel={cite} />
            </div>
          </section>

          <section aria-labelledby="sources" className="flex flex-col gap-4">
            <h2 id="sources" className="h-card text-[28px] leading-tight sm:text-[34px]">{c.page.sourcesTitle}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted">{c.page.sourcesIntro}</p>
            <ol className="grid gap-3">
              {v.sources.map((s) => (
                <li key={s.id} id={`source-${s.id}`} className="scroll-mt-24 rounded-[14px] border border-line bg-white px-4 py-3 text-[15px] leading-relaxed target:ring-2 target:ring-mint">
                  <span className="mr-2 font-mono text-[12px] font-semibold text-mint-text">{s.id}</span>
                  <span className="font-medium">{s.publisher}</span>
                  {" — "}
                  <a href={s.url} className="break-words text-graphite underline decoration-line underline-offset-2 hover:decoration-graphite" rel="noopener noreferrer">
                    {s.title}
                  </a>
                  <span className="block break-all text-[13px] text-muted">{s.url}</span>
                </li>
              ))}
            </ol>
          </section>

          <p className="max-w-3xl text-sm leading-relaxed text-muted">{c.page.disclaimer}</p>

          <nav aria-label={c.page.eyebrow} className="flex flex-wrap gap-3">
            <Link href={catalogue.href} className="btn btn-secondary">
              <span aria-hidden="true">←</span> {c.page.backTo(many)}
            </Link>
            {breedsOf(species.id).length > 1 ? (
              <Link href={`${catalogue.href}?b=${encodeURIComponent(r.breed.slug[locale])}`} className="btn btn-secondary">
                {c.page.compareWith}
              </Link>
            ) : null}
          </nav>
        </div>

        <div className="mt-20 flex flex-wrap items-start justify-between gap-6 rounded-[30px] bg-mint px-6 py-10 sm:px-10">
          <div className="flex max-w-md flex-col gap-2">
            <p className="font-display text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[34px]">{dict.home.final.title}</p>
            <p className="leading-relaxed">{dict.earlyAccess.text}</p>
          </div>
          <div className="w-full max-w-[560px]"><StoreButtons locale={locale} dict={dict} /></div>
        </div>
      </div>
    </>
  );
}
