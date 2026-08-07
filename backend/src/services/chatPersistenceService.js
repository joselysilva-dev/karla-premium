import { createHash, randomUUID } from "node:crypto";
import { getSupabaseClient } from "../lib/supabase.js";

const MEMORY_LIMIT = 20;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function hashVisitorId(visitorId) {
  return createHash("sha256").update(visitorId).digest("hex");
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
  contact = {},
}) {
  const supabase = getSupabaseClient();
  const normalizedVisitorId = normalizeVisitorId(visitorId);
  const visitorIdHash = hashVisitorId(normalizedVisitorId);

  let { data: client, error: clientError } = await supabase
    .from("clients")
    .select("id, name, email, phone, is_active")
    .eq("visitor_id_hash", visitorIdHash)
    .maybeSingle();

  if (clientError) throw clientError;

  if (!client) {
    const { data, error } = await supabase
      .from("clients")
      .insert({
        visitor_id_hash: visitorIdHash,
        name: contact.name?.trim().slice(0, 120) || "Visitante do site",
        email: contact.email?.trim().slice(0, 254) || null,
        phone: contact.phone?.trim().slice(0, 40) || null,
        last_contact_at: new Date().toISOString(),
      })
      .select("id, name, email, phone, is_active")
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
      .eq("visitor_id_hash", visitorIdHash)
      .maybeSingle();
    if (error) throw error;
    conversation = data;
  }

  if (!conversation || conversation.status !== "active") {
    const { data, error } = await supabase
      .from("conversations")
      .insert({
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
