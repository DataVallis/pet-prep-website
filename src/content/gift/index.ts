import type { Locale } from "../../i18n/config.ts";
import type { GiftCopy } from "./types.ts";
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

export type { GiftCopy } from "./types.ts";

// TODO(David): the refund wording (14 days if unredeemed, none once redeemed) is Claude's proposal from spec §3.1; it needs the legal review (M5-06) before the switch goes on. It is the same in every language.

/** Gift voucher copy (M6-S01), all 15 site languages. */
export const giftCopy: Record<Locale, GiftCopy> = { en, sl, de, fr, es, it, pt, nl, pl, cs, hr, sv, da, fi, nb };
