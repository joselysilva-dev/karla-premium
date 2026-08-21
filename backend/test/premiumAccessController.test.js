import assert from "node:assert/strict";
import test from "node:test";
import { createGetPremiumAccess } from "../src/controllers/premiumAccessController.js";

function response() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

test("admin is redirected by access metadata without claiming premium", async () => {
  const res = response();
  const controller = createGetPremiumAccess(() => { throw new Error("database must not run"); });
  await controller({ user: { id: "admin-1", profile: { role: "admin" } } }, res, assert.fail);
  assert.equal(res.body.admin, true);
  assert.equal(res.body.premium, false);
  assert.equal(res.body.status, "admin");
});

test("active premium access is returned for the authenticated user", async () => {
  const access = { client_id: "client-1", status: "active" };
  const client = {
    from: (table) => {
      assert.equal(table, "premium_access");
      return {
        select: () => ({
          eq: (field, value) => {
            assert.equal(field, "user_id");
            assert.equal(value, "user-1");
            return { maybeSingle: async () => ({ data: access, error: null }) };
          },
        }),
      };
    },
  };
  const res = response();
  await createGetPremiumAccess(() => client)({
    user: { id: "user-1", email: "aluna@example.com", emailConfirmed: true, profile: { role: "client" } },
  }, res, assert.fail);
  assert.equal(res.body.premium, true);
  assert.equal(res.body.clientId, "client-1");
});

test("unverified email never attempts to claim an invitation", async () => {
  let rpcCalled = false;
  const client = {
    from: () => ({
      select: () => ({
        eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }),
      }),
    }),
    rpc: async () => { rpcCalled = true; return { data: null, error: null }; },
  };
  const res = response();
  await createGetPremiumAccess(() => client)({
    user: { id: "user-1", email: "aluna@example.com", emailConfirmed: false, profile: { role: "client" } },
  }, res, assert.fail);
  assert.equal(rpcCalled, false);
  assert.equal(res.body.premium, false);
  assert.equal(res.body.status, "email_unverified");
});

test("verified user claims only a pre-authorized premium invitation", async () => {
  let rpcName;
  let rpcArgs;
  const client = {
    from: () => ({
      select: () => ({
        eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }),
      }),
    }),
    rpc: async (name, args) => {
      rpcName = name;
      rpcArgs = args;
      return { data: [{ client_id: "client-2", status: "active" }], error: null };
    },
  };
  const res = response();
  await createGetPremiumAccess(() => client)({
    user: { id: "user-2", email: "autorizada@example.com", emailConfirmed: true, profile: { role: "client" } },
  }, res, assert.fail);
  assert.equal(rpcName, "claim_premium_access");
  assert.deepEqual(rpcArgs, { target_user_id: "user-2", target_email: "autorizada@example.com" });
  assert.equal(res.body.premium, true);
  assert.equal(res.body.clientId, "client-2");
});
