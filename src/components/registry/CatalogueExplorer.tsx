"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { PAGE_SIZE, recommendedOrder, type Item } from "./catalogue-shared";

type Option = { value: string; label: string };

export type ExplorerProps = {
  locale: "en" | "sl";
  indexUrl: string;
  compareHref: string;
  /** First results page in the default order, rendered on the server (crawlable rows, no layout shift). */
  initial: Item[];
  /** Number of breeds of the species (the full index is fetched only when it is larger than `initial`). */
  total: number;
  /** Only options that occur in the data (worked out on the server). */
  facets: { key: string; label: string; options: Option[] }[];
  tags: Option[];
  availability: Option[];
  /** Availability values to offer as a filter (more than one present). */
  availabilityFilter: Option[];
  strings: {
    searchLabel: string;
    searchPlaceholder: string;
    filtersTitle: string;
    suitsTitle: string;
    any: string;
    availabilityLabel: string;
    sortLabel: string;
    sort: { recommended: string; az: string; size: string };
    clear: string;
    /** Result line per number of shown breeds; `{n}` and `{total}` are replaced. */
    results: string;
    none: string;
    loading: string;
    page: string;
    prev: string;
    next: string;
    compareAdd: string;
    compareBar: string;
    compareGo: string;
    compareMax: string;
  };
};

const COMPARE_MAX = 3;
const SIZE_ORDER = ["toy", "small", "medium", "large", "giant"];

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const fill = (t: string, v: Record<string, string | number>) => t.replace(/\{(\w+)\}/g, (_, k: string) => String(v[k] ?? ""));

type State = { q: string; tags: string[]; facets: Record<string, string>; av: string; sort: "recommended" | "az" | "size"; page: number; picked: string[] };
const EMPTY: State = { q: "", tags: [], facets: {}, av: "", sort: "recommended", page: 1, picked: [] };

function parseQuery(search: string, facetKeys: string[]): State {
  if (!search) return EMPTY;
  const p = new URLSearchParams(search);
  const list = (k: string) => (p.get(k) ?? "").split(",").filter(Boolean);
  const sort = p.get("sort");
  const facets: Record<string, string> = {};
  for (const k of facetKeys) if (p.get(k)) facets[k] = p.get(k) as string;
  return {
    q: p.get("q") ?? "",
    tags: list("tag"),
    facets,
    av: p.get("av") ?? "",
    sort: sort === "az" || sort === "size" ? sort : "recommended",
    page: Math.max(1, Number(p.get("page")) || 1),
    picked: list("b").slice(0, COMPARE_MAX),
  };
}

function writeUrl(s: State) {
  const p = new URLSearchParams();
  if (s.q) p.set("q", s.q);
  if (s.tags.length) p.set("tag", s.tags.join(","));
  for (const [k, v] of Object.entries(s.facets)) if (v) p.set(k, v);
  if (s.av) p.set("av", s.av);
  if (s.sort !== "recommended") p.set("sort", s.sort);
  if (s.page > 1) p.set("page", String(s.page));
  if (s.picked.length) p.set("b", s.picked.join(","));
  const qs = p.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
}

/** The query string as an external store: "" in the server HTML, the real one after hydration. */
const noop = () => () => {};
const useSearch = () => useSyncExternalStore(noop, () => window.location.search, () => "");

const hasFilters = (s: State) => s.tags.length > 0 || Object.values(s.facets).some(Boolean) || Boolean(s.av);

/**
 * Search, filters, sort, pagination and "pick up to 3 to compare" for one species.
 * The server renders the controls and the first results page as plain links (same markup the
 * browser hydrates, so nothing moves); the full slim index is fetched only when there are more
 * breeds than fit on the first page. Without JavaScript the rows and the A–Z list still work.
 */
export function CatalogueExplorer({ locale, indexUrl, compareHref, initial, total, facets, tags, availability, availabilityFilter, strings }: ExplorerProps) {
  const complete = initial.length >= total;
  const [fetched, setFetched] = useState<Item[] | null>(null);
  const [failed, setFailed] = useState(false);
  const items = complete ? initial : fetched;
  const facetKeys = useMemo(() => facets.map((f) => f.key), [facets]);
  const search = useSearch();
  const fromUrl = useMemo(() => parseQuery(search, facetKeys), [search, facetKeys]);
  /** Local changes after the first render; until then the state comes from the URL. */
  const [local, setLocal] = useState<State | null>(null);
  const state = local ?? fromUrl;
  /** Filters fold into one row on phones (CSS); open there when the URL already filters. */
  const [filtersToggled, setFiltersToggled] = useState<boolean | null>(null);
  const filtersOpen = filtersToggled ?? hasFilters(fromUrl);

  useEffect(() => {
    if (complete) return;
    let cancelled = false;
    fetch(indexUrl)
      .then((r) => (r.ok ? (r.json() as Promise<Item[]>) : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (!cancelled) setFetched(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [indexUrl, complete]);

  const update = useCallback(
    (patch: Partial<State>, keepPage = false) => {
      setLocal((cur) => {
        const next = { ...(cur ?? fromUrl), ...patch, ...(keepPage ? {} : { page: 1 }) };
        writeUrl(next);
        return next;
      });
    },
    [fromUrl],
  );

  const filtered = useMemo(() => {
    if (!items) return null;
    const tokens = norm(state.q).split(/\s+/).filter(Boolean);
    const out = items.filter(
      (it) =>
        tokens.every((t) => it.s.includes(t)) &&
        state.tags.every((t) => it.t.includes(t)) &&
        Object.entries(state.facets).every(([k, v]) => !v || it.f[k] === v) &&
        (!state.av || it.av === state.av),
    );
    const collator = new Intl.Collator(locale === "sl" ? "sl" : "en");
    const byName = (a: Item, b: Item) => collator.compare(a.n, b.n);
    if (state.sort === "az") out.sort(byName);
    else if (state.sort === "size") out.sort((a, b) => (SIZE_ORDER.indexOf(a.f.size ?? "") + 1 || 99) - (SIZE_ORDER.indexOf(b.f.size ?? "") + 1 || 99) || byName(a, b));
    else out.sort(recommendedOrder);
    return out;
  }, [items, state, locale]);

  // Until the full index is here (large species only), show the server's first page.
  const list = filtered ?? initial;
  const count = filtered ? filtered.length : total;
  const pages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const page = filtered ? Math.min(state.page, pages) : 1;
  const shown = filtered ? list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : initial;
  const activeCount = state.tags.length + Object.values(state.facets).filter(Boolean).length + (state.av ? 1 : 0);
  const active = state.q || activeCount;
  const pickedNames = state.picked.map((k) => (items ?? initial).find((it) => it.k === k)?.n).filter(Boolean);
  const ready = Boolean(items) && !failed;
  const goPage = (n: number) => {
    update({ page: n }, true);
    document.getElementById("catalogue-results")?.scrollIntoView({ block: "start" });
  };
  const togglePick = (k: string) =>
    update({ picked: state.picked.includes(k) ? state.picked.filter((x) => x !== k) : [...state.picked, k].slice(0, COMPARE_MAX) }, true);

  const selectCls = "min-h-11 w-full rounded-xl border border-line bg-white px-3 text-[15px] focus-visible:outline-2";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-[22px] border border-line bg-white p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">{strings.searchLabel}</span>
            <input
              type="search"
              value={state.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder={strings.searchPlaceholder}
              className="min-h-11 w-full rounded-xl border border-line bg-fog px-3 text-[16px]"
              autoComplete="off"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">{strings.sortLabel}</span>
            <select value={state.sort} onChange={(e) => update({ sort: e.target.value as State["sort"] })} className={selectCls}>
              <option value="recommended">{strings.sort.recommended}</option>
              <option value="az">{strings.sort.az}</option>
              {facetKeys.includes("size") ? <option value="size">{strings.sort.size}</option> : null}
            </select>
          </label>
        </div>

        {tags.length || facets.length || availabilityFilter.length ? (
          <div className="flex flex-col gap-3">
            {/* Phones: one "Filters" row that folds the filters. Wider screens: always open (CSS only, so the server HTML matches). */}
            <button
              type="button"
              aria-expanded={filtersOpen}
              aria-controls="catalogue-filters"
              onClick={() => setFiltersToggled(!filtersOpen)}
              className="flex min-h-11 w-full items-center justify-between rounded-xl bg-fog px-3 text-[15px] font-semibold md:hidden"
            >
              <span>
                {strings.filtersTitle}
                {activeCount ? ` (${activeCount})` : ""}
              </span>
              <span aria-hidden="true" className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`}>
                ⌄
              </span>
            </button>
            <fieldset id="catalogue-filters" className={`${filtersOpen ? "flex" : "hidden"} flex-col gap-3 md:flex`}>
              <legend className="sr-only">{strings.filtersTitle}</legend>
              {tags.length ? (
                <div role="group" aria-label={strings.suitsTitle} className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-sm font-semibold">{strings.suitsTitle}</span>
                  {tags.map((t) => {
                    const on = state.tags.includes(t.value);
                    return (
                      <button
                        key={t.value}
                        type="button"
                        aria-pressed={on}
                        onClick={() => update({ tags: on ? state.tags.filter((x) => x !== t.value) : [...state.tags, t.value] })}
                        className={`min-h-10 rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ${on ? "bg-graphite text-white ring-graphite" : "bg-white ring-line hover:ring-graphite"}`}
                      >
                        {on ? <span aria-hidden="true">✓ </span> : null}
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
              {facets.length || availabilityFilter.length ? (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {facets.map((f) => (
                    <label key={f.key} className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold">{f.label}</span>
                      <select value={state.facets[f.key] ?? ""} onChange={(e) => update({ facets: { ...state.facets, [f.key]: e.target.value } })} className={selectCls}>
                        <option value="">{strings.any}</option>
                        {f.options.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                  {availabilityFilter.length ? (
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold">{strings.availabilityLabel}</span>
                      <select value={state.av} onChange={(e) => update({ av: e.target.value })} className={selectCls}>
                        <option value="">{strings.any}</option>
                        {availabilityFilter.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : null}
                </div>
              ) : null}
            </fieldset>
          </div>
        ) : null}

        <div className="flex min-h-10 flex-wrap items-center justify-between gap-2">
          <p role="status" aria-live="polite" className="text-sm font-medium text-muted">
            {!filtered && active ? strings.loading : count ? fill(strings.results, { n: count, total }) : strings.none}
          </p>
          {active ? (
            <button type="button" onClick={() => update({ q: "", tags: [], facets: {}, av: "" })} className="min-h-10 px-2 text-sm font-semibold text-mint-text hover:underline">
              {strings.clear}
            </button>
          ) : null}
        </div>
      </div>

      {shown.length ? (
        <ul id="catalogue-results" className="scroll-mt-24 divide-y divide-line overflow-hidden rounded-[22px] border border-line bg-white">
          {shown.map((it) => {
            const picked = state.picked.includes(it.k);
            const full = !picked && state.picked.length >= COMPARE_MAX;
            return (
              <li key={it.id} className="flex items-start gap-3 px-4 py-3 sm:items-center sm:px-5">
                <input
                  type="checkbox"
                  checked={picked}
                  disabled={full}
                  onChange={() => togglePick(it.k)}
                  aria-label={fill(strings.compareAdd, { name: it.n })}
                  title={full ? fill(strings.compareMax, { max: COMPARE_MAX }) : fill(strings.compareAdd, { name: it.n })}
                  className="mt-1 h-5 w-5 shrink-0 accent-[#121614] sm:mt-0"
                />
                {it.p ? (
                  <Image src={it.p.src} width={48} height={Math.round((48 * it.p.h) / it.p.w)} alt="" loading="lazy" sizes="48px" className="h-12 w-12 shrink-0 rounded-xl bg-fog object-cover ring-1 ring-line" />
                ) : null}
                <div className="grid min-w-0 flex-1 gap-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_11.5rem] sm:items-center sm:gap-4">
                  <div className="min-w-0">
                    <Link href={it.h} className="font-display text-[17px] font-bold hover:text-mint-text">
                      {it.n}
                    </Link>
                    {it.a ? <p className="truncate text-[13px] text-muted">{it.a}</p> : null}
                  </div>
                  <p className="min-w-0 text-[14px] leading-snug text-[#2a312d]">{it.l}</p>
                  <span
                    className={`justify-self-start rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] sm:justify-self-end ${
                      it.av === "in_app" ? "bg-graphite text-mint" : it.av === "coming_soon" ? "bg-mint-tint text-graphite" : "bg-fog text-muted ring-1 ring-line"
                    }`}
                  >
                    {availability.find((o) => o.value === it.av)?.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}

      {pages > 1 ? (
        <nav aria-label={fill(strings.page, { n: page, total: pages })} className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" disabled={page <= 1 || !ready} onClick={() => goPage(page - 1)} className="btn btn-secondary !min-h-11 !px-4 disabled:opacity-40">
            ← {strings.prev}
          </button>
          <span className="text-sm font-medium">{fill(strings.page, { n: page, total: pages })}</span>
          <button type="button" disabled={page >= pages || !ready} onClick={() => goPage(page + 1)} className="btn btn-secondary !min-h-11 !px-4 disabled:opacity-40">
            {strings.next} →
          </button>
        </nav>
      ) : null}

      {state.picked.length ? (
        <div className="sticky bottom-3 z-20 flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-graphite px-4 py-3 text-fog shadow-xl">
          <p className="text-sm">
            <span className="font-semibold">{fill(strings.compareBar, { n: state.picked.length, max: COMPARE_MAX })}</span>
            <span className="block text-muted-dark">{pickedNames.join(" · ")}</span>
          </p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => update({ picked: [] }, true)} className="min-h-11 px-2 text-sm font-semibold text-muted-dark hover:text-fog">
              {strings.clear}
            </button>
            {state.picked.length >= 2 ? (
              <Link href={`${compareHref}?b=${state.picked.map(encodeURIComponent).join(",")}`} className="btn btn-mint !min-h-11">
                {strings.compareGo} →
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
