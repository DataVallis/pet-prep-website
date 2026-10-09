"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

type Data = {
  rows: { key: string; label: string }[];
  breeds: Record<string, { name: string; href: string; values: Record<string, string> }>;
};

/** true in the browser, false in the static HTML (so nothing shows without JavaScript). */
const noop = () => () => {};
const useIsClient = () => useSyncExternalStore(noop, () => true, () => false);

const MAX = 3;

/** Comparison of up to 3 breeds of one species, chosen by `?b=slug,slug` (static page, data fetched). */
export function CompareView({
  dataUrl,
  catalogueHref,
  strings,
}: {
  dataUrl: string;
  catalogueHref: string;
  strings: { pick: string; back: string; remove: string; note: string; loading: string };
}) {
  const isClient = useIsClient();
  const [data, setData] = useState<Data | null>(null);
  const [picked, setPicked] = useState<string[] | null>(null);

  useEffect(() => {
    const read = () => (new URLSearchParams(window.location.search).get("b") ?? "").split(",").filter(Boolean).slice(0, MAX);
    fetch(dataUrl)
      .then((r) => (r.ok ? (r.json() as Promise<Data>) : Promise.reject(new Error(String(r.status)))))
      .catch(() => ({ rows: [], breeds: {} }) as Data)
      .then((d) => {
        setPicked(read());
        setData(d);
      });
  }, [dataUrl]);

  if (!isClient) return null;
  if (!picked || !data) return <p className="text-sm text-muted" role="status">{strings.loading}</p>;

  const cols = picked.filter((k) => data.breeds[k]);
  const remove = (k: string) => {
    const next = cols.filter((x) => x !== k);
    setPicked(next);
    const p = new URLSearchParams(window.location.search);
    if (next.length) p.set("b", next.join(","));
    else p.delete("b");
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${p.toString() ? `?${p}` : ""}`);
  };
  const back = `${catalogueHref}${cols.length ? `?b=${cols.map(encodeURIComponent).join(",")}` : ""}`;

  return (
    <div className="flex flex-col gap-5">
      {cols.length < 2 ? <p className="max-w-3xl rounded-[14px] bg-mint-tint px-4 py-3 text-[15px]">{strings.pick}</p> : null}
      {cols.length ? (
        <div className="hidden overflow-x-auto rounded-[22px] border border-line bg-white sm:block" tabIndex={0} role="region" aria-label={cols.map((k) => data.breeds[k].name).join(", ")}>
          <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-line align-top">
                <td className="w-[24%] p-4" />
                {cols.map((k) => (
                  <th key={k} scope="col" className="p-4">
                    <Link href={data.breeds[k].href} className="font-display text-lg font-bold hover:text-mint-text">
                      {data.breeds[k].name}
                    </Link>
                    <button type="button" onClick={() => remove(k)} className="mt-1 block min-h-9 text-sm font-medium text-muted hover:text-graphite">
                      ✕ {strings.remove.replace("{name}", data.breeds[k].name)}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r) => (
                <tr key={r.key} className="border-b border-line align-top last:border-0">
                  <th scope="row" className="p-4 text-sm font-semibold text-muted">
                    {r.label}
                  </th>
                  {cols.map((k) => (
                    <td key={k} className="p-4 leading-relaxed">
                      {data.breeds[k].values[r.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {cols.length ? (
        // Phones: one card per row, the chosen breeds stacked inside it.
        <div className="flex flex-col gap-3 sm:hidden">
          <ul className="flex flex-wrap gap-2">
            {cols.map((k) => (
              <li key={k} className="flex items-center gap-1 rounded-full bg-white py-1 pl-3 pr-1 text-sm font-semibold ring-1 ring-line">
                <Link href={data.breeds[k].href}>{data.breeds[k].name}</Link>
                <button type="button" onClick={() => remove(k)} aria-label={strings.remove.replace("{name}", data.breeds[k].name)} className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-graphite">
                  ✕
                </button>
              </li>
            ))}
          </ul>
          {data.rows.map((r) => (
            <section key={r.key} className="rounded-[18px] border border-line bg-white p-4">
              <h2 className="mb-2 text-sm font-semibold text-muted">{r.label}</h2>
              <dl className="flex flex-col gap-2">
                {cols.map((k) => (
                  <div key={k}>
                    <dt className="font-display text-[15px] font-bold">{data.breeds[k].name}</dt>
                    <dd className="text-[15px] leading-relaxed">{data.breeds[k].values[r.key]}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      ) : null}
      <p className="max-w-3xl text-sm leading-relaxed text-muted">{strings.note}</p>
      <Link href={back} className="btn btn-secondary self-start">
        ← {strings.back}
      </Link>
    </div>
  );
}
