import Link from "next/link";
import { pathFor, type Locale } from "@/i18n/config";
import { kidsCopy, type KidsItem } from "@/content/kids";
import { absoluteUrl } from "@/lib/site";

/** Picture of a kids item: its image, or the mint "#" tile for #walkyourpet. */
function Thumb({ item, size }: { item: KidsItem; size: "xs" | "sm" | "lg" }) {
  const box = size === "xs" ? "h-9 w-9 rounded-[10px]" : size === "sm" ? "h-14 w-14 rounded-[14px]" : "h-48 w-full rounded-[16px]";
  if (!item.image) {
    return <span aria-hidden="true" className={`${box} flex shrink-0 items-center justify-center bg-graphite font-display font-extrabold text-mint ${size === "lg" ? "text-[40px]" : "text-[20px]"}`}>{size === "lg" ? item.title : "#"}</span>;
  }
  const isPage = item.image.src.startsWith("/coloring/");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.image.src}
      alt=""
      width={item.image.width}
      height={item.image.height}
      loading="lazy"
      className={`${box} shrink-0 ${isPage ? "border border-line bg-white object-cover object-top" : "bg-mint object-contain p-1"}`}
    />
  );
}

/** Desktop dropdown in the header: opens on hover and on keyboard focus; the label itself links to the hub. */
export function KidsMenu({ locale }: { locale: Locale }) {
  const c = kidsCopy[locale];
  return (
    <div className="group relative">
      <Link href={pathFor(locale, "kids")} className="flex items-center gap-1.5 hover:text-mint-text" aria-haspopup="true">
        {c.menu}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Link>
      <div className="invisible absolute left-1/2 top-full z-40 w-[420px] -translate-x-1/2 pt-4 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="flex flex-col gap-1 rounded-[24px] border border-line bg-white p-3 shadow-[0_12px_32px_rgba(18,22,20,0.16)]">
          {c.items.map((it) => (
            <Link key={it.page} href={pathFor(locale, it.page)} className="flex items-center gap-4 rounded-[18px] p-2.5 hover:bg-mint-tint">
              <Thumb item={it} size="sm" />
              <span className="flex flex-col gap-0.5">
                <span className="font-display text-[17px] font-bold text-graphite">{it.title}</span>
                <span className="text-[14px] leading-snug text-muted">{it.text}</span>
              </span>
            </Link>
          ))}
          <Link href={pathFor(locale, "kids")} className="mt-1 rounded-[14px] px-3 py-2 text-[14px] font-semibold underline hover:bg-mint-tint">{c.all} →</Link>
        </div>
      </div>
    </div>
  );
}

/** Mobile menu: the section with its items indented under it. */
export function KidsMobile({ locale }: { locale: Locale }) {
  const c = kidsCopy[locale];
  return (
    <div className="flex flex-col border-b border-line py-3">
      <Link href={pathFor(locale, "kids")} className="text-[17px] font-semibold">{c.menu}</Link>
      <div className="mt-2 flex flex-col gap-1 pl-3">
        {c.items.map((it) => (
          <Link key={it.page} href={pathFor(locale, it.page)} className="flex items-center gap-3 rounded-[14px] py-1.5 text-[16px]">
            <Thumb item={it} size="xs" />
            <span className="font-medium">{it.title}</span>
          </Link>
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
