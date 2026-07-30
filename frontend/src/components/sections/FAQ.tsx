import { faqs } from '../../content/site'
import { Accordion, Container, Reveal, Section, SectionHeader } from '../ui'

function FAQ() {
  return (
    <Section id="faq" className="kk-faq">
      <Container>
        <div className="kk-faq__grid">
          <Reveal><SectionHeader eyebrow="Dúvidas frequentes" title="Clareza para você começar com segurança." description="Estas são algumas respostas iniciais. Para entender o que faz sentido para você, fale diretamente com a Karla." /></Reveal>
          <Reveal delay={0.1}><Accordion items={faqs} /></Reveal>
        </div>
      </Container>
    </Section>
  )
}

export default FAQ
