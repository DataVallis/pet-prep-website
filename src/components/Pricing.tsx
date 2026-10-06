import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";
import { PrimaryCta } from "./Cta";

function Check({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function formatPrice(locale: Locale, value: number) {
  return new Intl.NumberFormat(locale === "sl" ? "sl-SI" : "en-IE", { style: "currency", currency: site.price.currency }).format(value);
}

export function Pricing({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { free, challenge, note } = dict.pricingPlans;
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <section className="flex min-w-0 flex-col gap-5 rounded-[26px] border border-line bg-white p-6 sm:p-8" aria-labelledby="plan-free">
          <h3 id="plan-free" className="h-card text-2xl">{free.name}</h3>
          <p className="flex flex-wrap items-baseline gap-2">
            <span className="font-display text-[clamp(40px,11vw,56px)] font-extrabold leading-none tracking-[-0.04em]">{dict.common.free}</span>
            <span className="text-[15px] text-muted">{dict.common.forever}</span>
          </p>
          <p className="text-muted">{free.text}</p>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            {free.features.map((f) => (
              <li key={f} className="flex gap-2.5"><Check className="text-mint-text" />{f}</li>
            ))}
          </ul>
          <div className="mt-auto pt-2"><PrimaryCta dict={dict} variant="secondary" className="w-full !whitespace-normal text-center" /></div>
        </section>
        <section className="on-dark relative flex min-w-0 flex-col gap-5 rounded-[26px] bg-graphite p-6 text-fog sm:p-8" aria-labelledby="plan-challenge">
          <span className="absolute right-6 top-6 rounded-full bg-mint px-2.5 py-1 text-xs font-bold text-graphite">{challenge.badge}</span>
          <h3 id="plan-challenge" className="h-card max-w-[75%] text-2xl">{challenge.name}</h3>
          <p className="flex flex-wrap items-baseline gap-2">
            <span className="font-display text-[clamp(40px,11vw,56px)] font-extrabold leading-none tracking-[-0.04em]">{formatPrice(locale, site.price.challenge)}</span>
            <span className="text-[15px] text-muted-dark">{challenge.unit}</span>
          </p>
          <p className="text-muted-dark">{challenge.text}</p>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            {challenge.features.map((f) => (
              <li key={f} className="flex gap-2.5"><Check className="text-mint" />{f}</li>
            ))}
          </ul>
          <div className="mt-auto pt-2"><PrimaryCta dict={dict} variant="mint" className="w-full !whitespace-normal text-center" /></div>
        </section>
      </div>
      <p className="text-sm text-muted">{note}</p>
    </div>
  );
}
