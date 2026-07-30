import type { HTMLAttributes, ReactNode } from 'react'

export type ContainerProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode }

export function Container({ children, className, ...props }: ContainerProps) {
  return <div className={['kk-container', className ?? ''].filter(Boolean).join(' ')} {...props}>{children}</div>
}
