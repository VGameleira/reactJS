import { createContext, useContext, useState } from 'react'
import './ThemeSwitcher.css'

/**
 * 📌 PROJETO 16: THEME SWITCHER (Dark/Light Mode)
 * 🎓 Conceitos: createContext, useContext, Provider pattern
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - Criar contexto com createContext
 * - Usar useContext para consumir contexto
 * - Implementar tema global
 * - Provider pattern para estado global
 */

// 🎨 Criar contexto de tema
const TemaContext = createContext()

// 🪝 Custom hook para usar o contexto
function useTema() {
  const context = useContext(TemaContext)
  if (!context) {
    throw new Error('useTema deve ser usado dentro de TemaProvider')
  }
  return context
}

// 📦 Provider do tema
function TemaProvider({ children }) {
  const [tema, setTema] = useState(() => {
    // Tentar carregar do localStorage
    return localStorage.getItem('tema') || 'claro'
  })

  // 🔄 Trocar tema
  const trocarTema = () => {
    setTema((temaAtual) => {
      const novoTema = temaAtual === 'claro' ? 'escuro' : 'claro'
      localStorage.setItem('tema', novoTema)
      return novoTema
    })
  }

  const value = {
    tema,
    trocarTema,
    ehEscuro: tema === 'escuro',
    ehClaro: tema === 'claro',
  }

  return <TemaContext.Provider value={value}>{children}</TemaContext.Provider>
}

// 🎨 Componente de botão de tema
function BotaoTema() {
  const { ehEscuro, trocarTema } = useTema()

  return (
    <button onClick={trocarTema} className="btn-tema">
      {ehEscuro ? '☀️' : '🌙'}
    </button>
  )
}

// 📱 Componente de card
function Card({ titulo, conteudo }) {
  const { tema } = useTema()

  return (
    <div className={`card card-${tema}`}>
      <h3>{titulo}</h3>
      <p>{conteudo}</p>
    </div>
  )
}

// 📱 Componente Principal
function ThemeSwitcher() {
  const { tema, ehEscuro } = useTema()

  return (
    <div className={`theme-container ${tema}`}>
      <header className="header">
        <h1>🎨 Theme Switcher</h1>
        <BotaoTema />
      </header>

      <main className="main-content">
        <section className="info">
          <h2>Sobre o Context API</h2>
          <p>
            Tema atual: <strong>{tema === 'claro' ? 'Claro ☀️' : 'Escuro 🌙'}</strong>
          </p>
          <p>
            O contexto permite compartilhar estado sem precisar de props drilling (passar props
            através de múltiplos componentes).
          </p>
        </section>

        <div className="cards-grid">
          <Card titulo="📦 Context API" conteudo="Centralize estado global sem Redux" />
          <Card titulo="🪝 useContext Hook" conteudo="Consuma contexto em qualquer componente" />
          <Card titulo="🔄 Provider Pattern" conteudo="Implemente padrão reusável de contexto" />
          <Card titulo="💾 localStorage" conteudo="Persista preferências do usuário" />
        </div>

        <div className="exemplos">
          <h2>💡 Exemplo de Uso:</h2>
          <div className="exemplo-codigo">
            <code>
              {`// Criar Contexto
const TemaContext = createContext()

// Provider
function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro')
  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  )
}

// Usar em componente
function MeuComponente() {
  const { tema } = useContext(TemaContext)
  return <div>{tema}</div>
}`}
            </code>
          </div>
        </div>

        <div className="vantagens">
          <h2>✨ Vantagens do Context API:</h2>
          <ul>
            <li>✅ Evita prop drilling (passar props em múltiplos níveis)</li>
            <li>✅ Centraliza estado global</li>
            <li>✅ Simples de usar (sem bibliotecas extras)</li>
            <li>✅ Perfeito para pequenos/médios projetos</li>
            <li>✅ Bem integrado ao React</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

// 🎯 Componente wrapper
export default function ThemeSwitcherApp() {
  return (
    <TemaProvider>
      <ThemeSwitcher />
    </TemaProvider>
  )
}

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar mais temas (cores diferentes)
 * - Adicionar sistema de fonte
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Criar customizador de cores
 * - Persistir mais preferências
 * - Adicionar transições entre temas
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Integrar com múltiplos contextos
 * - Criar context combinado (tema + linguagem + auth)
 * - Implementar composição de providers
 * - Sistema completo de personalização
 */
