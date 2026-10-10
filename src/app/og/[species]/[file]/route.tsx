import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content";
import { breedsOf, getSpecies, registry } from "@/content/registry/registry";
import { getRegistryCopy } from "@/lib/registry/views";
import { ogImage } from "@/lib/og";

/**
 * Share image of a breed page with the breed's name: /og/<species id>/<breed id>.<locale>.png.
 * Rendered once at build time. Breeds with an AI portrait in the export use the portrait instead
 * (see generateMetadata of the breed page), so no image is generated for them.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return registry.species.flatMap((s) =>
    breedsOf(s.id)
      .filter((b) => !b.portrait)
      .flatMap((b) => locales.map((l) => ({ species: s.id, file: `${b.id}.${l}.png` }))),
  );
}

export async function GET(_req: Request, ctx: RouteContext<"/og/[species]/[file]">) {
  const { species, file } = await ctx.params;
  const m = /^([a-z0-9_]+)\.(en|sl)\.png$/.exec(file);
  const b = m ? breedsOf(species).find((x) => x.id === m[1]) : undefined;
  if (!m || !b) return new Response("Not found", { status: 404 });
  const locale = m[2] as Locale;
  const sp = getSpecies(species);
  const c = getRegistryCopy(locale);
  return ogImage({
    eyebrow: `${c.page.eyebrow} · ${sp.name[locale].one}`,
    title: b.name[locale],
    footer: `PetPrep · ${getDictionary(locale).meta.slogan}`,
  });
}
