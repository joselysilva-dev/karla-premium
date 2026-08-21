import assert from "node:assert/strict";
import test from "node:test";
import {
  createGetClientPremiumAccess,
  createInviteClientPremiumAccess,
  createUpdatePremiumAccessStatus,
} from "../src/controllers/adminPremiumAccessController.js";

function response() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

function singleRowQuery(row) {
  return {
    select: () => ({
      eq: () => ({ maybeSingle: async () => ({ data: row, error: null }) }),
    }),
  };
}

test("admin reads the premium access linked to a client", async () => {
  const clientRow = { id: "client-1", name: "Ana", email: "ana@example.com", user_id: null };
  const accessRow = { id: "access-1", client_id: "client-1", status: "invited" };
  const client = {
    from(table) {
      if (table === "clients") return singleRowQuery(clientRow);
      if (table === "premium_access") return singleRowQuery(accessRow);
      throw new Error(`unexpected table ${table}`);
    },
  };
  const res = response();
  await createGetClientPremiumAccess(() => client)({ params: { id: "client-1" } }, res, assert.fail);
  assert.equal(res.body.client.id, "client-1");
  assert.equal(res.body.access.status, "invited");
});

test("admin creates a pre-authorized premium invitation with normalized email", async () => {
  const clientRow = { id: "client-2", name: "Bia", email: "bia@example.com", user_id: null };
  let inserted;
  const client = {
    from(table) {
      if (table === "clients") return singleRowQuery(clientRow);
      if (table !== "premium_access") throw new Error(`unexpected table ${table}`);
      return {
        select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }),
        insert(payload) {
          inserted = payload;
          return {
            select: () => ({ single: async () => ({ data: { id: "access-2", ...payload }, error: null }) }),
          };
        },
      };
    },
  };
  const res = response();
  await createInviteClientPremiumAccess(() => client)({
    params: { id: "client-2" },
    body: { email: "  BIA@Example.COM " },
    admin: { id: "admin-1" },
  }, res, assert.fail);
  assert.equal(res.statusCode, 201);
  assert.equal(inserted.invited_email, "bia@example.com");
  assert.equal(inserted.status, "invited");
  assert.equal(inserted.invited_by, "admin-1");
  assert.equal(inserted.user_id, null);
});

test("admin cannot overwrite an active premium authorization with a new invitation", async () => {
  const clientRow = { id: "client-3", name: "Clara", email: "clara@example.com", user_id: "user-3" };
  const active = { id: "access-3", client_id: "client-3", user_id: "user-3", status: "active" };
  let writeCalled = false;
  const client = {
    from(table) {
      if (table === "clients") return singleRowQuery(clientRow);
      if (table !== "premium_access") throw new Error(`unexpected table ${table}`);
      return {
        select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: active, error: null }) }) }),
        update: () => { writeCalled = true; throw new Error("must not update"); },
        insert: () => { writeCalled = true; throw new Error("must not insert"); },
      };
    },
  };
  const res = response();
  await createInviteClientPremiumAccess(() => client)({
    params: { id: "client-3" }, body: { email: "other@example.com" }, admin: { id: "admin-1" },
  }, res, assert.fail);
  assert.equal(res.statusCode, 409);
  assert.equal(writeCalled, false);
});

test("admin cannot activate premium before an authenticated account is linked", async () => {
  const access = { id: "access-4", client_id: "client-4", user_id: null, status: "invited", activated_at: null };
  let updateCalled = false;
  const client = {
    from(table) {
      assert.equal(table, "premium_access");
      return {
        select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: access, error: null }) }) }),
        update: () => { updateCalled = true; throw new Error("must not update"); },
      };
    },
  };
  const res = response();
  await createUpdatePremiumAccessStatus(() => client)({ params: { id: "access-4" }, body: { status: "active" } }, res, assert.fail);
  assert.equal(res.statusCode, 409);
  assert.equal(updateCalled, false);
});

test("admin suspends an existing premium access", async () => {
  const access = { id: "access-5", client_id: "client-5", user_id: "user-5", status: "active", activated_at: "2026-08-20T10:00:00.000Z" };
  let updates;
  const client = {
    from(table) {
      assert.equal(table, "premium_access");
      return {
        select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: access, error: null }) }) }),
        update(payload) {
          updates = payload;
          return {
            eq: () => ({
              select: () => ({ single: async () => ({ data: { ...access, ...payload }, error: null }) }),
            }),
          };
        },
      };
    },
  };
  const res = response();
  await createUpdatePremiumAccessStatus(() => client)({ params: { id: "access-5" }, body: { status: "suspended" } }, res, assert.fail);
  assert.equal(updates.status, "suspended");
  assert.equal(res.body.status, "suspended");
});
