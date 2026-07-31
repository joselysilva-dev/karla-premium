import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import HowItWorks from './components/sections/HowItWorks'
import Results from './components/sections/Results'
import Feedbacks from './components/sections/Feedbacks'
import Contact from './components/sections/Contact'
import AiAssistant from './components/sections/AiAssistant'
import Footer from './components/sections/Footer'

function App() {
  return (
    <div className="kk-app">
      <Navbar />

      <main>
        <Hero />

        <About />
        <Services />
        <HowItWorks />
        <Results />
        <Feedbacks />
        <Contact />
      </main>

      <Footer />
      <AiAssistant />
    </div>
  )
}

export default App
