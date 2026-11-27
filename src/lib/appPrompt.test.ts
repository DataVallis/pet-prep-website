import { test } from "node:test";
import assert from "node:assert/strict";
import { barAllowed, BAR_QUIET_DAYS, copyKey, isPromptVariant, popupAllowed, POPUP_QUIET_DAYS, PROMPT_SOURCE, PROMPT_STORE_KEY, promptSection, readMemory, scrolledEnough, writeMemory } from "./appPrompt.ts";

const DAY = 86_400_000;
const now = 1_800_000_000_000;
function memoryStore(initial?: string) {
  const data = new Map<string, string>(initial === undefined ? [] : [[PROMPT_STORE_KEY, initial]]);
  return { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => void data.set(k, v), data };
}

test("variants", () => {
  for (const v of ["default", "breed", "care", "quiet", "none"]) assert.ok(isPromptVariant(v));
  for (const v of ["", "popup", null, 3]) assert.ok(!isPromptVariant(v));
});

test("pop-up: not on quiet / none pages, not after a sign-up, once per 30 days after closing", () => {
  assert.ok(popupAllowed("default", {}, now));
  assert.ok(popupAllowed("breed", {}, now));
  assert.ok(popupAllowed("care", {}, now));
  assert.ok(!popupAllowed("quiet", {}, now));
  assert.ok(!popupAllowed("none", {}, now));
  assert.ok(!popupAllowed("default", { signedUp: true }, now));
  assert.ok(!popupAllowed("default", { popupClosedAt: now - (POPUP_QUIET_DAYS - 1) * DAY }, now));
  assert.ok(popupAllowed("default", { popupClosedAt: now - POPUP_QUIET_DAYS * DAY }, now));
});

test("bar: everywhere but none pages, not after a sign-up, back 7 days after closing", () => {
  assert.ok(barAllowed("quiet", {}, now));
  assert.ok(!barAllowed("none", {}, now));
  assert.ok(!barAllowed("care", { signedUp: true }, now));
  assert.ok(!barAllowed("default", { barClosedAt: now - DAY }, now));
  assert.ok(barAllowed("default", { barClosedAt: now - BAR_QUIET_DAYS * DAY }, now));
  // closing the pop-up does not hide the bar
  assert.ok(barAllowed("default", { popupClosedAt: now }, now));
});

test("memory: merges, survives broken or blocked storage", () => {
  const s = memoryStore();
  assert.deepEqual(readMemory(s), {});
  writeMemory(s, { popupClosedAt: now });
  writeMemory(s, { signedUp: true });
  assert.deepEqual(readMemory(s), { signedUp: true, popupClosedAt: now, barClosedAt: undefined });
  assert.deepEqual(readMemory(memoryStore("{not json")), {});
  assert.deepEqual(readMemory(memoryStore('{"signedUp":"yes","popupClosedAt":"x","barClosedAt":-1}')), { signedUp: undefined, popupClosedAt: undefined, barClosedAt: undefined });
  assert.deepEqual(readMemory(memoryStore("null")), {});
  assert.deepEqual(readMemory(null), {});
  const blocked = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
  assert.deepEqual(readMemory(blocked), {});
  assert.doesNotThrow(() => writeMemory(blocked, { signedUp: true }));
  assert.doesNotThrow(() => writeMemory(null, { signedUp: true }));
  // only the three known values are ever stored
  assert.deepEqual(Object.keys(JSON.parse(s.data.get(PROMPT_STORE_KEY)!)).sort(), ["popupClosedAt", "signedUp"]);
});

test("scroll share: half of the page seen, never on a page with nothing to scroll or at its very top", () => {
  assert.ok(!scrolledEnough(0, 800, 4000));
  assert.ok(!scrolledEnough(1000, 800, 4000));
  assert.ok(scrolledEnough(1200, 800, 4000));
  assert.ok(!scrolledEnough(0, 800, 900));
  assert.ok(!scrolledEnough(100, 800, 1500)); // half is on screen already, but the visitor has not scrolled
  assert.ok(scrolledEnough(300, 800, 1500));
  assert.ok(!scrolledEnough(0, 0, 0));
});

test("wording and section", () => {
  assert.equal(copyKey("breed", true), "breed");
  assert.equal(copyKey("breed", false), "default");
  assert.equal(copyKey("care", false), "care");
  assert.equal(copyKey("quiet", false), "default");
  assert.equal(promptSection("popup", "breed", true), "popup_breed");
  assert.equal(promptSection("bar", "quiet", false), "bar_default");
  for (const s of [promptSection("popup", "care", false), promptSection("bar", "breed", true)]) assert.match(s, /^[a-z0-9_-]{1,40}$/);
  assert.match(PROMPT_SOURCE, /^[a-z0-9_]{1,32}$/);
});
