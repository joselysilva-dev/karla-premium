import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'Para quem é indicada a Consultoria Premium?',
    answer: 'A consultoria é indicada para mulheres exigentes que buscam resultados reais e seguros em emagrecimento, ganho de massa muscular (hipertrofia) ou recomposição corporal. Adaptamos o planejamento de acordo com seu nível (iniciante ao avançado) e rotina.',
  },
  {
    question: 'Preciso ter aparelhos específicos ou treinar em academia?',
    answer: 'Não necessariamente. Nós estruturamos treinos tanto para serem realizados em academias tradicionais de musculação, quanto para treinos em casa ou hotéis (utilizando apenas o peso corporal, elásticos ou halteres simples).',
  },
  {
    question: 'Como funciona o suporte diário?',
    answer: 'Você terá acesso direto ao WhatsApp pessoal da Karla Karolynne para tirar dúvidas sobre execução, cargas, dores ou ajustes de rotina. Os retornos são rápidos, garantindo que você nunca treine com dúvidas.',
  },
  {
    question: 'Como é feita a entrega e visualização dos treinos?',
    answer: 'Seu treino é entregue através de um aplicativo premium super intuitivo. Nele, cada exercício conta com um vídeo demonstrativo de alta definição feito pela própria Karla, detalhando a postura correta e técnicas para maximizar seus resultados.',
  },
  {
    question: 'Com qual frequência meus treinos são atualizados?',
    answer: 'As atualizações ocorrem periodicamente (geralmente a cada 4 a 6 semanas) ou conforme sua evolução, adaptação e feedback individual. Isso garante que seu corpo continue recebendo novos estímulos sem estagnar.',
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-24 bg-[#0F0F14] overflow-hidden border-t border-zinc-900/50">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-[#8A5CF6]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[300px] h-[300px] bg-[#C9A6FF]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#8A5CF6] text-xs font-semibold tracking-widest uppercase block mb-3"
          >
            Dúvidas Frequentes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#F8F8F8] uppercase leading-tight"
          >
            Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A5CF6] to-[#C9A6FF]">Frequentes</span>
          </motion.h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-4 transition-colors duration-300 hover:bg-zinc-900/10"
                >
                  <span className="text-white text-base md:text-lg font-bold tracking-wide">
                    {faq.question}
                  </span>
                  <div className="bg-[#8A5CF6]/10 p-2 rounded-xl text-[#C9A6FF] shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-zinc-900/30 text-[#A9A9A9] text-sm md:text-base leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
