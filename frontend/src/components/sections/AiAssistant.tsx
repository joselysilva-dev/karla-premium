import { MessageCircle, Sparkles } from 'lucide-react'

import {
  ButtonLink,
  Container,
  Reveal,
  Section,
  SectionHeader,
} from '../ui'

import { ChatPanel } from '../../features/chat/ChatPanel'

const WHATSAPP_URL =
  'https://wa.me/5564993195319?text=Olá,%20Karla!%20Conheci%20seu%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20seu%20acompanhamento.'

function AiAssistant() {
  return (
    <Section
      id="ia-karla"
      className="kk-ai-section"
    >
      <Container>
        <Reveal>
          <div className="kk-ai-section__intro">
            <span className="kk-ai-section__badge">
              <Sparkles size={16} aria-hidden="true" />
              Karla disponível agora
            </span>

            <SectionHeader
              align="center"
              eyebrow="Converse com a Karla"
              title="Seu primeiro passo pode começar aqui."
              description="Conte seu objetivo, tire dúvidas sobre treino, emagrecimento e hábitos saudáveis e receba uma orientação inicial antes de iniciar seu acompanhamento."
            />
          </div>
        </Reveal>

        <Reveal
          className="kk-ai-section__chat"
          delay={0.1}
        >
          <ChatPanel />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="kk-ai-section__cta">
            <p>
              Prefere conversar diretamente com a Karla?
            </p>

            <ButtonLink
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <MessageCircle
                size={17}
                aria-hidden="true"
              />

              Conversar no WhatsApp
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

export default AiAssistant