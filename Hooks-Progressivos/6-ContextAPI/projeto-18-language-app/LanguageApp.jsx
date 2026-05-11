import { createContext, useContext, useState } from 'react'
import './LanguageApp.css'

/**
 * 📌 PROJETO 18: LANGUAGE APP (Contexto de Linguagem)
 * 🎓 Conceitos: Context para i18n, useContext, objetos de tradução
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - Criar contexto de idioma (i18n)
 * - Tradução dinâmica
 * - Persistência de preferência de idioma
 * - Múltiplos idiomas
 */

// 📚 Traduções
const TRANSLATIONS = {
  pt: {
    titulo: '🌍 Seletor de Idioma',
    bemVindo: 'Bem-vindo ao nosso aplicativo!',
    selecione: 'Selecione seu idioma favorito',
    portugues: 'Português',
    ingles: 'Inglês',
    espanhol: 'Espanhol',
    recursos: 'Recursos',
    idioma: 'Idioma',
    sobre: 'Sobre',
    contato: 'Contato',
    sobreTexto:
      'Este aplicativo demonstra como usar Context API para gerenciar idiomas em uma aplicação React.',
    contatoTexto: 'Entre em contato conosco através do email: contato@email.com',
    recurso1: 'Suporte a múltiplos idiomas',
    recurso2: 'Tradução dinâmica sem recarregar',
    recurso3: 'Persistência de preferências',
    recurso4: 'Integração fácil',
  },
  en: {
    titulo: '🌍 Language Selector',
    bemVindo: 'Welcome to our application!',
    selecione: 'Select your favorite language',
    portugues: 'Portuguese',
    ingles: 'English',
    espanhol: 'Spanish',
    recursos: 'Features',
    idioma: 'Language',
    sobre: 'About',
    contato: 'Contact',
    sobreTexto:
      'This application demonstrates how to use Context API to manage languages in a React application.',
    contatoTexto: 'Contact us via email: contact@email.com',
    recurso1: 'Support for multiple languages',
    recurso2: 'Dynamic translation without reloading',
    recurso3: 'Preference persistence',
    recurso4: 'Easy integration',
  },
  es: {
    titulo: '🌍 Selector de Idioma',
    bemVindo: '¡Bienvenido a nuestra aplicación!',
    selecione: 'Selecciona tu idioma favorito',
    portugues: 'Portugués',
    ingles: 'Inglés',
    espanhol: 'Español',
    recursos: 'Características',
    idioma: 'Idioma',
    sobre: 'Acerca de',
    contato: 'Contacto',
    sobreTexto:
      'Esta aplicación demuestra cómo usar Context API para gestionar idiomas en una aplicación React.',
    contatoTexto: 'Contáctenos por correo electrónico: contacto@email.com',
    recurso1: 'Soporte para múltiples idiomas',
    recurso2: 'Traducción dinámica sin recargar',
    recurso3: 'Persistencia de preferencias',
    recurso4: 'Integración fácil',
  },
}

// 🌍 Criar contexto de idioma
const LanguageContext = createContext()

// 🪝 Custom hook
function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de LanguageProvider')
  }
  return context
}

// 📦 Provider de idioma
function LanguageProvider({ children }) {
  const [idioma, setIdioma] = useState(() => {
    return localStorage.getItem('idioma') || 'pt'
  })

  // 🔄 Mudar idioma
  const mudarIdioma = (novoIdioma) => {
    setIdioma(novoIdioma)
    localStorage.setItem('idioma', novoIdioma)
  }

  // 📄 Obter tradução
  const t = (chave) => {
    return TRANSLATIONS[idioma][chave] || `[${chave}]`
  }

  const value = {
    idioma,
    mudarIdioma,
    t,
    idiomas: ['pt', 'en', 'es'],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// 🎯 Selector de idioma
function SelectorIdioma() {
  const { idioma, mudarIdioma, t } = useLanguage()

  const nomes = {
    pt: t('portugues'),
    en: t('ingles'),
    es: t('espanhol'),
  }

  return (
    <div className="selector-idioma">
      <label>{t('idioma')}:</label>
      <div className="botoes-idioma">
        {['pt', 'en', 'es'].map((lang) => (
          <button
            key={lang}
            onClick={() => mudarIdioma(lang)}
            className={`btn-idioma ${idioma === lang ? 'ativo' : ''}`}
          >
            {nomes[lang]}
          </button>
        ))}
      </div>
    </div>
  )
}

// 🏠 Página Home
function Home() {
  const { t } = useLanguage()

  return (
    <div className="home">
      <h1>{t('titulo')}</h1>
      <p className="bem-vindo">{t('bemVindo')}</p>

      <div className="info-box">
        <h2>{t('sobre')}</h2>
        <p>{t('sobreTexto')}</p>
      </div>

      <div className="features">
        <h2>{t('recursos')}</h2>
        <div className="features-grid">
          <div className="feature">
            <span>✅</span>
            <p>{t('recurso1')}</p>
          </div>
          <div className="feature">
            <span>⚡</span>
            <p>{t('recurso2')}</p>
          </div>
          <div className="feature">
            <span>💾</span>
            <p>{t('recurso3')}</p>
          </div>
          <div className="feature">
            <span>🔧</span>
            <p>{t('recurso4')}</p>
          </div>
        </div>
      </div>

      <div className="contato-box">
        <h2>{t('contato')}</h2>
        <p>{t('contatoTexto')}</p>
      </div>
    </div>
  )
}

// 📱 Componente Principal
function LanguageApp() {
  const { t } = useLanguage()

  return (
    <div className="language-container">
      <header className="header-idioma">
        <h1>{t('titulo')}</h1>
        <SelectorIdioma />
      </header>

      <main className="main-idioma">
        <Home />
      </main>

      <div className="exemplos-codigo">
        <h2>💡 Exemplo de Uso:</h2>
        <div className="codigo">
          <code>
            {`// Usar a tradução em componente
function MeuComponente() {
  const { t } = useLanguage()
  
  return (
    <div>
      <h1>{t('titulo')}</h1>
      <p>{t('bemVindo')}</p>
    </div>
  )
}

// Mudar idioma
function SelectorIdioma() {
  const { idioma, mudarIdioma } = useLanguage()
  
  return (
    <button onClick={() => mudarIdioma('en')}>
      Mudar para Inglês
    </button>
  )
}`}
          </code>
        </div>
      </div>
    </div>
  )
}

// 🎯 Wrapper
export default function LanguageAppWrapper() {
  return (
    <LanguageProvider>
      <LanguageApp />
    </LanguageProvider>
  )
}

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar mais idiomas (francês, alemão, etc)
 * - Adicionar mais traduções
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Criar arquivo separado de traduções
 * - Adicionar formatação de data/número por idioma
 * - Sistema de detecção automática de idioma
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Integrar com biblioteca i18n profissional
 * - Tradução com variáveis (ex: "Olá, {nome}")
 * - Pluralização em diferentes idiomas
 * - Sistema de fallback para idiomas não disponíveis
 */
