import type { Locale } from "@/i18n/config";
import { RichText } from "./RichText";

export function Faq({ items, locale, headingLevel = 3 }: { items: { q: string; a: string }[]; locale: Locale; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="divide-y divide-line rounded-[22px] border border-line bg-white">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
            <H>{item.q}</H>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="mt-1 shrink-0 transition-transform group-open:rotate-45">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-muted">
            <RichText text={item.a} locale={locale} />
          </p>
        </details>
      ))}
    </div>
  );
}
