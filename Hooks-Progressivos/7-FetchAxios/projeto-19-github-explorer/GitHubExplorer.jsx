import { useState } from 'react'
import './GitHubExplorer.css'

/**
 * 📌 PROJETO 19: GITHUB API EXPLORER
 * 🎓 Conceitos: Fetch API, async/await, tratamento de erro
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - Usar Fetch API com GitHub
 * - Buscar usuários por nome
 * - Exibir repositories
 * - Tratamento de erros
 * - Estados de carregamento
 */

function GitHubExplorer() {
  // 🎯 Estados
  const [username, setUsername] = useState('')
  const [usuario, setUsuario] = useState(null)
  const [repositorios, setRepositorios] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)
  const [filtro, setFiltro] = useState('todos')

  // 🔍 Buscar usuário
  const buscarUsuario = async (e) => {
    e.preventDefault()

    if (!username.trim()) {
      setErro('Digite um nome de usuário!')
      return
    }

    setCarregando(true)
    setErro(null)
    setUsuario(null)
    setRepositorios([])

    try {
      // 📡 Buscar usuário
      const resUsuario = await fetch(`https://api.github.com/users/${username}`)

      if (!resUsuario.ok) {
        throw new Error('Usuário não encontrado!')
      }

      const dadosUsuario = await resUsuario.json()
      setUsuario(dadosUsuario)

      // 📡 Buscar repositórios
      const resRepos = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&order=desc`,
      )
      const dadosRepos = await resRepos.json()
      setRepositorios(dadosRepos)
    } catch (err) {
      setErro(err.message)
      setUsuario(null)
      setRepositorios([])
    } finally {
      setCarregando(false)
    }
  }

  // 🔽 Filtrar repositórios
  const reposiFiltrados = repositorios.filter((repo) => {
    if (filtro === 'python') return repo.language === 'Python'
    if (filtro === 'javascript') return repo.language === 'JavaScript'
    if (filtro === 'typescript') return repo.language === 'TypeScript'
    return true
  })

  return (
    <div className="github-container">
      <header className="github-header">
        <h1>🔍 GitHub Explorer</h1>
        <p>Explore usuários e repositórios do GitHub</p>
      </header>

      {/* Formulário de busca */}
      <form onSubmit={buscarUsuario} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite o nome do usuário (ex: torvalds)"
            className="search-input"
            disabled={carregando}
          />
          <button type="submit" className="btn-search" disabled={carregando}>
            {carregando ? '⏳ Buscando...' : '🔍 Buscar'}
          </button>
        </div>
      </form>

      {/* Mensagem de erro */}
      {erro && <div className="erro-msg">{erro}</div>}

      {/* Dados do usuário */}
      {usuario && (
        <div className="usuario-card">
          <img src={usuario.avatar_url} alt={usuario.login} className="avatar" />

          <div className="usuario-info">
            <h2>{usuario.name || usuario.login}</h2>
            <p className="bio">{usuario.bio || 'Sem bio'}</p>

            <div className="stats">
              <div className="stat">
                <span className="numero">{usuario.public_repos}</span>
                <span className="label">Repositórios</span>
              </div>
              <div className="stat">
                <span className="numero">{usuario.followers}</span>
                <span className="label">Seguidores</span>
              </div>
              <div className="stat">
                <span className="numero">{usuario.following}</span>
                <span className="label">Seguindo</span>
              </div>
            </div>

            <div className="usuario-details">
              {usuario.location && (
                <p>
                  📍 <strong>Localização:</strong> {usuario.location}
                </p>
              )}
              {usuario.blog && (
                <p>
                  🌐 <strong>Website:</strong> <a href={usuario.blog}>{usuario.blog}</a>
                </p>
              )}
              <p>
                📅 <strong>Membro desde:</strong> {new Date(usuario.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <a href={usuario.html_url} target="_blank" rel="noopener noreferrer" className="btn-github">
              👁️ Ver no GitHub
            </a>
          </div>
        </div>
      )}

      {/* Lista de repositórios */}
      {usuario && repositorios.length > 0 && (
        <div className="repos-section">
          <h2>📚 Repositórios ({reposiFiltrados.length})</h2>

          <div className="filtros">
            {['todos', 'javascript', 'python', 'typescript'].map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`btn-filtro ${filtro === f ? 'ativo' : ''}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="repos-grid">
            {reposiFiltrados.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-card"
              >
                <h3>{repo.name}</h3>
                <p>{repo.description || 'Sem descrição'}</p>

                <div className="repo-meta">
                  {repo.language && (
                    <span className="language">
                      💻 {repo.language}
                    </span>
                  )}
                  <span className="stars">⭐ {repo.stargazers_count}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mensagem vazia */}
      {usuario && repositorios.length === 0 && !carregando && (
        <div className="vazio">
          <p>Nenhum repositório encontrado para este usuário.</p>
        </div>
      )}
    </div>
  )
}

export default GitHubExplorer

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar busca por repositório específico
 * - Mostrar linguagens mais usadas
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Adicionar paginação de repositórios
 * - Filtrar por número de stars
 * - Mostrar trending repositories
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Integrar com autenticação GitHub (OAuth)
 * - Rate limiting handling
 * - Cache de resultados
 * - Visualizar contribuições do usuário
 */
