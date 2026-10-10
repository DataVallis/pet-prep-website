import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Search engines and AI assistants are welcome: we want PetPrep to be found and cited correctly.
const aiAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bingbot",
  // Open policy (David, 2026-10-10): these were already allowed through "*"; listed for clarity.
  "Bytespider",
  "Meta-ExternalAgent",
  "Amazonbot",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiAgents, allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
