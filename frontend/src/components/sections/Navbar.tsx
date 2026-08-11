import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  BrandLogo,
  Button,
  ButtonLink,
  Container,
} from '../ui'
import { useAuth } from '../../hooks/useAuth'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Contato', href: '#contato' },
]

function Navbar() {
  const { signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16)
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`kk-scope kk-nav${
        scrolled ? ' kk-nav--scrolled' : ''
      }`}
    >
      <Container>
        <div className="kk-nav__bar">
          <BrandLogo
            className="kk-nav__brand"
            onClick={closeMenu}
          />

          <nav
            className="kk-nav__links"
            aria-label="Navegação principal"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="kk-nav__link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="kk-nav__actions">
            <Link
              to="/minha-conta"
              className="kk-button kk-button--primary kk-button--small kk-nav__account"
            >
              Minha conta
            </Link>

            <ButtonLink
              href="#contato"
              size="small"
              className="kk-nav__cta"
            >
              Falar com a Karla
            </ButtonLink>

            <Button
              variant="ghost"
              size="small"
              className="kk-nav__logout"
              onClick={() => void signOut()}
            >
              Sair
            </Button>

            <Button
              className="kk-nav__menu-toggle"
              variant="ghost"
              size="small"
              aria-label={
                mobileMenuOpen
                  ? 'Fechar menu'
                  : 'Abrir menu'
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() =>
                setMobileMenuOpen((open) => !open)
              }
            >
              {mobileMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </Button>
          </div>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="kk-nav__menu"
        >
          <Container>
            <nav
              className="kk-nav__menu-inner"
              aria-label="Navegação mobile"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="kk-nav__link"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}

              <ButtonLink
                href="#contato"
                fullWidth
                onClick={closeMenu}
              >
                Falar com a Karla
              </ButtonLink>

              <Link
                to="/minha-conta"
                className="kk-button kk-button--primary kk-button--full"
                onClick={closeMenu}
              >
                Minha conta
              </Link>

              <Button
                variant="ghost"
                fullWidth
                onClick={() => void signOut()}
              >
                Sair
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}

export default Navbar
