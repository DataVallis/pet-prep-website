import { site } from "@/lib/site";
/**
 * /investors page (David 2026-11-01, design "PetPrep for investors", pet-prep-website docs/design/investors-design.html).
 * Copy lives in one file per language (en.ts, sl.ts, …); every number on the page comes from src/lib/investorStats.ts.
 * Phase 2 wording stays family-safe: partners are offers parents choose to see — never leads, never data sharing.
 */

export const youtube = {
  channel: site.social.youtube,
  /** "12 Weeks" playlist (YouTube Data API v3 + nocookie embed). */
  playlistId: "PLKZQ_Dl4SmTg",
  /** "12 Weeks" episodes in order (Shorts, 9:16). */
  episodes: ["XRjZrBaCEnU", "PM4UgH2-2Gs", "yJZ3I7JxF9A", "zDAXgIi5Gos", "yrokI1Z4Mzs", "amgDs9QDwkE", "-NG1WviHu_g", "pJx4E5TQlhw", "iiGvrKzbPzA", "g2T5ZROUapA", "HdrcUB-17L4", "fdWL1hSAjHA"],
  /** Curio — a silent family comedy (animated series). */
  curio: { playlistId: "PLViBkz320w9c", pilot: "BYeoqcbqhl0" },
  /** "PetPrep in 60 seconds" (playlist "How PetPrep works"). */
  promo: "CaixLs_X9GA",
};

export const investorEmail = "mailto:investors@petprep.si";

/** Web Summit card shows until the end of this day (Lisbon). */
export const webSummitUntil = "2026-11-12T23:59:59+00:00";

import type { Locale } from "@/i18n/config";
import type { InvestorsCopy } from "./types";
import en from "./en";
import sl from "./sl";
import de from "./de";
import fr from "./fr";
import es from "./es";
import it from "./it";
import pt from "./pt";
import nl from "./nl";
import pl from "./pl";
import cs from "./cs";
import hr from "./hr";
import sv from "./sv";
import da from "./da";
import fi from "./fi";
import nb from "./nb";
export type { InvestorsCopy, Status } from "./types";


/** One copy per site language — a new language adds its file here (TypeScript lists the missing one). */
export const investorsCopy: Record<Locale, InvestorsCopy> = { en, sl, de, fr, es, it, pt, nl, pl, cs, hr, sv, da, fi, nb };
