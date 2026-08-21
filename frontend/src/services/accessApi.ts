import { apiRequest } from './apiClient'

export type PremiumAccess = {
  authenticated: true
  premium: boolean
  admin: boolean
  status: 'admin' | 'active' | 'invited' | 'suspended' | 'revoked' | 'email_unverified' | 'not_authorized'
  clientId: string | null
}

export const accessApi = {
  get: () => apiRequest<PremiumAccess>('/me/access'),
}
