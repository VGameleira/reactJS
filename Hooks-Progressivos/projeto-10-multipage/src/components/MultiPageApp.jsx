import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './MultiPageApp.css'

function Home() {
  return (
    <div className="pagina">
      <h1> Bem-vindo!</h1>
      <p>Esta é a página inicial da aplicação.</p>
      <div className="card-grid">
        <div className="card">
          <h3> Aprenda React</h3>
          <p>Explore React Router para navegação SPA</p>
        </div>
        <div className="card">
          <h3> Navegue</h3>
          <p>Use os links no menu para explorar</p>
        </div>
        <div className="card">
          <h3> Pratique</h3>
          <p>Crie suas próprias aplicações</p>
        </div>
      </div>
    </div>
  )
}


function About() {
   return (
    <div className="pagina">
      <h1>ℹ️ Sobre</h1>
      <p>
        Esta aplicação demonstra como usar React Router para criar uma Single Page
        Application (SPA) com múltiplas páginas.
      </p>
      <h3>Recursos:</h3>
      <ul>
        <li>✅ Navegação sem recarregar a página</li>
        <li>✅ URLs dinâmicas</li>
        <li>✅ Histórico do navegador</li>
        <li>✅ Links internos</li>
      </ul>
    </div>
  )
}

function Contact() {
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => setEnviado(false), 3000)
  }

  return (
    <div className="pagina">
      <h1>📞 Contato</h1>

      {enviado && <div className="alerta-sucesso">✓ Mensagem enviada com sucesso!</div>}

      <form onSubmit={handleSubmit} className="form-contato">
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
        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  )
}

function NotFound() {
  return (
    <div className="pagina">
      <h1>404 - Página não encontrada</h1>
      <p>A página que você procura não existe.</p>
      <Link to="/" className="link-home">
        ← Voltar para home
      </Link>
    </div>
  )
}

//  Componente Principal
function MultiPageApp() {
  return (
    <Router>
      {/* 📌 Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            🌐 Multi-Page App
          </Link>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sobre">Sobre</Link>
            </li>
            <li>
              <Link to="/contato">Contato</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/*  Conteúdo */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/*  Footer */}
      <footer className="footer">
        <p>&copy; 2026 Multi-Page App.        </p>
      </footer>
    </Router>
  )
}

export default MultiPageApp
