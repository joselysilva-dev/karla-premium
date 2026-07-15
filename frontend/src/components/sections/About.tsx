import { motion } from 'framer-motion'
import { Award, BookOpen, Star, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Certificação Internacional',
    description: 'Especialista em biomecânica aplicada, emagrecimento de alta performance e hipertrofia feminina.',
  },
  {
    icon: BookOpen,
    title: 'Metodologia Científica',
    description: 'Protocolos de treino baseados em evidências científicas modernas e ajustados às necessidades fisiológicas femininas.',
  },
  {
    icon: Star,
    title: 'Acompanhamento Premium',
    description: 'Muito além do treino: suporte exclusivo, orientação contínua e foco integral no seu estilo de vida e objetivos.',
  },
]

function About() {
  return (
    <section id="sobre" className="relative py-24 bg-[#0F0F14] overflow-hidden border-t border-zinc-900/50">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#8A5CF6]/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#C9A6FF]/3 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Visual Column / Image */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-md mx-auto border border-zinc-900 glow-premium bg-zinc-950"
            >
              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800"
                alt="Karla Karolynne - Personal Trainer Premium"
                className="w-full h-full object-cover object-center filter brightness-95 hover:brightness-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-[#0F0F14]/20 to-transparent" />
              
              {/* Overlaid premium status badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-5 rounded-2xl flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-2xl font-black text-[#8A5CF6]">10+ Anos</span>
                  <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">De Experiência</p>
                </div>
                <div className="h-8 w-px bg-zinc-800" />
                <div className="text-right">
                  <span className="text-2xl font-black text-white">CREF</span>
                  <p className="text-[#C9A6FF] text-xs font-bold uppercase tracking-wider">REGULARIZADO</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#8A5CF6] text-xs font-semibold tracking-widest uppercase block mb-3"
            >
              Sobre a Coach
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-extrabold text-[#F8F8F8] tracking-tight mb-6 leading-tight"
            >
              Muito além do treino. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A5CF6] to-[#C9A6FF]">Uma revolução em sua saúde e estética.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A9A9A9] text-base md:text-lg font-light leading-relaxed mb-8"
            >
              Olá, sou Karla Karolynne, idealizadora da metodologia Premium Coach. Minha missão é entregar um acompanhamento de altíssimo padrão, desenhado sob medida para mulheres modernas que buscam esculpir o corpo, elevar a saúde e atingir a máxima performance pessoal por meio de rotinas de treino dinâmicas, eficientes e cientificamente embasadas.
            </motion.p>

            <div className="space-y-6">
              {features.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="bg-[#8A5CF6]/10 border border-[#8A5CF6]/20 p-2.5 rounded-xl text-[#C9A6FF] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base mb-1 tracking-wide flex items-center gap-1.5 uppercase text-sm md:text-base">
                        {item.title}
                        {idx === 0 && <Sparkles className="w-4 h-4 text-[#C9A6FF] animate-pulse" />}
                      </h4>
                      <p className="text-[#A9A9A9] text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
