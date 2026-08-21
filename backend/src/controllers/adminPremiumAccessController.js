import { getSupabaseClient } from "../lib/supabase.js";

const ACCESS_FIELDS = "id, client_id, user_id, invited_email, status, invited_by, activated_at, created_at, updated_at";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MUTABLE_STATUSES = new Set(["active", "suspended", "revoked"]);

function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function throwIfError(error) {
  if (error) throw error;
}

async function findClient(supabase, clientId) {
  const { data, error } = await supabase
    .from("clients")
    .select("id, name, email, user_id")
    .eq("id", clientId)
    .maybeSingle();
  throwIfError(error);
  return data;
}

async function findAccessByClient(supabase, clientId) {
  const { data, error } = await supabase
    .from("premium_access")
    .select(ACCESS_FIELDS)
    .eq("client_id", clientId)
    .maybeSingle();
  throwIfError(error);
  return data;
}

export function createGetClientPremiumAccess(getClient = getSupabaseClient) {
  return async function getClientPremiumAccess(req, res, next) {
    try {
      const supabase = getClient();
      const client = await findClient(supabase, req.params.id);
      if (!client) return res.status(404).json({ error: "Cliente não encontrado." });

      const access = await findAccessByClient(supabase, client.id);
      return res.json({
        client: { id: client.id, name: client.name, email: client.email },
        access: access || null,
      });
    } catch (error) {
      error.stage = "admin_premium_access";
      next(error);
    }
  };
}

export function createInviteClientPremiumAccess(getClient = getSupabaseClient) {
  return async function inviteClientPremiumAccess(req, res, next) {
    try {
      const invitedEmail = normalizeEmail(req.body?.email);
      if (!EMAIL_PATTERN.test(invitedEmail)) {
        return res.status(400).json({ error: "Informe um e-mail válido para liberar o Premium." });
      }

      const supabase = getClient();
      const client = await findClient(supabase, req.params.id);
      if (!client) return res.status(404).json({ error: "Cliente não encontrado." });

      const existing = await findAccessByClient(supabase, client.id);
      if (existing?.status === "active") {
        return res.status(409).json({ error: "Esta cliente já possui acesso Premium ativo." });
      }

      const payload = {
        client_id: client.id,
        user_id: null,
        invited_email: invitedEmail,
        status: "invited",
        invited_by: req.admin.id,
        activated_at: null,
      };

      let query;
      let statusCode = 201;
      if (existing) {
        statusCode = 200;
        query = supabase.from("premium_access").update(payload).eq("id", existing.id);
      } else {
        query = supabase.from("premium_access").insert(payload);
      }

      const { data, error } = await query.select(ACCESS_FIELDS).single();
      throwIfError(error);
      return res.status(statusCode).json(data);
    } catch (error) {
      error.stage = "admin_premium_access";
      next(error);
    }
  };
}

export function createUpdatePremiumAccessStatus(getClient = getSupabaseClient) {
  return async function updatePremiumAccessStatus(req, res, next) {
    try {
      const status = typeof req.body?.status === "string" ? req.body.status.trim().toLowerCase() : "";
      if (!MUTABLE_STATUSES.has(status)) {
        return res.status(400).json({ error: "Status Premium inválido." });
      }

      const supabase = getClient();
      const { data: existing, error: existingError } = await supabase
        .from("premium_access")
        .select(ACCESS_FIELDS)
        .eq("id", req.params.id)
        .maybeSingle();
      throwIfError(existingError);
      if (!existing) return res.status(404).json({ error: "Acesso Premium não encontrado." });

      if (status === "active" && !existing.user_id) {
        return res.status(409).json({ error: "O acesso só pode ser reativado após a cliente vincular a conta." });
      }

      const updates = { status };
      if (status === "active" && !existing.activated_at) updates.activated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from("premium_access")
        .update(updates)
        .eq("id", existing.id)
        .select(ACCESS_FIELDS)
        .single();
      throwIfError(error);
      return res.json(data);
    } catch (error) {
      error.stage = "admin_premium_access";
      next(error);
    }
  };
}

export const getClientPremiumAccess = createGetClientPremiumAccess();
export const inviteClientPremiumAccess = createInviteClientPremiumAccess();
export const updatePremiumAccessStatus = createUpdatePremiumAccessStatus();
