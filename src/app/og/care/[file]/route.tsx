import sharp from "sharp";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content";
import { allFoods } from "@/content/care/care";
import { getCareCopy } from "@/content/care/copy";
import { ogImage } from "@/lib/og";

/**
 * Share card of a care food page (M6-K, David 2026-10-31): /og/care/<species>-<slug>.<locale>.png
 * (1200×630), rendered at build time: risk level + the page question.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allFoods().flatMap((f) => locales.filter((l) => f.locales.includes(l)).map((l) => ({ file: `${f.species}-${f.slug}.${l}.png` })));
}

export async function GET(_req: Request, ctx: RouteContext<"/og/care/[file]">) {
  const { file } = await ctx.params;
  const m = /^([a-z0-9_]+)-([a-z0-9-]+)\.(en|sl)\.png$/.exec(file);
  const f = m ? allFoods().find((x) => x.species === m[1] && x.slug === m[2] && x.locales.includes(m[3])) : undefined;
  if (!m || !f) return new Response("Not found", { status: 404 });
  const locale = m[3] as Locale;
  const card = await ogImage({
    eyebrow: getCareCopy(locale).levels[f.level].label,
    title: f.question[locale]!,
    footer: `PetPrep · ${getDictionary(locale).meta.slogan}`,
  });
  const small = await sharp(Buffer.from(await card.arrayBuffer())).png({ palette: true, quality: 90, effort: 8 }).toBuffer();
  return new Response(new Uint8Array(small), { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" } });
}
