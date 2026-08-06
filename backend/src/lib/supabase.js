import { createClient } from "@supabase/supabase-js";

let supabaseClient;

export function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const url = process.env.SUPABASE_URL?.replace(/[\r\n]/g, "");
  const key = process.env.SUPABASE_SECRET_KEY?.replace(/[\r\n]/g, "");

  if (!url) {
    throw new Error("SUPABASE_URL não configurada.");
  }

  if (!key) {
    throw new Error("SUPABASE_SECRET_KEY não configurada.");
  }

  supabaseClient = createClient(url, key, {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  // ===== LOGS TEMPORÁRIOS =====
  console.log("URL:", process.env.SUPABASE_URL);
  console.log("KEY EXISTS:", !!process.env.SUPABASE_SECRET_KEY);
  console.log("CLIENT:", typeof supabaseClient);
  // ============================

  return supabaseClient;
}