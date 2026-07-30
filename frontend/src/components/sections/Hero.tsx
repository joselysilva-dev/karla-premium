import { ButtonLink, Container, Section } from '../ui'

import brandLogo from '../../assets/images/logo-Karla.png'
import karlaPortrait from '../../assets/images/foto-Karla.png'
import { whatsappUrl } from '../../content/site'

function Hero() {
  return (
    <Section
      id="inicio"
      spacing="spacious"
      className="kk-hero"
    >
      <Container>
        <div className="kk-hero__grid">

          <div className="kk-hero__content">

            <img
              src={brandLogo}
              alt="Logo Karla Karolynne"
              className="kk-hero__logo"
            />

            <p className="kk-eyebrow">
              Personal Trainer • Consultoria Online
            </p>

            <h1 className="kk-heading-display kk-hero__title">
              Treinos personalizados para mulheres que buscam resultados reais.
            </h1>

            <p className="kk-body kk-body--large kk-hero__description">
              Planejamento individual, acompanhamento próximo e estratégias
              desenvolvidas para hipertrofia, definição e qualidade de vida,
              respeitando sua rotina e seus objetivos.
            </p>

            <div className="kk-hero__actions">

              <ButtonLink
                href="#contato"
                size="large"
              >
                Quero começar
              </ButtonLink>

              <ButtonLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar pelo WhatsApp
              </ButtonLink>

            </div>
          </div>

          <div className="kk-hero__visual">

            <img
              src={karlaPortrait}
              className="kk-hero__portrait"
              alt="Karla Karolynne Personal Trainer"
            />
                      </div>

        </div>
      </Container>
    </Section>
  )
}

export default Hero
