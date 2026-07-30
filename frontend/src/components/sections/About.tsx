import {
  Award,
  Dumbbell,
  GraduationCap,
  HeartHandshake,
} from 'lucide-react'

import karlaPortrait from '../../assets/images/foto-Karla.png'

import {
  Card,
  Container,
  Reveal,
  Section,
  SectionHeader,
} from '../ui'

const aboutHighlights = [
  {
    title: 'Formação profissional',
    description:
      'Formada em Educação Física e Personal Trainer, com atuação voltada para um acompanhamento seguro, estratégico e individualizado.',
    icon: GraduationCap,
  },
  {
    title: 'Hipertrofia e definição',
    description:
      'Especialista em hipertrofia e definição, desenvolvendo treinos de acordo com o corpo, os objetivos e a realidade de cada aluna.',
    icon: Dumbbell,
  },
  {
  title: 'Experiência com musculação',
  description:
    'Dedicada à musculação desde 2016, unindo experiência prática, técnica e estratégia na construção de resultados.',
  icon: Award,
},
  {
    title: 'Acompanhamento de perto',
    description:
      'Mais do que entregar um treino, o objetivo é oferecer motivação, direcionamento, constância e suporte durante cada fase do processo.',
    icon: HeartHandshake,
  },
]

function About() {
  return (
    <Section id="sobre" className="kk-about">
      <Container>
        <div className="kk-about__grid">
          <Reveal className="kk-about__portrait-wrap">
            <img
              src={karlaPortrait}
              className="kk-about__portrait"
              alt="Karla Karolynne, Personal Trainer"
              loading="lazy"
            />
          </Reveal>

          <div className="kk-about__content">
            <Reveal>
              <SectionHeader
                eyebrow="Sobre a Karla"
                title="Treino estratégico, acompanhamento de perto e resultados construídos com constância."
                description="Karla Karolynne é Personal Trainer, formada em Educação Física e especialista em hipertrofia e definição. Seu trabalho é direcionado principalmente a mulheres que querem transformar o corpo, melhorar a autoestima e construir uma rotina de treino sustentável."
              />
            </Reveal>

            <div className="kk-about__cards">
              {aboutHighlights.map((highlight, index) => {
                const Icon = highlight.icon

                return (
                  <Reveal
                    key={highlight.title}
                    delay={index * 0.08}
                  >
                    <Card
                      padding="medium"
                      className="kk-feature-card"
                    >
                      <Icon
                        size={20}
                        aria-hidden="true"
                      />

                      <div>
                        <h3>{highlight.title}</h3>

                        <p>
                          {highlight.description}
                        </p>
                      </div>
                    </Card>
                  </Reveal>
                )
              })}
            </div>

            <Reveal>
              <p className="kk-about__credential">
                Personal Trainer • CREF GO-017758
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default About