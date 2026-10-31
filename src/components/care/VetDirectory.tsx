"use client";

import { useMemo, useState } from "react";

/**
 * Vets by country (M6-K1, David 2026-10-31): every country for every language (a Slovenian family on
 * holiday in Spain needs Spain), filters by country, region and "24 h only", search by town or name.
 * Data: care-knowledge.json → vets (pet-prep docs/research/care/vets/<CC>.json), each entry sourced.
 */
export type VetEntry = {
  country: string;
  kind: "clinic" | "duty_rota" | "poison_line";
  name: string;
  city: string | null;
  region: string | null;
  address: string | null;
  phone: string | null;
  emergency_24h: boolean;
  duty: string | null;
  url: string | null;
  source_url: string;
  checked: string;
};

export type VetCopy = {
  country: string;
  all: string;
  region: string;
  allRegions: string;
  search: string;
  searchPlaceholder: string;
  only24h: string;
  results: (n: number) => string;
  none: string;
  h24: string;
  dutyRota: string;
  poisonLine: string;
  website: string;
  source: string;
  checked: string;
  countries: Record<string, string>;
};

const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function VetDirectory({ entries, copy, defaultCountry }: { entries: VetEntry[]; copy: VetCopy; defaultCountry: string }) {
  const countries = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of entries) counts.set(e.country, (counts.get(e.country) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => (copy.countries[a[0]] ?? a[0]).localeCompare(copy.countries[b[0]] ?? b[0]));
  }, [entries, copy.countries]);
  const [country, setCountry] = useState(countries.some(([c]) => c === defaultCountry) ? defaultCountry : "");
  const [region, setRegion] = useState("");
  const [q, setQ] = useState("");
  const [only24, setOnly24] = useState(false);

  const regions = useMemo(
    () => [...new Set(entries.filter((e) => !country || e.country === country).map((e) => e.region).filter((r): r is string => !!r))].sort((a, b) => a.localeCompare(b)),
    [entries, country],
  );
  const list = useMemo(() => {
    const nq = norm(q.trim());
    return entries
      .filter((e) => (!country || e.country === country) && (!region || e.region === region) && (!only24 || e.emergency_24h || e.kind !== "clinic"))
      .filter((e) => !nq || norm([e.name, e.city, e.region, e.address].filter(Boolean).join(" ")).includes(nq))
      .sort((a, b) => Number(b.kind !== "clinic") - Number(a.kind !== "clinic") || Number(b.emergency_24h) - Number(a.emergency_24h) || (a.city ?? "").localeCompare(b.city ?? "") || a.name.localeCompare(b.name));
  }, [entries, country, region, q, only24]);

  const field = "h-12 rounded-xl border border-line bg-white px-3 text-[16px]";
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1.4fr_auto] sm:items-end">
        <label className="flex flex-col gap-1 text-sm font-semibold">
          {copy.country}
          <select className={field} value={country} onChange={(e) => { setCountry(e.target.value); setRegion(""); }}>
            <option value="">{copy.all} ({entries.length})</option>
            {countries.map(([c, n]) => <option key={c} value={c}>{copy.countries[c] ?? c} ({n})</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold">
          {copy.region}
          <select className={field} value={region} onChange={(e) => setRegion(e.target.value)} disabled={!regions.length}>
            <option value="">{copy.allRegions}</option>
            {regions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold">
          {copy.search}
          <input className={field} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={copy.searchPlaceholder} />
        </label>
        <label className="flex h-12 items-center gap-2 rounded-xl border border-line bg-white px-3 text-[15px] font-semibold">
          <input type="checkbox" checked={only24} onChange={(e) => setOnly24(e.target.checked)} className="h-5 w-5 accent-graphite" />
          {copy.only24h}
        </label>
      </div>
      <p className="text-sm text-muted" aria-live="polite">{copy.results(list.length)}</p>
      {list.length ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <li key={`${e.country}-${e.name}-${e.city}`} className="flex flex-col gap-1.5 rounded-[20px] border border-line bg-white p-4">
              <span className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-muted">
                {copy.countries[e.country] ?? e.country}{e.city ? ` · ${e.city}` : e.region ? ` · ${e.region}` : ""}
                {e.kind === "clinic" && e.emergency_24h ? <span className="rounded-full bg-danger px-2 py-0.5 text-white">{copy.h24}</span> : null}
                {e.kind === "duty_rota" ? <span className="rounded-full bg-warn-tint px-2 py-0.5 text-warn">{copy.dutyRota}</span> : null}
                {e.kind === "poison_line" ? <span className="rounded-full bg-danger-tint px-2 py-0.5 text-danger">{copy.poisonLine}</span> : null}
              </span>
              <span className="font-display text-[17px] font-bold leading-snug">{e.name}</span>
              {e.phone ? <a href={`tel:${e.phone.replace(/[^\d+]/g, "")}`} className="w-fit text-[18px] font-bold text-danger underline">{e.phone}</a> : null}
              {e.address ? <span className="text-[14px] text-muted">{e.address}</span> : null}
              {e.duty ? <span className="text-[14px] leading-relaxed">{e.duty}</span> : null}
              <span className="mt-1 flex flex-wrap gap-3 text-[13px]">
                {e.url ? <a href={e.url} target="_blank" rel="noopener noreferrer" className="underline">{copy.website}</a> : null}
                <a href={e.source_url} target="_blank" rel="noopener noreferrer" className="text-muted underline">{copy.source} · {copy.checked} {e.checked}</a>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-[18px] bg-white p-5">{copy.none}</p>
      )}
    </div>
  );
}
