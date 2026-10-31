"use client";

/** Prints only the colouring sheet (print CSS in globals.css: `.print-sheet`). */
export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="inline-flex h-12 items-center justify-center rounded-xl bg-graphite px-5 font-semibold text-white hover:opacity-90">
      {label}
    </button>
  );
}
