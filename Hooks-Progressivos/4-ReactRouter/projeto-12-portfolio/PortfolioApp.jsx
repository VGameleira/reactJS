import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import './PortfolioApp.css'

/**
 * 📌 PROJETO 12: PORTFÓLIO COM ROTAS DINÂMICAS
 * 🎓 Conceitos: Múltiplas rotas, useParams, Link, Routes
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - Criar um portfólio profissional
 * - Usar rotas para seções
 * - Exibir detalhes dinâmicos
 * - Navegação entre projetos
 */

// 🎨 Dados dos projetos
const PROJETOS = [
  {
    id: 1,
    titulo: 'E-commerce Platform',
    descricao: 'Plataforma de e-commerce com React e Node.js',
    detalhes:
      'Desenvolvemos uma plataforma completa de e-commerce com carrinho de compras, pagamento integrado e dashboard administrativo.',
    tecnologias: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    imagem: '🛒',
    link: 'https://github.com',
  },
  {
    id: 2,
    titulo: 'Task Manager App',
    descricao: 'Aplicação de gerenciamento de tarefas',
    detalhes:
      'Um aplicativo de tarefas com sincronização em tempo real, categorias e integração com calendário.',
    tecnologias: ['React', 'Firebase', 'Material-UI'],
    imagem: '✅',
    link: 'https://github.com',
  },
  {
    id: 3,
    titulo: 'Social Network',
    descricao: 'Rede social em tempo real',
    detalhes:
      'Rede social com posts, comentários, sistema de amigos e notificações em tempo real usando WebSocket.',
    tecnologias: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
    imagem: '👥',
    link: 'https://github.com',
  },
  {
    id: 4,
    titulo: 'Analytics Dashboard',
    descricao: 'Dashboard com gráficos e análises',
    detalhes:
      'Dashboard interativo para visualização de dados com gráficos, filtros avançados e exportação de relatórios.',
    tecnologias: ['React', 'Chart.js', 'Python', 'Django'],
    imagem: '📊',
    link: 'https://github.com',
  },
]

// 🏠 Página Home
function Home() {
  return (
    <div className="home-section">
      <div className="hero">
        <h1>👨‍💻 Bem-vindo ao Meu Portfólio</h1>
        <p>Desenvolvedor Full Stack | React | Node.js | Python</p>
        <div className="hero-buttons">
          <Link to="/projetos" className="btn-primary">
            Ver Meus Projetos
          </Link>
          <a href="#contato" className="btn-secondary">
            Entrar em Contato
          </a>
        </div>
      </div>

      <div className="sobre-secao">
        <h2>Sobre Mim</h2>
        <p>
          Sou um desenvolvedor apaixonado por criar experiências web incríveis. Com mais de 5 anos
          de experiência, trabalho com as tecnologias mais modernas para entregar soluções de alta
          qualidade.
        </p>
      </div>

      <div className="skills-secao">
        <h2>Minhas Habilidades</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>Frontend</h3>
            <p>React, JavaScript, CSS3, HTML5</p>
          </div>
          <div className="skill-card">
            <h3>Backend</h3>
            <p>Node.js, Express, Python, Django</p>
          </div>
          <div className="skill-card">
            <h3>Banco de Dados</h3>
            <p>MongoDB, PostgreSQL, Firebase</p>
          </div>
          <div className="skill-card">
            <h3>DevOps</h3>
            <p>Docker, AWS, GitHub Actions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 📁 Página Lista de Projetos
function Projetos() {
  return (
    <div className="projetos-section">
      <h1>📁 Meus Projetos</h1>
      <div className="projetos-grid">
        {PROJETOS.map((projeto) => (
          <Link key={projeto.id} to={`/projeto/${projeto.id}`} className="projeto-card">
            <div className="projeto-imagem">{projeto.imagem}</div>
            <h3>{projeto.titulo}</h3>
            <p>{projeto.descricao}</p>
            <div className="projeto-tech">
              {projeto.tecnologias.slice(0, 2).map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// 📄 Página Detalhes do Projeto
function ProjetoDetalhes() {
  const { id } = useParams()
  const projeto = PROJETOS.find((p) => p.id === parseInt(id))

  if (!projeto) {
    return (
      <div className="projeto-detalhes">
        <h1>404 - Projeto não encontrado</h1>
        <Link to="/projetos">← Voltar para projetos</Link>
      </div>
    )
  }

  return (
    <div className="projeto-detalhes">
      <Link to="/projetos" className="btn-voltar">
        ← Voltar para projetos
      </Link>

      <article className="projeto-article">
        <div className="projeto-hero">
          <div className="projeto-icone">{projeto.imagem}</div>
          <h1>{projeto.titulo}</h1>
          <p className="projeto-descricao">{projeto.descricao}</p>
        </div>

        <section className="projeto-info">
          <h2>Sobre o Projeto</h2>
          <p>{projeto.detalhes}</p>
        </section>

        <section className="projeto-tecnologias">
          <h2>Tecnologias Utilizadas</h2>
          <div className="tech-list">
            {projeto.tecnologias.map((tech) => (
              <span key={tech} className="tech-item">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="projeto-actions">
          <h2>Ver Mais</h2>
          <div className="action-buttons">
            <a href={projeto.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
              📂 Ver no GitHub
            </a>
            <a href="#demo" className="btn-secondary">
              🌐 Ver Demo
            </a>
          </div>
        </section>

        {/* Projetos relacionados */}
        <section className="projetos-relacionados">
          <h2>Outros Projetos</h2>
          <div className="relacionados-grid">
            {PROJETOS.filter((p) => p.id !== projeto.id)
              .slice(0, 2)
              .map((p) => (
                <Link key={p.id} to={`/projeto/${p.id}`} className="pequeno-card">
                  <div className="card-icone">{p.imagem}</div>
                  <h4>{p.titulo}</h4>
                </Link>
              ))}
          </div>
        </section>
      </article>
    </div>
  )
}

// 📞 Página Contato
function Contato() {
  return (
    <div className="contato-section">
      <h1>📞 Entre em Contato</h1>
      <div className="contato-content">
        <div className="contato-info">
          <div className="info-item">
            <h3>📧 Email</h3>
            <p>seu.email@exemplo.com</p>
          </div>
          <div className="info-item">
            <h3>📱 Telefone</h3>
            <p>(11) 99999-9999</p>
          </div>
          <div className="info-item">
            <h3>📍 Localização</h3>
            <p>São Paulo, Brasil</p>
          </div>
        </div>

        <form className="contato-form">
          <div className="form-group">
            <label>Nome</label>
            <input type="text" placeholder="Seu nome" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="seu@email.com" required />
          </div>
          <div className="form-group">
            <label>Mensagem</label>
            <textarea placeholder="Sua mensagem" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}

// 📱 Componente Principal
function PortfolioApp() {
  return (
    <Router>
      {/* 📌 Header */}
      <header className="portfolio-header">
        <div className="header-wrapper">
          <Link to="/" className="portfolio-logo">
            👨‍💻 Meu Portfólio
          </Link>
          <nav className="portfolio-nav">
            <Link to="/">Home</Link>
            <Link to="/projetos">Projetos</Link>
            <Link to="/contato">Contato</Link>
          </nav>
        </div>
      </header>

      {/* 📄 Conteúdo */}
      <main className="portfolio-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/projeto/:id" element={<ProjetoDetalhes />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </main>

      {/* 🔗 Footer */}
      <footer className="portfolio-footer">
        <p>&copy; 2024 Meu Portfólio. Todos os direitos reservados.</p>
      </footer>
    </Router>
  )
}

export default PortfolioApp

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar mais projetos
 * - Adicionar links para redes sociais
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Adicionar filtro de tecnologias
 * - Adicionar ordenação de projetos
 * - Adicionar animações ao mudar rotas
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Integrar com API para carregar projetos
 * - Adicionar sistema de comentários
 * - Implementar dark mode
 * - Adicionar certificados/cursos
 */
