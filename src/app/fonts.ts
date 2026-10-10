import localFont from "next/font/local";

/**
 * Brand fonts (CGP v2). Only the two faces the first paint needs are preloaded — Instrument Sans 400
 * (body text, usually the LCP element) and Bricolage Grotesque 800 (H1). The other weights load
 * when the page uses them (display: swap). Each weight is its own next/font call so `preload` can
 * differ; a shared `font-family` declaration joins them into one family per typeface, so normal
 * weight matching (font-weight: 600 → the 600 file) keeps working. globals.css names these families
 * directly ("PetPrep Instrument", "PetPrep Bricolage") because the CSS variables keep next/font's own
 * family name; the variables still supply the size-adjusted fallback face.
 */

export const instrument = localFont({
  src: [{ path: "../fonts/InstrumentSans-400.woff2", weight: "400", style: "normal" }],
  declarations: [{ prop: "font-family", value: "'PetPrep Instrument'" }],
  variable: "--font-instrument",
  display: "swap",
  preload: true,
});

const instrumentMore = localFont({
  src: [
    { path: "../fonts/InstrumentSans-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/InstrumentSans-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/InstrumentSans-700.woff2", weight: "700", style: "normal" },
  ],
  declarations: [{ prop: "font-family", value: "'PetPrep Instrument'" }],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const bricolage = localFont({
  src: [{ path: "../fonts/BricolageGrotesque-800.woff2", weight: "800", style: "normal" }],
  declarations: [{ prop: "font-family", value: "'PetPrep Bricolage'" }],
  variable: "--font-bricolage",
  display: "swap",
  preload: true,
});

const bricolageMore = localFont({
  src: [{ path: "../fonts/BricolageGrotesque-700.woff2", weight: "700", style: "normal" }],
  declarations: [{ prop: "font-family", value: "'PetPrep Bricolage'" }],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

/** Classes for <html>: the CSS variables plus the non-preloaded faces' @font-face rules. */
export const fontClasses = [instrument.variable, bricolage.variable, instrumentMore.className, bricolageMore.className].join(" ");
