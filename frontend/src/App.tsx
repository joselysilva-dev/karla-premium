import { useEffect } from 'react'
import Lenis from 'lenis'
import About from './components/sections/About'
import Benefits from './components/sections/Benefits'
import Contact from './components/sections/Contact'
import CTA from './components/sections/CTA'
import Footer from './components/sections/Footer'
import Hero from './components/sections/Hero'
import Navbar from './components/sections/Navbar'
import Services from './components/sections/Services'
import HowItWorks from './components/sections/HowItWorks'
import Results from './components/sections/Results'
import Testimonials from './components/sections/Testimonials'
import FAQ from './components/sections/FAQ'

function App() {
  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0F0F14] text-[#F8F8F8] selection:bg-[#8A5CF6] selection:text-[#0F0F14]">
      {/* Premium subtle layout gradient backdrop overlay */}
      <div className="absolute top-0 left-0 w-full h-[100vh] bg-gradient-to-b from-[#8A5CF6]/5 via-transparent to-transparent pointer-events-none z-0" />
      
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Benefits />
        <Services />
        <HowItWorks />
        <Results />
        <Testimonials />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
