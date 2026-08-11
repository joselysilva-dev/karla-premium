import type { Session } from '@supabase/supabase-js'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { AuthContext, type AuthContextValue } from './auth-context'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api'
const VISITOR_KEY = 'karla-premium-visitor-id'

type SafeAuthError = Error & { code?: string; status?: number }

function loginValidationError(message: string): SafeAuthError {
  const error = new Error(message) as SafeAuthError
  error.name = 'AuthValidationError'
  error.code = 'validation_failed'
  error.status = 400
  return error
}

function logLoginError(error: SafeAuthError) {
  console.error('Falha no login do Supabase:', {
    name: error.name,
    code: error.code,
    status: error.status,
    message: error.message,
  })
}

async function claimVisitor(session: Session) {
  const visitorId = localStorage.getItem(VISITOR_KEY)
  if (!visitorId) return
  const response = await fetch(`${API_URL}/auth/claim-visitor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
    body: JSON.stringify({ visitorId }),
  })
  if (!response.ok) throw new Error('Não foi possível associar o histórico do chat.')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [passwordRecovery, setPasswordRecovery] = useState(false)
  const claimedUser = useRef<string | null>(null)

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession)
      setPasswordRecovery(event === 'PASSWORD_RECOVERY')
      setLoading(false)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session || claimedUser.current === session.user.id) return
    claimedUser.current = session.user.id
    void claimVisitor(session).catch((error) => console.error('Falha ao associar histórico:', error))
  }, [session])

  const value = useMemo<AuthContextValue>(() => ({
    session,
    user: session?.user ?? null,
    loading,
    passwordRecovery,
    async signIn(email, password) {
      const normalizedEmail = email.trim().toLowerCase()
      if (!normalizedEmail) throw loginValidationError('E-mail não informado.')
      if (!password) throw loginValidationError('Senha não informada.')

      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      })

      if (error) {
        logLoginError(error)
        throw error
      }
      if (!data.session) {
        const sessionError = loginValidationError('O Supabase não retornou uma sessão após o login.')
        logLoginError(sessionError)
        throw sessionError
      }

      setSession(data.session)
      return data.session
    },
    async signInWithGoogle() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      })
      if (error) throw error
    },
    async sendMagicLink(email) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin, shouldCreateUser: false },
      })
      if (error) throw error
    },
    async signUp(email, password, fullName) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin },
      })
      if (error) throw error
      return Boolean(data.session)
    },
    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      claimedUser.current = null
      setPasswordRecovery(false)
      setSession(null)
    },
    async sendPasswordReset(email) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/recuperar-senha` })
      if (error) throw error
    },
    async updatePassword(password) {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setPasswordRecovery(false)
    },
  }), [loading, passwordRecovery, session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
