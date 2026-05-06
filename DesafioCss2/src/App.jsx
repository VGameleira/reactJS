import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ServiceCard from './components/ServiceCard'
import ProductCard from './components/ProductCard'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import heroBanner from './assets/hero-banner.svg'
import logoGraphic from './assets/logo.svg'
import './App.css'

const services = [
  {
    icon: '✨',
    title: 'Brand Strategy',
    description: 'Posicionamento visual, storytelling e identidade para marcas memoráveis.',
  },
  {
    icon: '🎨',
    title: 'Produto Digital',
    description: 'Design de interfaces práticas, acessíveis e com foco em conversão.',
  },
  {
    icon: '⚡',
    title: 'Motion & UX',
    description: 'Micro-interações, animações e jornadas suaves que encantam o usuário.',
  },
  {
    icon: '🧠',
    title: 'Consultoria Criativa',
    description: 'Estratégias de produto e inovação para acelerar time-to-market.',
  },
]

const navItems = [
  { label: 'Início', href: '#home' },
  { label: 'Serviços', href: '#services' },
  { label: 'Produtos', href: '#products' },
  { label: 'Contato', href: '#contact' },
]

function App() {
  const [theme, setTheme] = useState('light')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('lumen-theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('lumen-theme', theme)
  }, [theme])

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const response = await fetch('https://fakestoreapi.com/products?limit=6')
        if (!response.ok) {
          throw new Error('Falha ao carregar os produtos')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const handleToggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const handleRemoveItem = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  return (
    <div className="app-shell">
      <Header
        logo={logoGraphic}
        brand="Lumen Studio"
        navItems={navItems}
        cartCount={cartCount}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenCart={() => setCartOpen(true)}
      />

      <main>

        <section className="services section" id="services">
          <div className="section-header fade-up" style={{ '--delay': '0.05s' }}>
            <span className="eyebrow">Serviços</span>
            <h2>Design estratégico para marcas que desejam escalar.</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </section>
        <section className="products section" id="products">
          <div className="section-header fade-up" style={{ '--delay': '0.05s' }}>
            <span className="eyebrow">Produtos</span>
            <h2>Catálogo de componentes e soluções digitais prontos para seu projeto.</h2>
          </div>

          {loading ? (
            <div className="status-box fade-up" style={{ '--delay': '0.08s' }}>
              <p>Buscando inspiração...</p>
            </div>
          ) : error ? (
            <div className="status-box fade-up" style={{ '--delay': '0.08s' }}>
              <p>{error}</p>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}
        </section>




          {/* <section className="hero-section section" id="home">
            <div className="hero-copy fade-up" style={{ '--delay': '0.08s' }}>
              <span className="eyebrow">Agência criativa</span>
              <h1>Criamos experiências digitais que brilham em qualquer dispositivo.</h1>
              <p>
                Da estratégia ao produto final, a Lumen Studio cria interfaces responsivas, intuitivas e com personalidade.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#products">Ver produtos</a>
                <a className="button button-secondary" href="#services">Nossos serviços</a>
              </div>
            </div>
            <div className="hero-visual fade-up" style={{ '--delay': '0.14s' }}>
              <img src={heroBanner} alt="Ilustração de produto digital" />
            </div>
          </section> */}
























          {/* 
        <section className="highlight section" id="contact">
          <div className="highlight-panel fade-up" style={{ '--delay': '0.05s' }}>
            <h2>Vamos transformar sua ideia em um produto digital de alto impacto.</h2>
            <p>
              Entre em contato e receba uma proposta personalizada com design, prototipagem e consultoria estratégica.
            </p>
            <a className="button button-primary" href="mailto:contato@lumenstudio.com">Fale conosco</a>
          </div>
        </section>
        
        <Footer />
        <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        /> */}
        </main>
    </div>
  )
}

export default App
