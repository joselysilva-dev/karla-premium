import type { Session } from '@supabase/supabase-js'
import { BarChart3, LogOut, MessageSquareText, Settings, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { adminApi } from '../../services/adminApi'
import { AdminDashboard } from './AdminDashboard'
import { AdminLogin } from './AdminLogin'
import './admin.css'

export type AdminSection = 'dashboard' | 'clients' | 'conversations' | 'settings'

function routeState() {
  const parts = window.location.pathname.split('/').filter(Boolean)
  if (parts[1] === 'clientes') return { section: 'clients' as const, clientId: parts[2] || null }
  if (parts[1] === 'conversas') return { section: 'conversations' as const, clientId: null }
  if (parts[1] === 'configuracoes') return { section: 'settings' as const, clientId: null }
  return { section: 'dashboard' as const, clientId: null }
}

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [recovery, setRecovery] = useState(false)
  const initialRoute = routeState()
  const [section, setSection] = useState<AdminSection>(initialRoute.section)
  const [clientId, setClientId] = useState<string | null>(initialRoute.clientId)

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession)
      setRecovery(event === 'PASSWORD_RECOVERY')
      setAuthorized(false)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session || recovery) return
    void adminApi.me()
      .then(() => setAuthorized(true))
      .catch(() => void supabase.auth.signOut())
      .finally(() => setLoading(false))
  }, [session, recovery])

  if (loading) return <div className="admin-loading">Verificando sessão…</div>
  if (!session || recovery) return <AdminLogin recovery={recovery} />
  if (!authorized) return <div className="admin-loading">Validando acesso…</div>

  const items: Array<[AdminSection, string, typeof BarChart3]> = [
    ['dashboard', 'Visão geral', BarChart3],
    ['clients', 'Clientes', Users],
    ['conversations', 'Conversas', MessageSquareText],
    ['settings', 'Configurações', Settings],
  ]

  function navigate(next: AdminSection) {
    const paths: Record<AdminSection, string> = { dashboard: '/admin', clients: '/admin/clientes', conversations: '/admin/conversas', settings: '/admin/configuracoes' }
    window.history.pushState({}, '', paths[next])
    setClientId(null)
    setSection(next)
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/">Karla <span>Premium</span></a>
        <nav aria-label="Administração">
          {items.map(([id, label, Icon]) => (
            <button key={id} className={section === id ? 'active' : ''} onClick={() => navigate(id)}>
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>
        <button className="admin-signout" onClick={() => void supabase.auth.signOut()}>
          <LogOut size={18} /> Sair
        </button>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <div><small>Painel administrativo</small><strong>{session.user.email}</strong></div>
        </header>
        <AdminDashboard section={section} initialClientId={clientId} />
      </main>
    </div>
  )
}
