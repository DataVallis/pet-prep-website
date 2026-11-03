import Link from "next/link";
import { pathFor, type Locale } from "@/i18n/config";
import { kidsCopy } from "@/content/kids";
import { Thumb } from "./Thumb";
import { NavLink } from "../NavLink";
import { absoluteUrl } from "@/lib/site";

/** Mobile menu: the section with its items indented under it. */
export function KidsMobile({ locale }: { locale: Locale }) {
  const c = kidsCopy[locale];
  return (
    <div className="flex flex-col border-b border-line py-3">
      <NavLink href={pathFor(locale, "kids")} alsoActiveFor={c.items.map((it) => pathFor(locale, it.page))} className="text-[17px] font-semibold" activeClassName="border-l-4 border-mint pl-3 text-mint-text">{c.menu}</NavLink>
      <div className="mt-2 flex flex-col gap-1 pl-3">
        {c.items.map((it) => (
          <NavLink key={it.page} href={pathFor(locale, it.page)} className="flex items-center gap-3 rounded-[14px] py-1.5 text-[16px]" activeClassName="bg-mint-tint font-semibold ring-2 ring-mint">
            <Thumb item={it} size="xs" />
            <span className="font-medium">{it.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

/** Hub block on /for-kids · /sl/za-otroke. */
export function KidsHub({ locale }: { locale: Locale }) {
  const c = kidsCopy[locale];
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {c.items.map((it) => (
        <li key={it.page}>
          <Link href={pathFor(locale, it.page)} className="group flex h-full flex-col gap-3 rounded-[22px] border border-line bg-white p-4 hover:border-graphite">
            <Thumb item={it} size="lg" />
            <span className="font-display text-[22px] font-bold group-hover:underline">{it.title}</span>
            <span className="leading-relaxed text-muted">{it.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function kidsHubMarkdown(locale: Locale): string {
  return kidsCopy[locale].items.map((it) => `- **${it.title}** — ${it.text} ${absoluteUrl(pathFor(locale, it.page))}`).join("\n");
}
