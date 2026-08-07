import { getSupabaseClient } from "../lib/supabase.js";

function pagination(query) {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, Number.parseInt(query.limit, 10) || 20));
  return { page, limit, from: (page - 1) * limit, to: page * limit - 1 };
}

function throwIfError(error) {
  if (error) throw error;
}

export function getCurrentAdmin(req, res) {
  res.json({
    id: req.admin.id,
    email: req.admin.email,
    fullName: req.admin.profile.full_name,
    role: req.admin.profile.role,
  });
}

export async function getDashboard(req, res, next) {
  try {
    const supabase = getSupabaseClient();
    const [clients, conversations, messages, recent] = await Promise.all([
      supabase.from("clients").select("id", { count: "exact", head: true }),
      supabase.from("conversations").select("id", { count: "exact", head: true }),
      supabase.from("messages").select("id", { count: "exact", head: true }),
      supabase.from("clients").select("id, name, email, phone, last_contact_at, is_active")
        .order("last_contact_at", { ascending: false, nullsFirst: false }).limit(5),
    ]);
    [clients, conversations, messages, recent].forEach(({ error }) => throwIfError(error));

    res.json({
      counts: {
        clients: clients.count || 0,
        conversations: conversations.count || 0,
        messages: messages.count || 0,
      },
      recentContacts: recent.data || [],
      api: "online",
      database: "connected",
    });
  } catch (error) { next(error); }
}

export async function listClients(req, res, next) {
  try {
    const { page, limit, from, to } = pagination(req.query);
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    let query = getSupabaseClient().from("clients")
      .select("id, name, email, phone, notes, is_active, last_contact_at, created_at, updated_at", { count: "exact" })
      .order("last_contact_at", { ascending: false, nullsFirst: false }).range(from, to);
    if (search) query = query.or(`name.ilike.%${search.replace(/[,%()]/g, "")}%,email.ilike.%${search.replace(/[,%()]/g, "")}%,phone.ilike.%${search.replace(/[,%()]/g, "")}%`);
    const { data, error, count } = await query;
    throwIfError(error);
    res.json({ data: data || [], pagination: { page, limit, total: count || 0 } });
  } catch (error) { next(error); }
}

export async function getClient(req, res, next) {
  try {
    const { data, error } = await getSupabaseClient().from("clients")
      .select("id, name, email, phone, notes, is_active, last_contact_at, created_at, updated_at")
      .eq("id", req.params.id).maybeSingle();
    throwIfError(error);
    if (!data) return res.status(404).json({ error: "Cliente não encontrado." });
    res.json(data);
  } catch (error) { next(error); }
}

export async function updateClient(req, res, next) {
  try {
    const allowed = ["name", "email", "phone", "notes", "is_active"];
    const updates = Object.fromEntries(Object.entries(req.body || {}).filter(([key]) => allowed.includes(key)));
    if (!Object.keys(updates).length) return res.status(400).json({ error: "Nenhum campo válido informado." });
    if (typeof updates.name === "string") updates.name = updates.name.trim().slice(0, 120);
    for (const field of ["email", "phone", "notes"]) {
      if (typeof updates[field] === "string") updates[field] = updates[field].trim() || null;
    }
    const { data, error } = await getSupabaseClient().from("clients").update(updates)
      .eq("id", req.params.id).select("id, name, email, phone, notes, is_active, last_contact_at, created_at, updated_at").maybeSingle();
    throwIfError(error);
    if (!data) return res.status(404).json({ error: "Cliente não encontrado." });
    res.json(data);
  } catch (error) { next(error); }
}

export async function listConversations(req, res, next) {
  try {
    const { page, limit, from, to } = pagination(req.query);
    let query = getSupabaseClient().from("conversations")
      .select("id, title, status, created_at, updated_at, client:clients(id, name, email), messages(count)", { count: "exact" })
      .order("updated_at", { ascending: false }).range(from, to);
    if (req.query.clientId) query = query.eq("client_id", req.query.clientId);
    const { data, error, count } = await query;
    throwIfError(error);
    res.json({ data: data || [], pagination: { page, limit, total: count || 0 } });
  } catch (error) { next(error); }
}

export async function getConversation(req, res, next) {
  try {
    const supabase = getSupabaseClient();
    const { data: conversation, error } = await supabase.from("conversations")
      .select("id, title, status, created_at, updated_at, client:clients(id, name, email, phone)")
      .eq("id", req.params.id).maybeSingle();
    throwIfError(error);
    if (!conversation) return res.status(404).json({ error: "Conversa não encontrada." });
    const { data: messages, error: messagesError } = await supabase.from("messages")
      .select("id, role, content, created_at").eq("conversation_id", req.params.id)
      .order("created_at", { ascending: true }).limit(200);
    throwIfError(messagesError);
    res.json({ ...conversation, messages: messages || [] });
  } catch (error) { next(error); }
}

export async function getSettings(req, res, next) {
  try {
    const { data, error } = await getSupabaseClient().from("site_settings")
      .select("id, value, is_public, updated_at").order("id");
    throwIfError(error);
    res.json({ data: data || [] });
  } catch (error) { next(error); }
}

export async function updateSettings(req, res, next) {
  try {
    const settings = Array.isArray(req.body?.settings) ? req.body.settings : [];
    if (!settings.length) return res.status(400).json({ error: "Configurações inválidas." });
    const rows = settings.slice(0, 50).map((item) => ({
      id: String(item.id || "").trim().slice(0, 80),
      value: item.value && typeof item.value === "object" ? item.value : {},
      is_public: Boolean(item.is_public),
      updated_by: req.admin.id,
    })).filter((item) => item.id);
    const { data, error } = await getSupabaseClient().from("site_settings")
      .upsert(rows, { onConflict: "id" }).select("id, value, is_public, updated_at");
    throwIfError(error);
    res.json({ data });
  } catch (error) { next(error); }
}
