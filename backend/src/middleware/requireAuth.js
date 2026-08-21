import { getSupabaseClient } from "../lib/supabase.js";

export function getBearerToken(header = "") {
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

export async function authenticateToken(token, getClient = getSupabaseClient) {
  if (!token) return null;
  const supabase = getClient();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, email, role")
    .eq("id", data.user.id)
    .maybeSingle();
  if (profileError) throw profileError;
  if (!profile) return null;

  let aal = "aal1";
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
    if (payload.aal === "aal2") aal = "aal2";
  } catch {
    // getUser already validated the token; malformed claims fall back to AAL1.
  }

  return {
    id: data.user.id,
    email: data.user.email,
    emailConfirmed: Boolean(data.user.email_confirmed_at),
    profile,
    aal,
  };
}

export function createRequireAuth(getClient = getSupabaseClient) {
  return async function requireAuth(req, res, next) {
    try {
      const user = await authenticateToken(
        getBearerToken(req.headers.authorization),
        getClient
      );
      if (!user) return res.status(401).json({ error: "Sessão inválida ou expirada." });
      req.user = user;
      next();
    } catch (error) {
      error.stage = "auth";
      next(error);
    }
  };
}

export function createOptionalAuth(getClient = getSupabaseClient) {
  return async function optionalAuth(req, res, next) {
    const token = getBearerToken(req.headers.authorization);
    if (!token) return next();
    try {
      const user = await authenticateToken(token, getClient);
      if (!user) return res.status(401).json({ error: "Sessão inválida ou expirada." });
      req.user = user;
      next();
    } catch (error) { next(error); }
  };
}

export const requireAuth = createRequireAuth();
export const optionalAuth = createOptionalAuth();
