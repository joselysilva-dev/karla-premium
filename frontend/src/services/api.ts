import { supabase } from '../lib/supabase'

const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3001/api'

console.log('API usada pelo chat:', API_URL)

const VISITOR_KEY = 'karla-premium-visitor-id'
const CONVERSATION_KEY = 'karla-premium-conversation-id'

export type PersistedChatMessage = {
  role: 'user' | 'assistant'
  conteudo: string
  created_at: string
}

type ConversationSummary = {
  id: string
  updated_at: string
}

export async function sendMessage(
  message: string,
): Promise<string> {
  const { data: authData } = await supabase.auth.getSession()
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(authData.session ? { Authorization: `Bearer ${authData.session.access_token}` } : {}),
    },
    body: JSON.stringify({
      message,
      visitorId: localStorage.getItem(VISITOR_KEY) ?? undefined,
      conversationId: localStorage.getItem(CONVERSATION_KEY) ?? undefined,
    }),
  })

  const data: {
    success?: boolean
    response?: string
    error?: string
    visitorId?: string
    conversationId?: string
  } = await response.json()

  if (!response.ok) {
    throw new Error(
      data.error || 'Erro ao consultar a IA.'
    )
  }

  if (
    data.success !== true ||
    typeof data.response !== 'string' ||
    !data.response.trim()
  ) {
    throw new Error('Resposta incompleta da API.')
  }

  if (typeof data.visitorId === 'string') {
    localStorage.setItem(VISITOR_KEY, data.visitorId)
  }
  if (typeof data.conversationId === 'string') {
    localStorage.setItem(CONVERSATION_KEY, data.conversationId)
  }

  return data.response
}

export async function loadLatestChatHistory(): Promise<PersistedChatMessage[]> {
  const visitorId = localStorage.getItem(VISITOR_KEY)
  if (!visitorId) return []

  const headers = { 'X-Visitor-ID': visitorId }
  const conversationsResponse = await fetch(`${API_URL}/chat/conversations`, { headers })
  if (!conversationsResponse.ok) throw new Error('Erro ao carregar conversas.')

  const conversations = await conversationsResponse.json() as ConversationSummary[]
  const latest = conversations[0]
  if (!latest) return []

  localStorage.setItem(CONVERSATION_KEY, latest.id)
  const historyResponse = await fetch(`${API_URL}/chat/history/${encodeURIComponent(latest.id)}`, { headers })
  if (!historyResponse.ok) throw new Error('Erro ao carregar o histórico da conversa.')

  return await historyResponse.json() as PersistedChatMessage[]
}
