export type Status = "live" | "building" | "planned";

type Item = { name: string; price: string; status: Status; label: string };

/** Copy of the /investors page in one language (see index.ts for the data shared by all languages). */
export type InvestorsCopy = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  /** Title of the series, as it is written inside a sentence (quotation marks of the language). */
  seriesTitle: string;
  watch: string;
  brief: string;
  heroStats: { breeds: string; sources: string; episodes: string };
  opportunity: { eyebrow: string; title: string; items: { tag: string; text: string }[] };
  flywheel: { eyebrow: string; title: string; lead: string; steps: { title: string; text: string; highlight?: boolean }[] };
  engine: {
    eyebrow: string;
    title: string;
    lead: string;
    updated: string;
    cards: {
      /** `dogs` and `cats` arrive already formatted for the language. */
      breeds: { label: string; note: (dogs: string, cats: string) => string };
      sources: { label: string; note: string };
      episodes: { label: string; note: (views: string | null) => string };
      coloring: { label: string; note: string };
      curio: { value: string; label: string; note: string };
      foods: { label: string; note: string };
      languages: { label: string; note: string };
      vets: { label: string; note: string };
    };
    status: Record<Status, string>;
    media: {
      playlist: string;
      channel: string;
      play: string;
      all: string;
      episode: (n: number) => string;
      consent: string;
      more: string;
      curioPilot: { title: string; text: string };
      curioAll: string;
      promo: { title: string; text: string };
      curio: { title: string; text: string };
      coloring: { title: string; text: string };
      walkthrough: { title: string; text: string };
    };
    closing: string;
  };
  built: { eyebrow: string; title: string; items: string[] };
  revenue: {
    eyebrow: string;
    title: string;
    phases: { tag: string; name: string; items: Item[] }[];
    retention: string;
    stageTag: string;
    stage: string;
  };
  team: { eyebrow: string; title: string; founderName: string; founder: string; points: string[] };
  webSummit: { title: string; text: string; watch: string };
  contactTitle: string;
};
