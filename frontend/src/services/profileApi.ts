import { apiRequest } from './apiClient'

export type StudentProfile = {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
  birth_date: string | null
  gender: string | null
  height_cm: number | null
  weight_kg: number | null
  goal: string | null
  restrictions: string | null
  injuries: string | null
  experience_level: 'beginner' | 'intermediate' | 'advanced' | null
  role: 'client' | 'admin'
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  return apiRequest<T>(path, init)
}

export const profileApi = {
  get: () => request<StudentProfile>('/me'),
  update: (profile: Partial<StudentProfile>) => request<StudentProfile>('/me', { method: 'PATCH', body: JSON.stringify(profile) }),
}
