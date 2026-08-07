import { useCallback, useState } from 'react'
import { sendMessage } from '../services/api'
import type { ChatMessage } from '../types/chat'

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

export function useKarlaChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const send = useCallback(
    async (content: string) => {
      const message = content.trim()

      if (!message || isLoading) return

      const userMessage: ChatMessage = {
        id: createId(),
        role: 'user',
        content: message,
      }

      // A mensagem da usuária aparece imediatamente no chat.
      setMessages((current) => [
        ...current,
        userMessage,
      ])

      setIsLoading(true)

      try {
        // Envia a mensagem atual + histórico anterior.
        const response = await sendMessage(message)

        const assistantMessage: ChatMessage = {
          id: createId(),
          role: 'assistant',
          content: response,
        }

        setMessages((current) => [
          ...current,
          assistantMessage,
        ])
      } catch (error) {
        console.error('Erro ao chamar a API:', error)

        const errorMessage: ChatMessage = {
          id: createId(),
          role: 'error',
          content:
            'No momento não consegui responder. Verifique sua conexão e tente novamente em alguns instantes.',
          retryContent: message,
        }

        setMessages((current) => [
          ...current,
          errorMessage,
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading]
  )

  return {
    messages,
    isLoading,
    send,
  }
}
