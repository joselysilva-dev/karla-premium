import assert from "node:assert/strict";
import test from "node:test";
import { createRequireAuth } from "../src/middleware/requireAuth.js";

function response() { return { statusCode: 200, body: null, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } }; }
function client({ valid = true } = {}) { return {
  auth: { getUser: async () => valid ? ({ data: { user: { id: "user-1", email: "client@example.com" } }, error: null }) : ({ data: { user: null }, error: new Error("invalid") }) },
  from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { id: "user-1", role: "client" }, error: null }) }) }) }),
}; }

test("requireAuth accepts a valid token", async () => {
  const req = { headers: { authorization: "Bearer valid" } }; const res = response(); let called = false;
  await createRequireAuth(() => client())(req, res, () => { called = true; });
  assert.equal(called, true); assert.equal(req.user.id, "user-1");
});

test("requireAuth rejects an invalid token", async () => {
  const res = response();
  await createRequireAuth(() => client({ valid: false }))({ headers: { authorization: "Bearer invalid" } }, res, assert.fail);
  assert.equal(res.statusCode, 401);
});
