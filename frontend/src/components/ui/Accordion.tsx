import { Minus, Plus } from 'lucide-react'
import { useId, useState } from 'react'

export type AccordionItem = { question: string; answer: string }

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const id = useId()

  return (
    <div className="kk-accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `${id}-${index}`
        return (
          <div className="kk-accordion__item" key={item.question}>
            <button className="kk-accordion__trigger" type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? null : index)}>
              <span>{item.question}</span>
              {isOpen ? <Minus aria-hidden="true" size={18} /> : <Plus aria-hidden="true" size={18} />}
            </button>
            {isOpen ? <div className="kk-accordion__content" id={panelId}>{item.answer}</div> : null}
          </div>
        )
      })}
    </div>
  )
}
