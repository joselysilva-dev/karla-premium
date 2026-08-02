import { CheckCircle2 } from 'lucide-react'
import { outcomeAreas } from '../../content/site'

import {
  Card,
  Container,
  Reveal,
  Section,
  SectionHeader,
} from '../ui'

import resultado01 from '../../assets/images/transformacoes/antes-depois-01.jpg'
import resultado02 from '../../assets/images/transformacoes/antes-depois-02.jpg'
import resultado03 from '../../assets/images/transformacoes/antes-depois-03.jpg'
import resultado04 from '../../assets/images/transformacoes/antes-depois-04.jpg'
import resultado05 from '../../assets/images/transformacoes/antes-depois-05.jpg'
import resultado06 from '../../assets/images/transformacoes/antes-depois-06.jpg'
import resultado07 from '../../assets/images/transformacoes/antes-depois-07.jpg'
import resultado08 from '../../assets/images/transformacoes/antes-depois-08.jpg'

const resultImages = [
  {
    src: resultado01,
    width: 1320,
    height: 1760,
    alt: 'Antes e depois de aluna acompanhada pela Karla Karolynne',
  },
  {
    src: resultado02,
    width: 1320,
    height: 1760,
    alt: 'Transformação de aluna acompanhada pela Karla Karolynne',
  },
  {
    src: resultado03,
    width: 1320,
    height: 1760,
    alt: 'Antes e depois de aluna acompanhada pela Karla Karolynne',
  },
  {
    src: resultado04,
    width: 1290,
    height: 1290,
    alt: 'Evolução de aluna acompanhada pela Karla Karolynne',
  },
  {
    src: resultado05,
    width: 1290,
    height: 1290,
    alt: 'Resultado de acompanhamento personalizado com Karla Karolynne',
  },
  {
    src: resultado06,
    width: 1290,
    height: 1289,
    alt: 'Transformação de aluna acompanhada pela Karla Karolynne',
  },
  {
    src: resultado07,
    width: 1290,
    height: 1289,
    alt: 'Resultado real de aluna acompanhada pela Karla Karolynne',
  },
  {
    src: resultado08,
    width: 1290,
    height: 1290,
    alt: 'Evolução de aluna acompanhada pela Karla Karolynne',
  },
]

function Results() {
  const carouselImages = [...resultImages, ...resultImages]

  return (
    <Section id="resultados" className="kk-results">
      <Container>
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Resultados reais"
            title={<>Transformações construídas com <span className="kk-text-accent">estratégia</span> e constância.</>}
            description="Cada mulher possui uma história, uma rotina e um objetivo diferente. Estes são alguns resultados reais de alunas acompanhadas pela Karla."
          />
        </Reveal>
      </Container>

      <div
        className="kk-results__carousel"
        role="region"
        aria-label="Resultados de alunas"
      >
        <div className="kk-results__track">
          {carouselImages.map((image, index) => {
            const isDuplicate = index >= resultImages.length

            return (
              <figure
                className="kk-results__slide"
                key={`${image.src}-${index}`}
                aria-hidden={isDuplicate}
              >
                <img
                  src={image.src}
                  alt={isDuplicate ? '' : image.alt}
                  loading="lazy"
                  width={image.width}
                  height={image.height}
                />
              </figure>
            )
          })}
        </div>
      </div>

      <Container>
        <Reveal>
          <div className="kk-results__gallery-copy">
            <strong>
              Mais de 200 alunas acompanhadas
            </strong>

            <p>
              Resultados construídos com treino estratégico,
              acompanhamento individual, disciplina e constância.
            </p>
          </div>
        </Reveal>

        <div className="kk-results__outcomes">
          {outcomeAreas.map((outcome, index) => (
            <Reveal
              key={outcome.title}
              delay={index * 0.08}
            >
              <Card
                padding="large"
                className="kk-outcome-card"
              >
                <CheckCircle2
                  size={21}
                  aria-hidden="true"
                />

                <h3>{outcome.title}</h3>

                <p>{outcome.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default Results
