import { motion } from 'framer-motion'
import { Dumbbell, Laptop, Target, Sparkles, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Dumbbell,
    title: 'Personal Training VIP',
    subtitle: 'Presencial de Alta Performance',
    description: 'Acompanhamento presencial individualizado e de alto padrão. Correção minuciosa da biomecânica, intensidade otimizada e periodização voltada à máxima performance estética.',
    details: ['Treino presencial VIP individualizado', 'Avaliação física por bioimpedância periódica', 'Acesso direto e suporte premium', 'Ajustes de carga e postura em tempo real'],
    popular: true,
  },
  {
    icon: Laptop,
    title: 'Consultoria Online Premium',
    subtitle: 'Liberdade e Resultados Globais',
    description: 'Ideal para mulheres modernas que viajam ou precisam de flexibilidade. Planejamento estratégico completo via aplicativo integrado com vídeos guiados e análises de execução.',
    details: ['Planejamento de treino personalizado via App', 'Análise postural e suporte por WhatsApp', 'Direcionamento de cárdio e intensidade', 'Feedbacks constantes para evolução rápida'],
    popular: false,
  },
  {
    icon: Target,
    title: 'Recomposição Corporal',
    subtitle: 'Foco Estético e Definição',
    description: 'Protocolo avançado focado na redução do percentual de gordura e ganho concomitante de massa magra, moldando a silhueta com elegância e proporção.',
    details: ['Prescrição de treinos altamente metabólicos', 'Foco em pontos fundamentais da estética feminina', 'Estratégia comportamental e controle de rotina', 'Acompanhamento fotográfico e de medidas semanais'],
    popular: false,
  },
]

function Services() {
  return (
    <section id="servicos" className="relative py-24 bg-[#0F0F14] overflow-hidden border-t border-zinc-900/50">
      {/* Glow Effects */}
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#8A5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-[#C9A6FF]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#8A5CF6] text-xs font-semibold tracking-widest uppercase block mb-3"
          >
            Nossos Serviços
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#F8F8F8] mb-6 leading-tight uppercase"
          >
            Protocolos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A5CF6] to-[#C9A6FF]">Treinamento Premium</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#A9A9A9] text-lg font-light"
          >
            Treinos perfeitamente desenhados para seu biotipo, integrando ciência física, consistência e acompanhamento exclusivo de alto padrão.
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
                    ? 'bg-[#151521]/70 border-[#8A5CF6] glow-premium'
                    : 'glass-card hover:border-[#8A5CF6]/30'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8A5CF6] text-[#F8F8F8] font-black text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-[#8A5CF6]/30">
                    <Sparkles className="w-3 h-3 fill-current" /> Mais Procurado
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#8A5CF6]/10 border border-[#8A5CF6]/25 p-3 rounded-2xl text-[#C9A6FF] shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-bold uppercase tracking-tight">{service.title}</h3>
                      <p className="text-[#C9A6FF] text-xs font-semibold uppercase tracking-wider">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-[#A9A9A9] text-sm leading-relaxed mb-8 font-light">{service.description}</p>

                  <div className="h-px bg-zinc-850 w-full mb-8" />

                  <ul className="space-y-4 mb-8">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-zinc-350 text-sm">
                        <span className="w-1.5 h-1.5 bg-[#8A5CF6] rounded-full mt-2 shrink-0 animate-pulse" />
                        <span className="font-light leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contato"
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
                    service.popular
                      ? 'bg-[#8A5CF6] text-white hover:bg-[#8A5CF6]/95 shadow-lg shadow-[#8A5CF6]/20'
                      : 'border border-zinc-800 hover:border-[#8A5CF6]/40 text-[#F8F8F8] hover:text-[#C9A6FF] hover:bg-zinc-900/40 backdrop-blur-sm'
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
