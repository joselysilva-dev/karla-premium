import type { ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, session } = useAuth()
  if (loading) return <main className="auth-page"><p>Carregando sessão…</p></main>
  if (!session) { window.location.replace('/login'); return null }
  return children
}
