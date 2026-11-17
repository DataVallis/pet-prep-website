import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { MIN_TAGS, OPTION_COUNTS, QUESTION_IDS, decodeAnswers, encodeAnswers, rankBreeds, type QuizBreed } from "./breedQuiz.ts";
import { quizEventBody, onPetprep, sendQuizEvent, sendQuizLead } from "./breedQuizEvents.ts";

type RegBreed = { id: string; species: string; order: number; portrait?: unknown; facets: Record<string, string>; suitability: { suits: { tag: string }[]; consider: { tag: string }[] } };
const reg = JSON.parse(readFileSync(new URL("../content/registry/registry.json", import.meta.url), "utf8")) as { breeds: RegBreed[]; suitability_vocabulary: Record<string, string> };
const real: QuizBreed[] = reg.breeds.filter((b) => b.species === "dog" && b.portrait).map((b) => ({ id: b.id, order: b.order, size: b.facets.size, exercise: b.facets.exercise, suits: b.suitability.suits.map((t) => t.tag), consider: b.suitability.consider.map((t) => t.tag) }));

const br = (id: string, order: number, suits: string[], consider: string[], size = "medium", exercise = "h1_2"): QuizBreed => ({ id, order, size, exercise, suits, consider });
// home, exercise, alone, kids, first, pets, hair, size, training
const A = (...n: number[]) => n;

test("encode / decode answers", () => {
  assert.equal(encodeAnswers([1, 2, 0, 3, 1, 0, 2, 3, 1]), "120310231");
  assert.deepEqual(decodeAnswers("120310231"), [1, 2, 0, 3, 1, 0, 2, 3, 1]);
  for (const bad of [null, "", "12031023", "1203102311", "12a310231", "920310231", "120310931"]) assert.equal(decodeAnswers(bad), null, String(bad));
});

test("alone more than 8 hours: no breeds, a kind outcome", () => {
  assert.deepEqual(rankBreeds(A(2, 2, 3, 0, 0, 0, 2, 3, 2), real), { kind: "notNow", reason: "alone" });
});

test("fixtures: suits +2, clashes subtract, size, ties by order", () => {
  const breeds = [
    br("calm", 3, ["apartment", "children", "family_pet", "low_shedding"], ["sheds"], "small", "under_1h"),
    br("runner", 1, ["active_family", "large_home", "children"], ["long_daily_exercise", "needs_mental_stimulation", "sheds"], "large", "over_2h"),
    br("twin", 2, ["apartment", "children", "family_pet", "low_shedding"], ["sheds"], "small", "under_1h"),
    br("thin", 0, ["apartment", "children"], [], "small", "under_1h"),
    { id: "nodata", order: 4, suits: ["apartment", "children", "low_shedding"], consider: [] },
  ];
  // flat, little time, up to 4 h, small kids, first dog, no pets, hates hair, small, little training
  const o = rankBreeds(A(0, 0, 1, 1, 0, 0, 0, 0, 0), breeds);
  assert.equal(o.kind, "breeds");
  if (o.kind !== "breeds") return;
  assert.equal(o.pool, 4, "thin has fewer than 3 tags");
  assert.ok(!o.picks.some((p) => p.id === "thin"), "never in the list");
  assert.ok(!o.picks.some((p) => p.id === "runner"), "flat + large_home without apartment is excluded");
  // twin and calm score the same, twin has the lower order
  assert.deepEqual(o.picks.map((p) => p.id), ["twin", "calm", "nodata"]);
  assert.equal(o.picks[0].score, o.picks[1].score);
  assert.ok(o.picks[0].matched.includes("apartment"));
  assert.ok(o.picks[0].fits.includes("size"));
  assert.ok(o.picks[0].clashes.includes("sheds"));
  // missing facets and tags are no minus
  const nd = o.picks[2];
  assert.equal(nd.score, 2 + 2 + 2 + 0 /* apartment, children, small_children(none), low_shedding */ - 0);
});

test("exercise tag and level are one fact: subtracted once", () => {
  const b = [br("a", 1, ["children", "family_pet"], ["long_daily_exercise"], "medium", "over_2h"), br("b", 2, ["children", "family_pet", "apartment"], ["x"], "medium", "under_1h"), br("c", 3, ["children", "family_pet", "apartment"], ["x"])];
  const o = rankBreeds(A(3, 0, 0, 0, 1, 0, 2, 3, 2), b);
  if (o.kind !== "breeds") throw new Error("kind");
  const a = o.picks.find((p) => p.id === "a")!;
  assert.equal(a.score, 0 - 3 + 0 + 1 * 0, "−3 once (children +0 without kids, large_home none)");
  assert.deepEqual(a.clashes.sort(), ["exercise", "long_daily_exercise"]);
});

test("health tags never subtract and appear as calm notes", () => {
  const withHealth = br("h", 1, ["apartment", "children"], ["brachycephalic_breathing", "hips_hind_legs", "sheds"], "small", "under_1h");
  const without = br("w", 2, ["apartment", "children"], ["sheds", "x1"], "small", "under_1h");
  const o = rankBreeds(A(0, 1, 0, 2, 1, 0, 2, 0, 2), [withHealth, without]);
  if (o.kind !== "breeds") throw new Error("kind");
  assert.equal(o.picks[0].score, o.picks[1].score);
  assert.ok(o.picks.find((p) => p.id === "h")!.consider.includes("brachycephalic_breathing"));
});

test("real register: every combination gives 3 distinct picks, none with < 3 tags, no NaN", () => {
  const tags = new Map(real.map((b) => [b.id, b.suits.length + b.consider.length]));
  const counts = QUESTION_IDS.map((id) => OPTION_COUNTS[id]);
  const n = counts.reduce((x, y) => x * y, 1);
  let checked = 0;
  for (let i = 0; i < n; i++) {
    let r = i;
    const a = counts.map((c) => { const d = r % c; r = Math.floor(r / c); return d; });
    const o = rankBreeds(a, real);
    if (a[2] === 3) { assert.equal(o.kind, "notNow"); continue; }
    if (o.kind !== "breeds") throw new Error("kind");
    assert.equal(o.picks.length, 3, a.join(""));
    assert.equal(new Set(o.picks.map((p) => p.id)).size, 3);
    for (const p of o.picks) {
      assert.ok(Number.isFinite(p.score), "no NaN");
      assert.ok((tags.get(p.id) ?? 0) >= MIN_TAGS, `${p.id} has too few tags`);
    }
    checked++;
  }
  assert.ok(checked > 40000);
});

test("real register: sensible answers give sensible breeds", () => {
  // flat, 30-60 min, up to 4 h, no kids, first dog, no pets, hates hair, small, little training
  const o = rankBreeds(A(0, 1, 1, 0, 0, 0, 0, 0, 0), real);
  if (o.kind !== "breeds") throw new Error("kind");
  for (const p of o.picks) {
    const b = real.find((x) => x.id === p.id)!;
    assert.ok(!(b.suits.includes("large_home") && !b.suits.includes("apartment")), "no flat-unfriendly breed");
    assert.ok(["toy", "small", "small_medium"].includes(b.size!), `${p.id} ${b.size}`);
  }
});

test("events: only petprep.si, one id for clicks, top 3 for completed", async () => {
  assert.ok(onPetprep("petprep.si") && onPetprep("www.petprep.si") && !onPetprep("localhost") && !onPetprep("evilpetprep.si"));
  assert.deepEqual(quizEventBody("completed", "sl", ["a", "b", "c", "d"]), { event: "completed", locale: "sl", breeds: ["a", "b", "c"], website: "" });
  assert.deepEqual(quizEventBody("app_click", "sl", ["a", "b"]).breeds, ["a"]);
  const calls: { url: string; init: RequestInit }[] = [];
  const fetchFn = async (url: string, init: RequestInit) => { calls.push({ url, init }); return new Response(null, { status: 204 }); };
  sendQuizEvent("completed", "en", ["a"], { hostname: "localhost", fetchFn });
  assert.equal(calls.length, 0);
  sendQuizEvent("calculator_click", "en", ["a"], { hostname: "petprep.si", fetchFn });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.petprep.si/api/breed-quiz/events");
  assert.equal(calls[0].init.keepalive, true);
  // failures are silent
  sendQuizEvent("completed", "en", ["a"], { hostname: "petprep.si", fetchFn: async () => { throw new Error("down"); } });
  assert.equal(await sendQuizLead("a@b.si", "sl", "x", "", { hostname: "localhost" }), "proto");
  assert.equal(await sendQuizLead("a@b.si", "sl", "x", "bot", { hostname: "petprep.si", fetchFn }), "error");
  const ok = await sendQuizLead("a@b.si", "sl", "x", "", { hostname: "petprep.si", fetchFn: async (u, i) => { calls.push({ url: u, init: i }); return new Response("{}", { status: 201 }); } });
  assert.equal(ok, "ok");
  const body = JSON.parse(String(calls.at(-1)!.init.body));
  assert.equal(calls.at(-1)!.url, "https://api.petprep.si/api/email-signups");
  assert.deepEqual(body, { email: "a@b.si", consent: true, consent_version: "2026-11", purpose: "newsletter", source: "breed_quiz", section: "result", page_path: "/", locale: "sl", species: "dog", breed: "x", website: "" });
});
