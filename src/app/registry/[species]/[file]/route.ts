import { locales, type Locale } from "@/i18n/config";
import { getSpecies, registry } from "@/content/registry/registry";
import { catalogueIndex, compareData } from "@/lib/registry/views";

/**
 * Build-time JSON for the client parts of the animal register (static files, no runtime work):
 *   /registry/<species>/index.<locale>.json    slim catalogue index (search, filters, sort)
 *   /registry/<species>/compare.<locale>.json  comparison rows of every breed
 * The full data of a breed is only on its own page.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return registry.species.flatMap((s) => locales.flatMap((l) => [{ species: s.id, file: `index.${l}.json` }, { species: s.id, file: `compare.${l}.json` }]));
}

export async function GET(_req: Request, ctx: RouteContext<"/registry/[species]/[file]">) {
  const { species, file } = await ctx.params;
  const m = /^(index|compare)\.(en|sl)\.json$/.exec(file);
  if (!m) return new Response("Not found", { status: 404 });
  const sp = getSpecies(species);
  const locale = m[2] as Locale;
  const body = m[1] === "index" ? catalogueIndex(locale, sp) : compareData(locale, sp);
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
