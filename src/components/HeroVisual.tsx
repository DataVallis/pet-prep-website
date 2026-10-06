import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/content/types";

/** Hero: the child's app screen on a mint slab, with a parent card and a notification. */
export function HeroVisual({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.home;
  return (
    <div className="relative mx-auto flex h-[600px] w-full max-w-[600px] items-center justify-center sm:h-[640px]">
      <div aria-hidden="true" className="absolute inset-y-5 left-6 right-0 rounded-[40px] bg-mint sm:left-14" />
      <div className="relative w-[270px] rounded-[44px] bg-[#0b0d0c] p-[9px] shadow-[0_30px_70px_rgba(18,22,20,0.28)] sm:w-[290px]">
        <Image
          src={`/screens/${locale}/hud.png`}
          alt={dict.screens.hud}
          width={780}
          height={1688}
          priority
          sizes="290px"
          className="h-auto w-full rounded-[35px]"
        />
      </div>

      <div className="absolute left-0 top-[38%] w-[230px] rounded-[22px] bg-white p-4 shadow-[0_16px_40px_rgba(18,22,20,0.16)] sm:left-[-8px] sm:w-[250px] sm:p-[18px]" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="h-card text-lg">{h.parentCard.child}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-tint px-2.5 py-1 text-xs font-semibold">
            <span className="h-[7px] w-[7px] rounded-full bg-ok" />
            {h.parentCard.status}
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-5xl font-bold leading-none tracking-[-0.04em]">86</span>
          <span className="text-xs text-muted">{h.parentCard.scoreLabel}</span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-line">
          <div className="h-full w-1/4 rounded-full bg-graphite" />
        </div>
        <p className="mt-2 text-xs text-muted">{h.parentCard.progress}</p>
      </div>

      <div className="absolute bottom-[100px] right-0 hidden w-[250px] items-start gap-3 rounded-[18px] bg-graphite p-3.5 text-fog shadow-[0_16px_40px_rgba(18,22,20,0.25)] sm:right-[-24px] sm:flex sm:w-[262px]" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/petprep-mark-on-dark.svg" alt="" width={30} height={30} className="shrink-0" />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold">{h.notification.app}</span>
          <span className="text-[13px] leading-snug text-[#c9d1cb]">{h.notification.text}</span>
        </div>
      </div>
    </div>
  );
}
