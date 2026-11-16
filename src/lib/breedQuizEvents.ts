/**
 * Anonymous breed-quiz counter and optional e-mail (M6-S06, David 2026-11-16: anonymous counting allowed).
 * Only on petprep.si; fire-and-forget (`keepalive`), no cookies, no storage, never throws, never blocks navigation.
 * Backend: POST /api/breed-quiz/events (204) and POST /api/summary-leads (201), pet-prep M6-S05 / #1274.
 */
export const QUIZ_API = "https://api.petprep.si";
export const CONSENT_VERSION = "2026-11";
export type QuizEvent = "completed" | "calculator_click" | "app_click";
type FetchFn = (url: string, init: RequestInit) => Promise<Response>;

export const onPetprep = (hostname: string) => /(^|\.)petprep\.si$/.test(hostname);

/** completed: the top-3 ids in rank order; clicks: exactly one id. */
export function quizEventBody(event: QuizEvent, locale: string, breeds: string[]) {
  const ids = event === "completed" ? breeds.slice(0, 3) : breeds.slice(0, 1);
  return { event, locale, breeds: ids, website: "" };
}

export function sendQuizEvent(event: QuizEvent, locale: string, breeds: string[], opts: { hostname?: string; fetchFn?: FetchFn } = {}): void {
  try {
    const host = opts.hostname ?? (typeof location === "undefined" ? "" : location.hostname);
    if (!onPetprep(host) || breeds.length === 0) return;
    const f: FetchFn = opts.fetchFn ?? ((u, i) => fetch(u, i));
    void f(`${QUIZ_API}/api/breed-quiz/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizEventBody(event, locale, breeds)),
      keepalive: true,
      credentials: "omit",
    }).catch(() => {});
  } catch { /* never blocks the page */ }
}

export type LeadResult = "ok" | "email" | "error" | "proto";

export async function sendQuizLead(email: string, locale: string, breed: string, honeypot: string, opts: { hostname?: string; fetchFn?: FetchFn } = {}): Promise<LeadResult> {
  const host = opts.hostname ?? (typeof location === "undefined" ? "" : location.hostname);
  if (!onPetprep(host)) return "proto";
  if (honeypot !== "") return "error";
  try {
    const f: FetchFn = opts.fetchFn ?? ((u, i) => fetch(u, i));
    const res = await f(`${QUIZ_API}/api/summary-leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, consent: true, consent_version: CONSENT_VERSION, source: "breed_quiz", locale, breed, website: "" }),
    });
    if (res.status === 201) return "ok";
    if (res.status === 422) {
      const body = (await res.json().catch(() => ({}))) as { errors?: { email?: unknown } };
      return body?.errors?.email ? "email" : "error";
    }
    return "error";
  } catch { return "error"; }
}
