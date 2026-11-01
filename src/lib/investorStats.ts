import "server-only";
/**
 * Every number on /investors (David 2026-11-01), computed from the real data at build / revalidate time.
 * Sources: animal register (registry.json), care knowledge export (care-knowledge.json, vets), live
 * locales (i18n config), colouring pages, and YouTube Data API v3 for "12 Weeks" (env YOUTUBE_API_KEY,
 * read-only key, never logged; cached a day). Anything missing → null → its card is hidden.
 */
import registryJson from "@/content/registry/registry.json";
import careJson from "@/content/care/care-knowledge.json";
import { locales } from "@/i18n/config";
import { coloringPages } from "@/content/coloring/coloring";
import { youtube } from "@/content/investors";
import { computeInvestorStats, type CareLike, type InvestorStats, type RegistryLike, type YoutubeLike } from "./investorStatsCore";

const API = "https://www.googleapis.com/youtube/v3";

async function getJson(url: string): Promise<Record<string, unknown> | null> {
  try {
    const r = await fetch(url, { next: { revalidate: 86400 } });
    if (!r.ok) return null;
    return (await r.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

type Item = { contentDetails?: { videoId?: string }; statistics?: { viewCount?: string } };

/** Episode count and total views of the playlist; falls back to the episode list in content if the playlist can't be read. */
export async function youtubeStats(key = process.env.YOUTUBE_API_KEY): Promise<YoutubeLike> {
  if (!key) return null;
  const k = encodeURIComponent(key);
  let ids: string[] = [];
  let page: string | undefined;
  for (let i = 0; i < 5; i++) {
    const data = await getJson(`${API}/playlistItems?part=contentDetails&maxResults=50&playlistId=${encodeURIComponent(youtube.playlistId)}&key=${k}${page ? `&pageToken=${page}` : ""}`);
    if (!data) break;
    ids.push(...((data.items as Item[] | undefined) ?? []).map((it) => it.contentDetails?.videoId).filter((x): x is string => !!x));
    page = data.nextPageToken as string | undefined;
    if (!page) break;
  }
  if (!ids.length) ids = youtube.episodes;
  let views = 0;
  let found = 0;
  for (let i = 0; i < ids.length; i += 50) {
    const data = await getJson(`${API}/videos?part=statistics&id=${ids.slice(i, i + 50).map(encodeURIComponent).join(",")}&key=${k}`);
    for (const it of (data?.items as Item[] | undefined) ?? []) {
      found++;
      views += Number(it.statistics?.viewCount ?? 0);
    }
  }
  return found ? { episodes: found, views } : null;
}

export async function getInvestorStats(): Promise<InvestorStats> {
  return computeInvestorStats({
    registry: registryJson as unknown as RegistryLike,
    care: careJson as unknown as CareLike,
    locales,
    coloringPages: coloringPages.length,
    youtube: await youtubeStats(),
  });
}
