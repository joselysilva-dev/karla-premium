import { supabase } from '../lib/supabase'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api'

async function adminRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) throw new Error('Sessão administrativa expirada.')

  const response = await fetch(`${API_URL}/admin${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  })
  const body = await response.json()
  if (!response.ok) throw new Error(body.error || 'Falha ao consultar a administração.')
  return body as T
}

export type Client = {
  id: string
  name: string
  email: string | null
  phone: string | null
  notes: string | null
  is_active: boolean
  last_contact_at: string | null
  created_at: string
  profile?: Record<string, string | number | null> | null
}

export type Conversation = {
  id: string
  title: string | null
  status: string
  created_at: string
  updated_at: string
  client: { id: string; name: string; email: string | null } | null
  messages: Array<{ count: number }>
}

export type ConversationDetail = Omit<Conversation, 'messages'> & {
  messages: Array<{ id: string; role: string; content: string; created_at: string }>
}

export const adminApi = {
  me: () => adminRequest<{ id: string; email: string; fullName: string | null; role: 'admin' }>('/me'),
  dashboard: () => adminRequest<{ counts: { clients: number; conversations: number; messages: number }; recentContacts: Client[]; api: string; database: string }>('/dashboard'),
  clients: (search = '') => adminRequest<{ data: Client[]; pagination: { total: number } }>(`/clients?limit=50&search=${encodeURIComponent(search)}`),
  client: (id: string) => adminRequest<Client>(`/clients/${id}`),
  updateClient: (id: string, values: Partial<Client>) => adminRequest<Client>(`/clients/${id}`, { method: 'PATCH', body: JSON.stringify(values) }),
  conversations: (clientId = '') => adminRequest<{ data: Conversation[]; pagination: { total: number } }>(`/conversations?limit=50${clientId ? `&clientId=${encodeURIComponent(clientId)}` : ''}`),
  conversation: (id: string) => adminRequest<ConversationDetail>(`/conversations/${id}`),
  settings: () => adminRequest<{ data: Array<{ id: string; value: Record<string, unknown>; is_public: boolean; updated_at: string }> }>('/settings'),
  saveSettings: (settings: Array<{ id: string; value: Record<string, unknown>; is_public: boolean }>) => adminRequest('/settings', { method: 'PATCH', body: JSON.stringify({ settings }) }),
}
