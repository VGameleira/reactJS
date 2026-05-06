import { useState } from 'react'

function Header({ logo, brand, navItems, cartCount, theme, onToggleTheme, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="brand-bar">
        <a className="brand-link" href="#home">
          <img src={logo} alt="Lumen Studio logo" className="brand-mark" />
          <div>
            <span className="brand-name">{brand}</span>
            <small className="brand-tag">Design & Digital Products</small>
          </div>
        </a>
        <button
          className="icon-button theme-toggle"
          type="button"
          aria-label="Toggle theme"
          onClick={onToggleTheme}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      <nav className={`site-nav ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="actions-bar">
        <button className="button button-secondary" type="button" onClick={onOpenCart}>
          Cart <span className="cart-badge">{cartCount}</span>
        </button>
        <button
          className="icon-button menu-trigger"
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span aria-hidden="true">☰</span>
        </button>
      </div>
    </header>
  )
}

export default Header
