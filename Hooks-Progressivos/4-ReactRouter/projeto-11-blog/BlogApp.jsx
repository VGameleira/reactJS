import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import './BlogApp.css'

/**
 * 📌 PROJETO 11: BLOG COM ROTAS DINÂMICAS
 * 🎓 Conceitos: useParams, rotas dinâmicas, Link com parâmetros
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - Usar useParams para acessar parâmetros da URL
 * - Criar rotas dinâmicas (/post/:id)
 * - Passar dados via Link
 * - Listar e detalhar recursos
 */

// 📚 Dados dos posts
const POSTS = [
  {
    id: 1,
    titulo: 'Introdução a React',
    autor: 'João Silva',
    data: '2024-01-15',
    conteudo:
      'React é uma biblioteca JavaScript para construir interfaces de usuário. Aprenda os fundamentos...',
    contentoCompleto:
      'React é uma biblioteca JavaScript para construir interfaces de usuário com componentes. Ela usa JSX, um componente reutilizável que torna o código mais limpo e fácil de manter. Com React, você pode criar aplicações web modernas e responsivas.',
  },
  {
    id: 2,
    titulo: 'Dominando Hooks',
    autor: 'Maria Santos',
    data: '2024-01-20',
    conteudo:
      'Hooks são funções que permitem usar estado em componentes funcionais. Explore useState, useEffect...',
    contentoCompleto:
      'Hooks são funções especiais que permitem "pendurar" recursos de estado e ciclo de vida em componentes funcionais. Os principais hooks são useState para gerenciar estado, useEffect para efeitos colaterais, useRef para referências e muitos outros.',
  },
  {
    id: 3,
    titulo: 'React Router Completo',
    autor: 'Carlos Costa',
    data: '2024-01-25',
    conteudo:
      'Navegação em aplicações React com React Router. Crie rotas dinâmicas e protegidas...',
    contentoCompleto:
      'React Router é a biblioteca mais popular para roteamento em React. Permite criar navegação entre diferentes páginas sem recarregar a aplicação. Suporta rotas aninhadas, parâmetros dinâmicos, redirecionamentos e muito mais.',
  },
  {
    id: 4,
    titulo: 'Context API: Estado Global',
    autor: 'Ana Lima',
    data: '2024-02-01',
    conteudo:
      'Gerenciar estado global sem Redux usando Context API. Simples e poderoso...',
    contentoCompleto:
      'Context API fornece uma maneira de passar dados através da árvore de componentes sem ter que passar props manualmente em cada nível. Perfeita para temas, autenticação e configurações globais.',
  },
]

// 🏠 Página Lista de Posts
function BlogHome() {
  return (
    <div className="blog-home">
      <h1>📚 Blog</h1>
      <div className="posts-grid">
        {POSTS.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`} className="post-card">
            <div className="post-header">
              <h3>{post.titulo}</h3>
              <span className="post-date">{post.data}</span>
            </div>
            <p className="post-excerpt">{post.conteudo}</p>
            <div className="post-footer">
              <span className="post-author">By {post.autor}</span>
              <span className="read-more">Ler mais →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// 📄 Página Detalhe do Post
function PostDetail() {
  // 🔗 Obter ID da URL
  const { id } = useParams()

  // 🔍 Encontrar o post
  const post = POSTS.find((p) => p.id === parseInt(id))

  if (!post) {
    return (
      <div className="post-detail">
        <h1>404 - Post não encontrado</h1>
        <Link to="/" className="btn-voltar">
          ← Voltar para blog
        </Link>
      </div>
    )
  }

  return (
    <div className="post-detail">
      <Link to="/" className="btn-voltar">
        ← Voltar para blog
      </Link>

      <article className="post-article">
        <h1>{post.titulo}</h1>

        <div className="post-meta">
          <span className="meta-item">✍️ {post.autor}</span>
          <span className="meta-item">📅 {post.data}</span>
          <span className="meta-item">📖 5 min de leitura</span>
        </div>

        <div className="post-content">{post.contentoCompleto}</div>

        {/* Posts relacionados */}
        <div className="posts-relacionados">
          <h3>📌 Posts Relacionados</h3>
          <div className="relacionados-grid">
            {POSTS.filter((p) => p.id !== post.id)
              .slice(0, 3)
              .map((p) => (
                <Link key={p.id} to={`/post/${p.id}`} className="relacionado-card">
                  <h4>{p.titulo}</h4>
                  <p>{p.conteudo}</p>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </div>
  )
}

// 📱 Componente Principal
function BlogApp() {
  return (
    <Router>
      {/* 📌 Header */}
      <header className="blog-header">
        <div className="header-container">
          <Link to="/" className="blog-logo">
            📚 Meu Blog
          </Link>
          <nav className="blog-nav">
            <Link to="/">Home</Link>
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>
      </header>

      {/* 📄 Conteúdo */}
      <main className="blog-container">
        <Routes>
          <Route path="/" element={<BlogHome />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </main>

      {/* 🔗 Footer */}
      <footer className="blog-footer">
        <p>&copy; 2024 Meu Blog. Todos os direitos reservados.</p>
      </footer>
    </Router>
  )
}

export default BlogApp

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar mais posts (10+)
 * - Adicionar categorias
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Adicionar página de categoria (/category/:name)
 * - Filtrar posts por categoria
 * - Adicionar busca por título
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Integrar com API real
 * - Adicionar comentários
 * - Implementar paginação
 * - Adicionar ratings/likes
 */
