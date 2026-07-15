import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

function CTA() {
  return (
    <section className="relative py-24 bg-[#0F0F14] overflow-hidden border-t border-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Animated Banner Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-zinc-950 via-[#151521]/90 to-zinc-950 rounded-[2rem] border border-[#8A5CF6]/15 p-8 md:p-16 overflow-hidden glow-premium"
        >
          {/* Subtle light background circles */}
          <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#8A5CF6]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[#C9A6FF]/5 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl flex flex-col items-start text-left">
            <span className="bg-[#8A5CF6]/10 text-[#C9A6FF] border border-[#8A5CF6]/25 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-1.5 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Treino Inteligente e Resultados Reais
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#F8F8F8] tracking-tight uppercase leading-[1.1] mb-6">
              Pronta para esculpir seu corpo e <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A5CF6] via-[#C9A6FF] to-white font-black">transformar sua saúde?</span>
            </h2>

            <p className="text-[#A9A9A9] text-base md:text-lg font-light leading-relaxed mb-10 max-w-2xl">
              As vagas para o acompanhamento premium e individualizado são extremamente limitadas para garantir excelência de entrega. Dê o primeiro passo hoje mesmo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#contato"
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-sm tracking-wider text-white bg-[#8A5CF6] rounded-full transition duration-300 ease-out hover:scale-105 shadow-xl shadow-[#8A5CF6]/20 hover:shadow-[#8A5CF6]/40 w-full sm:w-auto text-center animate-bounce-slow"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#8A5CF6] to-[#C9A6FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                <span className="relative flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
                  Agendar Consultoria <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>

              <a
                href="https://wa.me/5584999999999?text=Ol%C3%A1%20Karla,%20gostaria%20de%20saber%20mais%20sobre%20a%20sua%20consultoria%20premium!"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-zinc-800 hover:border-[#8A5CF6]/50 text-white hover:text-[#C9A6FF] font-bold uppercase tracking-widest text-xs transition-all duration-300 bg-[#0F0F14]/55 hover:bg-[#8A5CF6]/5 backdrop-blur-md w-full sm:w-auto text-center"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default CTA
