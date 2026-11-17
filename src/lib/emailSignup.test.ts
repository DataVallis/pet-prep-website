// E-mails go to our own database, segmented (David 2026-11-17): payload, UTM, referrer, fallback, early-access link/breed.
import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { buildLegacyBody, buildSignupBody, EARLY_ACCESS_CONSENT_VERSION, NEWSLETTER_CONSENT_VERSION, parseUtm, postEmailSignup, referrerHost, rememberUtm, resolveUtm, type SignupContext, type SignupInput } from "./emailSignup.ts";
import { sendQuizLead } from "./breedQuizEvents.ts";
import { breedFromSearch, withBreed } from "./earlyAccess.ts";
import { midName } from "./breedName.ts";
import { quizCopy } from "../content/quiz/index.ts";
import { locales } from "../i18n/config.ts";

const memory = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) }; };
const ctx = (o: Partial<SignupContext> = {}): SignupContext => ({ hostname: "petprep.si", pagePath: "/sl/pred-nakupom-psa/katera-pasma", search: "", referrer: "", storage: memory(), ...o });
const input = (o: Partial<SignupInput> = {}): SignupInput => ({ email: " Ana@Primer.si ", purpose: "newsletter", source: "breed_quiz", locale: "sl", consentVersion: NEWSLETTER_CONSENT_VERSION, ...o });
type Call = { url: string; body: Record<string, unknown> };
const recorder = (...statuses: number[]) => {
  const calls: Call[] = [];
  const fetchFn = async (url: string, init: RequestInit) => { calls.push({ url, body: JSON.parse(String(init.body)) }); const status = statuses[Math.min(calls.length, statuses.length) - 1]; return new Response(status === 204 ? null : status === 422 ? '{"errors":{"email":["x"]}}' : "{}", { status }); };
  return { calls, fetchFn };
};

test("body: full context for the quiz (source, section, quiz result + answers, UTM from the URL, other-site referrer)", () => {
  const body = buildSignupBody(
    input({ section: "result", species: "dog", breed: "french_bulldog", quiz: { result: ["french_bulldog", "pug", "beagle", "extra"], answers: "012301230" } }),
    ctx({ search: "?a=012301230&utm_source=newsletter&utm_medium=email&utm_campaign=nov&utm_content=btn&utm_term=dog", referrer: "https://www.google.com/search?q=x" }),
  );
  assert.deepEqual(body, {
    email: "Ana@Primer.si", consent: true, consent_version: "2026-11", purpose: "newsletter", source: "breed_quiz", page_path: "/sl/pred-nakupom-psa/katera-pasma", section: "result", locale: "sl", species: "dog", breed: "french_bulldog",
    quiz: { result: ["french_bulldog", "pug", "beagle"], answers: "012301230" }, utm: { source: "newsletter", medium: "email", campaign: "nov", content: "btn", term: "dog" }, referrer_host: "www.google.com", website: "",
  });
});

test("body: calculator fields (stage) and no empty optional fields", () => {
  const b = buildSignupBody(input({ source: "real_cost", section: "step5", species: "dog", breed: "labrador_retriever", stage: "puppy" }), ctx());
  assert.equal(b.stage, "puppy");
  assert.equal(b.source, "real_cost");
  for (const k of ["quiz", "utm", "referrer_host"]) assert.ok(!(k in b), k);
  assert.ok(!("breed" in buildSignupBody(input({ breed: "Bad Id!" }), ctx())), "an invalid breed id is never sent");
});

test("UTM: current URL wins, else the first page of the visit (sessionStorage); never overwritten; caps at 100; blocked storage is fine", () => {
  const store = memory();
  rememberUtm("?utm_source=ig&utm_campaign=a".padEnd(40, "x") + "", store);
  rememberUtm("?utm_source=other", store);
  assert.equal(resolveUtm("", store)?.source, "ig");
  assert.equal(resolveUtm("?utm_source=fb", store)?.source, "fb");
  assert.equal(resolveUtm("?x=1", memory()), undefined);
  assert.equal(parseUtm(`?utm_source=${"a".repeat(300)}`)?.source?.length, 100);
  const blocked = { getItem: () => { throw new Error("denied"); }, setItem: () => { throw new Error("denied"); } };
  rememberUtm("?utm_source=ig", blocked);
  assert.equal(resolveUtm("", blocked), undefined);
  assert.equal(resolveUtm("?utm_source=ig", blocked)?.source, "ig");
});

test("referrer_host: another site only", () => {
  assert.equal(referrerHost("https://l.instagram.com/?u=x", "petprep.si"), "l.instagram.com");
  assert.equal(referrerHost("https://petprep.si/sl", "petprep.si"), undefined);
  assert.equal(referrerHost("https://www.petprep.si/sl", "petprep.si"), undefined);
  assert.equal(referrerHost("", "petprep.si"), undefined);
  assert.equal(referrerHost("not a url", "petprep.si"), undefined);
});

test("send: 204 is ok; 422 with an e-mail error is 'email'; 429 / 500 are 'error'; honeypot and foreign hosts send nothing", async () => {
  const r = recorder(204);
  assert.equal(await postEmailSignup(input(), ctx(), { fetchFn: r.fetchFn }), "ok");
  assert.equal(r.calls.length, 1);
  assert.equal(r.calls[0].url, "https://api.petprep.si/api/email-signups");
  assert.equal(await postEmailSignup(input(), ctx(), { fetchFn: recorder(422).fetchFn }), "email");
  assert.equal(await postEmailSignup(input(), ctx(), { fetchFn: recorder(429).fetchFn }), "error");
  assert.equal(await postEmailSignup(input(), ctx(), { fetchFn: recorder(500).fetchFn, allowLegacy: true }), "error");
  const none = recorder(204);
  assert.equal(await postEmailSignup(input({ honeypot: "bot" }), ctx(), { fetchFn: none.fetchFn }), "error");
  assert.equal(await postEmailSignup(input(), ctx({ hostname: "localhost" }), { fetchFn: none.fetchFn }), "proto");
  assert.equal(none.calls.length, 0);
  assert.equal(await postEmailSignup(input(), ctx(), { fetchFn: async () => { throw new Error("down"); } }), "error");
});

test("fallback: 404 or 405 → the old payload to /api/summary-leads exactly as before; no e-mail is lost", async () => {
  for (const status of [404, 405]) {
    const r = recorder(status, 201);
    assert.equal(await postEmailSignup(input({ source: "real_cost", breed: "labrador_retriever", stage: "adult", section: "step5" }), ctx(), { fetchFn: r.fetchFn, allowLegacy: true }), "ok");
    assert.deepEqual(r.calls.map((c) => c.url), ["https://api.petprep.si/api/email-signups", "https://api.petprep.si/api/summary-leads"]);
    assert.deepEqual(r.calls[1].body, { email: "Ana@Primer.si", consent: true, consent_version: "2026-11", source: "real_cost", locale: "sl", breed: "labrador_retriever", stage: "adult", website: "" });
  }
  // without allowLegacy (early access: Klaviyo is the safety net) a 404 is just an error
  const r = recorder(404);
  assert.equal(await postEmailSignup(input(), ctx(), { fetchFn: r.fetchFn }), "error");
  assert.equal(r.calls.length, 1);
  assert.deepEqual(buildLegacyBody(input({ breed: "x" })), { email: "Ana@Primer.si", consent: true, consent_version: "2026-11", source: "breed_quiz", locale: "sl", breed: "x", website: "" });
});

test("quiz lead: sends the top-3 and the answers; the old endpoint takes over on 404", async () => {
  const r = recorder(404, 201);
  const res = await sendQuizLead("a@b.si", "sl", "pug", "", { hostname: "petprep.si", fetchFn: r.fetchFn, ctx: { pagePath: "/sl/pred-nakupom-psa/katera-pasma", search: "?a=012301230" }, quiz: { result: ["pug", "beagle", "boxer"], answers: "012301230" } });
  assert.equal(res, "ok");
  assert.deepEqual(r.calls[0].body.quiz, { result: ["pug", "beagle", "boxer"], answers: "012301230" });
  assert.equal(r.calls[0].body.section, "result");
  assert.equal(r.calls[0].body.page_path, "/sl/pred-nakupom-psa/katera-pasma");
  assert.equal(r.calls[1].url.endsWith("/api/summary-leads"), true);
});

test("early access: distinct consent version, purpose early_access, breed and section", async () => {
  assert.notEqual(EARLY_ACCESS_CONSENT_VERSION, NEWSLETTER_CONSENT_VERSION);
  assert.match(EARLY_ACCESS_CONSENT_VERSION, /^[a-z0-9-]{1,16}$/);
  const r = recorder(204);
  await postEmailSignup(input({ purpose: "early_access", source: "early_access_form", section: "hero", breed: "french_bulldog", consentVersion: EARLY_ACCESS_CONSENT_VERSION }), ctx({ pagePath: "/sl", search: "?breed=french_bulldog" }), { fetchFn: r.fetchFn });
  assert.deepEqual(r.calls[0].body, { email: "Ana@Primer.si", consent: true, consent_version: "ea-2026-11", purpose: "early_access", source: "early_access_form", page_path: "/sl", section: "hero", locale: "sl", breed: "french_bulldog", website: "" });
});

test("?breed= links: the breed goes before the anchor, the anchor keeps working", () => {
  assert.equal(withBreed("/sl#early-access", "french_bulldog"), "/sl?breed=french_bulldog#early-access");
  assert.equal(withBreed("/#early-access", "pug"), "/?breed=pug#early-access");
  assert.equal(withBreed("/sl", "pug"), "/sl?breed=pug");
  assert.equal(withBreed("https://apps.apple.com/x", "pug"), "https://apps.apple.com/x");
  assert.equal(withBreed("/sl#early-access", "Bad Id"), "/sl#early-access");
  assert.equal(withBreed("/sl#early-access", undefined), "/sl#early-access");
  assert.equal(breedFromSearch("?breed=french_bulldog"), "french_bulldog");
  assert.equal(breedFromSearch("?breed=<script>"), null);
  assert.equal(breedFromSearch(""), null);
});

type RegBreed = { id: string; species: string; portrait?: unknown; name: Record<string, string> };
const reg = JSON.parse(readFileSync(new URL("../content/registry/registry.json", import.meta.url), "utf8")) as { breeds: RegBreed[] };

test("quiz CTA: the breed name needs no declension and is not capitalised mid-sentence (sl: »Preizkusite pasmo francoski buldog v PetPrepu«)", () => {
  const fr = reg.breeds.find((b) => b.id === "french_bulldog")!;
  const nameIn = (l: string): string => (l === "en" || l === "sl" ? fr.name[l] : (JSON.parse(readFileSync(new URL(`../content/registry/locales/${l}.json`, import.meta.url), "utf8")) as { breeds: Record<string, { name: string }> }).breeds.french_bulldog.name);
  const cta = (l: (typeof locales)[number]) => quizCopy[l].tryCta.replace("{mid}", midName(nameIn(l), l));
  assert.equal(cta("sl"), "Preizkusite pasmo francoski buldog v PetPrepu");
  assert.equal(cta("en"), "Try the French Bulldog in PetPrep");
  for (const l of locales) {
    assert.ok(quizCopy[l].tryCta.includes("{mid}"), l);
    assert.ok(!quizCopy[l].tryCta.includes("{name}"), `${l}: no bare {name}`);
    const text = cta(l);
    const name = midName(nameIn(l), l);
    if (l === "en" || l === "de") assert.equal(name, nameIn(l), `${l} keeps the capital`);
    else assert.equal(name.charAt(0), name.charAt(0).toLocaleLowerCase(l), `${l}: lower-case mid-sentence`);
    assert.ok(text.includes(name), l);
  }
  assert.equal(midName("JRT", "sl"), "JRT");
  assert.equal(midName("Chihuahua", "sl"), "chihuahua");
});

test("early access form copy: every language names the breed with {mid}", () => {
  const forBreed = (l: string) => /forBreed: "([^"]+)"/.exec(readFileSync(new URL(`../content/${l}.ts`, import.meta.url), "utf8"))?.[1] ?? "";
  for (const l of locales) assert.ok(forBreed(l).includes("{mid}"), l);
  assert.equal(forBreed("sl").replace("{mid}", "francoski buldog"), "Zgodnji dostop za pasmo: francoski buldog");
});

test("visit memory: first other-site referrer is kept with the UTM and used when the current referrer is petprep.si", () => {
  const store = memory();
  rememberUtm("?utm_source=ig", store, "https://l.instagram.com/x", "petprep.si");
  rememberUtm("?utm_source=later", store, "https://google.com/", "petprep.si");
  const raw = JSON.parse(store.getItem("petprep.utm")!);
  assert.deepEqual(raw, { source: "ig", ref: "l.instagram.com" });
  const body = buildSignupBody(input(), ctx({ storage: store, referrer: "https://petprep.si/sl", search: "" }));
  assert.equal(body.referrer_host, "l.instagram.com");
  assert.deepEqual(body.utm, { source: "ig" });
  // a referrer without any UTM is remembered too; an internal first page stores nothing
  const s2 = memory();
  rememberUtm("", s2, "https://petprep.si/", "petprep.si");
  assert.equal(s2.getItem("petprep.utm"), null);
  rememberUtm("", s2, "https://www.bing.com/", "petprep.si");
  assert.equal(buildSignupBody(input(), ctx({ storage: s2 })).referrer_host, "www.bing.com");
});

test("legacy fallback also on a 422 that is not about the address, and when the new endpoint cannot be reached; no double save", async () => {
  const bad422 = async (url: string) => (url.endsWith("/api/email-signups") ? new Response('{"errors":{"consent_version":["x"]}}', { status: 422 }) : new Response("{}", { status: 201 }));
  assert.equal(await postEmailSignup(input(), ctx(), { fetchFn: bad422, allowLegacy: true }), "ok");
  assert.equal(await postEmailSignup(input(), ctx(), { fetchFn: bad422 }), "error");
  const urls: string[] = [];
  const cors = async (url: string) => { urls.push(url); if (url.endsWith("/api/email-signups")) throw new TypeError("Failed to fetch"); return new Response("{}", { status: 201 }); };
  assert.equal(await postEmailSignup(input(), ctx(), { fetchFn: cors, allowLegacy: true }), "ok");
  assert.deepEqual(urls, ["https://api.petprep.si/api/email-signups", "https://api.petprep.si/api/summary-leads"]);
  assert.equal(await postEmailSignup(input(), ctx(), { fetchFn: cors }), "error");
  // an address error on the new endpoint is final: the old endpoint is not asked
  const r = recorder(422);
  assert.equal(await postEmailSignup(input(), ctx(), { fetchFn: r.fetchFn, allowLegacy: true }), "email");
  assert.equal(r.calls.length, 1);
  // both unreachable
  assert.equal(await postEmailSignup(input(), ctx(), { fetchFn: async () => { throw new TypeError("x"); }, allowLegacy: true }), "error");
});

test("early-access form: our database only with the consent sentence shown; breed resolved from the register index with its species", () => {
  const src = readFileSync(new URL("../components/EarlyAccessForm.tsx", import.meta.url), "utf8");
  assert.match(src, /const ours = showConsent\s*\?\s*postEmailSignup/);
  assert.match(src, /species: chosen\?\.species/);
  assert.match(src, /"\{mid\}", \(\) => chosenName/, "function replacement: a name can never inject a $ pattern");
  assert.ok(!src.includes("breedNames"), "no name map is serialised into every instance");
});

test("midName keeps proper-noun breed names as written", () => {
  assert.equal(midName("Jack Russell terier", "sl"), "Jack Russell terier");
  assert.equal(midName("Coton de Tuléar", "pl"), "Coton de Tuléar");
  assert.equal(midName("Francouzský buldoček", "cs"), "francouzský buldoček");
  assert.equal(midName("Ranskanbulldoggi", "fi"), "ranskanbulldoggi");
  assert.equal(midName("Border Collie", "fr"), "Border Collie");
});
