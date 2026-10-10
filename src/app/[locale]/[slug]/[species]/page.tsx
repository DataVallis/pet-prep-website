import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, pageSlugs, pathFor, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content";
import { breedsOf, registry, speciesBySlug, type Species } from "@/content/registry/registry";
import { activityText, breedHref, catalogueIndex, compareHref, formatDay, getRegistryCopy, speciesHref, speciesUpdated } from "@/lib/registry/views";
import { buildPathMetadata } from "@/lib/seo";
import { breadcrumbsLd, collectionLd, graph } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { CatalogueExplorer } from "@/components/registry/CatalogueExplorer";
import { PAGE_SIZE, recommendedOrder } from "@/components/registry/catalogue-shared";
import { RichText } from "@/components/RichText";

export const dynamicParams = false;

/** One catalogue per species and locale, under the localized "animals" slug only. */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  const locale = params.locale;
  return registry.species.map((s) => ({ slug: pageSlugs.animals[locale], species: s.slug[locale] }));
}

function resolve(localeParam: string, slug: string, speciesSlug: string): { locale: Locale; species: Species } | undefined {
  if (!isLocale(localeParam) || slug !== pageSlugs.animals[localeParam]) return undefined;
  const species = speciesBySlug(localeParam, speciesSlug);
  return species ? { locale: localeParam, species } : undefined;
}

const paths = (s: Species) => Object.fromEntries(locales.map((l) => [l, speciesHref(l, s)])) as Record<Locale, string>;

export async function generateMetadata({ params }: PageProps<"/[locale]/[slug]/[species]">): Promise<Metadata> {
  const { locale, slug, species } = await params;
  const r = resolve(locale, slug, species);
  if (!r) return {};
  const c = getRegistryCopy(r.locale);
  const many = r.species.name[r.locale].many;
  return buildPathMetadata({ locale: r.locale, paths: paths(r.species), title: c.catalogue.metaTitle(many), description: c.catalogue.metaDescription(many) });
}

export default async function SpeciesCatalogue({ params }: PageProps<"/[locale]/[slug]/[species]">) {
  const { locale: l, slug, species: s } = await params;
  const r = resolve(l, slug, s);
  if (!r) notFound();
  const { locale, species } = r;
  const dict = getDictionary(locale);
  const c = getRegistryCopy(locale);
  const many = species.name[locale].many;
  const labels = registry.suitability_labels[locale];
  const collator = new Intl.Collator(locale);
  const breeds = [...breedsOf(species.id)].sort((a, b) => collator.compare(a.name[locale], b.name[locale]));
  // A–Z groups: first letter as written (Slovenian Č, Š, Ž keep their own group).
  const groups = new Map<string, typeof breeds>();
  for (const b of breeds) {
    const letter = b.name[locale].charAt(0).toLocaleUpperCase(locale);
    groups.set(letter, [...(groups.get(letter) ?? []), b]);
  }
  const animals = pathFor(locale, "animals");

  const ld = graph(
    collectionLd({
      locale,
      path: speciesHref(locale, species),
      title: c.catalogue.metaTitle(many),
      description: c.catalogue.metaDescription(many),
      items: breeds.map((b) => ({ name: b.name[locale], path: breedHref(locale, b) })),
      dateModified: speciesUpdated(species),
    }),
    breadcrumbsLd([
      { name: dict.common.breadcrumbHome, path: pathFor(locale, "home") },
      { name: dict.pages.animals.navLabel ?? dict.pages.animals.eyebrow, path: animals },
      { name: many, path: speciesHref(locale, species) },
    ]),
  );

  // The first results page is rendered on the server; filter options are only those in the data.
  const index = catalogueIndex(locale, species).sort(recommendedOrder);
  const suitsTags = Object.entries(registry.suitability_vocabulary)
    .filter(([tag, kind]) => kind === "suits" && index.some((it) => it.t.includes(tag)))
    .map(([tag]) => ({ value: tag, label: labels.tags[tag] }));
  const facetOptions = species.facets
    .map((k) => ({
      key: k,
      label: c.facets[k].label,
      options: Object.entries(c.facets[k].values)
        .filter(([value]) => index.some((it) => it.f[k] === value))
        .map(([value, label]) => ({ value, label })),
    }))
    .filter((f) => f.options.length > 1);
  const availability = (["in_app", "coming_soon", "info_only"] as const).map((v) => ({ value: v, label: c.availability[v].label }));
  const availabilityFilter = availability.filter((o) => index.some((it) => it.av === o.value));
  const updated = speciesUpdated(species);

  return (
    <>
      <JsonLd data={ld} />
      <div className="container-page pb-24 pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href={pathFor(locale, "home")} className="hover:text-graphite">{dict.common.breadcrumbHome}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={animals} className="hover:text-graphite">{dict.pages.animals.navLabel ?? dict.pages.animals.eyebrow}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-graphite">{many}</li>
          </ol>
        </nav>

        <header className="mb-10 flex max-w-4xl flex-col gap-4">
          <p className="eyebrow flex flex-wrap items-center gap-3">
            {c.catalogue.eyebrow}
            <span className={`rounded-full px-2.5 py-1 text-[11px] tracking-[0.08em] ${species.status === "available" ? "bg-graphite text-mint" : "bg-white text-graphite ring-1 ring-line"}`}>
              {c.speciesStatus[species.status]}
            </span>
          </p>
          <h1 className="h-display text-[clamp(36px,5.4vw,64px)]">{c.catalogue.title(many)}</h1>
          <p className="max-w-3xl text-[18px] leading-relaxed text-muted">{c.catalogue.lead(many, breeds.length)}</p>
          <p className="text-sm text-muted">
            {c.page.updated}: <time dateTime={updated}>{formatDay(locale, updated)}</time>
          </p>
        </header>

        <CatalogueExplorer
          locale={locale}
          indexUrl={`/registry/${species.id}/index.${locale}.json`}
          compareHref={compareHref(locale, species)}
          initial={index.slice(0, PAGE_SIZE)}
          total={index.length}
          facets={facetOptions}
          tags={suitsTags}
          availability={availability}
          availabilityFilter={availabilityFilter.length > 1 ? availabilityFilter : []}
          strings={{
            searchLabel: c.catalogue.searchLabel,
            searchPlaceholder: c.catalogue.searchPlaceholder,
            filtersTitle: c.catalogue.filtersTitle,
            suitsTitle: labels.suits_title,
            any: c.catalogue.any,
            availabilityLabel: c.catalogue.availabilityLabel,
            sortLabel: c.catalogue.sortLabel,
            sort: c.catalogue.sort,
            clear: c.catalogue.clear,
            results: c.catalogue.results(breeds.length),
            none: c.catalogue.none,
            loading: c.catalogue.loading,
            page: c.catalogue.page,
            prev: c.catalogue.prev,
            next: c.catalogue.next,
            compareAdd: c.catalogue.compareAdd,
            compareBar: c.catalogue.compareBar,
            compareGo: c.catalogue.compareGo,
            compareMax: c.catalogue.compareMax,
          }}
        />

        <section aria-labelledby="az" className="mt-16 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 id="az" className="h-card text-[26px] leading-tight sm:text-[30px]">{c.catalogue.azTitle}</h2>
            <p className="text-[15px] text-muted">{c.catalogue.azIntro}</p>
          </div>
          {groups.size > 1 ? (
            <nav aria-label={c.catalogue.azTitle} className="flex flex-wrap gap-1.5">
              {[...groups.keys()].map((letter) => (
                <a key={letter} href={`#az-${letter}`} className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-white px-2 font-semibold ring-1 ring-line hover:ring-graphite">
                  {letter}
                </a>
              ))}
            </nav>
          ) : null}
          <div className="columns-2 gap-6 sm:gap-8 lg:columns-4">
            {[...groups.entries()].map(([letter, list]) => (
              <div key={letter} id={`az-${letter}`} className="mb-5 break-inside-avoid scroll-mt-24">
                <h3 className="mb-1.5 font-display text-lg font-bold text-mint-text">{letter}</h3>
                <ul className="flex flex-col gap-1">
                  {list.map((b) => (
                    <li key={b.id} className="text-[15px]">
                      <Link href={breedHref(locale, b)} className="underline decoration-line underline-offset-2 hover:decoration-graphite">
                        {b.name[locale]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="guide" className="mt-16 flex max-w-4xl flex-col gap-4">
          <h2 id="guide" className="h-card text-[26px] leading-tight sm:text-[30px]">{c.catalogue.guideTitle}</h2>
          {c.catalogue.guide(many).map((t) => (
            <p key={t} className="text-[16px] leading-relaxed text-[#2a312d]">
              <RichText text={t} locale={locale} />
            </p>
          ))}
        </section>

        <section className="mt-12 rounded-[22px] border border-line bg-white p-6">
          <h2 className="h-card text-xl">{c.catalogue.freePlanTitle}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.hub.freePlan(species.free_plan.name[locale], activityText(locale, species.free_plan.adult_activity))}</p>
        </section>
      </div>
    </>
  );
}
