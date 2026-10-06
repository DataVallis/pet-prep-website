import "server-only";
import { locales, localeMeta, pageKeys, pathFor, type Locale } from "@/i18n/config";
import { fillPlaceholders, getDictionary } from "@/content";
import type { Block } from "@/content/types";
import { absoluteUrl, site } from "@/lib/site";

function blockToMarkdown(b: Block, locale: Locale): string {
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
    case "legal":
      return b.sections
        .map((s) => [`### ${s.heading}`, ...(s.paragraphs ?? []).map((p) => fillPlaceholders(p, locale)), ...(s.items ?? []).map((i) => `- ${fillPlaceholders(i, locale)}`)].join("\n\n"))
        .join("\n\n");
    case "cookies":
      return [`### ${b.heading}`, ...b.paragraphs.map((p) => fillPlaceholders(p, locale))].join("\n\n");
    case "screens":
      return "";
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
    `${site.name} is a product of ${site.company.name} (${site.company.city}, ${site.company.country}). Tagline: "${en.meta.slogan}"`,
    "",
    "Key facts:",
    "- 12-week pet readiness challenge for families; children aged about 7–12 (up to 16) care for a photorealistic AI pet; parents see a live dashboard with a daily traffic light and a Care Score.",
    "- One real week = one month of the pet's life. Walks use real step counts from the phone's motion sensor; no GPS.",
    `- Pricing: mixed-breed pet free forever; the 12-week PetPrep Challenge costs ${site.price.challenge} ${site.price.currency} per pet with a ${site.price.trialDays}-day free trial.`,
    "- Children log in with a 6-digit code from a parent: no email, no password, no ads, no chat. Data stored in the EU.",
    "- Species: dogs today (mixed breed, Border Collie); cats next; more planned. Languages: English and Slovenian; more coming.",
    "- After adoption (in development): an AI assistant for the real pet with smart-collar data, AI first contact routed to real vets, growth and nutrition. It never gives a diagnosis.",
    site.launchState === "live" ? "- Status: available on iPhone and Android." : "- Status: pre-launch; early access by email.",
    "",
    "Full text of every page: " + absoluteUrl("/llms-full.txt"),
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
  }
  return out.join("\n");
}
