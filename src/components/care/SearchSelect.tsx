"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

/**
 * Select with a search field (David 2026-11-11: "select option mora imeti search"). An ARIA combobox:
 * type to filter (accents ignored), arrows + Enter to pick, Escape to close. Works with mouse, touch and
 * keyboard; the closed state shows the chosen label like a normal select.
 */
export type SearchOption = { value: string; label: string; hint?: string };

const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function SearchSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  searchPlaceholder,
  noMatch,
  disabled,
}: {
  label: string;
  options: SearchOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder: string;
  noMatch: string;
  disabled?: boolean;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const selected = options.find((o) => o.value === value);

  const shown = useMemo(() => {
    const nq = norm(q.trim());
    return nq ? options.filter((o) => norm(o.label).includes(nq)) : options;
  }, [options, q]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const openList = () => {
    if (disabled) return;
    setQ("");
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
    requestAnimationFrame(() => input.current?.focus());
  };
  const pick = (o: SearchOption) => {
    onChange(o.value);
    setOpen(false);
  };

  return (
    <div ref={root} className="relative flex flex-col gap-1 text-sm font-semibold">
      <span id={`${id}-label`}>{label}</span>
      {open ? (
        <input
          ref={input}
          role="combobox"
          aria-expanded="true"
          aria-controls={`${id}-list`}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={shown[active] ? `${id}-o${active}` : undefined}
          className="h-12 rounded-xl border-2 border-graphite bg-white px-3 text-[16px] font-normal outline-none"
          value={q}
          placeholder={searchPlaceholder}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, shown.length - 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            else if (e.key === "Enter") { e.preventDefault(); if (shown[active]) pick(shown[active]); }
            else if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
            else if (e.key === "Tab") setOpen(false);
          }}
        />
      ) : (
        <button
          type="button"
          aria-haspopup="listbox"
          aria-labelledby={`${id}-label`}
          disabled={disabled}
          onClick={openList}
          className="flex h-12 items-center justify-between gap-2 rounded-xl border border-line bg-white px-3 text-left text-[16px] font-normal disabled:opacity-50"
        >
          <span className={`truncate ${selected ? "" : "text-muted"}`}>{selected ? selected.label : placeholder}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </button>
      )}
      {open ? (
        <ul
          ref={list}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-72 overflow-auto rounded-xl border border-line bg-white p-1 text-[15px] font-normal shadow-lg"
        >
          {shown.length ? (
            shown.map((o, i) => (
              <li
                key={o.value || "_"}
                id={`${id}-o${i}`}
                data-i={i}
                role="option"
                aria-selected={o.value === value}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => { e.preventDefault(); pick(o); }}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 ${i === active ? "bg-fog" : ""} ${o.value === value ? "font-semibold" : ""}`}
              >
                <span>{o.label}</span>
                {o.hint ? <span className="text-[13px] text-muted">{o.hint}</span> : null}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-muted">{noMatch}</li>
          )}
        </ul>
      ) : null}
    </div>
  );
}
