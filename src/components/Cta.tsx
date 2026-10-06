import { pathFor, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";
import { EarlyAccessForm } from "./EarlyAccessForm";
import { EarlyAccessLink } from "./EarlyAccessLink";

type Variant = "primary" | "mint" | "secondary";

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  mint: "btn btn-mint",
  secondary: "btn btn-secondary",
};

export const EARLY_ACCESS_ID = "early-access";

export function earlyAccessHref(locale: Locale) {
  return `${pathFor(locale, "home")}#${EARLY_ACCESS_ID}`;
}

/**
 * The main call to action. Before launch it jumps to the early-access email form;
 * once `site.launchState` is "live" it links to the App Store.
 */
export function PrimaryCta({
  locale,
  dict,
  label,
  variant = "primary",
  className = "",
}: {
  locale: Locale;
  dict: Dictionary;
  label?: string;
  variant?: Variant;
  className?: string;
}) {
  if (site.launchState === "live" && site.stores.ios) {
    return (
      <a href={site.stores.ios} className={`${variantClass[variant]} ${className}`}>
        {label ?? dict.cta.primary}
      </a>
    );
  }
  return (
    <EarlyAccessLink href={earlyAccessHref(locale)} targetId={EARLY_ACCESS_ID} className={`${variantClass[variant]} ${className}`}>
      {dict.cta.earlyAccess}
    </EarlyAccessLink>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M11 18h2" />
    </svg>
  );
}

/** Store buttons once live; the early-access form before launch. */
export function StoreButtons({ locale, dict, tone = "mint" }: { locale: Locale; dict: Dictionary; tone?: "light" | "dark" | "mint" }) {
  if (site.launchState === "live" && site.stores.ios && site.stores.android) {
    return (
      <div className="flex flex-wrap gap-3">
        <a href={site.stores.ios} className="btn btn-primary"><PhoneIcon />{dict.cta.ios}</a>
        <a href={site.stores.android} className="btn btn-primary"><PhoneIcon />{dict.cta.android}</a>
      </div>
    );
  }
  return <EarlyAccessForm locale={locale} copy={dict.earlyAccess} privacyHref={pathFor(locale, "privacy")} tone={tone} />;
}
