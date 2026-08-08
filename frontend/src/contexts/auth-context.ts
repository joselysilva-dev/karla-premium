import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

export type AuthContextValue = {
  session: Session | null
  user: User | null
  loading: boolean
  passwordRecovery: boolean
  signIn(email: string, password: string): Promise<Session>
  signInWithGoogle(): Promise<void>
  sendMagicLink(email: string): Promise<void>
  signUp(email: string, password: string, fullName: string): Promise<boolean>
  signOut(): Promise<void>
  sendPasswordReset(email: string): Promise<void>
  updatePassword(password: string): Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
