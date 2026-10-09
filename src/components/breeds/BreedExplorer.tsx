"use client";

import Link from "next/link";
import { useState } from "react";

export type ExplorerBreed = {
  id: string;
  name: string;
  alsoKnownAs?: string;
  href: string;
  linkLabel: string;
  availabilityKey: "in_app" | "coming_soon";
  availabilityLabel: string;
  suits: { tag: string; label: string }[];
  consider: { tag: string; label: string }[];
  compare: Record<string, string>;
};

export type ExplorerProps = {
  breeds: ExplorerBreed[];
  filterTags: { tag: string; label: string }[];
  rows: { key: string; label: string }[];
  strings: {
    filterTitle: string;
    filterIntro: string;
    filterClear: string;
    filterNone: string;
    suitsTitle: string;
    considerTitle: string;
    compareTitle: string;
    compareIntro: string;
    compareNote: string;
    /** Result line per number of shown breeds (index = count). */
    results: string[];
  };
};

/**
 * Overview of the breed register: filter by "Good for" tags (all selected tags must match)
 * and compare the shown breeds. Without JavaScript every breed is shown and the
 * filter buttons do nothing, so the page still works.
 */
export function BreedExplorer({ breeds, filterTags, rows, strings }: ExplorerProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const shown = breeds.filter((b) => selected.every((t) => b.suits.some((s) => s.tag === t)));
  const toggle = (tag: string) => setSelected((cur) => (cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag]));

  return (
    <div className="flex flex-col gap-14">
      <section aria-labelledby="breed-filter" className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 id="breed-filter" className="h-card text-[28px] leading-tight sm:text-[34px]">
            {strings.filterTitle}
          </h2>
          <p className="max-w-3xl text-[17px] leading-relaxed text-muted">{strings.filterIntro}</p>
        </div>
        <div role="group" aria-label={strings.suitsTitle} className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold">{strings.suitsTitle}</span>
          {filterTags.map((t) => {
            const on = selected.includes(t.tag);
            return (
              <button
                key={t.tag}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(t.tag)}
                className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium ring-1 transition-colors ${
                  on ? "bg-graphite text-white ring-graphite" : "bg-white text-graphite ring-line hover:ring-graphite"
                }`}
              >
                {on ? <span aria-hidden="true">✓ </span> : null}
                {t.label}
              </button>
            );
          })}
          {selected.length ? (
            <button type="button" onClick={() => setSelected([])} className="min-h-11 px-3 text-sm font-semibold text-mint-text underline-offset-2 hover:underline">
              {strings.filterClear}
            </button>
          ) : null}
        </div>
        <p role="status" aria-live="polite" className="text-sm font-medium text-muted">
          {shown.length ? strings.results[shown.length] : strings.filterNone}
        </p>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((b) => (
            <li key={b.id} className="flex flex-col gap-4 rounded-[22px] border border-line bg-white p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                    b.availabilityKey === "in_app" ? "bg-graphite text-mint" : "bg-fog text-graphite ring-1 ring-line"
                  }`}
                >
                  {b.availabilityLabel}
                </span>
              </div>
              <div>
                <h3 className="h-card text-2xl">
                  <Link href={b.href} className="hover:text-mint-text">
                    {b.name}
                  </Link>
                </h3>
                {b.alsoKnownAs ? <p className="text-sm text-muted">{b.alsoKnownAs}</p> : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{strings.suitsTitle}</p>
                <p className="text-[15px] leading-relaxed">{b.suits.map((s) => s.label).join(" · ")}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{strings.considerTitle}</p>
                <p className="text-[15px] leading-relaxed">{b.consider.map((s) => s.label).join(" · ")}</p>
              </div>
              <Link href={b.href} className="btn btn-secondary mt-auto self-start !whitespace-normal text-left !text-[15px]">
                {b.linkLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="breed-compare" className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 id="breed-compare" className="h-card text-[28px] leading-tight sm:text-[34px]">
            {strings.compareTitle}
          </h2>
          <p className="max-w-3xl text-[17px] leading-relaxed text-muted">{strings.compareIntro}</p>
        </div>
        {shown.length ? (
          <div className="overflow-x-auto rounded-[22px] border border-line bg-white" tabIndex={0} role="region" aria-labelledby="breed-compare">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-line">
                  <td className="w-[22%] p-4" />
                  {shown.map((b) => (
                    <th key={b.id} scope="col" className="p-4 font-display text-lg font-bold">
                      <Link href={b.href} className="hover:text-mint-text">
                        {b.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.key} className="border-b border-line last:border-0 align-top">
                    <th scope="row" className="p-4 text-sm font-semibold text-muted">
                      {r.label}
                    </th>
                    {shown.map((b) => (
                      <td key={b.id} className="p-4 leading-relaxed">
                        {b.compare[r.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <p className="max-w-3xl text-sm leading-relaxed text-muted">{strings.compareNote}</p>
      </section>
    </div>
  );
}
