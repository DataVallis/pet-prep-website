import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";

type Variant = "primary" | "mint" | "secondary";

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  mint: "btn btn-mint",
  secondary: "btn btn-secondary",
};

export function earlyAccessHref(dict: Dictionary) {
  return `mailto:${site.email.hello}?subject=${encodeURIComponent(dict.cta.earlyAccessSubject)}`;
}

/**
 * The main call to action. Before launch it asks for early access by email;
 * once `site.launchState` is "live" it links to the app stores.
 */
export function PrimaryCta({
  dict,
  label,
  variant = "primary",
  className = "",
}: {
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
    <a href={earlyAccessHref(dict)} className={`${variantClass[variant]} ${className}`}>
      {dict.cta.earlyAccess}
    </a>
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

export function StoreButtons({ dict }: { dict: Dictionary }) {
  if (site.launchState === "live" && site.stores.ios && site.stores.android) {
    return (
      <div className="flex flex-wrap gap-3">
        <a href={site.stores.ios} className="btn btn-primary"><PhoneIcon />{dict.cta.ios}</a>
        <a href={site.stores.android} className="btn btn-primary"><PhoneIcon />{dict.cta.android}</a>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <a href={earlyAccessHref(dict)} className="btn btn-primary"><PhoneIcon />{dict.cta.earlyAccess}</a>
      <span className="text-[15px] font-medium">{dict.cta.comingSoon}</span>
    </div>
  );
}
