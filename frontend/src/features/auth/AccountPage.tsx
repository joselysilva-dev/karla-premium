import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { profileApi, type StudentProfile } from '../../services/profileApi'
import './auth.css'

export function AccountPage() {
  const { signOut } = useAuth()
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  useEffect(() => { void profileApi.get().then(setProfile).catch(() => setNotice({ type: 'error', text: 'Não foi possível carregar seu perfil.' })).finally(() => setLoading(false)) }, [])
  if (loading) return <main className="account-page"><p>Carregando perfil…</p></main>
  if (!profile) return <main className="account-page"><p role="alert">{notice?.text}</p></main>
  const set = (field: keyof StudentProfile, value: string | number | null) => setProfile({ ...profile, [field]: value })
  async function save() { if (!profile) return; setSaving(true); setNotice(null); try { setProfile(await profileApi.update(profile)); setNotice({ type: 'success', text: 'Perfil salvo com sucesso.' }) } catch (error) { setNotice({ type: 'error', text: (error as Error).message }) } finally { setSaving(false) } }
  return <main className="account-page"><header><a href="/" className="auth-brand">Karla <span>Premium</span></a><button onClick={() => void signOut().then(() => window.location.assign('/'))}>Sair</button></header>
    <section className="account-card"><div><small>Área do aluno</small><h1>Meu perfil</h1><p>Essas informações ajudam a Karla a personalizar suas orientações.</p></div>
      <div className="account-grid">
        <label>Nome completo<input value={profile.full_name || ''} onChange={(e) => set('full_name', e.target.value)} /></label>
        <label>E-mail<input type="email" value={profile.email || ''} onChange={(e) => set('email', e.target.value)} /></label>
        <label>Telefone<input value={profile.phone || ''} onChange={(e) => set('phone', e.target.value)} /></label>
        <label>Data de nascimento<input type="date" value={profile.birth_date || ''} onChange={(e) => set('birth_date', e.target.value || null)} /></label>
        <label>Gênero<input value={profile.gender || ''} onChange={(e) => set('gender', e.target.value)} /></label>
        <label>Altura (cm)<input type="number" min="50" max="300" value={profile.height_cm ?? ''} onChange={(e) => set('height_cm', e.target.value ? Number(e.target.value) : null)} /></label>
        <label>Peso (kg)<input type="number" min="20" max="500" step="0.1" value={profile.weight_kg ?? ''} onChange={(e) => set('weight_kg', e.target.value ? Number(e.target.value) : null)} /></label>
        <label>Nível de experiência<select value={profile.experience_level || ''} onChange={(e) => set('experience_level', e.target.value || null)}><option value="">Selecione</option><option value="beginner">Iniciante</option><option value="intermediate">Intermediário</option><option value="advanced">Avançado</option></select></label>
      </div>
      <label>Objetivo<textarea rows={3} value={profile.goal || ''} onChange={(e) => set('goal', e.target.value)} /></label>
      <label>Restrições<textarea rows={3} value={profile.restrictions || ''} onChange={(e) => set('restrictions', e.target.value)} /></label>
      <label>Lesões<textarea rows={3} value={profile.injuries || ''} onChange={(e) => set('injuries', e.target.value)} /></label>
      {notice && <p role="status" className={`auth-notice ${notice.type}`}>{notice.text}</p>}<button className="account-save" disabled={saving} onClick={() => void save()}>{saving ? 'Salvando…' : 'Salvar perfil'}</button>
    </section></main>
}
