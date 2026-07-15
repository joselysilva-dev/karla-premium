import { motion } from 'framer-motion'
import { Award, BookOpen, Star, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Certificação Internacional',
    description: 'Especialista em biomecânica aplicada e fisiologia do exercício pela IFBB Pro Academy.',
  },
  {
    icon: BookOpen,
    title: 'Metodologia Científica',
    description: 'Treinos estruturados com base em estudos clínicos recentes para queima acelerada de gordura e hipertrofia.',
  },
  {
    icon: Star,
    title: 'Mentoria Exclusiva',
    description: 'Suporte diário, ajuste de cargas e acompanhamento comportamental fora do horário de treino.',
  },
]

function About() {
  return (
    <section id="sobre" className="relative py-24 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Visual Column / Image */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-md mx-auto border border-zinc-800 glow-gold"
            >
              <img
                src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=800"
                alt="Karla Valente - Personal Trainer Premium"
                className="w-full h-full object-cover object-center filter hover:brightness-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              
              {/* Overlaid stat badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-amber-500">10+ Anos</span>
                  <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">De Experiência</p>
                </div>
                <div className="h-8 w-px bg-zinc-800" />
                <div className="text-right">
                  <span className="text-2xl font-black text-white">CREF</span>
                  <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider text-amber-500">041285-G</p>
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
              className="text-amber-500 text-xs font-semibold tracking-widest uppercase block mb-3"
            >
              Sobre a Coach
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 uppercase"
            >
              Muito além do treino. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Uma revolução de estilo de vida.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-300 text-base md:text-lg font-light leading-relaxed mb-8"
            >
              Eu sou Karla Valente, fundadora da KV Premium Training. Minha missão é extrair a sua máxima performance física e mental, desenhando protocolos de treino altamente eficientes baseados no seu perfil hormonal, estrutura biomecânica e objetivos estéticos.
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
                    <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-amber-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base mb-1 tracking-wide flex items-center gap-1.5 uppercase text-sm md:text-base">
                        {item.title}
                        {idx === 0 && <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />}
                      </h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
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
