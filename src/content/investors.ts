/**
 * /investors page (David 2026-11-01, design "PetPrep for investors", pet-prep-website docs/design/investors-design.html).
 * English only. Copy lives here; every number on the page comes from src/lib/investorStats.ts.
 * Phase 2 wording stays family-safe: partners are offers parents choose to see — never leads, never data sharing.
 */

export const youtube = {
  channel: "https://www.youtube.com/@petprep-si",
  /** "12 Weeks" playlist (YouTube Data API v3 + nocookie embed). */
  playlistId: "PLKZQ_Dl4SmTg",
  /** "12 Weeks" episodes in order (Shorts, 9:16). */
  episodes: ["XRjZrBaCEnU", "PM4UgH2-2Gs", "yJZ3I7JxF9A", "zDAXgIi5Gos", "yrokI1Z4Mzs", "amgDs9QDwkE", "-NG1WviHu_g", "pJx4E5TQlhw", "iiGvrKzbPzA", "g2T5ZROUapA", "HdrcUB-17L4", "fdWL1hSAjHA"],
};

export const investorEmail = "mailto:investors@petprep.si";

/** Web Summit card shows until the end of this day (Lisbon). */
export const webSummitUntil = "2026-11-12T23:59:59+00:00";

export type Status = "live" | "building" | "planned";

export const investorsCopy = {
  meta: {
    title: "PetPrep for investors — one founder, a content engine, a 15-year product",
    description:
      "PetPrep lets a child prove they're ready for a pet in a 12-week realistic simulation and stays with the family for the pet's whole life. Live numbers, revenue map and how to request the investor brief.",
  },
  eyebrow: "For investors",
  title: "One founder. A content engine. A product families keep for 15 years.",
  lead: "PetPrep lets a child prove they're ready for a pet in a 12-week realistic simulation — and stays with the family for the pet's whole life. Everything around it, from our series to a pet-care library where every fact has a source, exists to bring families in at near-zero cost.",
  watch: "Watch “12 Weeks” on YouTube",
  brief: "Request the investor brief",
  heroStats: {
    breeds: "dog and cat breeds with sourced care rules",
    sources: "veterinary and kennel-club sources",
    episodes: "episodes of our family comedy “12 Weeks”",
  },
  opportunity: {
    eyebrow: "The opportunity",
    title: "From a 12-week challenge to a 10–15-year relationship.",
    items: [
      { tag: "Problem", text: "Children promise to care for a pet; parents have no neutral way to test it before committing money and years of care." },
      { tag: "Solution", text: "A realistic 12-week simulation with a live parent dashboard and an objective Care Score, ending in a Certificate of Responsibility." },
      { tag: "Expansion", text: "Once the real pet comes home, an AI assistant for it: collar data, AI first contact with vets, growth and nutrition, DNA tests, partner services." },
    ],
  },
  flywheel: {
    eyebrow: "The flywheel",
    title: "Content brings families in. Real pets keep them for years.",
    lead: "Every piece of content is one step in the same loop — not a side project.",
    steps: [
      { title: "Content engine", text: "Series, Curio, colouring pages and the care library — made by one founder with AI agents." },
      { title: "Families find PetPrep", text: "Search, social and #walkyourpet — instead of paid ads." },
      { title: "12-week challenge", text: "First revenue: €49.99 per pet, one-time.", highlight: true },
      { title: "A real pet is adopted", text: "PetPrep becomes the family's AI care assistant for 10–15 years." },
      { title: "Lifelong partners", text: "Insurance, vets, food and DNA tests — offers matched to the family's own pet, which parents choose to see." },
      { title: "Revenue funds more content", text: "Sponsors and Phase 2 income pay for the next season — and the loop turns again." },
    ],
  },
  engine: {
    eyebrow: "Content engine · live numbers",
    title: "What we have shipped so far",
    lead: "Every number below updates itself from our registry, knowledge base and channels.",
    updated: "Updated automatically from our registry, knowledge base and channels.",
    cards: {
      breeds: { label: "Breeds in the register", note: (dogs: number, cats: number) => `${dogs} dogs and ${cats} cats, new ones added nightly` },
      sources: { label: "Sources", note: "Vets, kennel clubs and studies, quoted" },
      episodes: { label: "“12 Weeks” episodes", note: (views: string | null) => (views ? `${views} views on YouTube` : "On YouTube") },
      coloring: { label: "Free colouring pages", note: "Printable, A4 and US Letter" },
      curio: { value: "Pilot", label: "Curio animated series", note: "Pilot episode out on TikTok" },
      foods: { label: "Foods explained", note: "Care library, new foods every night" },
      languages: { label: "Languages", note: "Site and care library" },
      vets: { label: "Countries with vet directory", note: "Emergency vets by country" },
    },
    status: { live: "Live", building: "Building", planned: "Planned" } as Record<Status, string>,
    media: {
      playlist: "“12 Weeks” — the series",
      play: "Play",
      all: "All episodes (playlist)",
      episode: (n: number) => `Episode ${n}`,
      consent: "Plays from YouTube (youtube-nocookie.com) — nothing loads until you click.",
      curio: { title: "Meet Curio", text: "Our mascot and its short videos" },
      coloring: { title: "Colouring pages", text: "Free to print, each with a sourced pet-care fact" },
      walkthrough: { title: "How the app works", text: "The 12-week challenge, step by step" },
    },
    closing: "All of this is produced by one founder with AI agents, without a production team or an agency. Every piece links back to the app.",
  },
  built: {
    eyebrow: "Built so far",
    title: "A real product, not a prototype",
    items: [
      "Server-side game engine with real-time sync, tested on whole-day simulations, daylight saving days and family edge cases.",
      "Families with several parents, several children and shared pets, with fair per-child scoring.",
      "Photorealistic AI pets with measured and capped AI costs, media stored on our own EU servers.",
      "Pet needs based on cited veterinary and kennel-club sources, with every number traceable to its source.",
      "Child safety by design: PIN login without email, minimal data, no ads, verified media only.",
      "Accessible play: easier gestures, screen readers, wheelchair pushes counted as walks.",
    ],
  },
  revenue: {
    eyebrow: "Revenue map",
    title: "Phase 1 pays for acquisition. Phase 2 is the business.",
    phases: [
      {
        tag: "Phase 1 · Before the pet",
        name: "Pays for acquisition",
        items: [
          { name: "12-week challenge", price: "€49.99 per pet, one-time", status: "live" as Status, label: "Built" },
          { name: "Wishes (items for the pet)", price: "€2.99–€15.99, looks only", status: "live" as Status, label: "Built" },
          { name: "Series sponsorship", price: "Season packages", status: "building" as Status, label: "In progress" },
          { name: "Shop: colouring books, Curio plush, puzzles", price: "Physical and digital", status: "planned" as Status, label: "Planned" },
        ],
      },
      {
        tag: "Phase 2 · With a real pet",
        name: "The business",
        items: [
          { name: "AI pet-care assistant", price: "Subscription from €3.99 / month + top-ups", status: "planned" as Status, label: "Planned" },
          { name: "Pet insurance partners", price: "Offers parents choose to see, per referral", status: "planned" as Status, label: "Planned" },
          { name: "Vet partner network", price: "Bookings and tele-consults", status: "planned" as Status, label: "Planned" },
          { name: "DNA tests and pet-store partners", price: "Affiliate, later own kit", status: "planned" as Status, label: "Planned" },
        ],
      },
      {
        tag: "Brand",
        name: "Curio and the series",
        items: [
          { name: "Curio animated series", price: "Season sponsors", status: "building" as Status, label: "In development" },
          { name: "#walkyourpet", price: "Movement that feeds every channel", status: "live" as Status, label: "Live" },
        ],
      },
    ],
    retention: "A family that adopts after the challenge stays with PetPrep for the pet's 10–15 years, not for 12 weeks.",
    stageTag: "Stage",
    stage: "Pre-launch, in closed beta on iOS and Android. App Store and Google Play launch next.",
  },
  team: {
    eyebrow: "Team",
    title: "The output of a studio. The cost of one person.",
    founderName: "David Tacer, Founder & CEO.",
    founder: "12 years running his own software company (400+ projects), founder of CHERR.IO (FutureHack winner, Davos 2018). Builds PetPrep full-time with a team of AI coding and content agents.",
    points: [
      "Every fact has a source and a quote, checked by an independent reviewer.",
      "Families' data stays in the EU; children sign in without e-mail; no ads in the app.",
      "Nightly pipelines research, check and ship new breeds and care pages.",
    ],
  },
  webSummit: {
    title: "Meet us at Web Summit, Lisbon",
    text: "9–12 November 2026. We share the brief, deck, data room and beta access on request.",
    watch: "Watch the series",
  },
  contactTitle: "Get in touch",
};
