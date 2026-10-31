import Link from "next/link";
import en from "@/content/en";
import { defaultLocale, localeMeta, locales, pathFor } from "@/i18n/config";

// Rendered for unknown URLs. The proxy routes every path without a language prefix to the English
// tree, so this page is in English, with a way home in every other site language.
export default function NotFound() {
  const dict = en;
  return (
    <div className="container-page flex flex-col items-start gap-6 py-28">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/petprep-mark.svg" alt="" width={96} height={96} />
      <h1 className="h-display text-[clamp(36px,5vw,60px)]">{dict.common.notFoundTitle}</h1>
      <p className="text-lg text-muted">{dict.common.notFoundText}</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">{dict.common.notFoundCta}</Link>
        {locales.filter((l) => l !== defaultLocale).map((l) => (
          <Link key={l} href={pathFor(l, "home")} className="btn btn-secondary" hrefLang={localeMeta[l].htmlLang} lang={localeMeta[l].htmlLang}>{localeMeta[l].label}</Link>
        ))}
      </div>
    </div>
  );
}
