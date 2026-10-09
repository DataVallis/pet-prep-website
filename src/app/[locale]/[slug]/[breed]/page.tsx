import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breedIdFromSlug, breedIds, breedSlugs, isLocale, pageSlugs, pathFor, pathForBreed, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content";
import { getBreedCopy, registry, registryUpdated } from "@/content/breeds";
import { buildBreedView } from "@/lib/breeds";
import { buildBreedMetadata } from "@/lib/seo";
import { breadcrumb3Ld, breedPageLd, graph } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { StoreButtons } from "@/components/Cta";
import { Cite, FactList, TagChips } from "@/components/breeds/Facts";

export const dynamicParams = false;

/** One page per breed and locale, under the localized "breeds" slug only. */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  const locale = params.locale;
  return breedIds.map((id) => ({ slug: pageSlugs.breeds[locale], breed: breedSlugs[id][locale] }));
}

function resolve(localeParam: string, slug: string, breedSlug: string) {
  if (!isLocale(localeParam)) return undefined;
  if (slug !== pageSlugs.breeds[localeParam]) return undefined;
  const id = breedIdFromSlug(localeParam, breedSlug);
  return id ? { locale: localeParam as Locale, id } : undefined;
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[slug]/[breed]">): Promise<Metadata> {
  const { locale, slug, breed } = await params;
  const r = resolve(locale, slug, breed);
  if (!r) return {};
  const c = getBreedCopy(r.locale);
  const text = c.breeds[r.id];
  return buildBreedMetadata({ locale: r.locale, id: r.id, title: `${text.name} — ${c.page.eyebrow} · PetPrep`, description: text.metaDescription });
}

function formatDate(locale: Locale, iso: string) {
  return new Intl.DateTimeFormat(locale === "sl" ? "sl-SI" : "en-GB", { dateStyle: "long" }).format(new Date(iso));
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-[22px] border border-line bg-white p-6">
      <h3 className="h-card text-xl">{title}</h3>
      {children}
    </section>
  );
}

export default async function BreedPage({ params }: PageProps<"/[locale]/[slug]/[breed]">) {
  const { locale: localeParam, slug, breed } = await params;
  const r = resolve(localeParam, slug, breed);
  if (!r) notFound();
  const { locale, id } = r;
  const dict = getDictionary(locale);
  const c = getBreedCopy(locale);
  const v = buildBreedView(locale, id);
  const labels = registry.suitability_labels[locale];
  const cite = c.page.sourceLabel;
  const overview = pathFor(locale, "breeds");
  const title = `${v.name} — ${c.page.eyebrow} · PetPrep`;

  const ld = graph(
    breedPageLd({
      locale,
      path: pathForBreed(locale, id),
      title,
      description: v.metaDescription,
      breedName: v.name,
      sources: v.sources,
      dateModified: registryUpdated,
    }),
    breadcrumb3Ld([
      { name: dict.common.breadcrumbHome, path: pathFor(locale, "home") },
      { name: c.page.eyebrow, path: overview },
      { name: v.name, path: pathForBreed(locale, id) },
    ]),
  );

  return (
    <>
      <JsonLd data={ld} />
      <div className="container-page pb-24 pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href={pathFor(locale, "home")} className="hover:text-graphite">{dict.common.breadcrumbHome}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={overview} className="hover:text-graphite">{c.page.eyebrow}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-graphite">{v.name}</li>
          </ol>
        </nav>

        <header className="mb-12 flex max-w-4xl flex-col gap-5 sm:mb-14">
          <p className="eyebrow flex flex-wrap items-center gap-3">
            {c.page.eyebrow}
            <span className={`rounded-full px-2.5 py-1 text-[11px] tracking-[0.08em] ${v.availability.key === "in_app" ? "bg-graphite text-mint" : "bg-white text-graphite ring-1 ring-line"}`}>
              {v.availability.label}
            </span>
          </p>
          <h1 className="h-display text-[clamp(40px,6vw,72px)]">{v.name}</h1>
          {v.alsoKnownAs ? <p className="-mt-2 text-[17px] text-muted">{v.alsoKnownAs}</p> : null}
          <div className="flex max-w-3xl flex-col gap-4 text-[19px] leading-relaxed text-[#2a312d]">
            {v.intro.map((p) => <p key={p}>{p}</p>)}
          </div>
          <p className="max-w-3xl rounded-[14px] bg-mint-tint px-4 py-3 text-sm leading-relaxed">{v.availability.text}</p>
        </header>

        <div className="flex flex-col gap-16 sm:gap-20">
          <section aria-labelledby="suits" className="flex flex-col gap-5">
            <h2 id="suits" className="h-card text-[28px] leading-tight sm:text-[34px]">{c.page.suitabilityTitle}</h2>
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
          </section>

          <section aria-labelledby="needs" className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 id="needs" className="h-card text-[28px] leading-tight sm:text-[34px]">{c.page.needsTitle}</h2>
              <p className="max-w-3xl text-[17px] leading-relaxed text-muted">{c.page.needsIntro}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card title={c.page.cards.exercise}><FactList lines={v.needs.exercise} empty={c.page.noData} sourceLabel={cite} /></Card>
              <Card title={c.page.cards.grooming}><FactList lines={v.needs.grooming} empty={c.page.noData} sourceLabel={cite} /></Card>
              <Card title={c.page.cards.feeding}>
                {v.needs.feeding.length ? <FactList lines={v.needs.feeding} empty={c.page.noData} sourceLabel={cite} /> : null}
                <p className="text-sm text-muted">{c.page.feedingGeneral}</p>
                <FactList lines={v.meals} empty={c.page.noData} sourceLabel={cite} />
              </Card>
              <Card title={c.page.cards.lifespan}><FactList lines={v.needs.lifespan} empty={c.page.noData} sourceLabel={cite} /></Card>
              <Card title={c.page.cards.stages}><FactList lines={v.needs.stages} empty={c.page.noData} sourceLabel={cite} /></Card>
              <Card title={c.page.cards.size}><FactList lines={v.needs.size} empty={c.page.noData} sourceLabel={cite} /></Card>
              <Card title={c.page.cards.training}><FactList lines={v.needs.training} empty={c.page.noData} sourceLabel={cite} /></Card>
            </div>
          </section>

          <section aria-labelledby="simulation" className="on-dark flex flex-col gap-6 rounded-[30px] bg-graphite px-5 py-10 text-fog sm:px-10">
            <div className="flex flex-col gap-3">
              <p className="w-fit rounded-full bg-mint px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-graphite">{c.page.simBadge}</p>
              <h2 id="simulation" className="h-card text-[28px] leading-tight sm:text-[34px]">{c.page.simTitle}</h2>
              <p className="max-w-3xl text-[17px] leading-relaxed text-muted-dark">{c.page.simIntro}</p>
            </div>
            <div className="overflow-x-auto rounded-[22px] bg-graphite-2" tabIndex={0} role="region" aria-labelledby="simulation">
              <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
                <thead>
                  <tr className="border-b border-graphite-3 text-sm text-muted-dark">
                    <th scope="col" className="p-4 font-semibold">{c.page.simTable.stage}</th>
                    <th scope="col" className="p-4 font-semibold">{c.page.simTable.starts}</th>
                    <th scope="col" className="p-4 font-semibold">{c.page.simTable.meals}</th>
                    <th scope="col" className="p-4 font-semibold">{c.page.simTable.steps}</th>
                  </tr>
                </thead>
                <tbody>
                  {v.game.rows.map((row) => (
                    <tr key={row.stage} className="border-b border-graphite-3 align-top last:border-0">
                      <th scope="row" className="p-4 font-display text-base font-bold">{row.stage}</th>
                      <td className="p-4">{row.starts}</td>
                      <td className="p-4">{row.meals}</td>
                      <td className="p-4">{row.steps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="grid max-w-4xl gap-2.5 text-[16px] leading-relaxed">
              {[v.game.stepsRule, v.game.learning, v.game.senior, c.page.simNote].map((t) => (
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
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted">{c.page.sourcesIntro(formatDate(locale, registry.data_compiled))}</p>
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
            <Link href={overview} className="btn btn-secondary">
              <span aria-hidden="true">←</span> {c.page.backToRegister}
            </Link>
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
