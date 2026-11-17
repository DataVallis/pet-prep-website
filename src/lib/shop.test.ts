// Website shop on Stripe (M6-S09) unit tests: `npm test` (node:test).
import { test } from "node:test";
import assert from "node:assert/strict";
import { locales } from "../i18n/config.ts";
import { shopCopy } from "../content/shop/index.ts";
import { sales } from "../content/promise-kit/sales.ts";
import {
  checkoutBody,
  checkoutOutcome,
  checkoutPaths,
  fill,
  isSafeReturnPath,
  isStripeCheckoutUrl,
  kitThanksPath,
  ORDER_POLL_MAX_MS,
  ORDER_POLL_MS,
  orderOutcome,
  sampleBody,
  sampleOutcome,
  sessionIdFrom,
  shouldPollAgain,
} from "./shop.ts";

const API = "https://api.petprep.si";

test("checkout: every language sends its own thank-you and return paths, all accepted by the server rule", () => {
  for (const l of locales) {
    for (const product of ["gift_voucher", "promise_kit"] as const) {
      const p = checkoutPaths(product, l);
      assert.ok(isSafeReturnPath(p.success_path), `${l} ${product} ${p.success_path}`);
      assert.ok(isSafeReturnPath(p.cancel_path), `${l} ${product} ${p.cancel_path}`);
      const body = JSON.parse(checkoutBody(product, l));
      assert.deepEqual(Object.keys(body).sort(), ["cancel_path", "locale", "product", "success_path"]);
      assert.equal(body.locale, l);
    }
  }
  assert.deepEqual(checkoutPaths("gift_voucher", "sl"), { success_path: "/sl/darilni-bon/hvala", cancel_path: "/sl/darilni-bon" });
  assert.deepEqual(checkoutPaths("promise_kit", "en"), { success_path: "/promise-kit/thanks", cancel_path: "/promise-kit" });
  assert.equal(kitThanksPath("de"), "/de/haustier-versprechen/danke");
  for (const bad of ["//evil.example", "https://evil.example", "/x?y=1", "/Upper"]) assert.ok(!isSafeReturnPath(bad), bad);
});

test("checkout answer: only a Stripe https URL is followed; 503 / 429 / anything else → a message", () => {
  assert.deepEqual(checkoutOutcome(200, { url: "https://checkout.stripe.com/c/pay/cs_test_abc" }), { url: "https://checkout.stripe.com/c/pay/cs_test_abc" });
  assert.deepEqual(checkoutOutcome(200, { url: "https://evil.example/pay" }), { error: "error" });
  assert.deepEqual(checkoutOutcome(200, { url: "http://checkout.stripe.com/x" }), { error: "error" });
  assert.deepEqual(checkoutOutcome(200, { url: "https://checkout.stripe.com.evil.example/x" }), { error: "error" });
  assert.deepEqual(checkoutOutcome(503, { error: "unavailable" }), { error: "unavailable" });
  assert.deepEqual(checkoutOutcome(429, null), { error: "rate_limited" });
  assert.deepEqual(checkoutOutcome(502, { error: "upstream_error" }), { error: "error" });
  assert.equal(isStripeCheckoutUrl("javascript:alert(1)"), false);
});

test("session id: only a Checkout Session id from the query string", () => {
  assert.equal(sessionIdFrom("?session_id=cs_test_a1B2c3D4e5F6g7"), "cs_test_a1B2c3D4e5F6g7");
  assert.equal(sessionIdFrom("?session_id=cs_live_" + "x".repeat(40)), "cs_live_" + "x".repeat(40));
  assert.equal(sessionIdFrom("?session_id=../../admin"), null);
  assert.equal(sessionIdFrom("?session_id=cs_short"), null);
  assert.equal(sessionIdFrom(""), null);
});

test("order answer: paid with a voucher and own download links; foreign links dropped; other states mapped", () => {
  const paid = orderOutcome(
    200,
    {
      status: "paid",
      product: "gift_voucher",
      order_number: "PP-2026-000123",
      locale: "sl",
      email_masked: "b***r@example.com",
      voucher: { code: "PP-ABCD-EFGH-JKMN", purchased_at: "2026-11-17T10:00:00+00:00", expires_at: "2027-11-17T10:00:00+00:00", status: "purchased" },
      downloads: [
        { locale: "sl", url: `${API}/api/shop/orders/1/files/sl?signature=x` },
        { locale: "en", url: "https://evil.example/file.pdf" },
        { locale: "xx", url: `${API}/a` },
      ],
    },
    API,
  );
  assert.equal(paid.kind, "paid");
  if (paid.kind !== "paid") return;
  assert.equal(paid.voucher?.code, "PP-ABCD-EFGH-JKMN");
  assert.deepEqual(paid.downloads.map((d) => d.locale), ["sl"]);
  assert.equal(paid.emailMasked, "b***r@example.com");

  assert.deepEqual(orderOutcome(202, { status: "pending" }, API), { kind: "pending" });
  assert.deepEqual(orderOutcome(404, { error: "not_found" }, API), { kind: "not_found" });
  assert.deepEqual(orderOutcome(200, { status: "refunded", product: "gift_voucher", order_number: "x" }, API), { kind: "refunded" });
  assert.deepEqual(orderOutcome(200, { status: "failed" }, API), { kind: "failed" });
  assert.deepEqual(orderOutcome(502, { error: "upstream_error" }, API), { kind: "error" });
  assert.deepEqual(orderOutcome(200, null, API), { kind: "error" });
  // a paid kit order older than 30 days: no voucher, no downloads → still paid (the page says "see your e-mail")
  const old = orderOutcome(200, { status: "paid", product: "promise_kit", order_number: "PP-2026-000001", voucher: null, downloads: [] }, API);
  assert.equal(old.kind, "paid");
});

test("polling: every 3 s while pending, never longer than 2 minutes", () => {
  assert.equal(ORDER_POLL_MS, 3000);
  assert.ok(shouldPollAgain({ kind: "pending" }, 0));
  assert.ok(!shouldPollAgain({ kind: "pending" }, ORDER_POLL_MAX_MS));
  assert.ok(!shouldPollAgain({ kind: "error" }, 0));
});

test("kit sample: consent version and source; only our own signed link is offered", () => {
  const body = JSON.parse(sampleBody(" Parent@Example.com ", "de"));
  assert.deepEqual(body, { email: "parent@example.com", consent: true, consent_version: "2026-11", source: "promise_kit_sample", locale: "de", website: "" });
  assert.deepEqual(sampleOutcome(201, { ok: true, sample_url: `${API}/api/shop/sample/de?signature=x` }, API), { url: `${API}/api/shop/sample/de?signature=x` });
  assert.deepEqual(sampleOutcome(201, { ok: true, sample_url: null }, API), { error: "not_ready" });
  assert.deepEqual(sampleOutcome(201, { ok: true }, API), { error: "not_ready" });
  assert.deepEqual(sampleOutcome(201, { sample_url: "https://evil.example/x.pdf" }, API), { error: "not_ready" });
  assert.deepEqual(sampleOutcome(422, {}, API), { error: "email" });
  assert.deepEqual(sampleOutcome(429, {}, API), { error: "rate_limited" });
});

test("shop copy: all 15 languages, same keys, placeholders kept, no Lemon Squeezy anywhere", () => {
  const shape = (o: object): string[] => Object.entries(o).flatMap(([k, v]) => (typeof v === "object" ? shape(v).map((x) => `${k}.${x}`) : [k]));
  const ref = shape(shopCopy.en).sort();
  for (const l of locales) {
    assert.deepEqual(shape(shopCopy[l]).sort(), ref, l);
    assert.ok(shopCopy[l].order.emailSent.includes("{email}"), l);
    assert.ok(shopCopy[l].order.validUntil.includes("{date}"), l);
    assert.doesNotMatch(JSON.stringify(shopCopy[l]) + JSON.stringify(sales[l]), /Lemon Squeezy/, l);
  }
  assert.equal(fill(shopCopy.sl.order.emailSent, { email: "a***@b.si" }), "Vse smo poslali tudi na a***@b.si.");
});
