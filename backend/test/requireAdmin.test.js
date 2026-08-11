import assert from "node:assert/strict";
import test from "node:test";
import { createRequireAdmin, createRequireAdminAal2 } from "../src/middleware/requireAdmin.js";

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
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { id: "user-2", role: "student" }, error: null }) }) }) }),
  };
  const res = response();
  await createRequireAdmin(() => client)({ headers: { authorization: "Bearer valid" } }, res, () => {});
  assert.equal(res.statusCode, 403);
});

function tokenWithAal(aal) {
  return `header.${Buffer.from(JSON.stringify({ aal })).toString("base64url")}.signature`;
}

function adminClient() {
  return {
    auth: { getUser: async () => ({ data: { user: { id: "admin-1", email: "admin@example.com" } }, error: null }) },
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { id: "admin-1", role: "admin" }, error: null }) }) }) }),
  };
}

test("AAL2 middleware rejects an admin authenticated only at AAL1", async () => {
  const res = response(); let called = false;
  await createRequireAdminAal2(() => adminClient())({ headers: { authorization: `Bearer ${tokenWithAal("aal1")}` } }, res, () => { called = true; });
  assert.equal(called, false); assert.equal(res.statusCode, 403);
});

test("AAL2 middleware accepts an admin with a verified second factor", async () => {
  const res = response(); let called = false;
  await createRequireAdminAal2(() => adminClient())({ headers: { authorization: `Bearer ${tokenWithAal("aal2")}` } }, res, () => { called = true; });
  assert.equal(called, true); assert.equal(res.statusCode, 200);
});