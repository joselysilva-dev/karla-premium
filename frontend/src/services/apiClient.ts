import { supabase } from '../lib/supabase'

const configuredUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, '')
const developmentUrl = import.meta.env.DEV ? 'http://localhost:3001/api' : ''
export const API_URL = configuredUrl || developmentUrl
if (!API_URL) {
  throw new Error('Configuração inválida: defina VITE_API_URL.')
}
if (!API_URL.endsWith('/api')) {
  throw new Error('VITE_API_URL deve terminar em /api e não pode conter uma rota específica.')
}

export async function apiRequest<T>(path: string, init: RequestInit = {}, authenticated = true): Promise<T> {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw new Error('Não foi possível recuperar a sessão.')
  if (authenticated && !data.session) throw new Error('Sessão expirada.')
  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(data.session ? { Authorization: `Bearer ${data.session.access_token}` } : {}),
        ...init.headers,
      },
    })
  } catch {
    throw new Error('Não foi possível conectar ao serviço.')
  }
  const body = await response.json().catch(() => null) as ({ error?: string } & T) | null
  if (!response.ok) throw new Error(body?.error || `Falha na requisição (${response.status}).`)
  return body as T
}
