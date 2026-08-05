import { getSupabaseClient } from "../lib/supabase.js";

export function createDatabaseHealthController(
  getClient = getSupabaseClient
) {
  return async function databaseHealthController(req, res) {
    try {
      const { error } = await getClient()
        .from("site_settings")
        .select("id", { count: "exact", head: true });

      if (error) {
        throw error;
      }

      return res.json({
        status: "ok",
        database: "connected",
      });
    } catch (error) {
      console.error("Falha no health check do banco de dados.", {
        name: error?.name || "Error",
        code: error?.code ?? null,
        message: String(error?.message || "Erro sem mensagem.")
          .replace(/[\r\n\t]+/g, " ")
          .slice(0, 300),
      });

      return res.status(503).json({
        status: "error",
        database: "unavailable",
      });
    }
  };
}

export const databaseHealthController = createDatabaseHealthController();
