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

test("database health clearly reports a missing site_settings table", async () => {
  const missingTableError = Object.assign(
    new Error("Could not find the table 'public.site_settings' in the schema cache"),
    {
      code: "PGRST205",
      details: null,
      hint: "Apply the database migration",
    }
  );
  const getClient = () => ({
    from: () => ({
      select: async () => ({ error: missingTableError }),
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
    error: "A tabela public.site_settings não existe. Aplique a migration do Supabase.",
    code: "PGRST205",
  });
});

test("database health clearly reports missing service_role permission", async () => {
  const permissionError = Object.assign(
    new Error("permission denied for table site_settings"),
    { code: "42501", details: null, hint: null }
  );
  const getClient = () => ({
    from: () => ({
      select: async () => ({ error: permissionError }),
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
    error: "O papel service_role não possui acesso à tabela public.site_settings. Aplique a migration de permissões do Supabase.",
    code: "42501",
  });
});
