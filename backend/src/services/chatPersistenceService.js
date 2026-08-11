import { createHash, randomUUID } from "node:crypto";
import { getSupabaseClient } from "../lib/supabase.js";

const MEMORY_LIMIT = 20;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function hashVisitorId(visitorId) {
  return createHash("sha256").update(visitorId).digest("hex");
}

function requireVisitorId(visitorId) {
  if (!validVisitorId(visitorId)) {
    const error = new Error("Identificador de visitante inválido.");
    error.status = 400;
    error.safeMessage = error.message;
    throw error;
  }
  return hashVisitorId(visitorId);
}

function validVisitorId(value) {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

function validUuid(value) {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

export function normalizeVisitorId(value) {
  return validVisitorId(value) ? value : randomUUID();
}

export async function getOrCreateChatContext({
  visitorId,
  conversationId,
  userId,
  contact = {},
}) {
  const supabase = getSupabaseClient();
  const normalizedVisitorId = normalizeVisitorId(visitorId);
  const visitorIdHash = hashVisitorId(normalizedVisitorId);

  let clientQuery = supabase
    .from("clients")
    .select("id, name, email, phone, is_active, user_id");
  clientQuery = userId
    ? clientQuery.eq("user_id", userId)
    : clientQuery.eq("visitor_id_hash", visitorIdHash);
  let { data: client, error: clientError } = await clientQuery.maybeSingle();

  if (clientError) throw clientError;

  if (!client && userId) {
    const { data: visitorClient, error: visitorError } = await supabase
      .from("clients")
      .select("id")
      .eq("visitor_id_hash", visitorIdHash)
      .maybeSingle();
    if (visitorError) throw visitorError;
    if (visitorClient) {
      const { error: claimError } = await supabase.rpc("claim_visitor_client", {
        target_user_id: userId,
        target_visitor_hash: visitorIdHash,
      });
      if (claimError) throw claimError;
      const { data, error } = await supabase.from("clients")
        .select("id, name, email, phone, is_active, user_id")
        .eq("user_id", userId).maybeSingle();
      if (error) throw error;
      client = data;
    }
  }

  if (!client) {
    const { data, error } = await supabase
      .from("clients")
      .insert({
        user_id: userId || null,
        visitor_id_hash: visitorIdHash,
        name: contact.name?.trim().slice(0, 120) || "Visitante do site",
        email: contact.email?.trim().slice(0, 254) || null,
        phone: contact.phone?.trim().slice(0, 40) || null,
        last_contact_at: new Date().toISOString(),
      })
      .select("id, name, email, phone, is_active, user_id")
      .single();
    if (error) throw error;
    client = data;
  }

  if (!client.is_active) {
    const error = new Error("Este atendimento está inativo.");
    error.status = 403;
    error.safeMessage = error.message;
    throw error;
  }

  let conversation = null;
  if (validUuid(conversationId)) {
    const { data, error } = await supabase
      .from("conversations")
      .select("id, status")
      .eq("id", conversationId)
      .eq("client_id", client.id)
      .eq(userId ? "user_id" : "visitor_id_hash", userId || visitorIdHash)
      .maybeSingle();
    if (error) throw error;
    conversation = data;
  }

  if (!conversation || conversation.status !== "active") {
    const { data, error } = await supabase
      .from("conversations")
      .insert({
        user_id: userId || null,
        client_id: client.id,
        visitor_id_hash: visitorIdHash,
        title: "Conversa pelo site",
      })
      .select("id, status")
      .single();
    if (error) throw error;
    conversation = data;
  }

  return { supabase, visitorId: normalizedVisitorId, client, conversation };
}

export async function loadRecentHistory(supabase, conversationId) {
  const { data, error } = await supabase
    .from("messages")
    .select("role, content, created_at")
    .eq("conversation_id", conversationId)
    .in("role", ["user", "assistant"])
    .order("created_at", { ascending: false })
    .limit(MEMORY_LIMIT);

  if (error) throw error;

  return [...(data || [])].reverse().map(({ role, content }) => ({
    role,
    content,
  }));
}

export async function saveChatMessage(supabase, conversationId, role, content) {
  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    role,
    content,
  });
  if (error) throw error;
}

export async function touchClient(supabase, clientId) {
  const { error } = await supabase
    .from("clients")
    .update({ last_contact_at: new Date().toISOString() })
    .eq("id", clientId);
  if (error) throw error;
}

export async function loadProfileMemory(userId) {
  if (!userId) return null;
  const { data, error } = await getSupabaseClient().from("profiles")
    .select("full_name, goal, height_cm, weight_kg, restrictions, injuries, experience_level")
    .eq("id", userId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function listVisitorConversations(visitorId) {
  const visitorIdHash = requireVisitorId(visitorId);
  const { data, error } = await getSupabaseClient()
    .from("conversations")
    .select("id, client_id, title, status, created_at, updated_at")
    .eq("visitor_id_hash", visitorIdHash)
    .order("updated_at", { ascending: false })
    .limit(50);

  if (error) throw error;
  return data || [];
}

export async function getVisitorConversationHistory(visitorId, conversationId) {
  const visitorIdHash = requireVisitorId(visitorId);
  if (!validUuid(conversationId)) {
    const error = new Error("Identificador de conversa inválido.");
    error.status = 400;
    error.safeMessage = error.message;
    throw error;
  }

  const supabase = getSupabaseClient();
  const { data: conversation, error: conversationError } = await supabase
    .from("conversations")
    .select("id")
    .eq("id", conversationId)
    .eq("visitor_id_hash", visitorIdHash)
    .maybeSingle();

  if (conversationError) throw conversationError;
  if (!conversation) {
    const error = new Error("Conversa não encontrada.");
    error.status = 404;
    error.safeMessage = error.message;
    throw error;
  }

  const { data, error } = await supabase
    .from("messages")
    .select("role, content, created_at")
    .eq("conversation_id", conversationId)
    .in("role", ["user", "assistant"])
    .order("created_at", { ascending: true })
    .limit(500);

  if (error) throw error;
  return (data || []).map(({ role, content, created_at }) => ({
    role,
    conteudo: content,
    created_at,
  }));
}
