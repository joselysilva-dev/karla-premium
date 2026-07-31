import {
  Camera,
  MessageCircle,
} from 'lucide-react'

import {
  ButtonLink,
  Container,
  Reveal,
  Section,
  SectionHeader,
} from '../ui'

const WHATSAPP_URL =
  'https://wa.me/5564993195319?text=Ol%C3%A1%2C%20Karla!%20Conheci%20seu%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20consultoria.'

const instagramLinks = [
  {
    label: 'Instagram profissional',
    href: 'https://www.instagram.com/karlakarolynnetreinadora',
  },
  {
    label: 'Instagram pessoal',
    href: 'https://www.instagram.com/karlakarolynne_personal',
  },
]

function Contact() {
  return (
    <Section
      id="contato"
      className="kk-contact"
    >
      <Container>
        <div className="kk-contact__shell">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Seu próximo passo"
              title={
                <>
                  Pronta para começar a sua{' '}
                  <span className="kk-text-accent">
                    evolução
                  </span>
                  ?
                </>
              }
              description="Converse diretamente com a Karla para entender qual acompanhamento faz mais sentido para sua rotina e seus objetivos."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="kk-contact__primary-action">
              <ButtonLink
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="large"
              >
                <MessageCircle
                  size={19}
                  aria-hidden="true"
                />

                Falar com a Karla no WhatsApp
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <nav
              className="kk-contact__links"
              aria-label="Redes sociais da Karla"
            >
              {instagramLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Camera
                    size={16}
                    aria-hidden="true"
                  />

                  {link.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

export default Contact