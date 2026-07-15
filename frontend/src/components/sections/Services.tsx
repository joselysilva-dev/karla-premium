import { motion } from 'framer-motion'
import { Dumbbell, Laptop, Target, Sparkles, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Dumbbell,
    title: 'Personal Training VIP',
    subtitle: 'Presencial de Alta Performance',
    description: 'Acompanhamento individualizado e focado em alta performance. Correção milimétrica de postura, intensidade calculada e periodização avançada.',
    details: ['Treino presencial VIP individualizado', 'Avaliação física por bioimpedância mensal', 'Acesso a canais de suporte premium', 'Ajuste em tempo real de carga'],
    popular: true,
  },
  {
    icon: Laptop,
    title: 'Consultoria Online Premium',
    subtitle: 'Liberdade e Resultados Globais',
    description: 'Ideal para quem viaja ou treina em horários variáveis. Planejamento completo entregue via aplicativo exclusivo com vídeos explicativos e feedbacks em áudio.',
    details: ['Ficha de treino atualizada quinzenalmente', 'Suporte direto no WhatsApp com Karla', 'Análise postural por fotos/vídeos', 'Guia de suplementação e nutrição'],
    popular: false,
  },
  {
    icon: Target,
    title: 'Recomposição Corporal',
    subtitle: 'Foco Estético e Definição',
    description: 'Protocolos integrados para quem busca eliminar gordura enquanto constrói massa muscular magra, esculpindo o corpo de forma harmônica e estética.',
    details: ['Treinos metabólicos de alta queima', 'Foco em pontos fracos do shape', 'Suporte comportamental contra ansiedade', 'Acompanhamento de medidas semanal'],
    popular: false,
  },
]

function Services() {
  return (
    <section id="servicos" className="relative py-24 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      {/* Glow Effects */}
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-amber-500 text-xs font-semibold tracking-widest uppercase block mb-3"
          >
            Nossos Serviços
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 uppercase"
          >
            Protocolos Exclusivos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Treinamento</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg"
          >
            Treinos desenhados sob medida para seu objetivo, integrando ciência física, nutrição estratégica e suporte emocional inabalável.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 border ${
                  service.popular
                    ? 'bg-zinc-900 border-amber-500 glow-gold'
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-amber-500/30'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-zinc-950 font-black text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-zinc-950" /> Mais Procurado
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-amber-500/10 border border-amber-500/25 p-3 rounded-2xl text-amber-500 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-bold uppercase tracking-tight">{service.title}</h3>
                      <p className="text-amber-500 text-xs font-semibold uppercase tracking-wider">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">{service.description}</p>

                  <div className="h-px bg-zinc-800 w-full mb-8" />

                  <ul className="space-y-4 mb-8">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-zinc-300 text-sm">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0 animate-pulse" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contato"
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
                    service.popular
                      ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow-lg shadow-amber-500/10'
                      : 'border border-zinc-700 hover:border-amber-500 text-white hover:text-amber-400 hover:bg-zinc-900'
                  }`}
                >
                  Garantir Minha Vaga <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
