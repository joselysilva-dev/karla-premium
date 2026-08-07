import assert from "node:assert/strict";
import test from "node:test";
import { createRequireAdmin } from "../src/middleware/requireAdmin.js";

function response() {
  return { statusCode: 200, body: null, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } };
}

test("admin middleware rejects a request without a bearer token", async () => {
  const res = response();
  await createRequireAdmin(() => { throw new Error("must not run"); })({ headers: {} }, res, () => {});
  assert.equal(res.statusCode, 401);
});

test("admin middleware accepts an authenticated admin", async () => {
  const client = {
    auth: { getUser: async () => ({ data: { user: { id: "user-1", email: "admin@example.com" } }, error: null }) },
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { id: "user-1", role: "admin" }, error: null }) }) }) }),
  };
  const req = { headers: { authorization: "Bearer valid" } }; const res = response(); let called = false;
  await createRequireAdmin(() => client)(req, res, () => { called = true; });
  assert.equal(called, true); assert.equal(req.admin.id, "user-1");
});

test("admin middleware denies an authenticated non-admin", async () => {
  const client = {
    auth: { getUser: async () => ({ data: { user: { id: "user-2" } }, error: null }) },
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { id: "user-2", role: "user" }, error: null }) }) }) }),
  };
  const res = response();
  await createRequireAdmin(() => client)({ headers: { authorization: "Bearer valid" } }, res, () => {});
  assert.equal(res.statusCode, 403);
});
