import type { PromptVariant } from "@/lib/appPrompt";

/**
 * A page's word on the app sign-up prompt (components/AppPrompt.tsx): which wording fits, or that the bar / pop-up must
 * stay away. A hidden marker in the page's own HTML, so the layout-level prompt needs no list of URLs in 15 languages.
 * A page without it gets the default prompt. A breed page passes the breed with its own portrait: the pop-up then names the
 * breed and shows that picture (never another breed's); without a portrait it falls back to the default wording.
 */
export function AppPromptHint({ variant, breed }: { variant: PromptVariant; breed?: { id: string; name: string; species: "dog" | "cat"; image?: string } }) {
  return <span hidden data-app-prompt={variant} data-breed-id={breed?.id} data-breed-name={breed?.name} data-breed-species={breed?.species} data-breed-image={breed?.image} />;
}
