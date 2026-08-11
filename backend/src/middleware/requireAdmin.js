import { getSupabaseClient } from "../lib/supabase.js";
import { authenticateToken, getBearerToken } from "./requireAuth.js";

export function createRequireAdmin(getClient = getSupabaseClient) {
  return async function requireAdmin(req, res, next) {
    try {
      const user = await authenticateToken(
        getBearerToken(req.headers.authorization),
        getClient
      );
      if (!user) return res.status(401).json({ error: "Sessão inválida ou expirada." });
      if (user.profile.role !== "admin") {
        return res.status(403).json({ error: "Acesso restrito a administradores." });
      }
      req.user = user;
      req.admin = user;
      next();
    } catch (error) {
      error.stage = "admin_auth";
      next(error);
    }
  };
}

export const requireAdmin = createRequireAdmin();

export function createRequireAdminAal2(getClient = getSupabaseClient) {
  const requireRole = createRequireAdmin(getClient);
  return async function requireAdminAal2(req, res, next) {
    await requireRole(req, res, () => {
      if (req.admin.aal !== "aal2") {
        res.status(403).json({ error: "Autenticação multifator obrigatória para esta ação." });
        return;
      }
      next();
    });
  };
}

export const requireAdminAal2 = createRequireAdminAal2();