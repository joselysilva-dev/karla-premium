import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Activity, Apple, Bot, CalendarDays, ChartNoAxesCombined, Dumbbell, Home, LogOut, Menu, Sparkles, UserRound, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChatPanel } from '../chat/ChatPanel'
import { useAuth } from '../../hooks/useAuth'
import { profileApi, type StudentProfile } from '../../services/profileApi'
import { quoteForDate } from './motivationalQuotes'
import './student.css'

const TRAINING_APP = 'https://play.google.com/store/apps/details?id=br.com.wiki4fit.karlakarolynne'
const resources = [
  { title: 'Meus Treinos', description: 'Seus treinos personalizados no aplicativo oficial da Karla.', icon: Dumbbell, active: true, href: TRAINING_APP },
  { title: 'Avaliações', description: 'Suas avaliações estarão organizadas aqui.', icon: Activity },
  { title: 'Evolução', description: 'Acompanhe sua jornada quando houver registros.', icon: ChartNoAxesCombined },
  { title: 'Alimentação', description: 'Orientações alimentares serão disponibilizadas aqui.', icon: Apple },
  { title: 'IA da Karla', description: 'Converse com a assistente para orientações e apoio.', icon: Bot, route: '/minha-conta/ia' },
  { title: 'Perfil', description: 'Revise seus dados e preferências pessoais.', icon: UserRound, route: '/minha-conta/perfil' },
]

function Avatar({ name, src }: { name: string; src?: string }) {
  return src ? <img className="student-avatar" src={src} alt={`Avatar de ${name}`} referrerPolicy="no-referrer" /> : <span className="student-avatar student-avatar--empty" aria-hidden="true"><UserRound /></span>
}

function EmptyMetric({ label, icon: Icon }: { label: string; icon: typeof Activity }) {
  return <article className="student-metric"><Icon aria-hidden="true" /><span>{label}</span><strong>Sem dados ainda</strong><small>Será atualizado quando houver um registro.</small></article>
}

function Dashboard({ name }: { name: string }) {
  const today = useMemo(() => new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }).format(new Date()), [])
  return <>
    <header className="student-welcome"><div><span className="student-eyebrow">{today}</span><h1>Olá, {name.split(' ')[0]}</h1><p>{quoteForDate()}</p></div><Sparkles aria-hidden="true" /></header>
    <section aria-labelledby="summary-title"><div className="student-section-heading"><div><span>Seu momento</span><h2 id="summary-title">Resumo da jornada</h2></div><p>Informações reais aparecerão conforme seu acompanhamento avançar.</p></div>
      <div className="student-metrics"><EmptyMetric label="Última avaliação" icon={Activity} /><EmptyMetric label="Próxima avaliação" icon={CalendarDays} /><EmptyMetric label="Treino atual" icon={Dumbbell} /><EmptyMetric label="Frequência semanal" icon={ChartNoAxesCombined} /><EmptyMetric label="Evolução" icon={ChartNoAxesCombined} /></div>
    </section>
    <section aria-labelledby="resources-title"><div className="student-section-heading"><div><span>Área da aluna</span><h2 id="resources-title">Tudo para sua evolução</h2></div></div>
      <div className="student-resources">{resources.map(({ title, description, icon: Icon, active, href, route }) => <article className={`student-resource${active ? ' student-resource--featured' : ''}`} key={title}><Icon aria-hidden="true" /><div><h3>{title}</h3><p>{description}</p></div>{href ? <a className="student-action" href={href} target="_blank" rel="noopener noreferrer">Abrir app de treinos</a> : route ? <Link className="student-action student-action--secondary" to={route}>Acessar</Link> : <span className="student-badge">Sem dados ainda</span>}</article>)}</div>
    </section>
    <section className="student-note"><Sparkles aria-hidden="true" /><div><h2>Observações do personal</h2><p>Nenhuma observação disponível no momento.</p></div></section>
  </>
}

function Profile({ fallbackEmail, name, avatar }: { fallbackEmail?: string; name: string; avatar?: string }) {
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const load = () => { setLoading(true); setError(''); void profileApi.get().then(setProfile).catch((e: Error) => setError(e.message)).finally(() => setLoading(false)) }
  useEffect(() => { let active = true; void profileApi.get().then((data) => { if (active) setProfile(data) }).catch((e: Error) => { if (active) setError(e.message) }).finally(() => { if (active) setLoading(false) }); return () => { active = false } }, [])
  const change = (field: keyof StudentProfile, value: string | number | null) => setProfile((current) => current ? { ...current, [field]: value } : current)
  async function save(event: FormEvent) { event.preventDefault(); if (!profile) return; setSaving(true); setNotice(''); setError(''); try { setProfile(await profileApi.update(profile)); setNotice('Perfil atualizado com sucesso.') } catch (e) { setError((e as Error).message) } finally { setSaving(false) } }
  if (loading) return <div className="student-skeleton" aria-label="Carregando perfil"><i /><i /><i /></div>
  if (error && !profile) return <div className="student-feedback error" role="alert"><p>{error}</p><button onClick={load}>Tentar novamente</button></div>
  if (!profile) return null
  return <section><div className="student-section-heading"><div><span>Conta conectada</span><h1>Seu perfil</h1></div><p>Atualize apenas os dados que ajudam no seu acompanhamento.</p></div><div className="student-profile-identity"><Avatar name={name} src={avatar} /><div><strong>{name}</strong><span>{fallbackEmail}</span><small>Avatar fornecido pela sua conta conectada</small></div></div>
    <form className="student-profile-form" onSubmit={save}>
      <label>Nome completo<input value={profile.full_name || ''} onChange={(e) => change('full_name', e.target.value)} autoComplete="name" /></label>
      <label>E-mail<input value={profile.email || fallbackEmail || ''} readOnly aria-describedby="email-help" /><small id="email-help">E-mail da conta autenticada. Alterações exigem confirmação.</small></label>
      <label>Telefone<input value={profile.phone || ''} onChange={(e) => change('phone', e.target.value)} autoComplete="tel" /></label>
      <label>Data de nascimento<input type="date" value={profile.birth_date || ''} onChange={(e) => change('birth_date', e.target.value || null)} /></label>
      <label className="student-field-wide">Objetivo<textarea rows={3} value={profile.goal || ''} onChange={(e) => change('goal', e.target.value)} /></label>
      <label className="student-field-wide">Restrições ou observações pessoais<textarea rows={3} value={profile.restrictions || ''} onChange={(e) => change('restrictions', e.target.value)} /></label>
      {error && <p className="student-feedback error student-field-wide" role="alert">{error}</p>}{notice && <p className="student-feedback success student-field-wide" role="status">{notice}</p>}
      <button className="student-primary" disabled={saving}>{saving ? 'Salvando…' : 'Salvar perfil'}</button>
    </form>
  </section>
}

export function StudentApp() {
  const { user, signOut } = useAuth(); const navigate = useNavigate(); const location = useLocation(); const [drawer, setDrawer] = useState(false)
  const metadata = user?.user_metadata ?? {}; const name = metadata.full_name || metadata.name || metadata.user_name || user?.email || 'Aluna'; const avatar = metadata.avatar_url || metadata.picture
  const section = location.pathname.endsWith('/perfil') ? 'profile' : location.pathname.endsWith('/ia') ? 'ai' : 'dashboard'
  async function logout() { await signOut(); navigate('/login', { replace: true }) }
  const nav = <><Link to="/minha-conta" onClick={() => setDrawer(false)} className={section === 'dashboard' ? 'active' : ''}><Home />Dashboard</Link><Link to="/minha-conta/perfil" onClick={() => setDrawer(false)} className={section === 'profile' ? 'active' : ''}><UserRound />Perfil</Link><Link to="/minha-conta/ia" onClick={() => setDrawer(false)} className={section === 'ai' ? 'active' : ''}><Bot />IA da Karla</Link></>
  return <div className="student-shell">
    <aside className={`student-sidebar${drawer ? ' open' : ''}`} aria-label="Navegação da área da aluna"><div className="student-brand"><span>K</span><div><strong>Karla Premium</strong><small>Área da aluna</small></div><button className="student-drawer-close" onClick={() => setDrawer(false)} aria-label="Fechar menu"><X /></button></div><nav>{nav}</nav><button className="student-logout" onClick={() => void logout()}><LogOut />Sair</button></aside>{drawer && <button className="student-backdrop" onClick={() => setDrawer(false)} aria-label="Fechar menu" />}
    <div className="student-content"><header className="student-topbar"><button onClick={() => setDrawer(true)} aria-label="Abrir menu"><Menu /></button><Link to="/" className="student-home-link">Voltar ao site</Link><div><span><strong>{name}</strong><small>{user?.email}</small></span><Avatar name={name} src={avatar} /></div></header><main>{section === 'profile' ? <Profile fallbackEmail={user?.email} name={name} avatar={avatar} /> : section === 'ai' ? <section><div className="student-section-heading"><div><span>Atendimento inteligente</span><h1>IA da Karla</h1></div><p>Use este espaço para tirar dúvidas e receber orientações.</p></div><ChatPanel variant="embedded" /></section> : <Dashboard name={name} />}</main></div>
  </div>
}