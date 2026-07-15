import { ArrowUp } from 'lucide-react'

function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 overflow-hidden">
      {/* Subtle bottom light element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[100px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          
          {/* Logo Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="#inicio" className="flex flex-col mb-4 group">
              <span className="text-xl md:text-2xl font-black tracking-widest text-white uppercase group-hover:text-amber-400 transition-colors duration-300">
                KARLA<span className="text-amber-500 font-light">VALENTE</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-zinc-400 uppercase -mt-1 group-hover:text-white transition-colors duration-300">
                PREMIUM COACH
              </span>
            </a>
            
            <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6 max-w-sm">
              Metodologia de ponta unindo biomecânica avançada, fisiologia de alta performance e suporte exclusivo para transformar de forma definitiva o seu físico e sua saúde.
            </p>

            {/* Social media icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="bg-zinc-900 border border-zinc-800 hover:border-amber-500 p-2.5 rounded-xl text-zinc-400 hover:text-amber-500 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="bg-zinc-900 border border-zinc-800 hover:border-amber-500 p-2.5 rounded-xl text-zinc-400 hover:text-amber-500 transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="bg-zinc-900 border border-zinc-800 hover:border-amber-500 p-2.5 rounded-xl text-zinc-400 hover:text-amber-500 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3">
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">Navegação</h4>
            <ul className="space-y-3">
              {[
                { label: 'Início', href: '#inicio' },
                { label: 'Sobre', href: '#sobre' },
                { label: 'Serviços', href: '#servicos' },
                { label: 'Benefícios', href: '#beneficios' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-400 hover:text-amber-400 text-sm font-medium transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Results column */}
          <div className="md:col-span-3">
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">Resultados & Depoimentos</h4>
            <ul className="space-y-3">
              {[
                { label: 'Casos de Sucesso', href: '#resultados' },
                { label: 'Depoimentos de Alunas', href: '#depoimentos' },
                { label: 'Triagem Inicial', href: '#contato' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-400 hover:text-amber-400 text-sm font-medium transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Scroll to top button */}
          <div className="md:col-span-1 flex items-start justify-end">
            <button
              onClick={handleScrollToTop}
              className="bg-zinc-900 border border-zinc-800 hover:border-amber-500 hover:text-amber-500 p-3 rounded-xl text-zinc-400 transition-all duration-300 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>

        </div>

        <div className="h-px bg-zinc-900 w-full mb-8" />

        {/* Copyright section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-zinc-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} KV Premium Training. Todos os direitos reservados. CREF 041285-G/SP.
          </p>
          <p className="text-zinc-600 text-xs font-light">
            Desenvolvido por <span className="text-zinc-500 font-medium hover:text-amber-500 transition-colors">Karla Premium Team</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
