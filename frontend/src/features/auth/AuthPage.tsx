import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import './auth.css'

type Mode = 'login' | 'signup' | 'recovery'
type Notice = { type: 'error' | 'success'; text: string }

function authErrorMessage(error: unknown, mode: Mode) {
  const code = typeof error === 'object' && error !== null && 'code' in error
    ? String(error.code)
    : ''
  if (code === 'invalid_credentials') return 'E-mail ou senha incorretos.'
  if (code === 'email_not_confirmed') return 'Confirme seu e-mail antes de entrar.'
  if (code === 'validation_failed') return 'Os dados de login enviados são inválidos.'
  if (code === 'user_already_exists') return 'Já existe uma conta com este e-mail.'
  if (code === 'weak_password') return 'Use uma senha mais forte, com pelo menos 8 caracteres.'
  if (code === 'password_mismatch') return 'As senhas não coincidem.'
  if (code === 'terms_required') return 'Aceite os Termos de Uso e a Política de Privacidade para continuar.'
  if (code === 'over_request_rate_limit') return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.'
  if (mode === 'login') return 'Não foi possível entrar. Tente novamente.'
  if (mode === 'signup') return 'Não foi possível criar a conta. Confira os dados e tente novamente.'
  return 'Não foi possível concluir a recuperação de senha.'
}

export function AuthPage({ mode }: { mode: Mode }) {
  const auth = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [fullName, setFullName] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<Notice | null>(null)

  async function run(action: () => Promise<void>) {
    setBusy(true)
    setNotice(null)
    try { await action() } catch (error) {
      setNotice({ type: 'error', text: authErrorMessage(error, mode) })
    } finally { setBusy(false) }
  }

  async function submit(event: FormEvent) {
    event.preventDefault()
    await run(async () => {
      if (mode === 'login') {
        if (!password) throw { code: 'validation_failed' }
        const session = await auth.signIn(email, password)
        if (!session) throw { code: 'validation_failed' }
        window.location.replace('/minha-conta')
        return
      }
      if (mode === 'signup') {
        if (password !== passwordConfirmation) throw { code: 'password_mismatch' }
        if (!acceptedTerms) throw { code: 'terms_required' }
        const active = await auth.signUp(email.trim(), password, fullName.trim())
        if (active) window.location.assign('/minha-conta')
        else setNotice({ type: 'success', text: 'Cadastro realizado. Confira seu e-mail e confirme a conta para entrar.' })
        return
      }
      if (auth.passwordRecovery) {
        await auth.updatePassword(password)
        setNotice({ type: 'success', text: 'Senha atualizada. Faça login novamente.' })
        await auth.signOut()
      } else {
        await auth.sendPasswordReset(email.trim())
        setNotice({ type: 'success', text: 'Se o e-mail estiver cadastrado, enviaremos as instruções.' })
      }
    })
  }

  async function googleLogin() {
    await run(() => auth.signInWithGoogle())
  }

  async function magicLink() {
    if (!email.trim()) {
      setNotice({ type: 'error', text: 'Informe seu e-mail para receber o link mágico.' })
      return
    }
    await run(async () => {
      await auth.sendMagicLink(email.trim())
      setNotice({ type: 'success', text: 'Link mágico enviado. Confira sua caixa de entrada.' })
    })
  }

  const recoveryPassword = mode === 'recovery' && auth.passwordRecovery
  const title = mode === 'login' ? 'Bem-vinda de volta' : mode === 'signup' ? 'Crie sua conta' : recoveryPassword ? 'Defina sua nova senha' : 'Recupere seu acesso'

  return <main className="auth-page">
    <section className="auth-shell">
      <aside className="auth-showcase" aria-label="Karla Premium">
        <a href="/" className="auth-brand">Karla <span>Premium</span></a>
        <div><p className="auth-eyebrow">Treino com propósito</p><h2>Sua evolução começa com uma experiência feita para você.</h2><p>Orientação personalizada, constância e acompanhamento em um só lugar.</p></div>
        <small>Personal Trainer • Consultoria Online</small>
      </aside>

      <form className="auth-card" onSubmit={submit}>
        <header><small>Área exclusiva</small><h1>{title}</h1><p>{mode === 'signup' ? 'Preencha seus dados para começar.' : mode === 'login' ? 'Acesse sua conta para continuar.' : 'Vamos ajudar você a voltar.'}</p></header>

        {mode !== 'recovery' && <>
          <button className="auth-google" type="button" disabled={busy} onClick={() => void googleLogin()}><span aria-hidden="true">G</span> Continuar com Google</button>
          <div className="auth-divider"><span>ou continue com e-mail</span></div>
        </>}

        {mode === 'signup' && <label>Nome completo<input required value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" placeholder="Seu nome completo" /></label>}
        {!recoveryPassword && <label>E-mail<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="voce@exemplo.com" /></label>}
        {(mode !== 'recovery' || recoveryPassword) && <label>{recoveryPassword ? 'Nova senha' : 'Senha'}<input type="password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={recoveryPassword || mode === 'signup' ? 'new-password' : 'current-password'} placeholder="Mínimo de 8 caracteres" /></label>}
        {mode === 'signup' && <label>Confirmar senha<input type="password" minLength={8} required value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} autoComplete="new-password" placeholder="Repita sua senha" /></label>}
        {mode === 'signup' && <label className="auth-consent"><input type="checkbox" required checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} /><span>Li e aceito os <a href="#termos">Termos de Uso</a> e a <a href="#privacidade">Política de Privacidade</a>.</span></label>}

        {notice && <p role="status" aria-live="polite" className={`auth-notice ${notice.type}`}>{notice.text}</p>}
        <button className="auth-primary" disabled={busy}>{busy ? 'Aguarde…' : mode === 'login' ? 'Entrar' : mode === 'signup' ? 'Criar minha conta' : recoveryPassword ? 'Salvar nova senha' : 'Enviar instruções'}</button>
        {mode === 'login' && <button className="auth-magic" type="button" disabled={busy} onClick={() => void magicLink()}>Entrar com link mágico</button>}

        <nav>{mode === 'login' ? <a href="/recuperar-senha">Esqueci minha senha</a> : <a href="/login">Voltar para o login</a>}</nav>
      </form>
    </section>
  </main>
}
