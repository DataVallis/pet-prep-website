import { youtube } from "@/content/investors";

/**
 * Video thumbnails for the click-to-play tiles (David 2026-11-03: "tiles without a picture look bad").
 * Our server fetches YouTube's own thumbnail and serves it from petprep.si, so the visitor's browser
 * still makes no request to YouTube before they press play. Only our own video ids are allowed
 * (no open proxy); cached a day in memory and by the browser.
 */
const allowed = new Set<string>([...youtube.episodes, youtube.curio.pilot, youtube.promo]);
const DAY = 86400;
const cache = new Map<string, { body: ArrayBuffer; type: string; at: number }>();

// Shorts have a vertical "oardefault" frame; fall back to the 16:9 ones.
const variants = ["oardefault.jpg", "hq720.jpg", "hqdefault.jpg"];

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!allowed.has(id)) return new Response("Not found", { status: 404 });
  let hit = cache.get(id);
  if (!hit || Date.now() - hit.at > DAY * 1000) {
    hit = undefined;
    for (const v of variants) {
      try {
        const r = await fetch(`https://i.ytimg.com/vi/${encodeURIComponent(id)}/${v}`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
        if (r.ok) {
          hit = { body: await r.arrayBuffer(), type: r.headers.get("content-type") ?? "image/jpeg", at: Date.now() };
          cache.set(id, hit);
          break;
        }
      } catch {
        // try the next variant
      }
    }
  }
  if (!hit) return new Response("Not found", { status: 404, headers: { "Cache-Control": "public, max-age=300" } });
  return new Response(hit.body, { headers: { "Content-Type": hit.type, "Cache-Control": `public, max-age=${DAY}, stale-while-revalidate=${DAY}` } });
}
