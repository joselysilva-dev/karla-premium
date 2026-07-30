import { MessageCircleHeart } from 'lucide-react'

import {
  Container,
  Reveal,
  Section,
  SectionHeader,
} from '../ui'

import feedback01 from '../../assets/images/feedbacks/feedback-01.jpg'
import feedback02 from '../../assets/images/feedbacks/feedback-02.jpg'
import feedback03 from '../../assets/images/feedbacks/feedback-03.jpg'
import feedback04 from '../../assets/images/feedbacks/feedback-04.jpg'
import feedback05 from '../../assets/images/feedbacks/feedback-05.jpg'
import feedback06 from '../../assets/images/feedbacks/feedback-06.jpg'
import feedback07 from '../../assets/images/feedbacks/feedback-07.jpg'
import feedback08 from '../../assets/images/feedbacks/feedback-08.jpg'
import feedback09 from '../../assets/images/feedbacks/feedback-09.jpg'
import feedback10 from '../../assets/images/feedbacks/feedback-10.jpg'
import feedback11 from '../../assets/images/feedbacks/feedback-11.jpg'
import feedback12 from '../../assets/images/feedbacks/feedback-12.jpg'

const feedbackImages = [
  feedback01,
  feedback02,
  feedback03,
  feedback04,
  feedback05,
  feedback06,
  feedback07,
  feedback08,
  feedback09,
  feedback10,
  feedback11,
  feedback12,
]

function Feedbacks() {
  const carouselImages = [
    ...feedbackImages,
    ...feedbackImages,
  ]

  return (
    <Section id="feedbacks" className="kk-feedbacks">
      <Container>
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Quem vive o processo conta"
            title="Resultados que também aparecem nas palavras."
            description="Mensagens reais de alunas que escolheram mudar a rotina, construir constância e evoluir com acompanhamento."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="kk-feedbacks__intro">
            <MessageCircleHeart
              size={22}
              aria-hidden="true"
            />

            <span>
              Feedbacks reais de alunas acompanhadas pela Karla
            </span>
          </div>
        </Reveal>
      </Container>

      <div
        className="kk-feedbacks__viewport"
        aria-label="Feedbacks de alunas"
      >
        <div className="kk-feedbacks__track">
          {carouselImages.map((image, index) => {
            const isDuplicate =
              index >= feedbackImages.length

            return (
              <figure
                className="kk-feedbacks__card"
                key={`${image}-${index}`}
                aria-hidden={isDuplicate}
              >
                <img
                  src={image}
                  alt={
                    isDuplicate
                      ? ''
                      : `Feedback de aluna ${index + 1}`
                  }
                  loading="lazy"
                />
              </figure>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export default Feedbacks