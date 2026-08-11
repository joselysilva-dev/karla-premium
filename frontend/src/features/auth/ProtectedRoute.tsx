import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function ProtectedRoute() {
  const { loading, session } = useAuth()
  const location = useLocation()

  if (loading) return <main className="auth-page"><p className="auth-loading">Carregando sessão…</p></main>
  if (!session) return <Navigate to="/login" replace state={{ from: location }} />
  return <Outlet />
}