import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Elemento raiz "root" não encontrado.')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter><AuthProvider><App /></AuthProvider></BrowserRouter>
  </StrictMode>,
)
