import {
  getSupabaseClient,
  getSupabaseConfig,
} from "../lib/supabase.js";

const HEALTH_CHECK_TABLE = "site_settings";

function causeDetails(cause) {
  if (!cause) return null;

  return {
    name: cause.name ?? null,
    message: cause.message ?? null,
    code: cause.code ?? null,
    errno: cause.errno ?? null,
    syscall: cause.syscall ?? null,
    hostname: cause.hostname ?? null,
  };
}

function logFetchException(error) {
  console.error("Exceção no fetch direto da Data API:", {
    name: error?.name ?? null,
    message: error?.message ?? null,
    cause: causeDetails(error?.cause),
    causeCode: error?.cause?.code ?? null,
    causeErrno: error?.cause?.errno ?? null,
    causeSyscall: error?.cause?.syscall ?? null,
    causeHostname: error?.cause?.hostname ?? null,
    stack: error?.stack ?? null,
  });
  console.dir(error, { depth: 5 });
}

async function runDirectDataApiCheck() {
  const { url, secretKey } = getSupabaseConfig();
  const baseUrl = `${url}/rest/v1/${HEALTH_CHECK_TABLE}`;

  console.log("Fetch direto da Data API:", { baseUrl });

  try {
    const response = await fetch(`${baseUrl}?select=id&limit=1`, {
      method: "GET",
      headers: {
        apikey: secretKey,
        Accept: "application/json",
      },
    });
    const body = (await response.text()).slice(0, 500);
    const result = {
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get("content-type"),
      body,
    };

    console.log("Resposta do fetch direto da Data API:", result);
    return { ok: response.ok, ...result };
  } catch (error) {
    logFetchException(error);
    return { ok: false, fetchError: true };
  }
}

async function runSupabaseJsCheck(getClient) {
  const client = getClient();

  console.log("Cliente supabase-js:", {
    constructorName: client?.constructor?.name ?? null,
    hasFrom: typeof client?.from === "function",
    hasRestClient: Boolean(client?.rest),
  });

  const query = client
    .from(HEALTH_CHECK_TABLE)
    .select("id");
  const result = await (
    typeof query.limit === "function" ? query.limit(1) : query
  );

  console.log("Resposta do supabase-js:", {
    status: result.status,
    statusText: result.statusText,
    error: result.error,
    dataLength: Array.isArray(result.data) ? result.data.length : null,
  });

  return result;
}

export function createDatabaseHealthController(
  getClient = getSupabaseClient
) {
  return async function databaseHealthController(req, res) {
    try {
      const directResult =
        getClient === getSupabaseClient
          ? await runDirectDataApiCheck()
          : { ok: true };
      const sdkResult = await runSupabaseJsCheck(getClient);

      if (!directResult.ok || sdkResult.error) {
        if (sdkResult.error?.code === "PGRST205" || sdkResult.error?.code === "42P01") {
          return res.status(503).json({
            status: "error",
            database: "unavailable",
            error: "A tabela public.site_settings não existe. Aplique a migration do Supabase.",
            code: sdkResult.error.code,
          });
        }

        if (sdkResult.error?.code === "42501") {
          return res.status(503).json({
            status: "error",
            database: "unavailable",
            error: "O papel service_role não possui acesso à tabela public.site_settings. Aplique a migration de permissões do Supabase.",
            code: sdkResult.error.code,
          });
        }

        return res.status(503).json({
          status: "error",
          database: "unavailable",
        });
      }

      return res.status(200).json({
        status: "ok",
        database: "connected",
      });
    } catch (error) {
      console.error("Exceção no health check via supabase-js:", {
        name: error?.name ?? null,
        message: error?.message ?? null,
        cause: causeDetails(error?.cause),
        stack: error?.stack ?? null,
      });
      console.dir(error, { depth: 5 });

      return res.status(503).json({
        status: "error",
        database: "unavailable",
      });
    }
  };
}

export const databaseHealthController = createDatabaseHealthController();
