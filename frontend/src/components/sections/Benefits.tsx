import { motion } from 'framer-motion'
import { ShieldAlert, Zap, Compass, Heart, CheckCircle } from 'lucide-react'

const benefitsList = [
  {
    icon: Zap,
    title: 'Resultados Visíveis e Rápidos',
    description: 'Diga adeus ao tempo perdido com treinos genéricos. Cada série, repetição e pausa são prescritas cirurgicamente para maximizar sua queima calórica e tônus muscular.',
  },
  {
    icon: ShieldAlert,
    title: 'Zero Risco de Lesões',
    description: 'Sua integridade física é prioridade absoluta. O direcionamento especializado foca em biomecânica perfeita, protegendo suas articulações (coluna, joelhos, ombros).',
  },
  {
    icon: Compass,
    title: 'Direcionamento Sob Medida',
    description: 'Protocolos criados a partir da análise da sua rotina, do seu nível de estresse e sono. O treino se adapta à sua vida, e não o contrário.',
  },
  {
    icon: Heart,
    title: 'Longevidade e Vitalidade',
    description: 'Durma melhor, regule seus hormônios, controle a ansiedade e desfrute de uma disposição inabalável para gerir seus negócios e sua vida pessoal.',
  },
]

function Benefits() {
  return (
    <section id="beneficios" className="relative py-24 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      {/* Spark blur background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Heading and Checklist */}
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-amber-500 text-xs font-semibold tracking-widest uppercase block mb-3"
            >
              Por Que Karla Valente?
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 uppercase"
            >
              A Escolha de Quem Busca <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Excelência</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-400 text-base md:text-lg mb-8 font-light leading-relaxed"
            >
              Não compre apenas fichas de exercícios. Invista em uma mentoria com quem entende de ciência esportiva e sabe como contornar as maiores barreiras do emagrecimento saudável e fortalecimento estético.
            </motion.p>

            {/* Micro checklist */}
            <div className="space-y-4">
              {['Acesso a aplicativo premium integrado', 'Treinos ajustados para viagens e hotéis', 'Estratégias nutricionais personalizadas', 'Check-ins semanais detalhados'].map((text, idx) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 text-zinc-300 font-medium text-sm md:text-base"
                >
                  <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Grid of Benefits */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {benefitsList.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-zinc-900/50 border border-zinc-850 p-6 md:p-8 rounded-3xl hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="bg-amber-500/10 border border-amber-500/25 p-3 rounded-2xl text-amber-500 shrink-0 mb-6 w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-white text-lg font-bold mb-3 uppercase tracking-wide group-hover:text-amber-400 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Benefits
