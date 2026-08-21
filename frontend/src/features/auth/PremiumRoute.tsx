import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { accessApi, type PremiumAccess } from '../../services/accessApi'
import { PremiumAccessPending } from './PremiumAccessPending'

export function PremiumRoute() {
  const { loading: authLoading, session } = useAuth()
  const location = useLocation()
  const [access, setAccess] = useState<PremiumAccess | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    if (!session) {
      setAccess(null)
      setLoading(false)
      return () => { active = false }
    }

    setLoading(true)
    setError('')
    void accessApi.get()
      .then((result) => { if (active) setAccess(result) })
      .catch((reason: Error) => { if (active) setError(reason.message) })
      .finally(() => { if (active) setLoading(false) })

    return () => { active = false }
  }, [session])

  if (authLoading || loading) {
    return <main className="auth-page"><p className="auth-loading">Validando acesso Premium…</p></main>
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (error) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <header><small>Karla Premium</small><h1>Não foi possível validar seu acesso</h1><p>{error}</p></header>
          <button className="auth-primary" type="button" onClick={() => window.location.reload()}>Tentar novamente</button>
        </section>
      </main>
    )
  }

  if (access?.admin) return <Navigate to="/admin" replace />
  if (!access?.premium) return <PremiumAccessPending status={access?.status || 'not_authorized'} />

  return <Outlet />
}
