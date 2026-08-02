import type { AnchorHTMLAttributes } from 'react'
import brandLogo from '../../assets/images/logo-Karla.png'

export function BrandLogo({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={['kk-brand', className ?? ''].filter(Boolean).join(' ')} href="#inicio" aria-label="Karla Karolynne — página inicial" {...props}>
      <span className="kk-brand__mark" aria-hidden="true">
        <img src={brandLogo} alt="" width="1080" height="1080" />
      </span>
      <span>
        <span className="kk-brand__name">Karla Karolynne</span>
        <span className="kk-brand__role">Personal Trainer</span>
      </span>
    </a>
  )
}
