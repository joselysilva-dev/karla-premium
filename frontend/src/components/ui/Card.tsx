import type { HTMLAttributes, ReactNode } from 'react'

type CardVariant = 'default' | 'elevated' | 'soft' | 'dark'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  variant?: CardVariant
  padding?: 'none' | 'small' | 'medium' | 'large'
}

const paddingClass = {
  none: '',
  small: 'p-4',
  medium: 'p-6',
  large: 'p-8',
}

export function Card({ children, variant = 'default', padding = 'medium', className, ...props }: CardProps) {
  const variantClass = variant === 'default' ? '' : `kk-card--${variant}`
  return <div className={['kk-card', variantClass, paddingClass[padding], className ?? ''].filter(Boolean).join(' ')} {...props}>{children}</div>
}
