import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Shield, Trophy, Activity, MessageCircle } from 'lucide-react'

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP elite performance entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    
    tl.fromTo(titleRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.1 }
    )
    
    tl.fromTo(descRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.8'
    )
    
    tl.fromTo(ctaRef.current, 
      { y: 25, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    )

    tl.fromTo(statsRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.5'
    )

    tl.fromTo(imageWrapperRef.current,
      { scale: 0.97, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' },
      '-=1.2'
    )
  }, [])

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-[#0F0F14] overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-20 lg:py-32"
    >
      {/* Heavy Mesh Pattern overlay for high-performance feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none z-0" />
      
      {/* Luxury Radial Backlight Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#8A5CF6]/12 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#C9A6FF]/6 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Copywriting & High Conversion Hook */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Athletic Live Status Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8A5CF6]/10 border border-[#8A5CF6]/20 text-[#C9A6FF] text-[11px] font-bold tracking-widest uppercase mb-6 self-start backdrop-blur-md"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8A5CF6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8A5CF6]"></span>
              </span>
              <Activity className="w-3.5 h-3.5 text-[#C9A6FF]" />
              <span>LIVE COACH: VAGAS VIP DISPONÍVEIS</span>
            </motion.div>

            {/* Title with Fluid Text Scaling to prevent cuts */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.05] uppercase mb-6"
            >
              Transforme seu corpo com <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A5CF6] via-[#C9A6FF] to-white font-black">estratégia</span> e acompanhamento personalizado.
            </h1>

            {/* Subtitle */}
            <p
              ref={descRef}
              className="text-[#A9A9A9] text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-8"
            >
              Treinamento personalizado para mulheres que desejam emagrecer, ganhar massa muscular e conquistar resultados reais.
            </p>

            {/* Super Responsive Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
              <a
                href="#contato"
                className="group relative inline-flex items-center justify-center px-8 py-4.5 overflow-hidden font-bold tracking-wider text-white bg-[#8A5CF6] rounded-xl transition duration-300 ease-out hover:scale-[1.03] shadow-lg shadow-[#8A5CF6]/30 hover:shadow-[#8A5CF6]/50 text-center text-xs uppercase min-h-[54px]"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#8A5CF6] to-[#C9A6FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                <span className="relative flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[11px]">
                  Agendar Consultoria <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>

              <a
                href="https://wa.me/5584999999999?text=Ol%C3%A1%20Karla,%20gostaria%20de%20saber%20mais%20sobre%20a%20sua%20consultoria%20premium!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4.5 rounded-xl border border-zinc-800 hover:border-[#8A5CF6]/60 text-white hover:text-[#C9A6FF] font-black uppercase tracking-widest text-[11px] transition-all duration-300 bg-[#0F0F14]/60 hover:bg-[#8A5CF6]/5 backdrop-blur-md text-center min-h-[54px] gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp
              </a>
            </div>

            {/* Tech HUD-style Stats Grid */}
            <div 
              ref={statsRef}
              className="mt-12 pt-8 border-t border-zinc-900/60 grid grid-cols-3 gap-4 sm:gap-6 max-w-lg"
            >
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none mb-1">+500</span>
                <span className="text-[10px] text-[#A9A9A9] uppercase font-bold tracking-widest leading-tight">Alunas Ativas</span>
              </div>
              <div className="flex flex-col border-l border-zinc-900 px-4 sm:px-6">
                <span className="text-2xl sm:text-3xl font-black text-[#8A5CF6] tracking-tight leading-none mb-1">100%</span>
                <span className="text-[10px] text-[#A9A9A9] uppercase font-bold tracking-widest leading-tight">Individual</span>
              </div>
              <div className="flex flex-col border-l border-zinc-900 px-4 sm:px-6">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none mb-1">99.4%</span>
                <span className="text-[10px] text-[#A9A9A9] uppercase font-bold tracking-widest leading-tight">Sucesso</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Performance Image Visual */}
          <div ref={imageWrapperRef} className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
            {/* Behind Ambient Light */}
            <div className="absolute w-[85%] h-[85%] rounded-3xl bg-gradient-to-tr from-[#8A5CF6]/25 to-[#C9A6FF]/5 blur-3xl z-0" />
            
            {/* Styled Portrait Frame */}
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden border border-[#8A5CF6]/15 shadow-2xl z-10 group bg-zinc-950">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1200')`,
                }}
              />
              {/* Bottom dynamic vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-transparent to-transparent opacity-80" />
            </div>

            {/* Smart Floating Badges - Absolute position refined for mobile safety (hidden on xs, elegant on sm) */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8, type: 'spring' }}
              className="hidden sm:flex absolute -right-4 top-[15%] glass-card rounded-2xl p-4 items-center gap-3 shadow-2xl max-w-[210px] z-20 border border-[#8A5CF6]/20"
            >
              <div className="bg-[#8A5CF6]/15 p-2.5 rounded-xl border border-[#8A5CF6]/20 shrink-0 text-[#C9A6FF]">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">MÉTODO PRO</h4>
                <p className="text-[#A9A9A9] text-[10px] leading-relaxed">Fisiologia avançada.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8, type: 'spring' }}
              className="hidden sm:flex absolute -left-4 bottom-[12%] glass-card rounded-2xl p-4 items-center gap-3 shadow-2xl max-w-[210px] z-20 border border-[#8A5CF6]/20"
            >
              <div className="bg-[#8A5CF6]/15 p-2.5 rounded-xl border border-[#8A5CF6]/20 shrink-0 text-[#C9A6FF]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">SEGURANÇA</h4>
                <p className="text-[#A9A9A9] text-[10px] leading-relaxed">Biomecânica perfeita.</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
