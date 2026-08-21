import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import type { PremiumAccess } from '../../services/accessApi'

function messageFor(status: PremiumAccess['status']) {
  if (status === 'email_unverified') {
    return 'Confirme o e-mail da sua conta antes de solicitar a liberação do Karla Premium.'
  }
  if (status === 'suspended') {
    return 'Seu acesso Premium está temporariamente suspenso. Fale com a Karla para regularizar seu acompanhamento.'
  }
  if (status === 'revoked') {
    return 'Este acesso Premium não está mais ativo. Fale com a Karla caso precise de ajuda.'
  }
  return 'O Karla Premium é exclusivo para clientes com acompanhamento ativo. Seu login foi reconhecido, mas o acesso ainda não está liberado.'
}

export function PremiumAccessPending({ status }: { status: PremiumAccess['status'] }) {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function logout() {
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="premium-access-title">
        <header>
          <small>Karla Premium</small>
          <h1 id="premium-access-title">Acesso ainda não liberado</h1>
          <p>{messageFor(status)}</p>
        </header>
        <Link className="auth-primary" to="/">Voltar ao site</Link>
        <button className="auth-magic" type="button" onClick={() => void logout()}>Sair da conta</button>
      </section>
    </main>
  )
}
