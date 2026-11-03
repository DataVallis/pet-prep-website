"use client";

import { useEffect, useRef, useState } from "react";

export type SourceItem = { id: string; publisher: string; title: string; url: string };

/**
 * Breed page source list (David 2026-11-03): the first sources are always visible, the rest open with
 * "Show all sources (n)". A citation link (#source-S7) to a hidden source opens the list first, so every
 * fact's source is still one click away.
 */
export function SourceList({ sources, visible = 2, showAll, showFewer }: { sources: SourceItem[]; visible?: number; showAll: string; showFewer: string }) {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const hidden = sources.length - visible;

  useEffect(() => {
    if (hidden <= 0) return;
    const reveal = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id.startsWith("source-")) return;
      const index = sources.findIndex((s) => `source-${s.id}` === id);
      if (index < visible) return;
      setOpen(true);
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "center" }));
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [sources, visible, hidden]);

  return (
    <div className="flex flex-col gap-3">
      <ol ref={listRef} id="source-list" className="grid gap-3">
        {sources.map((s, i) => (
          <li
            key={s.id}
            id={`source-${s.id}`}
            hidden={!open && i >= visible}
            className="scroll-mt-24 rounded-[14px] border border-line bg-white px-4 py-3 text-[15px] leading-relaxed target:ring-2 target:ring-mint"
          >
            <span className="mr-2 font-mono text-[12px] font-semibold text-mint-text">{s.id}</span>
            <span className="font-medium">{s.publisher}</span>
            {" — "}
            <a href={s.url} className="break-words text-graphite underline decoration-line underline-offset-2 hover:decoration-graphite" target="_blank" rel="noopener noreferrer">
              {s.title}
            </a>
            <span className="block break-all text-[13px] text-muted">{s.url}</span>
          </li>
        ))}
      </ol>
      {hidden > 0 ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls="source-list"
          onClick={() => {
            if (open) listRef.current?.scrollIntoView({ block: "start" });
            setOpen(!open);
          }}
          className="btn btn-secondary self-start"
        >
          {open ? showFewer : `${showAll} (${sources.length})`}
          <span aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>↓</span>
        </button>
      ) : null}
    </div>
  );
}
