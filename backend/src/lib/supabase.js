import { createClient } from "@supabase/supabase-js";

let supabaseClient;

export function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const url = process.env.SUPABASE_URL
    ?.replace(/[\r\n]/g, "")
    .trim();

  const secretKey = process.env.SUPABASE_SECRET_KEY
    ?.replace(/[\r\n]/g, "")
    .trim();

  if (!url || !secretKey) {
    throw new Error(
      "Supabase não configurado: defina SUPABASE_URL e SUPABASE_SECRET_KEY."
    );
  }

  console.log("SUPABASE_URL configurada:", url);
  console.log(
    "SUPABASE_SECRET_KEY prefixo:",
    secretKey.substring(0, 15)
  );

  supabaseClient = createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  return supabaseClient;
}