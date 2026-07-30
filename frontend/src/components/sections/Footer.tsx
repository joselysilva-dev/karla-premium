import {
  Camera,
  MessageCircle,
} from 'lucide-react'

import {
  BrandLogo,
  Container,
} from '../ui'

const WHATSAPP_URL =
  'https://wa.me/5564993195319?text=Olá,%20Karla!%20Conheci%20seu%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20consultoria.'

const links = [
  {
    label: 'Início',
    href: '#inicio',
  },
  {
    label: 'Sobre',
    href: '#sobre',
  },
  {
    label: 'Serviços',
    href: '#servicos',
  },
  {
    label: 'Como funciona',
    href: '#como-funciona',
  },
  {
    label: 'Contato',
    href: '#contato',
  },
]

function Footer() {
  return (
    <footer className="kk-scope kk-footer">
      <Container>
        <div className="kk-footer__grid">

          <div className="kk-footer__brand">
            <BrandLogo />

            <p>
              Treino personalizado, estratégia e acompanhamento
              para mulheres que querem evoluir com constância,
              segurança e propósito.
            </p>

            <span>
              Personal Trainer • CREF GO-017758
            </span>
          </div>

          <nav
            className="kk-footer__nav"
            aria-label="Links do rodapé"
          >
            <h2>Navegação</h2>

            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="kk-footer__social">
            <h2>Conecte-se</h2>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle
                size={17}
                aria-hidden="true"
              />

              WhatsApp
            </a>

            <a
              href="https://www.instagram.com/karlakarolynnetreinadora"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Camera
                size={17}
                aria-hidden="true"
              />

              Instagram Treinadora
            </a>

            <a
              href="https://www.instagram.com/karlakarolynne_personal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Camera
                size={17}
                aria-hidden="true"
              />

              Instagram Personal
            </a>
          </div>

        </div>

        <div className="kk-footer__bottom">
          <span>
            © {new Date().getFullYear()} Karla Karolynne.
            Todos os direitos reservados.
          </span>

          <span>
            Personal Trainer • Consultoria on-line
          </span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
