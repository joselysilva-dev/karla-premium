import { getSupabaseClient } from "../lib/supabase.js";

export function createDatabaseHealthController() {
  return async function databaseHealthController(req, res) {
    console.log("=== DATABASE HEALTH ===");

    try {
      const client = getSupabaseClient();

      console.log("CLIENT CREATED");

      const { error } = await client
        .from("site_settings")
        .select("id", { head: true, count: "exact" });

      console.log("QUERY ERROR:", error);

      if (error) {
        throw error;
      }

      return res.json({
        status: "ok",
        database: "connected",
      });

    } catch (err) {
      console.error("ERRO COMPLETO:");
      console.error(err);
      console.error("NAME:", err?.name);
      console.error("MESSAGE:", err?.message);
      console.error("STACK:", err?.stack);

      return res.status(503).json({
        status: "error",
        database: "unavailable",
      });
    }
  };
}