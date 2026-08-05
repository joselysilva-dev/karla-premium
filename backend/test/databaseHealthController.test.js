import assert from "node:assert/strict";
import test from "node:test";

import { createDatabaseHealthController } from "../src/controllers/databaseHealthController.js";

function createResponse() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

test("database health returns connected when Supabase responds", async () => {
  const getClient = () => ({
    from: () => ({
      select: async () => ({ error: null }),
    }),
  });
  const response = createResponse();

  await createDatabaseHealthController(getClient)({}, response);

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, {
    status: "ok",
    database: "connected",
  });
});

test("database health returns 503 without leaking provider details", async () => {
  const getClient = () => ({
    from: () => ({
      select: async () => ({ error: new Error("provider detail") }),
    }),
  });
  const response = createResponse();
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    await createDatabaseHealthController(getClient)({}, response);
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(response.statusCode, 503);
  assert.deepEqual(response.body, {
    status: "error",
    database: "unavailable",
  });
  assert.doesNotMatch(JSON.stringify(response.body), /provider detail/);
});
