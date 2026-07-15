import { motion } from 'framer-motion'
import { ClipboardList, Award, Smartphone, BarChart3, ChevronRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Análise e Alinhamento Inicial',
    description: 'Anamnese completa por formulário exclusivo, entendendo sua rotina, dores, preferências, restrições e objetivos estéticos específicos.',
  },
  {
    icon: Award,
    number: '02',
    title: 'Montagem de Planejamento Unificado',
    description: 'Criação do planejamento sob medida. Estruturo cada série, repetição, intervalo e estímulos para o seu nível físico atual.',
  },
  {
    icon: Smartphone,
    number: '03',
    title: 'Entrega na Palma da Mão',
    description: 'Acesso total ao aplicativo de treino inteligente. Cada exercício possui vídeo demonstrativo em alta definição e cronômetro integrado.',
  },
  {
    icon: BarChart3,
    number: '04',
    title: 'Suporte de Alta Performance',
    description: 'Feedbacks periódicos, ajustes quinzenais ou mensais de treinos e suporte direto por WhatsApp para máxima evolução.',
  },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24 bg-[#0F0F14] overflow-hidden border-t border-zinc-900/50">
      {/* Background glow elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8A5CF6]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#8A5CF6] text-xs font-semibold tracking-widest uppercase block mb-3"
          >
            Metodologia
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#F8F8F8] mb-6 uppercase"
          >
            Como funciona a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A5CF6] to-[#C9A6FF]">Consultoria</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#A9A9A9] text-lg font-light"
          >
            Um ecossistema planejado passo a passo para que você alcance resultados extraordinários sem estresse e com total praticidade.
          </motion.p>
        </div>

        {/* Steps Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative flex flex-col justify-between glass-card rounded-3xl p-8 hover:border-[#8A5CF6]/20 transition-all duration-300 group"
              >
                {/* Connecting arrow/indicator line on desktop */}
                {idx < 3 && (
                  <div className="hidden lg:flex absolute top-10 -right-4 translate-x-1/2 text-zinc-800 z-20 group-hover:text-[#8A5CF6] transition-colors duration-300">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="bg-[#8A5CF6]/10 border border-[#8A5CF6]/20 p-3 rounded-2xl text-[#C9A6FF] group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-zinc-800 group-hover:text-[#8A5CF6]/20 transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-white text-lg font-bold mb-3 tracking-wide uppercase group-hover:text-[#C9A6FF] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-[#A9A9A9] text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
