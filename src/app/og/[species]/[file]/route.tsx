import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { localePattern, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content";
import { breedsOf, getSpecies, registry, type Breed } from "@/content/registry/registry";
import { buildBreedView, getRegistryCopy } from "@/lib/registry/views";
import { breedOgImage } from "@/lib/og";

/**
 * Share card of a breed page: /og/<species id>/<breed id>.<locale>.png (1200×630), rendered
 * once at build time for every breed and language. Uses the breed's AI portrait when the
 * export has one (converted WebP → PNG for Satori), else the brand mark.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return registry.species.flatMap((s) => breedsOf(s.id).flatMap((b) => locales.map((l) => ({ species: s.id, file: `${b.id}.${l}.png` }))));
}

async function portraitPng(b: Breed): Promise<string | null> {
  if (!b.portrait) return null;
  // No try/catch: a broken sharp install must fail the build, not ship cards without photos.
  const file = join(process.cwd(), "public/animals", getSpecies(b.species).slug.en, b.portrait.file);
  const png = await sharp(await readFile(file)).resize(880, 880, { fit: "cover" }).png().toBuffer();
  return png.toString("base64");
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * 2–3 short facts: the catalogue facets (dogs: size, exercise, brushing); a breed without facets
 * (cats) gets its adult weight from the sources and its daily play goal in PetPrep.
 */
function chips(locale: Locale, b: Breed): string[] {
  const c = getRegistryCopy(locale);
  const fromFacets = Object.entries(b.facets ?? {})
    .map(([key, value]) => {
      const f = c.facets[key];
      const label = f?.values[value as string];
      if (!f || !label) return null;
      return f.line ? cap(f.line(label)) : `${f.label}: ${label.toLowerCase()}`;
    })
    .filter((x): x is string => Boolean(x));
  if (fromFacets.length) return fromFacets.slice(0, 3);
  const v = buildBreedView(locale, b);
  const out: string[] = [];
  const weight = v.glance.find((g) => g.key === "weight")?.values[0]?.text;
  // The value alone ("Males 5.9–8.2 kg, females 4.1–5.9 kg") — with its label it wraps.
  if (weight && weight.length <= 44) out.push(cap(weight));
  const adult = b.game?.stages.findIndex((st) => st.stage === "adult") ?? -1;
  const row = v.game?.rows[adult >= 0 ? adult : 1];
  if (v.game && row) out.push(`${v.game.activityHeader}: ${row.activity}`);
  return out;
}

export async function GET(_req: Request, ctx: RouteContext<"/og/[species]/[file]">) {
  const { species, file } = await ctx.params;
  const m = new RegExp(`^([a-z0-9_]+)\\.(${localePattern})\\.png$`).exec(file);
  const b = m ? breedsOf(species).find((x) => x.id === m[1]) : undefined;
  if (!m || !b) return new Response("Not found", { status: 404 });
  const locale = m[2] as Locale;
  const sp = getSpecies(species);
  const c = getRegistryCopy(locale);
  const card = await breedOgImage({
    eyebrow: `${c.page.eyebrow} · ${sp.name[locale].one}`,
    title: b.name[locale],
    lead: c.page.og.lead,
    chips: chips(locale, b),
    badge: c.availability[b.availability].label,
    photo: await portraitPng(b),
    photoLabel: c.page.og.photoLabel,
    footer: getDictionary(locale).meta.slogan,
  });
  // Re-encode as a palette PNG: well under 300 KB, which some apps (WhatsApp) need for a preview.
  const small = await sharp(Buffer.from(await card.arrayBuffer())).png({ palette: true, quality: 90, effort: 8 }).toBuffer();
  return new Response(new Uint8Array(small), { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" } });
}
