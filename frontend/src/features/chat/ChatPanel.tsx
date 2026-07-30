import { Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'

import { quickPrompts } from '../../content/site'
import { useKarlaChat } from '../../hooks/useKarlaChat'
import type { ChatMessage } from '../../types/chat'

import { Button, Textarea } from '../../components/ui'

import karlaPortrait from '../../assets/images/foto-Karla.png'

type ChatPanelProps = {
  onClose?: () => void
  variant?: 'embedded' | 'widget'
}

function ChatAvatar({ role }: { role: ChatMessage['role'] }) {
  if (role === 'user') {
    return (
      <span
        className="kk-chat__avatar kk-chat__avatar--user"
        aria-hidden="true"
      >
        Você
      </span>
    )
  }

  return (
    <img
      className="kk-chat__avatar"
      src={karlaPortrait}
      alt="Karla Karolynne"
    />
  )
}

function ChatMessageItem({
  message,
  onRetry,
}: {
  message: ChatMessage
  onRetry: (content: string) => void
}) {
  const isUser = message.role === 'user'

  return (
    <div className={`kk-chat__message kk-chat__message--${message.role}`}>
      {!isUser && <ChatAvatar role={message.role} />}

      <div>
        <div className="kk-chat__bubble">{message.content}</div>

        {message.role === 'error' && message.retryContent && (
          <Button
            variant="ghost"
            size="small"
            className="kk-chat__retry"
            onClick={() => onRetry(message.retryContent!)}
          >
            Tentar novamente
          </Button>
        )}
      </div>

      {isUser && <ChatAvatar role={message.role} />}
    </div>
  )
}

export function ChatPanel({
  onClose,
  variant = 'embedded',
}: ChatPanelProps) {
  const { messages, isLoading, send } = useKarlaChat()

  const [draft, setDraft] = useState('')

  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [messages, isLoading])

  const submit = (event?: FormEvent) => {
    event?.preventDefault()

    const message = draft.trim()

    if (!message) return

    setDraft('')
    void send(message)
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <section
      className={`kk-scope kk-chat kk-chat--${variant}`}
      aria-label="Conversa com a IA da Karla"
    >
      <header className="kk-chat__header">
        <img
          className="kk-chat__profile"
          src={karlaPortrait}
          alt="Karla Karolynne"
        />

        <div className="kk-chat__identity">
          <strong>Karla Karolynne</strong>

          <span>Personal Trainer</span>

          <span className="kk-chat__online">
            <i aria-hidden="true" />
            IA disponível agora
          </span>
        </div>

        {onClose && (
          <Button
            variant="ghost"
            size="small"
            className="kk-chat__close"
            onClick={onClose}
            aria-label="Fechar chat"
          >
            <X size={18} />
          </Button>
        )}
      </header>

      <div
  className="kk-chat__messages"
  aria-live="polite"
  aria-busy={isLoading}
>
  {messages.length === 0 ? (
    <div className="kk-chat__empty">
      <p>
        Olá! 👋 Sou a IA da Karla Karolynne.
        <br />
        Posso esclarecer dúvidas sobre treinos,
        emagrecimento, alimentação e hábitos saudáveis
        antes da sua consultoria.
      </p>

      <div className="kk-chat__prompts">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => void send(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  ) : (
    messages.map((message) => (
      <ChatMessageItem
        key={message.id}
        message={message}
        onRetry={(content) => void send(content)}
      />
    ))
  )}

  {isLoading && (
    <div className="kk-chat__typing">
      <ChatAvatar role="assistant" />

      <span>
        Karla está digitando...
        <i />
        <i />
        <i />
      </span>
    </div>
  )}

  <div ref={endRef} />
</div>
      <form className="kk-chat__form" onSubmit={submit}>
        <label
          className="sr-only"
          htmlFor={`karla-chat-${variant}`}
        >
          Sua mensagem para Karla
        </label>

        <Textarea
          id={`karla-chat-${variant}`}
          rows={2}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ex.: Quero emagrecer. Por onde devo começar?"
          disabled={isLoading}
        />

        <Button
          type="submit"
          className="kk-chat__send"
          disabled={isLoading || !draft.trim()}
          aria-label="Enviar mensagem"
        >
          <Send size={18} />
        </Button>
      </form>

      <p className="kk-chat__disclaimer">
        A IA fornece orientações iniciais. Para um plano personalizado,
        agende uma consultoria com a Karla.
      </p>
    </section>
  )
}
