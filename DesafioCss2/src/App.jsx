// ============================================================
// App.jsx - Componente raiz da aplicação
// ============================================================
// Este é o componente principal. Ele:
//   1. Guarda o estado global (tema, carrinho, produtos)
//   2. Busca produtos da API (ou usa dados estáticos)
//   3. Renderiza todos os outros componentes
// ============================================================

// Importações do React - hooks que vamos usar:
import { useEffect, useMemo, useState } from 'react'

// Importação dos componentes filhos
import Header from './components/Header'
import ServiceCard from './components/ServiceCard'
import ProductCard from './components/ProductCard'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

// Importação dos assets (imagens)
import heroBanner from './assets/hero-banner.svg'
import logoGraphic from './assets/logo.svg'

// Importação dos produtos estáticos (fallback sem API)
import staticProducts from './data/staticProducts'

// Importação do CSS global do App
import './App.css'

// ============================================================
// ⚙️ CONFIGURAÇÃO RÁPIDA
// ============================================================
// Mude USE_API para false se quiser usar os produtos estáticos
// (sem precisar de internet ou da fakestoreapi.com).
// true  → busca da API fakestoreapi.com
// false → usa os produtos do arquivo staticProducts.js
const USE_API = true

// ============================================================
// DADOS FIXOS
// ============================================================

// Array de serviços - ficam fixos, não vêm de API
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

// Itens do menu de navegação
const navItems = [
  { label: 'Início',    href: '#home' },
  { label: 'Serviços', href: '#services' },
  { label: 'Produtos', href: '#products' },
  { label: 'Contato',  href: '#contact' },
]

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
function App() {

  // - Estados da aplicação -----------------
  // useState cria uma variável reativa + uma função para atualizá-la.
  // Sintaxe: const [variavel, setVariavel] = useState(valorInicial)

  const [theme, setTheme]       = useState('light')   // 'light' ou 'dark'
  const [products, setProducts] = useState([])         // lista de produtos
  const [loading, setLoading]   = useState(true)       // se está carregando
  const [error, setError]       = useState(null)       // mensagem de erro ou null
  const [cartOpen, setCartOpen] = useState(false)      // se o carrinho está aberto
  const [cartItems, setCartItems] = useState([])       // itens no carrinho


  // - Efeito 1: Carregar tema salvo no localStorage ----─
  // useEffect roda código "depois" que o componente aparece na tela.
  // O array vazio [] no segundo argumento significa "rode só uma vez, ao montar".
  useEffect(() => {
    const savedTheme = window.localStorage.getItem('lumen-theme')
    // localStorage guarda dados no navegador mesmo após fechar a aba
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme)
    }
  }, []) // [] = rode só na primeira renderização


  // - Efeito 2: Aplicar tema ao <html> e salvar ------─
  // Roda sempre que "theme" muda ([theme] no array de dependências).
  useEffect(() => {
    // dataset permite adicionar atributos data-* ao elemento HTML.
    // Resulta em: <html data-theme="dark"> ou <html data-theme="light">
    // O CSS usa isso para trocar as cores via variáveis CSS.
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('lumen-theme', theme)
  }, [theme]) // rode sempre que "theme" mudar


  // - Efeito 3: Buscar produtos --------------─
  useEffect(() => {

    // Se USE_API for false, usa os produtos estáticos diretamente
    if (!USE_API) {
      setProducts(staticProducts)
      setLoading(false)
      return // para a execução aqui - não vai buscar da API
    }

    // Função assíncrona para buscar dados da API.
    // Precisamos criar uma função dentro do useEffect porque
    // o useEffect em si não pode ser async diretamente.
    async function loadProducts() {
      try {
        setLoading(true)

        // fetch faz uma requisição HTTP para a URL da API
        const response = await fetch('https://fakestoreapi.com/products?limit=6')

        // Se a resposta não foi OK (ex: 404, 500), lança um erro
        if (!response.ok) {
          throw new Error('Não conseguimos carregar os produtos. Tente novamente.')
        }

        // .json() converte a resposta (texto) em objeto JavaScript
        const data = await response.json()
        setProducts(data)

      } catch (err) {
        // Se qualquer coisa der errado no try, cai aqui
        setError(err.message)
      } finally {
        // finally roda SEMPRE: com sucesso ou erro
        setLoading(false)
      }
    }

    loadProducts()
  }, []) // [] = busca só uma vez ao montar o componente


  // - useMemo: Calcular total de itens no carrinho -----
  // useMemo "memoriza" o resultado de um cálculo.
  // Só recalcula quando "cartItems" mudar - evita recalcular sem necessidade.
  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems] // dependência: recalcula quando cartItems mudar
  )


  // - Funções de ação -------------------─

  // Alterna entre tema claro e escuro
  const handleToggleTheme = () => {
    // Função que recebe o valor atual e retorna o novo valor
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  // Adiciona um produto ao carrinho
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      // Verifica se o produto já está no carrinho
      const existing = prev.find((item) => item.id === product.id)

      if (existing) {
        // Se já existe, apenas aumenta a quantidade
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            // { ...item } copia todas as props do item, e quantity sobrescreve só a quantidade
            : item
        )
      }

      // Se não existe, adiciona com quantity: 1
      return [...prev, { ...product, quantity: 1 }]
    })

    // Abre o carrinho automaticamente ao adicionar
    setCartOpen(true)
  }

  // Remove (ou diminui) um item do carrinho
  const handleRemoveItem = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        // .filter() remove os itens com quantidade 0 ou menor
        .filter((item) => item.quantity > 0)
    )
  }

  // Limpa todos os itens do carrinho
  const handleClearCart = () => {
    setCartItems([])
  }


  // - Renderização (o que aparece na tela) ---------
  return (
    // app-shell é o container principal com largura máxima e padding lateral
    <div className="app-shell">

      {/* - Cabeçalho fixo - */}
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

        {/* - Seção Hero (apresentação) - */}
        <section className="hero-section section" id="home">
          <div className="hero-copy fade-up" style={{ '--delay': '0.05s' }}>
            <span className="eyebrow">✦ Agência criativa</span>
            <h1>Criamos experiências digitais que brilham em qualquer dispositivo.</h1>
            <p>
              Da estratégia ao produto final, a Lumen Studio cria interfaces
              responsivas, intuitivas e com personalidade.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#products">Ver produtos</a>
              <a className="button button-secondary" href="#services">Nossos serviços</a>
            </div>
          </div>

          {/* Imagem ilustrativa do lado direito */}
          <div className="hero-visual fade-up" style={{ '--delay': '0.14s' }}>
            <img src={heroBanner} alt="Ilustração de produto digital" />
          </div>
        </section>


        {/* - Seção de Serviços - */}
        <section className="services section" id="services">
          <div className="section-header fade-up" style={{ '--delay': '0.05s' }}>
            <span className="eyebrow">✦ Serviços</span>
            <h2>Design estratégico para marcas que desejam escalar.</h2>
          </div>

          {/* Renderiza um ServiceCard para cada item do array services */}
          <div className="service-grid">
            {services.map((service) => (
              // A prop "key" é única por item - o React usa para otimizar re-renders
              <ServiceCard key={service.title} {...service} />
              // {...service} é o mesmo que: icon={service.icon} title={service.title} etc.
            ))}
          </div>
        </section>


        {/* - Seção de Produtos - */}
        <section className="products section" id="products">
          <div className="section-header fade-up" style={{ '--delay': '0.05s' }}>
            <span className="eyebrow">✦ Produtos</span>
            <h2>Catálogo de componentes e soluções digitais prontos para seu projeto.</h2>
          </div>

          {/* Renderização condicional: mostra estados diferentes dependendo do resultado */}
          {loading ? (
            // Estado: carregando
            <div className="status-box fade-up" style={{ '--delay': '0.08s' }}>
              <div className="loading-spinner" aria-hidden="true"></div>
              <p>Buscando inspiração...</p>
            </div>

          ) : error ? (
            // Estado: erro na API - mostra os produtos estáticos como fallback!
            <>
              <div className="status-box error-box fade-up" style={{ '--delay': '0.05s' }}>
                <p>⚠️ {error}</p>
                <small>Exibindo produtos de exemplo no lugar.</small>
              </div>
              <div className="product-grid">
                {staticProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </>

          ) : (
            // Estado: sucesso - mostra os produtos carregados
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}
        </section>


        {/* - Seção de Contato - */}
        <section className="highlight section" id="contact">
          <div className="highlight-panel fade-up" style={{ '--delay': '0.05s' }}>
            <h2>Vamos transformar sua ideia em um produto digital de alto impacto.</h2>
            <p>
              Entre em contato e receba uma proposta personalizada com design,
              prototipagem e consultoria estratégica.
            </p>
            <a className="button button-primary" href="mailto:contato@lumenstudio.com">
              Fale conosco →
            </a>
          </div>
        </section>

      </main>

      {/* - Rodapé - */}
      <Footer />

      {/* - Gaveta do carrinho (fica sobre o conteúdo) - */}
      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  )
}

export default App
