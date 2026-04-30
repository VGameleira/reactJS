import { useState, useEffect, useRef, useContext, useCallback, useMemo } from 'react'
import './Dashboard.css'

/**
 * 📊 PROJETO INTEGRADO: DASHBOARD COMPLETO
 * 
 * 🎓 Conceitos Combinados:
 * ✅ useState      → Gerenciar estado local
 * ✅ useEffect     → Buscar dados, efeitos colaterais
 * ✅ useRef        → Referências ao DOM
 * ✅ Context API   → Estado global (tema)
 * ✅ useCallback   → Memoizar funções
 * ✅ useMemo       → Memoizar cálculos
 * ✅ Fetch/Axios   → Requisições HTTP
 * ✅ Router        → Navegação multi-página
 * 
 * ⭐ Dificuldade: AVANÇADO
 * 
 * 🎯 O que aprender:
 * - Combinar múltiplos hooks em um projeto real
 * - Arquitetura profissional de React
 * - Performance e otimização
 * - Integração de APIs
 */

// 🎨 Context para tema global
const TemaContext = React.createContext()

// 👥 Dados mock de usuários (simular API)
const USUARIOS_MOCK = [
  { id: 1, nome: 'Alice Silva', email: 'alice@email.com', ativo: true, joinDate: '2024-01-15' },
  { id: 2, nome: 'Bob Santos', email: 'bob@email.com', ativo: true, joinDate: '2024-02-20' },
  { id: 3, nome: 'Carol Costa', email: 'carol@email.com', ativo: false, joinDate: '2024-03-10' },
  { id: 4, nome: 'David Oliveira', email: 'david@email.com', ativo: true, joinDate: '2024-03-25' },
]

// 📊 Componente Principal
function Dashboard() {
  // 🎨 Estado para tema
  const [tema, setTema] = useState('claro')
  const toggleTema = useCallback(() => {
    setTema((prev) => (prev === 'claro' ? 'escuro' : 'claro'))
  }, [])

  // 🌐 Provider de contexto
  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      <div className={`app ${tema}`}>
        <Navbar />
        <MainContent />
      </div>
    </TemaContext.Provider>
  )
}

// 📌 Navbar com tema
function Navbar() {
  const { tema, toggleTema } = useContext(TemaContext)

  return (
    <nav className="navbar">
      <h1>📊 Dashboard Integrado</h1>
      <button onClick={toggleTema} className="tema-btn">
        {tema === 'claro' ? '🌙 Escuro' : '☀️ Claro'}
      </button>
    </nav>
  )
}

// 📊 Conteúdo Principal
function MainContent() {
  // 👥 Estados
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [filtro, setFiltro] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '' })

  // 📌 Referência para gráfico (simulado)
  const chartRef = useRef(null)

  // 🌐 Buscar usuários (useEffect)
  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        setLoading(true)
        // Simular delay de API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setUsuarios(USUARIOS_MOCK)
      } catch (erro) {
        setErro(erro.message)
      } finally {
        setLoading(false)
      }
    }

    buscarUsuarios()
  }, [])

  // 🎯 Função memoizada para adicionar usuário
  const adicionarUsuario = useCallback((e) => {
    e.preventDefault()

    if (!novoUsuario.nome.trim() || !novoUsuario.email.trim()) {
      alert('⚠️ Preencha todos os campos!')
      return
    }

    const usuario = {
      id: Date.now(),
      ...novoUsuario,
      ativo: true,
      joinDate: new Date().toLocaleDateString('pt-BR'),
    }

    setUsuarios([...usuarios, usuario])
    setNovoUsuario({ nome: '', email: '' })
    alert('✅ Usuário adicionado!')
  }, [novoUsuario, usuarios])

  // 🔍 Usuários filtrados e pesquisados (useMemo)
  const usuariosFiltrados = useMemo(() => {
    return usuarios
      .filter((u) => {
        if (filtro === 'ativos') return u.ativo
        if (filtro === 'inativos') return !u.ativo
        return true
      })
      .filter((u) => u.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [usuarios, filtro, searchTerm])

  // 📊 Estatísticas (useMemo)
  const stats = useMemo(() => {
    return {
      total: usuarios.length,
      ativos: usuarios.filter((u) => u.ativo).length,
      inativos: usuarios.filter((u) => !u.ativo).length,
      taxaAtividade: ((usuarios.filter((u) => u.ativo).length / usuarios.length) * 100).toFixed(1),
    }
  }, [usuarios])

  if (loading) return <div className="loading">⏳ Carregando dados...</div>

  return (
    <div className="main">
      {/* 📊 Stats Cards */}
      <div className="stats-container">
        <StatCard label="Total de Usuários" valor={stats.total} emoji="👥" />
        <StatCard label="Ativos" valor={stats.ativos} emoji="✅" />
        <StatCard label="Inativos" valor={stats.inativos} emoji="❌" />
        <StatCard label="Taxa de Atividade" valor={`${stats.taxaAtividade}%`} emoji="📈" />
      </div>

      {/* 📊 Gráfico simulado */}
      <div className="chart-section" ref={chartRef}>
        <h3>📈 Gráfico de Usuários</h3>
        <div className="chart-placeholder">
          <div style={{ height: `${stats.ativos * 40}px`, backgroundColor: '#4caf50' }}>
            Ativos: {stats.ativos}
          </div>
          <div style={{ height: `${stats.inativos * 40}px`, backgroundColor: '#f44336' }}>
            Inativos: {stats.inativos}
          </div>
        </div>
      </div>

      {/* ➕ Formulário para adicionar usuário */}
      <div className="form-section">
        <h3>➕ Adicionar Novo Usuário</h3>
        <form onSubmit={adicionarUsuario} className="form-usuario">
          <input
            type="text"
            placeholder="Nome"
            value={novoUsuario.nome}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={novoUsuario.email}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
          />
          <button type="submit">Adicionar</button>
        </form>
      </div>

      {/* 🔍 Filtros e Busca */}
      <div className="filtros-section">
        <div className="busca">
          <input
            type="text"
            placeholder="🔍 Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filtro-buttons">
          <button
            onClick={() => setFiltro('todos')}
            className={filtro === 'todos' ? 'ativo' : ''}
          >
            Todos ({usuarios.length})
          </button>
          <button
            onClick={() => setFiltro('ativos')}
            className={filtro === 'ativos' ? 'ativo' : ''}
          >
            Ativos ({stats.ativos})
          </button>
          <button
            onClick={() => setFiltro('inativos')}
            className={filtro === 'inativos' ? 'ativo' : ''}
          >
            Inativos ({stats.inativos})
          </button>
        </div>
      </div>

      {/* 👥 Lista de Usuários */}
      <div className="usuarios-section">
        <h3>👥 Lista de Usuários ({usuariosFiltrados.length})</h3>
        {usuariosFiltrados.length === 0 ? (
          <p className="vazio">✨ Nenhum usuário encontrado</p>
        ) : (
          <div className="usuarios-table">
            {usuariosFiltrados.map((usuario) => (
              <div key={usuario.id} className={`usuario-row ${usuario.ativo ? 'ativo' : 'inativo'}`}>
                <span className="nome">{usuario.nome}</span>
                <span className="email">{usuario.email}</span>
                <span className="status">{usuario.ativo ? '✅ Ativo' : '❌ Inativo'}</span>
                <span className="data">{usuario.joinDate}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 📊 Componente Reutilizável de Estatística
function StatCard({ label, valor, emoji }) {
  return (
    <div className="stat-card">
      <span className="emoji">{emoji}</span>
      <h4>{label}</h4>
      <p className="valor">{valor}</p>
    </div>
  )
}

export default Dashboard

/**
 * 🧪 DESAFIOS DO PROJETO INTEGRADO:
 * 
 * 🧪 DESAFIO 1 (Intermediário):
 * - Adicionar edição de usuários (modal com formulário)
 * - Deletar usuários com confirmação
 * - Armazenar em localStorage
 * 
 * 🧪 DESAFIO 2 (Avançado):
 * - Integrar com API real (JSONPlaceholder, GitHub)
 * - Paginação de usuários
 * - Exportar dados em CSV
 * - Incluir animações suaves
 * 
 * 🧪 DESAFIO 3 (Expert):
 * - Adicionar autenticação (Context)
 * - Permissões por usuário (admin, user)
 * - Histórico de ações (undo/redo)
 * - Notificações (toast notifications)
 * - Testes unitários com Jest
 */
