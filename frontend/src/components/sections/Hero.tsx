import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Flame, Shield, Trophy } from 'lucide-react'

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP high performance entry animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.fromTo(bgRef.current, 
      { scale: 1.15, filter: 'brightness(0)' }, 
      { scale: 1, filter: 'brightness(0.65)', duration: 2.2, ease: 'power2.out' }
    )
    
    tl.fromTo(titleRef.current, 
      { y: 80, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 },
      '-=1.4'
    )
    
    tl.fromTo(descRef.current, 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.8'
    )
    
    tl.fromTo(ctaRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    )
  }, [])

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden pt-20"
    >
      {/* Background Image Container with Premium Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <div
          ref={bgRef}
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1920')`,
          }}
        />
        {/* Radial Dark overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/40 to-zinc-950/95" />
        {/* Bottom fade overlay */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
        {/* Right fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Main content column */}
          <div className="lg:col-span-8 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6 self-start">
              <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
              Treinamento de Elite Personalizado
            </div>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 uppercase"
            >
              Exija Sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500 font-black">Melhor Versão</span>
            </h1>

            <p
              ref={descRef}
              className="text-zinc-300 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10"
            >
              Eleve sua estética, triplique sua energia e conquiste o corpo dos seus sonhos através do acompanhamento de alto padrão da Personal Trainer <strong className="text-white font-semibold">Karla Valente</strong>. Protocolos sob medida para resultados extraordinários.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                href="#contato"
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-base tracking-wider text-zinc-950 bg-amber-500 rounded-full transition duration-300 ease-out hover:scale-105 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                <span className="relative flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
                  Agendar Sessão VIP <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>

              <a
                href="#sobre"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-zinc-700 hover:border-amber-500 text-white hover:text-amber-400 font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-zinc-900/50 w-full sm:w-auto"
              >
                Conhecer Método
              </a>
            </div>
          </div>

          {/* Side Floating Badges / Visual column */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-6 justify-center items-end">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
              className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 flex items-center gap-4 glow-gold max-w-[280px]"
            >
              <div className="bg-amber-500/20 p-3 rounded-xl border border-amber-500/20 shrink-0">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase">Fórmula de Campeã</h4>
                <p className="text-zinc-400 text-xs">Treinamento avançado baseado em ciência.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8, type: 'spring' }}
              className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 flex items-center gap-4 glow-gold max-w-[280px]"
            >
              <div className="bg-amber-500/20 p-3 rounded-xl border border-amber-500/20 shrink-0">
                <Shield className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase">100% Personalizado</h4>
                <p className="text-zinc-400 text-xs">Foco total no seu biotipo e rotina única.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
