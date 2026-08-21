import { getSupabaseClient } from "../lib/supabase.js";

const ACCESS_FIELDS = "id, client_id, user_id, invited_email, status, activated_at, created_at, updated_at";

function responseFor(access, admin = false) {
  if (admin) {
    return {
      authenticated: true,
      premium: false,
      admin: true,
      status: "admin",
      clientId: null,
    };
  }

  return {
    authenticated: true,
    premium: access?.status === "active",
    admin: false,
    status: access?.status || "not_authorized",
    clientId: access?.client_id || null,
  };
}

export function createGetPremiumAccess(getClient = getSupabaseClient) {
  return async function getPremiumAccess(req, res, next) {
    try {
      if (req.user.profile.role === "admin") {
        return res.json(responseFor(null, true));
      }

      const supabase = getClient();
      const { data: existing, error: existingError } = await supabase
        .from("premium_access")
        .select(ACCESS_FIELDS)
        .eq("user_id", req.user.id)
        .maybeSingle();

      if (existingError) throw existingError;
      if (existing) return res.json(responseFor(existing));

      if (!req.user.email || !req.user.emailConfirmed) {
        return res.json(responseFor({ status: "email_unverified" }));
      }

      const { data: claimed, error: claimError } = await supabase.rpc(
        "claim_premium_access",
        {
          target_user_id: req.user.id,
          target_email: req.user.email,
        }
      );
      if (claimError) throw claimError;

      const access = Array.isArray(claimed) ? claimed[0] : claimed;
      return res.json(responseFor(access || null));
    } catch (error) {
      error.stage = "premium_access";
      next(error);
    }
  };
}

export const getPremiumAccess = createGetPremiumAccess();
