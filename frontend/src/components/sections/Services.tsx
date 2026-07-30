import {
  ArrowUpRight,
  Dumbbell,
  Laptop,
  Target,
} from 'lucide-react'

import {
  ButtonLink,
  Card,
  Container,
  Reveal,
  Section,
  SectionHeader,
} from '../ui'

const services = [
  {
    title: 'Consultoria on-line personalizada',
    description:
      'Acompanhamento pensado para quem precisa de flexibilidade sem abrir mão de estratégia. O treino é estruturado de acordo com seus objetivos, sua rotina e seu momento.',
    icon: Laptop,
    href: '#contato',
    cta: 'Quero saber mais',
  },
  {
    title: 'Treino personalizado',
    description:
      'Treinos individualizados, respeitando seu corpo, seu nível de experiência e seus objetivos. Nada de protocolos genéricos ou treino no automático.',
    icon: Dumbbell,
    href: '#contato',
    cta: 'Quero meu acompanhamento',
  },
  {
    title: 'Hipertrofia e definição',
    description:
      'Estratégia direcionada para mulheres que buscam desenvolver o corpo, melhorar a definição e evoluir com técnica, segurança e constância.',
    icon: Target,
    href: '#contato',
    cta: 'Começar minha evolução',
  },
]

function Services() {
  return (
    <Section
      id="servicos"
      className="kk-services"
    >
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Como posso te ajudar"
            title="Um acompanhamento construído para você."
            description="Cada mulher tem uma rotina, um corpo e um objetivo diferente. Por isso, o acompanhamento começa pela sua realidade e evolui junto com você."
          />
        </Reveal>

        <div className="kk-services__grid">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <Reveal
                key={service.title}
                delay={index * 0.08}
              >
                <Card
                  variant="default"
                  padding="large"
                  className="kk-service-card"
                >
                  <Icon
                    className="kk-service-card__icon"
                    size={24}
                    aria-hidden="true"
                  />

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <ButtonLink
                    href={service.href}
                    variant="ghost"
                    size="small"
                  >
                    {service.cta}

                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                    />
                  </ButtonLink>
                </Card>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <div className="kk-services__support">
            <p>
              Ainda não sabe qual acompanhamento é ideal para você?
              Conheça as opções acima ou converse com a Karla para
              encontrar o melhor caminho para o seu objetivo.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

export default Services