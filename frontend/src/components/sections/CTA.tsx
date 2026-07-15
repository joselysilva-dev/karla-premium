import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

function CTA() {
  return (
    <section className="relative py-24 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Animated Banner Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-950/40 rounded-[2rem] border border-zinc-800/80 p-8 md:p-16 overflow-hidden glow-gold"
        >
          {/* Subtle light background circles */}
          <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl flex flex-col items-start text-left">
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/25 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Treinos de Alta Performance
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.1] mb-6">
              Pronta para esculpir seu corpo e <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500">dominar sua rotina?</span>
            </h2>

            <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed mb-10 max-w-2xl">
              As vagas para o acompanhamento presencial individualizado são extremamente limitadas por conta da agenda. Preencha o formulário e agende hoje mesmo a sua triagem de saúde gratuita.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#contato"
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-sm tracking-wider text-zinc-950 bg-amber-500 rounded-full transition duration-300 ease-out hover:scale-105 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/45 w-full sm:w-auto text-center"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                <span className="relative flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
                  Agendar Minha Triagem <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>

              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-zinc-700 hover:border-amber-500 text-white hover:text-amber-400 font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-zinc-900/40 w-full sm:w-auto"
              >
                Falar com Karla no WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default CTA
