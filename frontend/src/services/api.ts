export type ChatHistoryMessage = {
  role: 'user' | 'assistant'
  content: string
}

const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3001/api'

console.log('API usada pelo chat:', API_URL)

export async function sendMessage(
  message: string,
  history: ChatHistoryMessage[] = []
): Promise<string> {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      history,
    }),
  })

  const data: {
    response?: string
    error?: string
  } = await response.json()

  if (!response.ok) {
    throw new Error(
      data.error || 'Erro ao consultar a IA.'
    )
  }

  return data.response ?? ''
}