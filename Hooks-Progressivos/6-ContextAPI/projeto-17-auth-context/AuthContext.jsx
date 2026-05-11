import { createContext, useContext, useState } from 'react'
import './AuthContext.css'

/**
 * 📌 PROJETO 17: AUTH CONTEXT (Autenticação)
 * 🎓 Conceitos: Context para autenticação, useContext, Provider pattern
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - Criar contexto de autenticação
 * - Gerenciar estado de login
 * - Proteger rotas com contexto
 * - Persistir autenticação
 */

// 🔐 Criar contexto de autenticação
const AuthContext = createContext()

// 🪝 Custom hook
function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

// 📦 Provider de autenticação
function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem('usuario')
    return salvo ? JSON.parse(salvo) : null
  })

  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  // 🔓 Login
  const login = async (email, senha) => {
    setCarregando(true)
    setErro(null)

    try {
      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Validação simples
      if (!email.includes('@') || senha.length < 3) {
        throw new Error('Email ou senha inválidos')
      }

      const novoUsuario = {
        id: Date.now(),
        email,
        nome: email.split('@')[0],
        logadoEm: new Date().toLocaleString('pt-BR'),
      }

      setUsuario(novoUsuario)
      localStorage.setItem('usuario', JSON.stringify(novoUsuario))
    } catch (err) {
      setErro(err.message)
      setUsuario(null)
    } finally {
      setCarregando(false)
    }
  }

  // 🔐 Logout
  const logout = () => {
    setUsuario(null)
    localStorage.removeItem('usuario')
    setErro(null)
  }

  // 🆕 Registrar
  const registrar = async (email, senha, confirmarSenha) => {
    setCarregando(true)
    setErro(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      if (!email.includes('@')) {
        throw new Error('Email inválido')
      }

      if (senha !== confirmarSenha) {
        throw new Error('Senhas não conferem')
      }

      if (senha.length < 6) {
        throw new Error('Senha deve ter no mínimo 6 caracteres')
      }

      const novoUsuario = {
        id: Date.now(),
        email,
        nome: email.split('@')[0],
        logadoEm: new Date().toLocaleString('pt-BR'),
      }

      setUsuario(novoUsuario)
      localStorage.setItem('usuario', JSON.stringify(novoUsuario))
    } catch (err) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  const value = {
    usuario,
    estaAutenticado: !!usuario,
    carregando,
    erro,
    login,
    logout,
    registrar,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 🏠 Página Home (Quando autenticado)
function Home() {
  const { usuario, logout } = useAuth()

  return (
    <div className="home">
      <h1>🏠 Bem-vindo, {usuario.nome}!</h1>

      <div className="usuario-info">
        <div className="info-item">
          <span>📧 Email:</span>
          <strong>{usuario.email}</strong>
        </div>
        <div className="info-item">
          <span>📅 Logado em:</span>
          <strong>{usuario.logadoEm}</strong>
        </div>
      </div>

      <div className="features">
        <h2>Funcionalidades:</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📊 Dashboard</h3>
            <p>Visualize seus dados e análises</p>
          </div>
          <div className="feature-card">
            <h3>⚙️ Configurações</h3>
            <p>Personalize sua experiência</p>
          </div>
          <div className="feature-card">
            <h3>📧 Notificações</h3>
            <p>Receba atualizações importantes</p>
          </div>
          <div className="feature-card">
            <h3>👥 Perfil</h3>
            <p>Edite suas informações</p>
          </div>
        </div>
      </div>

      <button onClick={logout} className="btn-logout">
        🔓 Sair
      </button>
    </div>
  )
}

// 🔓 Formulário de Login/Registrar
function FormuarioAuth() {
  const { login, registrar, carregando, erro } = useAuth()
  const [isRegistro, setIsRegistro] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isRegistro) {
      await registrar(email, senha, confirmarSenha)
    } else {
      await login(email, senha)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isRegistro ? '🆕 Registrar' : '🔐 Login'}</h1>

        {erro && <div className="erro-box">{erro}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={carregando}
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
              required
              disabled={carregando}
            />
          </div>

          {isRegistro && (
            <div className="form-group">
              <label>Confirmar Senha</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirme a senha"
                required
                disabled={carregando}
              />
            </div>
          )}

          <button type="submit" className="btn-submit" disabled={carregando}>
            {carregando ? '⏳ Aguarde...' : isRegistro ? '📝 Registrar' : '🔓 Entrar'}
          </button>
        </form>

        <button
          onClick={() => setIsRegistro(!isRegistro)}
          className="btn-toggle"
          disabled={carregando}
        >
          {isRegistro ? 'Já tem conta? Faça login' : 'Não tem conta? Registre-se'}
        </button>

        <div className="test-info">
          <p>
            <strong>Teste:</strong> Email: test@email.com | Senha: 123456
          </p>
        </div>
      </div>
    </div>
  )
}

// 📱 Componente Principal
function AuthContextApp() {
  const { estaAutenticado } = useAuth()

  return (
    <div className="auth-app">
      {estaAutenticado ? <Home /> : <FormuarioAuth />}
    </div>
  )
}

// 🎯 Wrapper
export default function AuthApp() {
  return (
    <AuthProvider>
      <AuthContextApp />
    </AuthProvider>
  )
}

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar "Lembrar-me"
 * - Adicionar validação de força de senha
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Adicionar recuperação de senha
 * - Adicionar verificação de email
 * - Integrar com API real
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Implementar proteção de rotas
 * - Adicionar refresh tokens
 * - Sistema de permissões (admin, user)
 * - Integração com OAuth
 */
