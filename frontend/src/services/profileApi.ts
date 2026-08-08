import { supabase } from '../lib/supabase'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api'

export type StudentProfile = {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
  birth_date: string | null
  gender: string | null
  height_cm: number | null
  weight_kg: number | null
  goal: string | null
  restrictions: string | null
  injuries: string | null
  experience_level: 'beginner' | 'intermediate' | 'advanced' | null
  role: 'client' | 'admin'
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const { data } = await supabase.auth.getSession()
  if (!data.session) throw new Error('Sessão expirada.')
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.session.access_token}`, ...init?.headers },
  })
  const body = await response.json()
  if (!response.ok) throw new Error(body.error || 'Erro ao consultar o perfil.')
  return body as T
}

export const profileApi = {
  get: () => request<StudentProfile>('/me'),
  update: (profile: Partial<StudentProfile>) => request<StudentProfile>('/me', { method: 'PATCH', body: JSON.stringify(profile) }),
}
