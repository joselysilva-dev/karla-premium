import { useState } from 'react'
import type { FormEvent } from 'react'
import { supabase } from '../../lib/supabase'

export function AdminLogin({ recovery = false }: { recovery?: boolean }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  async function login(event: FormEvent) {
    event.preventDefault(); setLoading(true); setMessage(null)
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    setLoading(false)
    if (error) setMessage({ type: 'error', text: 'E-mail ou senha inválidos.' })
  }

  async function recover() {
    if (!email.trim()) return setMessage({ type: 'error', text: 'Informe seu e-mail primeiro.' })
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/login`,
    })
    setLoading(false)
    setMessage(error
      ? { type: 'error', text: 'Não foi possível enviar a recuperação.' }
      : { type: 'success', text: 'Se o e-mail existir, você receberá as instruções.' })
  }

  async function updatePassword(event: FormEvent) {
    event.preventDefault(); setLoading(true); setMessage(null)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    setMessage(error
      ? { type: 'error', text: 'Não foi possível atualizar a senha.' }
      : { type: 'success', text: 'Senha atualizada. Você já pode entrar novamente.' })
    if (!error) await supabase.auth.signOut()
  }

  if (recovery) {
    return <main className="admin-login"><form onSubmit={updatePassword} className="admin-login__card">
      <a href="/" className="admin-brand">Karla <span>Premium</span></a><div><p>Recuperação</p><h1>Nova senha</h1></div>
      <label>Nova senha<input type="password" minLength={8} autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      {message && <p role="status" className={`admin-alert ${message.type}`}>{message.text}</p>}
      <button type="submit" disabled={loading}>{loading ? 'Salvando…' : 'Atualizar senha'}</button>
    </form></main>
  }

  return (
    <main className="admin-login">
      <form onSubmit={login} className="admin-login__card">
        <a href="/" className="admin-brand">Karla <span>Premium</span></a>
        <div><p>Área restrita</p><h1>Administração</h1><span>Entre com a conta autorizada da Karla.</span></div>
        <label>E-mail<input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Senha<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {message && <p role="status" className={`admin-alert ${message.type}`}>{message.text}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Entrando…' : 'Entrar'}</button>
        <button type="button" className="admin-link" onClick={() => void recover()} disabled={loading}>Esqueci minha senha</button>
      </form>
    </main>
  )
}
