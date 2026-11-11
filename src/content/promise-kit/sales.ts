/** Sales-page copy of the Pet Promise Kit, all 15 site languages (David 2026-11-11). The kit's own text is in <lang>.ts. */
import type { Locale } from "../../i18n/config.ts";
import type { KitSales } from "./types.ts";
import { enSales } from "./en.ts";
import { slSales } from "./sl.ts";
import { deSales } from "./de.ts";
import { frSales } from "./fr.ts";
import { esSales } from "./es.ts";
import { itSales } from "./it.ts";
import { ptSales } from "./pt.ts";
import { nlSales } from "./nl.ts";
import { plSales } from "./pl.ts";
import { csSales } from "./cs.ts";
import { hrSales } from "./hr.ts";
import { svSales } from "./sv.ts";
import { daSales } from "./da.ts";
import { fiSales } from "./fi.ts";
import { nbSales } from "./nb.ts";

export type { KitSales } from "./types.ts";

export const sales: Record<Locale, KitSales> = { en: enSales, sl: slSales, de: deSales, fr: frSales, es: esSales, it: itSales, pt: ptSales, nl: nlSales, pl: plSales, cs: csSales, hr: hrSales, sv: svSales, da: daSales, fi: fiSales, nb: nbSales, };
