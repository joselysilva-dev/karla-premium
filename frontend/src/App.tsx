import { Navigate, Route, Routes } from 'react-router-dom'
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
import { StudentApp } from './features/student/StudentApp'
import { AuthPage } from './features/auth/AuthPage'
import { PremiumRoute } from './features/auth/PremiumRoute'
import { ProtectedRoute } from './features/auth/ProtectedRoute'
import { useAuth } from './hooks/useAuth'

function LandingPage() {
  return (
    <div className="kk-app">
      <Navbar />
      <main><Hero /><About /><Services /><HowItWorks /><Results /><Feedbacks /><Contact /></main>
      <Footer />
      <AiAssistant />
    </div>
  )
}

function App() {
  const { loading, session } = useAuth()

  if (loading) return <main className="auth-page"><p className="auth-loading">Carregando sessão…</p></main>

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={session ? <Navigate to="/minha-conta" replace /> : <AuthPage mode="login" />} />
      <Route path="/cadastro" element={<Navigate to="/login" replace />} />
      <Route path="/recuperar-senha" element={<AuthPage mode="recovery" />} />

      <Route element={<PremiumRoute />}>
        <Route path="/minha-conta/*" element={<StudentApp />} />
        <Route path="/conta" element={<Navigate to="/minha-conta" replace />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/admin/*" element={<AdminApp />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App