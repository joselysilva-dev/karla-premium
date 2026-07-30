import type { ReactNode } from 'react'

export type SectionHeaderProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ eyebrow, title, description, align = 'left', className }: SectionHeaderProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left'
  return (
    <header className={['kk-scope', 'flex max-w-3xl flex-col gap-4', alignment, className ?? ''].filter(Boolean).join(' ')}>
      {eyebrow ? <p className="kk-eyebrow">{eyebrow}</p> : null}
      <h2 className="kk-heading-section">{title}</h2>
      {description ? <p className="kk-body kk-body--large">{description}</p> : null}
    </header>
  )
}
