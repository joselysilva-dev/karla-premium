import { Activity, Apple, Bot, ChartNoAxesCombined, Dumbbell, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './auth.css'

const accountAreas = [
  {
    label: 'Meus Treinos',
    icon: Dumbbell,
    description: 'Acesse seus treinos personalizados pelo aplicativo oficial da Karla.',
    href: 'https://play.google.com/store/apps/details?id=br.com.wiki4fit.karlakarolynne',
  },
  { label: 'Avaliações', icon: Activity },
  { label: 'Evolução', icon: ChartNoAxesCombined },
  { label: 'Alimentação', icon: Apple },
  { label: 'IA da Karla', icon: Bot },
  { label: 'Perfil', icon: UserRound },
]

export function AccountPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const metadata = user?.user_metadata ?? {}
  const name = metadata.full_name || metadata.name || metadata.user_name || user?.email || 'Usuário'
  const avatar = metadata.avatar_url || metadata.picture

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <main className="account-page">
      <header className="account-header">
        <Link to="/" className="auth-brand">Karla <span>Premium</span></Link>
        <button type="button" onClick={() => void handleSignOut()}>Sair</button>
      </header>
      <section className="account-card" aria-labelledby="account-title">
        <div className="account-profile">
          {avatar ? <img src={avatar} alt={`Avatar de ${name}`} referrerPolicy="no-referrer" /> : <div className="account-avatar-placeholder" aria-hidden="true"><UserRound /></div>}
          <div><small>Área do aluno</small><h1 id="account-title">Olá, {name}</h1>{user?.email && <p>{user.email}</p>}</div>
        </div>
        <div className="account-shortcuts" aria-label="Áreas da conta">
          {accountAreas.map(({ label, icon: Icon, description, href }) => (
            <article className={`account-shortcut${href ? ' account-shortcut--active' : ''}`} key={label}>
              <Icon aria-hidden="true" />
              <span>{label}</span>
              {description ? <p>{description}</p> : <small>Em breve</small>}
              {href && (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  Abrir app de treinos
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}