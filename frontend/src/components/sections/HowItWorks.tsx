import {
  ClipboardCheck,
  Dumbbell,
  TrendingUp,
} from 'lucide-react'

import {
  Card,
  Container,
  Reveal,
  Section,
  SectionHeader,
} from '../ui'

const methodSteps = [
  {
    number: '01',
    title: 'Entendo seu objetivo',
    description:
      'O primeiro passo é conhecer sua rotina, seu momento, suas dificuldades e o resultado que você deseja alcançar.',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'Construo sua estratégia',
    description:
      'A partir da sua realidade, o treino é estruturado de forma individual, respeitando seu corpo, seu nível e seus objetivos.',
    icon: Dumbbell,
  },
  {
    number: '03',
    title: 'Acompanho sua evolução',
    description:
      'O processo continua com direcionamento, ajustes e acompanhamento para que você evolua com constância e segurança.',
    icon: TrendingUp,
  },
]

function HowItWorks() {
  return (
    <Section
      id="como-funciona"
      className="kk-method"
    >
      <Container>
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Como funciona"
            title={<>Seu <span className="kk-text-accent">acompanhamento</span> em três passos.</>}
            description="Sem fórmulas prontas. O processo começa entendendo você e evolui de acordo com a sua realidade."
          />
        </Reveal>

        <div className="kk-method__steps">
          {methodSteps.map((step, index) => {
            const Icon = step.icon

            return (
              <Reveal
                key={step.number}
                delay={index * 0.09}
                className="kk-method__step"
              >
                <Card padding="large">
                  <span className="kk-method__number">
                    {step.number}
                  </span>

                  <Icon
                    className="kk-method__icon"
                    size={25}
                    aria-hidden="true"
                  />

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

export default HowItWorks
