export type ChatRole = 'assistant' | 'user' | 'error'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  retryContent?: string
}
