// ============================================================
// Header.jsx - Barra de navegação do site
// ============================================================
// Este componente recebe todas as informações via "props"
// (propriedades passadas pelo componente pai, o App.jsx).
// Ele é responsável pelo logo, navegação, tema e carrinho.
// ============================================================

// useState é um "gancho" (hook) do React.
// Ele cria uma variável que, quando muda, re-renderiza o componente.
import { useState } from 'react'

// O componente recebe várias props entre chaves - é uma desestruturação.
// É o mesmo que fazer: const logo = props.logo; const brand = props.brand; etc.
function Header({ logo, brand, navItems, cartCount, theme, onToggleTheme, onOpenCart }) {

  // menuOpen controla se o menu mobile está aberto ou fechado.
  // useState(false) significa que começa fechado.
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    // <header> é uma tag semântica do HTML - diz ao navegador (e leitores de tela)
    // que este bloco é o cabeçalho da página.
    <header className="site-header">

      {/* - Bloco 1: Logo e nome da marca - */}
      <div className="brand-bar">
        <a className="brand-link" href="#home">
          {/* alt="" descreve a imagem para acessibilidade (leitores de tela) */}
          <img src={logo} alt="Lumen Studio logo" className="brand-mark" />
          <div>
            {/* brand é a prop com o nome "Lumen Studio" vinda do App.jsx */}
            <span className="brand-name">{brand}</span>
            <small className="brand-tag">Design & Digital Products</small>
          </div>
        </a>
      </div>

      {/* - Bloco 2: Links de navegação -
          A classe "open" é adicionada dinamicamente com template string.
          Quando menuOpen = true  → className = "site-nav open"
          Quando menuOpen = false → className = "site-nav "          */}
      <nav className={`site-nav ${menuOpen ? 'open' : ''}`} aria-label="Navegação principal">
        <ul>
          {/* .map() percorre o array navItems e cria um <li> para cada item.
              A prop key é obrigatória no React quando usamos .map() -
              ela ajuda o React a identificar cada elemento da lista. */}
          {navItems.map((item) => (
            <li key={item.href}>
              {/* onClick fecha o menu ao clicar num link (útil no mobile) */}
              <a href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* - Bloco 3: Botões de ação (tema, carrinho, menu mobile) - */}
      <div className="actions-bar">

        {/* Botão de alternar tema claro/escuro.
            onToggleTheme é uma função passada pelo App.jsx - o Header
            não sabe COMO trocar o tema, só avisa o pai para fazer isso. */}
        <button
          className="icon-button theme-toggle"
          type="button"
          aria-label="Alternar tema claro/escuro"
          onClick={onToggleTheme}
        >
          {/* Operador ternário: se tema for 'dark' mostra sol, senão mostra lua */}
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Botão do carrinho - também avisa o pai para abrir o drawer */}
        <button className="button button-secondary cart-button" type="button" onClick={onOpenCart}>
          🛒 Carrinho
          {/* cartCount vem do App.jsx e mostra quantos itens há no carrinho */}
          <span className="cart-badge">{cartCount}</span>
        </button>

        {/* Botão do menu hambúrguer - só aparece no mobile (via CSS) */}
        <button
          className="icon-button menu-trigger"
          type="button"
          aria-label="Abrir menu de navegação"
          onClick={() => setMenuOpen((valorAtual) => !valorAtual)}
          // !valorAtual inverte: se era true vira false, e vice-versa
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>

      </div>
    </header>
  )
}

export default Header