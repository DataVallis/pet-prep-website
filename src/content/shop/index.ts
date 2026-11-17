import type { Locale } from "../../i18n/config.ts";
import type { ShopCopy } from "./types.ts";
import { en } from "./en.ts";
import { sl } from "./sl.ts";
import { de } from "./de.ts";
import { fr } from "./fr.ts";
import { es } from "./es.ts";
import { it } from "./it.ts";
import { pt } from "./pt.ts";
import { nl } from "./nl.ts";
import { pl } from "./pl.ts";
import { cs } from "./cs.ts";
import { hr } from "./hr.ts";
import { sv } from "./sv.ts";
import { da } from "./da.ts";
import { fi } from "./fi.ts";
import { nb } from "./nb.ts";

export type { ShopCopy } from "./types.ts";

/** Website shop copy (M6-S09), all 15 site languages. */
export const shopCopy: Record<Locale, ShopCopy> = { en, sl, de, fr, es, it, pt, nl, pl, cs, hr, sv, da, fi, nb };
