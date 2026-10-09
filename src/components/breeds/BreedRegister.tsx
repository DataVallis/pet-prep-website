import type { Locale } from "@/i18n/config";
import { getBreedCopy, registry } from "@/content/breeds";
import { allBreedViews, compareRowKeys, filterTags, mixedBreedSteps } from "@/lib/breeds";
import { BreedExplorer } from "./BreedExplorer";

/** The "breeds" page body: filter + comparison, mixed-breed note, cats line, method. */
export function BreedRegister({ locale }: { locale: Locale }) {
  const c = getBreedCopy(locale);
  const views = allBreedViews(locale);
  const tags = filterTags(locale);
  const labels = registry.suitability_labels[locale];
  const missing = tags.filter((t) => t.count === 0).map((t) => t.label);
  const results = Array.from({ length: views.length + 1 }, (_, n) => c.overview.filterResult(n, views.length));

  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      <BreedExplorer
        breeds={views.map((v) => ({
          id: v.id,
          name: v.name,
          alsoKnownAs: v.alsoKnownAs,
          href: v.href,
          linkLabel: c.overview.open(v.name),
          availabilityKey: v.availability.key,
          availabilityLabel: v.availability.label,
          suits: v.suits.map(({ tag, label }) => ({ tag, label })),
          consider: v.consider.map(({ tag, label }) => ({ tag, label })),
          compare: v.compare,
        }))}
        filterTags={tags.filter((t) => t.count > 0).map(({ tag, label }) => ({ tag, label }))}
        rows={compareRowKeys.map((key) => ({ key, label: c.rows[key] }))}
        strings={{
          filterTitle: c.overview.filterTitle,
          filterIntro: c.overview.filterIntro,
          filterClear: c.overview.filterClear,
          filterNone: c.overview.filterNone,
          suitsTitle: labels.suits_title,
          considerTitle: labels.consider_title,
          compareTitle: c.overview.compareTitle,
          compareIntro: c.overview.compareIntro,
          compareNote: c.overview.compareNote,
          results,
        }}
      />

      {missing.length ? (
        <p className="-mt-8 max-w-3xl text-sm leading-relaxed text-muted sm:-mt-12">{c.overview.notYet(missing.join(", "))}</p>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2.5 rounded-[22px] border border-line bg-white p-6">
          <h2 className="h-card text-xl">{c.overview.mixedTitle}</h2>
          <p className="text-[15px] leading-relaxed text-muted">{c.overview.mixedText(mixedBreedSteps(locale))}</p>
        </div>
        <div className="flex flex-col justify-center gap-2.5 rounded-[22px] bg-mint-tint p-6">
          <p className="h-card text-xl">{c.overview.catsLine}</p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h-card text-[28px] leading-tight sm:text-[34px]">{c.overview.methodTitle}</h2>
        <ul className="grid max-w-4xl gap-3.5">
          {c.overview.method.map((m) => (
            <li key={m} className="flex gap-3 text-[17px] leading-relaxed">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-mint-text">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {m}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
