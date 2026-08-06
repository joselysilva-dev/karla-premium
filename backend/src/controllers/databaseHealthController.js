import { getSupabaseClient } from "../lib/supabase.js";

const HEALTH_CHECK_TABLE = "site_settings";

function isMissingTableError(error) {
  return error?.code === "42P01" || error?.code === "PGRST205";
}

function isPermissionError(error) {
  return error?.code === "42501";
}

function serializeError(error) {
  try {
    return JSON.stringify(error);
  } catch (serializationError) {
    return `[Falha ao serializar o erro: ${serializationError.message}]`;
  }
}

function logSupabaseError(error) {
  // Mantém o objeto original para que o logger do Render inspecione propriedades
  // não enumeráveis e a cadeia de causas sem que o controller as substitua.
  console.error("Objeto original retornado pelo Supabase:", error);
  console.error("Diagnóstico completo do health check do Supabase:", {
    constructorName: error?.constructor?.name ?? null,
    instanceofError: error instanceof Error,
    objectKeys:
      error && (typeof error === "object" || typeof error === "function")
        ? Object.keys(error)
        : [],
    json: serializeError(error),
    message: error?.message ?? null,
    stack: error?.stack ?? null,
    cause: error?.cause ?? null,
    details: error?.details ?? null,
    hint: error?.hint ?? null,
    code: error?.code ?? null,
    status: error?.status ?? error?.statusCode ?? null,
  });
}

export function createDatabaseHealthController(
  getClient = getSupabaseClient
) {
  return async function databaseHealthController(req, res) {
    let errorLogged = false;

    try {
      const client = getClient();

      console.log("Cliente Supabase do health check:", {
        constructorName: client?.constructor?.name ?? null,
        hasFrom: typeof client?.from === "function",
        hasRestClient: Boolean(client?.rest),
      });

      const result = await client
        .from(HEALTH_CHECK_TABLE)
        .select("id", { head: true });

      console.log("Resultado do health check do Supabase:", {
        status: result.status,
        statusText: result.statusText,
        error: result.error,
      });

      if (result.error) {
        console.error("Resultado integral antes do throw:", result);
        logSupabaseError(result.error);
        errorLogged = true;
        throw result.error;
      }

      return res.status(200).json({
        status: "ok",
        database: "connected",
      });
    } catch (error) {
      if (!errorLogged) {
        logSupabaseError(error);
      }

      if (isMissingTableError(error)) {
        return res.status(503).json({
          status: "error",
          database: "unavailable",
          error: `A tabela public.${HEALTH_CHECK_TABLE} não existe. Aplique a migration do Supabase.`,
          code: error.code,
        });
      }

      if (isPermissionError(error)) {
        return res.status(503).json({
          status: "error",
          database: "unavailable",
          error: `O papel service_role não possui acesso à tabela public.${HEALTH_CHECK_TABLE}. Aplique a migration de permissões do Supabase.`,
          code: error.code,
        });
      }

      return res.status(503).json({
        status: "error",
        database: "unavailable",
      });
    }
  };
}

export const databaseHealthController = createDatabaseHealthController();
