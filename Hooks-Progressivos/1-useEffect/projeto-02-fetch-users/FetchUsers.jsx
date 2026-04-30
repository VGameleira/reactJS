import { useState, useEffect } from 'react'
import './FetchUsers.css'

/**
 * 📌 PROJETO 02: BUSCAR USUÁRIOS DE API
 * 🎓 Conceitos: useEffect com fetch, try/catch, loading, erro
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - Fazer requisições HTTP com fetch
 * - Tratar estados: loading, erro, sucesso
 * - useEffect com array vazio (buscar dados na montagem)
 * - async/await dentro de useEffect
 */

function FetchUsers() {
  // 📊 Estados para gerenciar a requisição
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  // 🌍 Buscar usuários da API do GitHub
  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        setLoading(true)
        setErro(null)

        // 🌐 Fazer requisição à API pública do GitHub
        const resposta = await fetch('https://api.github.com/users?per_page=10')

        // ⚠️ Verificar se a resposta foi bem-sucedida
        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status}`)
        }

        // 📦 Converter resposta para JSON
        const dados = await resposta.json()

        // 💾 Guardar dados no estado
        setUsuarios(dados)
      } catch (erro) {
        // ❌ Se houver erro, armazenar mensagem
        console.error('Erro ao buscar usuários:', erro)
        setErro(erro.message)
      } finally {
        // ⏳ Sempre executado, independente de sucesso ou erro
        setLoading(false)
      }
    }

    buscarUsuarios()
  }, []) // ← Array vazio = executar apenas uma vez na montagem

  // 🎨 Renderizar estados diferentes
  if (loading) {
    return (
      <div className="container loading">
        <div className="spinner"></div>
        <p>⏳ Carregando usuários...</p>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="container erro">
        <h2>❌ Erro ao carregar usuários</h2>
        <p>{erro}</p>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>👥 Usuários do GitHub</h1>
      <p className="subtitle">Top 10 usuários mais ativos</p>

      <div className="usuarios-grid">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="usuario-card">
            <img src={usuario.avatar_url} alt={usuario.login} className="avatar" />
            <h3>{usuario.login}</h3>
            <p className="user-id">ID: {usuario.id}</p>
            <a href={usuario.html_url} target="_blank" rel="noopener noreferrer" className="btn-visit">
              Visitar Perfil →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FetchUsers

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Mudar para buscar dados de outra API pública (JSONPlaceholder, Random User, etc)
 * - Exibir mais informações de cada usuário
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Adicionar campo de busca: filtrar usuários por nome
 * - Adicionar botão "Carregar Mais"
 * - Permitir que o usuário escolha quantos usuários carregar
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Implementar paginação (primeiros 10, próximos 10, etc)
 * - Adicionar filtros: por linguagem de programação, seguidores, etc
 * - Cache: não fazer requisição novamente se já tem dados
 * - Implementar refresh/retry com botão
 */
