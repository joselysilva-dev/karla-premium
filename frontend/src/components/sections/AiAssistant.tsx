import { MessageCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { ChatPanel } from '../../features/chat/ChatPanel'
import '../../styles/chat.css'

function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const closePanel = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePanel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.querySelector<HTMLTextAreaElement>('textarea')?.focus()
      return
    }

    triggerRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const panel = panelRef.current
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !panel) return
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>('button:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    panel?.addEventListener('keydown', handleTab)
    return () => panel?.removeEventListener('keydown', handleTab)
  }, [isOpen])

  return (
    <aside className="kk-ai-widget" aria-label="Conversa com a IA da Karla">
      <div
        ref={panelRef}
        id="kk-ai-chat-panel"
        className={`kk-ai-widget__panel${isOpen ? ' kk-ai-widget__panel--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Conversa com a IA da Karla"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <ChatPanel variant="widget" onClose={closePanel} />
      </div>

      <button
        ref={triggerRef}
        type="button"
        className="kk-ai-widget__trigger"
        aria-label="Fale com a IA da Karla"
        aria-expanded={isOpen}
        aria-controls="kk-ai-chat-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        <MessageCircle size={20} aria-hidden="true" />
        <span>IA da Karla</span>
      </button>
    </aside>
  )
}

export default AiAssistant
