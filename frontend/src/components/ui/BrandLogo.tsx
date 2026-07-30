import type { AnchorHTMLAttributes } from 'react'

export function BrandLogo({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={['kk-brand', className ?? ''].filter(Boolean).join(' ')} href="#inicio" aria-label="Karla Karolynne — página inicial" {...props}>
      <span className="kk-brand__mark" aria-hidden="true" />
      <span>
        <span className="kk-brand__name">Karla Karolynne</span>
        <span className="kk-brand__role">Personal Trainer</span>
      </span>
    </a>
  )
}
