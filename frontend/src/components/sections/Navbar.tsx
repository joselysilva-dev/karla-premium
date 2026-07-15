import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex flex-col group">
            <span className="text-xl md:text-2xl font-black tracking-widest text-white uppercase group-hover:text-amber-400 transition-colors duration-300">
              KARLA<span className="text-amber-500 font-light">VALENTE</span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.25em] text-zinc-400 uppercase -mt-1 group-hover:text-white transition-colors duration-300">
              PREMIUM COACH
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold tracking-wide text-zinc-300 hover:text-amber-400 transition-colors duration-300 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden lg:block">
            <a
              href="#contato"
              className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-sm tracking-wider text-zinc-950 bg-amber-500 rounded-full group transition duration-300 ease-out hover:scale-105 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
              <span className="relative flex items-center gap-1.5 font-bold uppercase tracking-widest text-[11px]">
                Começar Agora <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-900 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="block text-base font-medium text-zinc-300 hover:text-amber-400 py-2 border-b border-zinc-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4">
                <a
                  href="#contato"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 text-zinc-950 bg-amber-500 hover:bg-amber-400 transition-colors rounded-full font-bold uppercase tracking-wider text-xs"
                >
                  Começar Agora <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
