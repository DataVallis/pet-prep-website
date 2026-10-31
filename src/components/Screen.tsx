import Image from "next/image";
import { screenLocale, type Locale } from "@/i18n/config";
import type { ScreenKey } from "@/content/types";

/** An app screen inside a phone frame. Images live in /public/screens/<locale>/<key>.webp (600×1298, from the 780×1688 PNG sources). */
export function Screen({
  locale,
  screen,
  caption,
  priority = false,
}: {
  locale: Locale;
  screen: ScreenKey;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="flex flex-col items-center gap-4">
      <div className="w-full max-w-[290px] rounded-[44px] bg-[#0b0d0c] p-[9px] shadow-[0_24px_60px_rgba(18,22,20,0.22)]">
        <Image
          src={`/screens/${screenLocale(locale)}/${screen}.webp`}
          alt={caption}
          width={780}
          height={1688}
          sizes="(min-width: 1024px) 272px, 70vw"
          priority={priority}
          // Pre-sized WebP, served as a static file (see HeroVisual).
          unoptimized
          className="h-auto w-full rounded-[35px]"
        />
      </div>
      <figcaption className="max-w-[300px] text-center text-[14px] leading-snug text-muted">{caption}</figcaption>
    </figure>
  );
}
