import { Activity, Apple, BarChart3, Bot, ClipboardList, Dumbbell, FileText, Image, LogOut, Menu, MessageSquareText, Settings, Users, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import { adminApi } from '../../services/adminApi'
import { AdminDashboard } from './AdminDashboard'
import { AdminMfa } from './AdminMfa'
import './admin.css'

export type AdminSection = 'dashboard' | 'students' | 'workouts' | 'assessments' | 'progress' | 'nutrition' | 'feedbacks' | 'transformations' | 'content' | 'ai' | 'settings'
const items: Array<{ id: AdminSection; label: string; icon: typeof BarChart3; path: string }> = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/admin' }, { id: 'students', label: 'Alunos', icon: Users, path: '/admin/alunos' }, { id: 'workouts', label: 'Treinos', icon: Dumbbell, path: '/admin/treinos' }, { id: 'assessments', label: 'Avaliações', icon: ClipboardList, path: '/admin/avaliacoes' }, { id: 'progress', label: 'Evolução', icon: Activity, path: '/admin/evolucao' }, { id: 'nutrition', label: 'Alimentação', icon: Apple, path: '/admin/alimentacao' }, { id: 'feedbacks', label: 'Feedbacks', icon: MessageSquareText, path: '/admin/feedbacks' }, { id: 'transformations', label: 'Transformações', icon: Image, path: '/admin/transformacoes' }, { id: 'content', label: 'Conteúdo do site', icon: FileText, path: '/admin/conteudo' }, { id: 'ai', label: 'IA da Karla', icon: Bot, path: '/admin/ia' }, { id: 'settings', label: 'Configurações', icon: Settings, path: '/admin/configuracoes' },
]
function currentSection(pathname: string): AdminSection { return items.find((item) => item.path !== '/admin' && pathname.startsWith(item.path))?.id || 'dashboard' }

export default function AdminApp() {
  const { session, signOut } = useAuth(); const navigate = useNavigate(); const location = useLocation(); const [authorized, setAuthorized] = useState(false); const [aal2, setAal2] = useState(false); const [loading, setLoading] = useState(true); const [drawer, setDrawer] = useState(false); const section = currentSection(location.pathname)
  async function validateAccess() { if (!session) return; setLoading(true); try { await adminApi.me(); setAuthorized(true); const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel(); if (error) throw error; setAal2(data.currentLevel === 'aal2') } catch { setAuthorized(false); navigate('/minha-conta', { replace: true }) } finally { setLoading(false) } }
  useEffect(() => {
    let active = true
    if (!session) return () => { active = false }
    void adminApi.me().then(async () => {
      const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
      if (error) throw error
      if (active) { setAuthorized(true); setAal2(data.currentLevel === 'aal2'); setLoading(false) }
    }).catch(() => { if (active) { setAuthorized(false); setLoading(false); navigate('/minha-conta', { replace: true }) } })
    return () => { active = false }
  }, [navigate, session])
  async function logout() { await signOut(); navigate('/login', { replace: true }) }
  if (loading) return <div className="admin-loading"><div className="admin-skeleton"><i /><i /><i /></div><p>Validando acesso seguro…</p></div>
  if (!authorized) return null
  if (!aal2) return <main className="admin-mfa-page"><Link className="admin-brand" to="/">Karla <span>Premium</span></Link><AdminMfa required onVerified={() => void validateAccess()} /></main>
  return <div className="admin-shell"><aside className={`admin-sidebar${drawer ? ' open' : ''}`}><div className="admin-sidebar-head"><Link className="admin-brand" to="/">Karla <span>Premium</span></Link><button onClick={() => setDrawer(false)} aria-label="Fechar menu"><X /></button></div><nav aria-label="Administração">{items.map(({ id, label, icon: Icon, path }) => <Link key={id} className={section === id ? 'active' : ''} to={path} onClick={() => setDrawer(false)}><Icon />{label}</Link>)}</nav><button className="admin-signout" onClick={() => void logout()}><LogOut />Sair</button></aside>{drawer && <button className="admin-backdrop" onClick={() => setDrawer(false)} aria-label="Fechar menu" />}
    <div className="admin-content"><header className="admin-topbar"><button onClick={() => setDrawer(true)} aria-label="Abrir menu"><Menu /></button><div><small>Painel administrativo</small><strong>{session?.user.email}</strong></div></header><main><AdminDashboard section={section} /></main></div></div>
}