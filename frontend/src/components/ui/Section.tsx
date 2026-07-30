import type { HTMLAttributes, ReactNode } from 'react'

export type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  spacing?: 'compact' | 'default' | 'spacious'
}

export function Section({ children, spacing = 'default', className, ...props }: SectionProps) {
  const spacingClass = spacing === 'default' ? '' : `kk-section--${spacing}`
  return <section className={['kk-scope', 'kk-section', spacingClass, className ?? ''].filter(Boolean).join(' ')} {...props}>{children}</section>
}
