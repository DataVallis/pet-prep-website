import { locales, type Locale } from "@/i18n/config";
import { registry } from "@/content/registry/registry";
import { llmsSpecies } from "@/lib/llms";

/** /llms/<species id>.<locale>.txt — the animal register for AI assistants, one file per species and language. */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return registry.species.flatMap((s) => locales.map((l) => ({ file: `${s.id}.${l}.txt` })));
}

export async function GET(_req: Request, ctx: RouteContext<"/llms/[file]">) {
  const { file } = await ctx.params;
  const m = /^([a-z0-9_]+)\.(en|sl)\.txt$/.exec(file);
  const sp = m ? registry.species.find((s) => s.id === m[1]) : undefined;
  if (!m || !sp) return new Response("Not found", { status: 404 });
  return new Response(llmsSpecies(sp, m[2] as Locale), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
