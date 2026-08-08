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
import AdminApp from './features/admin/AdminApp'
import { AccountPage } from './features/auth/AccountPage'
import { AuthPage } from './features/auth/AuthPage'
import { ProtectedRoute } from './features/auth/ProtectedRoute'
import { useAuth } from './hooks/useAuth'

function App() {
  const { loading, session } = useAuth()
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (loading) {
    return <main className="auth-page"><p className="auth-loading">Carregando sessão…</p></main>
  }

  if (!session) {
    if (path === '/cadastro') return <AuthPage mode="signup" />
    if (path === '/recuperar-senha') return <AuthPage mode="recovery" />
    return <AuthPage mode="login" />
  }

  if (path.startsWith('/admin')) {
    return <AdminApp />
  }
  if (path === '/conta') return <ProtectedRoute><AccountPage /></ProtectedRoute>

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
