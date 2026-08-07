const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3001/api'

console.log('API usada pelo chat:', API_URL)

export async function sendMessage(
  message: string,
): Promise<string> {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
    }),
  })

  const data: {
    success?: boolean
    response?: string
    error?: string
  } = await response.json()

  if (!response.ok) {
    throw new Error(
      data.error || 'Erro ao consultar a IA.'
    )
  }

  if (
    data.success !== true ||
    typeof data.response !== 'string' ||
    !data.response.trim()
  ) {
    throw new Error('Resposta incompleta da API.')
  }

  return data.response
}
