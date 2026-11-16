"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/** Searchable A–Z list of breeds linking to their "How much work is a dog?" page. All links are in the server HTML. */
export function BreedFinder({ items, locale, labels }: { items: { id: string; name: string; href: string }[]; locale: string; labels: { search: string; placeholder: string; none: string } }) {
  const [q, setQ] = useState("");
  const sorted = useMemo(() => [...items].sort((a, b) => a.name.localeCompare(b.name, locale)), [items, locale]);
  const nq = norm(q.trim());
  const shown = nq ? sorted.filter((i) => norm(i.name).includes(nq)) : sorted;
  return (
    <div className="flex flex-col gap-4">
      <label className="flex max-w-md flex-col gap-1.5 text-[15px] font-semibold">
        {labels.search}
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={labels.placeholder} autoComplete="off" className="min-h-12 rounded-xl border border-line bg-white px-4 text-[16px] font-normal" />
      </label>
      {shown.length === 0 ? <p className="text-muted" role="status">{labels.none}</p> : null}
      <ul className="columns-2 gap-6 sm:columns-3 lg:columns-4">
        {shown.map((i) => (
          <li key={i.id} className="break-inside-avoid">
            <Link href={i.href} className="flex min-h-11 items-center underline decoration-line underline-offset-2 hover:decoration-graphite">{i.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
