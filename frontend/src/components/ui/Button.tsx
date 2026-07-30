import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'small' | 'medium' | 'large'

function buttonClassName(variant: ButtonVariant, size: ButtonSize, fullWidth: boolean, className?: string) {
  return [
    'kk-button',
    `kk-button--${variant}`,
    size !== 'medium' ? `kk-button--${size}` : '',
    fullWidth ? 'kk-button--full' : '',
    className ?? '',
  ].filter(Boolean).join(' ')
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'medium', fullWidth = false, className, children, type = 'button', ...props }: ButtonProps) {
  return <button className={buttonClassName(variant, size, fullWidth, className)} type={type} {...props}>{children}</button>
}

export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: ReactNode
}

export function ButtonLink({ variant = 'primary', size = 'medium', fullWidth = false, className, children, ...props }: ButtonLinkProps) {
  return <a className={buttonClassName(variant, size, fullWidth, className)} {...props}>{children}</a>
}
