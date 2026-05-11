import { useState, useEffect } from 'react'
import './MoviesApp.css'

/**
 * 📌 PROJETO 20: APLICATIVO DE FILMES
 * 🎓 Conceitos: Fetch, múltiplos endpoints, paginação, filtros
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - Buscar dados de múltiplos endpoints
 * - Implementar paginação
 * - Filtros dinâmicos
 * - Tratamento de imagens
 * - Estados de carregamento
 */

// 🎬 Dados mock de filmes
const FILMES_MOCK = [
  {
    id: 1,
    titulo: 'Inception',
    descricao: 'A corporate spy steals trade secrets from his competitors.',
    nota: 8.8,
    ano: 2010,
    poster: '🎬',
    genero: 'Ficção Científica',
    duracao: 148,
  },
  {
    id: 2,
    titulo: 'Interstellar',
    descricao: 'A team of explorers travel through a wormhole in space.',
    nota: 8.6,
    ano: 2014,
    poster: '🚀',
    genero: 'Ficção Científica',
    duracao: 169,
  },
  {
    id: 3,
    titulo: 'The Dark Knight',
    descricao: 'Batman must accept one of the greatest psychological challenges.',
    nota: 9.0,
    ano: 2008,
    poster: '🦇',
    genero: 'Ação',
    duracao: 152,
  },
  {
    id: 4,
    titulo: 'Pulp Fiction',
    descricao: 'The lives of two mob hitmen, a boxer, a gangster.',
    nota: 8.9,
    ano: 1994,
    poster: '🔫',
    genero: 'Crime',
    duracao: 154,
  },
  {
    id: 5,
    titulo: 'Gladiator',
    descricao: 'A former Roman General sets out to exact vengeance against the empire.',
    nota: 8.5,
    ano: 2000,
    poster: '⚔️',
    genero: 'Drama',
    duracao: 155,
  },
  {
    id: 6,
    titulo: 'The Matrix',
    descricao: 'A computer hacker learns about the true nature of reality.',
    nota: 8.7,
    ano: 1999,
    poster: '💊',
    genero: 'Ficção Científica',
    duracao: 136,
  },
]

function MoviesApp() {
  // 🎯 Estados
  const [filmes, setFilmes] = useState(FILMES_MOCK)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)
  const [busca, setBusca] = useState('')
  const [generoFiltro, setGeneroFiltro] = useState('todos')
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [filmesSelecionado, setFilmesSelecionado] = useState(null)

  const filmePorPagina = 6
  const generos = ['todos', 'Ficção Científica', 'Ação', 'Crime', 'Drama']

  // 🔽 Filtrar filmes
  const filmesFiltrados = filmes.filter((filme) => {
    const matchBusca = filme.titulo.toLowerCase().includes(busca.toLowerCase())
    const matchGenero = generoFiltro === 'todos' || filme.genero === generoFiltro
    return matchBusca && matchGenero
  })

  // 📄 Paginação
  const totalPaginas = Math.ceil(filmesFiltrados.length / filmePorPagina)
  const inicio = (paginaAtual - 1) * filmePorPagina
  const filmesExibidos = filmesFiltrados.slice(inicio, inicio + filmePorPagina)

  // 📡 Simular carregamento de dados
  useEffect(() => {
    setCarregando(true)
    const timer = setTimeout(() => {
      setCarregando(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [busca, generoFiltro])

  return (
    <div className="movies-container">
      <header className="movies-header">
        <h1>🎬 Cine Explore</h1>
        <p>Descubra os melhores filmes do cinema</p>
      </header>

      {/* Busca */}
      <div className="search-bar">
        <input
          type="text"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value)
            setPaginaAtual(1)
          }}
          placeholder="🔍 Busque por filme..."
          className="search-input-movies"
        />
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        <h3>Gênero:</h3>
        <div className="filtros-buttons">
          {generos.map((genero) => (
            <button
              key={genero}
              onClick={() => {
                setGeneroFiltro(genero)
                setPaginaAtual(1)
              }}
              className={`btn-filtro-movie ${generoFiltro === genero ? 'ativo' : ''}`}
            >
              {genero}
            </button>
          ))}
        </div>
      </div>

      {/* Informação de resultados */}
      <div className="resultados-info">
        <p>
          Mostrando <strong>{filmesExibidos.length}</strong> de{' '}
          <strong>{filmesFiltrados.length}</strong> filmes
        </p>
      </div>

      {/* Grid de filmes */}
      {!carregando && (
        <div className="filmes-grid">
          {filmesExibidos.map((filme) => (
            <div
              key={filme.id}
              className="filme-card"
              onClick={() => setFilmesSelecionado(filme)}
            >
              <div className="filme-poster">{filme.poster}</div>
              <h3>{filme.titulo}</h3>
              <p className="ano-duracao">
                {filme.ano} • {filme.duracao} min
              </p>
              <div className="filme-nota">
                <span className="nota">⭐ {filme.nota}</span>
                <span className="genero">{filme.genero}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estado vazio */}
      {!carregando && filmesExibidos.length === 0 && (
        <div className="vazio">
          <p>Nenhum filme encontrado com os filtros selecionados.</p>
        </div>
      )}

      {/* Paginação */}
      {!carregando && totalPaginas > 1 && (
        <div className="paginacao">
          <button
            onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
            disabled={paginaAtual === 1}
            className="btn-pagina"
          >
            ← Anterior
          </button>

          <div className="numeros-pagina">
            {Array.from({ length: totalPaginas }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPaginaAtual(i + 1)}
                className={`numero-pagina ${paginaAtual === i + 1 ? 'ativo' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
            disabled={paginaAtual === totalPaginas}
            className="btn-pagina"
          >
            Próxima →
          </button>
        </div>
      )}

      {/* Modal de detalhes */}
      {filmesSelecionado && (
        <div className="modal-backdrop" onClick={() => setFilmesSelecionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-fechar" onClick={() => setFilmesSelecionado(null)}>
              ✕
            </button>

            <div className="modal-header">
              <div className="modal-poster">{filmesSelecionado.poster}</div>
              <div className="modal-info">
                <h2>{filmesSelecionado.titulo}</h2>
                <p className="modal-meta">
                  {filmesSelecionado.ano} • {filmesSelecionado.duracao} min
                </p>
                <p className="modal-nota">⭐ {filmesSelecionado.nota}/10</p>
              </div>
            </div>

            <div className="modal-descricao">
              <h3>Sinopse</h3>
              <p>{filmesSelecionado.descricao}</p>
            </div>

            <div className="modal-footer">
              <span className="genero-badge">{filmesSelecionado.genero}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MoviesApp

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar mais filmes
 * - Adicionar favoritos
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Integrar com API real (TMDb, OMDb)
 * - Adicionar ordenação (nota, ano, título)
 * - Adicionar avaliação do usuário
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Implementar lista de desejos
 * - Recomendações baseadas em favoritos
 * - Cache de dados
 * - Integração com API de trailers
 */
