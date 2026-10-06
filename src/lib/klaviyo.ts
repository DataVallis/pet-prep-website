import "server-only";

/**
 * Minimal Klaviyo client for the early-access list.
 * Env (runtime, server only — never NEXT_PUBLIC_):
 *   KLAVIYO_PRIVATE_API_KEY  private key with Profiles: write, Lists: write, Subscriptions: write
 *   KLAVIYO_LIST_ID          the early-access list
 *   KLAVIYO_API_REVISION     optional, defaults to the revision this code was written against
 */
// KLAVIYO_API_BASE only exists for local tests against a mock server.
const API = process.env.KLAVIYO_API_BASE?.trim() || "https://a.klaviyo.com/api";
const DEFAULT_REVISION = "2026-07-15";

export type KlaviyoConfig = { apiKey: string; listId: string; revision: string };

export function klaviyoConfig(): KlaviyoConfig | null {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY?.trim();
  const listId = process.env.KLAVIYO_LIST_ID?.trim();
  if (!apiKey || !listId) return null;
  return { apiKey, listId, revision: process.env.KLAVIYO_API_REVISION?.trim() || DEFAULT_REVISION };
}

async function call(cfg: KlaviyoConfig, path: string, body: unknown): Promise<Response> {
  return fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${cfg.apiKey}`,
      accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      revision: cfg.revision,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
}

/**
 * Adds the email to the early-access list with email marketing consent.
 * 1. profile-import: create/update the profile with the page language and source (best effort)
 * 2. bulk subscribe to the list — Klaviyo sends the double opt-in email if the list requires it.
 */
export async function subscribeToEarlyAccess(
  cfg: KlaviyoConfig,
  input: { email: string; language: string; page: string },
): Promise<{ ok: true } | { ok: false; status: number; detail: string }> {
  // Not fatal if this fails: the subscription below creates the profile anyway.
  try {
    const profile = await call(cfg, "/profile-import", {
      data: {
        type: "profile",
        attributes: {
          email: input.email,
          properties: {
            petprep_language: input.language,
            petprep_signup_source: "website_early_access",
            petprep_signup_page: input.page,
          },
        },
      },
    });
    if (!profile.ok) {
      console.warn(`[klaviyo] profile-import failed: ${profile.status} ${(await profile.text()).slice(0, 300)}`);
    }
  } catch (e) {
    console.warn("[klaviyo] profile-import request failed:", e);
  }

  const res = await call(cfg, "/profile-subscription-bulk-create-jobs", {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        custom_source: "PetPrep website — early access",
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email: input.email,
                subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
              },
            },
          ],
        },
      },
      relationships: { list: { data: { type: "list", id: cfg.listId } } },
    },
  });
  if (res.ok) return { ok: true };
  return { ok: false, status: res.status, detail: (await res.text()).slice(0, 500) };
}
