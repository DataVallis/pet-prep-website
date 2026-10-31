"use client";

import Link from "next/link";
import { useState } from "react";
import { pathFor, type Locale } from "@/i18n/config";
import { kidsCopy } from "@/content/kids";
import { Thumb } from "./Thumb";

/**
 * Desktop "For kids" dropdown in the header: opens on hover and keyboard focus, the label links to the hub.
 * Closes after a choice (David 2026-10-31): a click drops focus and hides the panel until the pointer
 * leaves; Escape closes it too.
 */
export function KidsMenu({ locale }: { locale: Locale }) {
  const c = kidsCopy[locale];
  const [closed, setClosed] = useState(false);
  const close = () => {
    setClosed(true);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };
  return (
    <div
      className="group relative"
      data-closed={closed ? "" : undefined}
      onMouseEnter={() => setClosed(false)}
      onMouseLeave={() => setClosed(false)}
      onFocus={() => setClosed(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
    >
      <Link href={pathFor(locale, "kids")} onClick={close} className="flex items-center gap-1.5 hover:text-mint-text" aria-haspopup="true">
        {c.menu}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180 group-data-[closed]:rotate-0">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Link>
      <div className="invisible absolute left-1/2 top-full z-40 w-[420px] -translate-x-1/2 pt-4 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 group-data-[closed]:invisible group-data-[closed]:opacity-0">
        <div className="flex flex-col gap-1 rounded-[24px] border border-line bg-white p-3 shadow-[0_12px_32px_rgba(18,22,20,0.16)]">
          {c.items.map((it) => (
            <Link key={it.page} href={pathFor(locale, it.page)} onClick={close} className="flex items-center gap-4 rounded-[18px] p-2.5 hover:bg-mint-tint">
              <Thumb item={it} size="sm" />
              <span className="flex flex-col gap-0.5">
                <span className="font-display text-[17px] font-bold text-graphite">{it.title}</span>
                <span className="text-[14px] leading-snug text-muted">{it.text}</span>
              </span>
            </Link>
          ))}
          <Link href={pathFor(locale, "kids")} onClick={close} className="mt-1 rounded-[14px] px-3 py-2 text-[14px] font-semibold underline hover:bg-mint-tint">{c.all} →</Link>
        </div>
      </div>
    </div>
  );
}
