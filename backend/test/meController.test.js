import assert from "node:assert/strict";
import test from "node:test";
import { createMeControllers } from "../src/controllers/meController.js";

function response() { return { statusCode: 200, body: null, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } }; }

test("reads only the authenticated user's profile", async () => {
  let selectedId; const profile = { id: "user-1", role: "client" };
  const client = { from: () => ({ select: () => ({ eq: (_field, id) => { selectedId = id; return { single: async () => ({ data: profile, error: null }) }; } }) }) };
  const res = response(); await createMeControllers(() => client).getMe({ user: { id: "user-1" } }, res, assert.fail);
  assert.equal(selectedId, "user-1"); assert.deepEqual(res.body, profile);
});

test("updates only the authenticated user's allowed profile fields", async () => {
  let updated; let selectedId; const result = { id: "user-1", full_name: "Karla" };
  const client = { from: () => ({ update: (values) => { updated = values; return { eq: (_field, id) => { selectedId = id; return { select: () => ({ single: async () => ({ data: result, error: null }) }) }; } }; } }), auth: { admin: { updateUserById: async () => ({ error: null }) } } };
  const res = response(); await createMeControllers(() => client).updateMe({ user: { id: "user-1", email: "a@b.com" }, body: { full_name: " Karla " } }, res, assert.fail);
  assert.deepEqual(updated, { full_name: "Karla" }); assert.equal(selectedId, "user-1");
});

test("rejects an attempt to update role", async () => {
  const res = response(); await createMeControllers(() => { throw new Error("must not run"); }).updateMe({ user: { id: "user-1" }, body: { role: "admin" } }, res, assert.fail);
  assert.equal(res.statusCode, 400);
});

test("claims a visitor atomically for the authenticated user", async () => {
  let rpcArgs; const client = { rpc: async (name, args) => { assert.equal(name, "claim_visitor_client"); rpcArgs = args; return { data: "client-1", error: null }; } };
  const res = response(); await createMeControllers(() => client).claimVisitor({ user: { id: "user-1" }, body: { visitorId: "550e8400-e29b-41d4-a716-446655440000" } }, res, assert.fail);
  assert.equal(rpcArgs.target_user_id, "user-1"); assert.equal(rpcArgs.target_visitor_hash.length, 64); assert.equal(res.body.success, true);
});
