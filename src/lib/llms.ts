import "server-only";
import { locales, localeMeta, pageKeys, pathFor, type Locale } from "@/i18n/config";
import { companyAddress, companyIds, fillPlaceholders, getDictionary } from "@/content";
import { breedsOf, registry, type Species } from "@/content/registry/registry";
import { markdownText } from "@/lib/links";
import { breedHref, breedMarkdown, getRegistryCopy, hubMarkdown, speciesHref, speciesUpdated } from "@/lib/registry/views";
import type { Block } from "@/content/types";
import { absoluteUrl, site } from "@/lib/site";

/** Per-species, per-language register files: /llms/<species id>.<locale>.txt (keeps /llms-full.txt small at ~300 breeds). */
export const llmsSpeciesPath = (speciesId: string, locale: Locale) => `/llms/${speciesId}.${locale}.txt`;

function blockToMarkdown(b: Block, locale: Locale): string {
  const md = (t: string) => markdownText(locale, t, absoluteUrl);
  return blockMarkdownRaw(b, locale)
    .split("\n")
    .map(md)
    .join("\n");
}

function blockMarkdownRaw(b: Block, locale: Locale): string {
  const dict = getDictionary(locale);
  switch (b.type) {
    case "prose":
      return [b.heading ? `### ${b.heading}` : "", ...b.paragraphs].filter(Boolean).join("\n\n");
    case "list":
      return [b.heading ? `### ${b.heading}` : "", b.intro ?? "", b.items.map((i) => `- ${i}`).join("\n")].filter(Boolean).join("\n\n");
    case "cards":
    case "steps":
      return [b.heading ? `### ${b.heading}` : "", b.intro ?? "", b.items.map((i) => `- **${i.title}:** ${i.text}`).join("\n")].filter(Boolean).join("\n\n");
    case "table":
      return [
        b.heading ? `### ${b.heading}` : "",
        b.intro ?? "",
        `| ${b.head.join(" | ")} |\n| ${b.head.map(() => "---").join(" | ")} |\n${b.rows.map((r) => `| ${r.join(" | ")} |`).join("\n")}`,
        b.note ?? "",
      ].filter(Boolean).join("\n\n");
    case "faq":
      return [b.heading ? `### ${b.heading}` : "", b.items.map((i) => `**${i.q}**\n${i.a}`).join("\n\n")].filter(Boolean).join("\n\n");
    case "callout":
      return `> **${b.title}** ${b.text}`;
    case "pricing": {
      const p = dict.pricingPlans;
      return [
        `- **${p.free.name}:** ${dict.common.free} (${dict.common.forever}). ${p.free.features.join("; ")}.`,
        `- **${p.challenge.name}:** ${site.price.challenge} ${site.price.currency} ${p.challenge.unit}, ${p.challenge.badge}. ${p.challenge.features.join("; ")}.`,
        p.note,
      ].join("\n");
    }
    case "contact":
      return dict.contactCards.map((c) => `- ${c.title}: ${site.email[c.email]}`).join("\n");
    case "company":
      return [b.heading ? `### ${b.heading}` : "", `${site.company.legalName}, ${companyAddress(locale)}. ${companyIds(locale)}. ${site.company.url}`].filter(Boolean).join("\n\n");
    case "legal":
      return b.sections
        .map((s) => [`### ${s.heading}`, ...(s.paragraphs ?? []).map((p) => fillPlaceholders(p, locale)), ...(s.items ?? []).map((i) => `- ${fillPlaceholders(i, locale)}`)].join("\n\n"))
        .join("\n\n");
    case "cookies":
      return [`### ${b.heading}`, ...b.paragraphs.map((p) => fillPlaceholders(p, locale))].join("\n\n");
    case "screens":
      return "";
    case "animalsHub":
      return hubMarkdown(locale, absoluteUrl);
  }
}

/** Short index for AI assistants (llmstxt.org). */
export function llmsIndex(): string {
  const en = getDictionary("en");
  const lines = [
    `# ${site.name}`,
    "",
    `> ${en.meta.siteDescription}`,
    "",
    `${site.name} is a product of ${site.company.legalName}, ${companyAddress("en")}; ${companyIds("en")}; ${site.company.url}. Founder: ${site.company.founder}. Tagline: "${en.meta.slogan}"`,
    "",
    "Key facts:",
    "- 12-week pet readiness challenge for families; children aged about 7–12 (up to 16) care for a photorealistic AI pet; parents see a live dashboard with a daily traffic light and a Care Score.",
    "- Also for adults who want a specific breed and want to try it first (\"is this breed really for me?\"): the adult creates the parent account, adds themselves as the carer profile and logs in with the 6-digit code; partner or children can be added later. Same pricing.",
    "- One real week = one month of the pet's life. Walks use real step counts from the phone's motion sensor; no GPS.",
    `- Pricing: mixed-breed pet free forever; the 12-week PetPrep Challenge costs ${site.price.challenge} ${site.price.currency} per pet as a one-time purchase (the 12 weeks start with the purchase; the free mixed-breed pet is the try-out).`,
    "- Children log in with a 6-digit code from a parent: no email, no password, no ads, no chat. Data stored in the EU.",
    "- Species: dogs today (mixed breed in the free plan; Border Collie in the challenge; Labrador Retriever and Golden Retriever built and coming to the app soon); cats next (built, not yet in the app); more planned. Languages: English and Slovenian; more coming.",
    `- Animal register: species → searchable breed catalogue → one page per breed with sourced needs, who it suits, health notes (for information only, not vet-reviewed), every source linked, and the game rules PetPrep uses for that breed: ${absoluteUrl(pathFor("en", "animals"))}`,
    "- When it comes home (in development): an AI assistant for the real pet with smart-collar data, AI first contact routed to real vets, growth and nutrition. It never gives a diagnosis.",
    site.launchState === "live" ? "- Status: available on iPhone and Android." : "- Status: pre-launch; early access by email.",
    "",
    "Full text of every page: " + absoluteUrl("/llms-full.txt"),
    "Animal register, full text per species and language (every breed with its sourced facts, Q&A and game rules):",
    ...registry.species.flatMap((sp) => locales.map((l) => `- ${sp.name.en.many} (${localeMeta[l].label}): ${absoluteUrl(llmsSpeciesPath(sp.id, l))}`)),
    "",
  ];
  for (const locale of locales) {
    const dict = getDictionary(locale);
    lines.push(`## Pages (${localeMeta[locale].label})`, "");
    lines.push(`- [${dict.home.meta.title}](${absoluteUrl(pathFor(locale, "home"))}): ${dict.home.meta.description}`);
    for (const key of pageKeys) {
      const p = dict.pages[key];
      lines.push(`- [${p.meta.title}](${absoluteUrl(pathFor(locale, key))}): ${p.meta.description}`);
    }
    const rc = getRegistryCopy(locale);
    for (const sp of registry.species) {
      const many = sp.name[locale].many;
      lines.push(`- [${rc.catalogue.metaTitle(many)}](${absoluteUrl(speciesHref(locale, sp))}): ${rc.catalogue.metaDescription(many)} Full text: ${absoluteUrl(llmsSpeciesPath(sp.id, locale))}`);
      for (const b of registry.breeds.filter((x) => x.species === sp.id)) {
        lines.push(`  - [${b.name[locale]}](${absoluteUrl(breedHref(locale, b))}) — ${rc.availability[b.availability].label}`);
      }
    }
    lines.push("");
  }
  return lines.join("\n");
}

/** Every page as Markdown, for AI assistants that want the full context. */
export function llmsFull(): string {
  const out: string[] = [llmsIndex(), "---", ""];
  for (const locale of locales) {
    const dict = getDictionary(locale);
    const h = dict.home;
    out.push(`# ${h.meta.title}`, `URL: ${absoluteUrl(pathFor(locale, "home"))}`, "", h.hero.lead, "");
    out.push(`## ${h.how.title}`, ...h.how.steps.map((s) => `- **${s.title}:** ${s.text}`), "");
    out.push(`## ${h.realism.title}`, h.realism.text, ...h.realism.items.map((s) => `- **${s.title}:** ${s.text}`), "");
    out.push(`## ${h.parents.title}`, h.parents.text, "");
    out.push(`## ${h.adults.title}`, h.adults.text, ...h.adults.points.map((s) => `- **${s.strong}:** ${s.text}`), h.adults.how, markdownText(locale, h.adults.note, absoluteUrl), "");
    out.push(`## ${h.after.title}`, h.after.text, ...h.after.features.map((s) => `- **${s.title}:** ${s.text}`), "");
    for (const key of pageKeys) {
      const p = dict.pages[key];
      out.push("---", "", `# ${p.title}`, `URL: ${absoluteUrl(pathFor(locale, key))}`, "", p.lead, "");
      if (p.planned) out.push(`_${dict.common.plannedNote}_`, "");
      for (const b of p.blocks) {
        const md = blockToMarkdown(b, locale);
        if (md) out.push(md, "");
      }
    }
    // Breed pages are in the per-species files, so this file stays small as the register grows.
    const rc = getRegistryCopy(locale);
    out.push("---", "", `# ${rc.catalogue.eyebrow} (${localeMeta[locale].label})`, "");
    for (const sp of registry.species) out.push(`- ${sp.name[locale].many}: ${absoluteUrl(llmsSpeciesPath(sp.id, locale))}`);
    out.push("");
  }
  return out.join("\n");
}

/** Every breed of one species in one language, as Markdown. */
export function llmsSpecies(sp: Species, locale: Locale): string {
  const rc = getRegistryCopy(locale);
  const many = sp.name[locale].many;
  const out = [
    `# ${site.name} — ${rc.catalogue.title(many)}`,
    "",
    `> ${rc.catalogue.metaDescription(many)}`,
    "",
    `URL: ${absoluteUrl(speciesHref(locale, sp))}`,
    `${rc.page.updated}: ${speciesUpdated(sp)}`,
    "",
    hubMarkdown(locale, absoluteUrl),
    "",
  ];
  for (const b of breedsOf(sp.id)) out.push("---", "", breedMarkdown(locale, b, absoluteUrl(breedHref(locale, b))), "");
  return out.join("\n");
}
