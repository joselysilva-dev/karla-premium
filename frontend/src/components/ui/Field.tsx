import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={['kk-scope', 'kk-field', className ?? ''].filter(Boolean).join(' ')} {...props} />
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={['kk-scope', 'kk-field', className ?? ''].filter(Boolean).join(' ')} {...props} />
}
