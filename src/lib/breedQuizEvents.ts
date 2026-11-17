/**
 * Anonymous breed-quiz counter and optional e-mail (M6-S06, David 2026-11-16: anonymous counting allowed).
 * Only on petprep.si; fire-and-forget (`keepalive`), no cookies, no storage, never throws, never blocks navigation.
 * Backend: POST /api/breed-quiz/events (204); the e-mail goes to POST /api/email-signups (lib/emailSignup.ts), old /api/summary-leads as fallback.
 */
import { browserContext, NEWSLETTER_CONSENT_VERSION, onPetprep, postEmailSignup, SIGNUP_API, type SignupContext, type SignupResult } from "./emailSignup.ts";

export const QUIZ_API = SIGNUP_API;
export const CONSENT_VERSION = NEWSLETTER_CONSENT_VERSION;
export type QuizEvent = "completed" | "calculator_click" | "app_click";
type FetchFn = (url: string, init: RequestInit) => Promise<Response>;

export { onPetprep } from "./emailSignup.ts";

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

export type LeadResult = SignupResult;

/**
 * Optional e-mail on the quiz result (David 2026-11-17): goes to our own database with full context (source breed_quiz,
 * section result, the top-3 ids and the answers, UTM, referrer host); falls back to the old /api/summary-leads while the
 * new endpoint is not deployed (lib/emailSignup.ts).
 */
export async function sendQuizLead(
  email: string,
  locale: string,
  breed: string,
  honeypot: string,
  opts: { hostname?: string; fetchFn?: FetchFn; ctx?: Partial<SignupContext>; quiz?: { result: string[]; answers: string } } = {},
): Promise<LeadResult> {
  const base = typeof window === "undefined" ? { hostname: "", pagePath: "/", search: "", referrer: "", storage: null } : browserContext();
  const ctx: SignupContext = { ...base, ...opts.ctx, hostname: opts.hostname ?? opts.ctx?.hostname ?? base.hostname };
  return postEmailSignup(
    { email, purpose: "newsletter", source: "breed_quiz", section: "result", locale, species: "dog", breed, quiz: opts.quiz, consentVersion: CONSENT_VERSION, honeypot },
    ctx,
    { fetchFn: opts.fetchFn, allowLegacy: true },
  );
}
