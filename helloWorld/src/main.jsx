// Importando StrictMode do React para detectar problemas potenciais no código
import { StrictMode } from 'react'
// Importando createRoot do react-dom/client para renderizar a aplicação
import { createRoot } from 'react-dom/client'
// Importando estilos globais
import './index.css'
// Importando o componente principal App
import App from './App.jsx'

// Criando a raiz do React e renderizando a aplicação no elemento com id 'root'
// createRoot é a nova API para React 18, mais eficiente
createRoot(document.getElementById('root')).render(
  // Envolvendo o App em StrictMode para desenvolvimento (detecta bugs)
  <StrictMode>
    {/* Renderizando o componente App */}
    <App />
  </StrictMode>,
)
