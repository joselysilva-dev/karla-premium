import { getSupabaseClient } from "../lib/supabase.js";

function bearerToken(header = "") {
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

export function createRequireAdmin(getClient = getSupabaseClient) {
  return async function requireAdminMiddleware(req, res, next) {
  const token = bearerToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ error: "Autenticação obrigatória." });
  }

  try {
    const supabase = getClient();
    const { data: authData, error: authError } =
      await supabase.auth.getUser(token);

    if (authError || !authData.user) {
      return res.status(401).json({ error: "Sessão inválida ou expirada." });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (profileError) throw profileError;

    if (profile?.role !== "admin") {
      return res.status(403).json({ error: "Acesso restrito a administradores." });
    }

    req.admin = {
      id: authData.user.id,
      email: authData.user.email,
      profile,
    };
    next();
  } catch (error) {
    error.stage = "admin_auth";
    next(error);
  }
  };
}

export const requireAdmin = createRequireAdmin();
