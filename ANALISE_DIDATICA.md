# 📚 ANÁLISE DIDÁTICA COMPLETA - ReactJS


---

## 🗂️ MAPEAMENTO DE LACUNAS - 8 TÓPICOS ESSENCIAIS

### 1. **useEffect - Ciclo de Vida e Efeitos Colaterais**
- **O que é:** Hook que executa código após renderização
- **Para que serve:** Buscar dados, atualizar DOM, inscrever-se em eventos
- **Quando usar:** Requisições HTTP, timers, cleanup
- **Pré-requisito:** useState, componentes funcionais ✓
- **Próximo passo após:** Context API, performance

### 2. **useRef - Referências Diretas ao DOM**
- **O que é:** Hook que mantém uma referência mutável ao DOM
- **Para que serve:** Acessar inputs, focar em elementos, armazenar valores
- **Quando usar:** Formulários, controle de media (vídeo/áudio), animações
- **Pré-requisito:** useState, JSX ✓
- **Próximo passo após:** Formulários avançados

### 3. **Formulários Controlados (Forms)**
- **O que é:** Formulários onde React gerencia cada input
- **Para que serve:** Validação, controle de dados, submit
- **Quando usar:** Login, cadastro, edição de dados
- **Conceitos:** Controlled inputs, useRef, preventDefault()
- **Pré-requisito:** useState, eventos ✓, useRef
- **Próximo passo após:** Validação, react-hook-form

### 4. **React Router DOM - Roteamento**
- **O que é:** Biblioteca para navegação entre páginas sem reload
- **Para que serve:** Criar SPAs (Single Page Applications)
- **Quando usar:** Apps com múltiplas telas (Home, About, Contato)
- **Conceitos:** BrowserRouter, Routes, Route, Link, useParams
- **Pré-requisito:** Componentes ✓, Props ✓
- **Próximo passo após:** Rotas dinâmicas, lazy loading

### 5. **useCallback - Memoização de Funções**
- **O que é:** Hook que memoiza uma função
- **Para que serve:** Otimizar performance evitando re-renderizações
- **Quando usar:** Funções passadas como props, dependências
- **Conceitos:** Memoização, React.memo, deps array
- **Pré-requisito:** useState ✓, entender renderização
- **Próximo passo após:** useMemo, otimização

### 6. **useMemo - Memoização de Valores**
- **O que é:** Hook que memoiza um valor calculado
- **Para que serve:** Evitar cálculos pesados em cada renderização
- **Quando usar:** Filtros, ordenações, cálculos complexos
- **Conceitos:** Memoização, Lazy evaluation
- **Pré-requisito:** useState ✓, useCallback
- **Próximo passo após:** Performance profiling

### 7. **Context API - Estado Global**
- **O que é:** API nativa do React para passar dados sem prop drilling
- **Para que serve:** Compartilhar estado entre componentes distantes
- **Quando usar:** Tema (dark/light), autenticação, idioma
- **Conceitos:** createContext, useContext, Provider
- **Pré-requisito:** useState ✓, Props ✓
- **Próximo passo após:** Redux, Zustand

### 8. **Fetch/Axios - Requisições HTTP**
- **O que é:** Métodos para buscar dados de APIs
- **Para que serve:** Integrar com backends, buscar dados dinâmicos
- **Quando usar:** Login, carregar produtos, chat em tempo real
- **Conceitos:** useEffect, async/await, tratamento de erros
- **Pré-requisito:** useEffect, async/await básico
- **Próximo passo após:** GraphQL, WebSockets

---

## 📈 SEQUÊNCIA DIDÁTICA LINEAR

### 🔵 **NÍVEL 1: FUNDAMENTOS (Sem React)**

**Pré-requisito absoluto - Material que o aluno JÁ DOMINA**

1.1. **JavaScript ES6+**
- Arrow functions
- Desestruturação
- Spread operator
- Async/await (básico)

1.2. **HTML/CSS**
- Semântica
- Flexbox / Grid
- Seletores CSS

---

### 🟢 **NÍVEL 2: REACT ESSENCIAL** (Material que o aluno JÁ DOMINA)

**2.1. Componentes e JSX**
- Componentes funcionais
- Renderização de elementos
- Props (básicas e desestruturadas)

**2.2. Estado com useState**
- Gerenciar estado local
- State lift (elevação)
- Renderização condicional

**2.3. Listas e Iteração**
- `.map()` para renderizar
- Importância da `key` prop
- Filtragem com `.filter()`

**2.4. Estilos**
- CSS Global
- CSS Local
- CSS Modules
- CSS Dinâmico

---

### 🟡 **NÍVEL 3: REACT INTERMEDIÁRIO INICIAL** (Nível Atual do Aluno)

**3.1. Aprofundamento em useState ✓ (Parcial)**
- Virtual DOM
- Renderização individual
- prevState
- Estado imutável

**3.2. Ciclo de Vida com useEffect** ← NOVO
- Executar após renderização
- Dependências
- Cleanup
- Requisições HTTP

**3.3. Referências com useRef** ← NOVO
- Acesso direto ao DOM
- Focar em inputs
- Armazenar valores mutáveis

**3.4. Formulários Avançados** ← NOVO
- Controlled inputs
- Validação
- Submit
- Limpeza de formulário

---

### 🟠 **NÍVEL 4: REACT INTERMEDIÁRIO AVANÇADO** (Próximo)

**4.1. Roteamento com React Router**
- Navegação entre páginas
- Rotas dinâmicas
- Parâmetros de URL

**4.2. Otimização com useCallback/useMemo**
- Memoização de funções
- Memoização de valores
- Evitar re-renderizações

**4.3. Estado Global com Context API**
- createContext
- useContext
- Provider

**4.4. Requisições HTTP Avançadas**
- Tratamento de erros
- Loading states
- Cancelamento de requisições

---

## 💻 CÓDIGO COMENTADO - EXEMPLOS PRÁTICOS

### 📦 **EXEMPLO 1: useEffect - Ciclo de Vida**

```jsx
import { useState, useEffect } from 'react'

// 🎓 useEffect é um hook que executa código APÓS a renderização
// Serve para: fetch de dados, timers, DOM manipulation, subscriptions

function CicloDeVida() {
  // 🪝 Estado para armazenar dados
  const [contador, setContador] = useState(0)
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(false)

  // ⏳ useEffect SEM dependências - Executa TODA VEZ que renderiza
  useEffect(() => {
    console.log('Componente renderizou!')
    // ⚠️ Cuidado: isso pode causar loop infinito com setState
  }) // ← Array de dependências FALTANDO = roda sempre

  // ⏳ useEffect COM array VAZIO - Executa APENAS UMA VEZ na montagem
  useEffect(() => {
    console.log('Componente MONTOU na página!')
    // 🌍 Ideal para: buscar dados iniciais, conectar a eventos
    setDados({ titulo: 'Dados Carregados' })

    // 🧹 CLEANUP - executado quando componente desmonta
    return () => {
      console.log('Componente DESMONTOU!')
    }
  }, []) // ← Array vazio = roda só na montagem

  // ⏳ useEffect COM dependências específicas
  useEffect(() => {
    console.log(`Contador mudou para: ${contador}`)
    // 📊 Roda APENAS quando contador muda
    // Útil para: Recalcular valores, atualizar DOM
  }, [contador]) // ← Roda quando contador muda

  // 🌍 Exemplos de Requisição HTTP (fetch)
  useEffect(() => {
    const fetchDados = async () => {
      setLoading(true)
      try {
        const resposta = await fetch('https://api.exemplo.com/dados')
        const json = await resposta.json()
        setDados(json)
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro)
      } finally {
        setLoading(false)
      }
    }

    fetchDados() // Chamar a função assíncrona
  }, []) // Roda só na montagem

  return (
    <div className="ciclo-vida">
      <h2>Ciclo de Vida</h2>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>+</button>
      
      {loading ? <p>Carregando...</p> : <p>{dados?.titulo}</p>}
    </div>
  )
}

export default CicloDeVida
```

**✏️ Resumo:**
- `useEffect()` sem deps = roda sempre ❌ (cuidado!)
- `useEffect(..., [])` = roda só na montagem ✓
- `useEffect(..., [deps])` = roda quando deps mudam ✓
- Usar cleanup para limpar timers/listeners

---

### 🔍 **EXEMPLO 2: useRef - Referências ao DOM**

```jsx
import { useState, useRef } from 'react'

function FormularioComRef() {
  // 🪝 useRef MANTÉM UMA REFERÊNCIA ao elemento DOM
  // Não causa re-renderização quando muda (diferente de setState!)
  
  const emailInputRef = useRef(null)
  const videoRef = useRef(null)
  const contadorRef = useRef(0) // Pode armazenar qualquer valor

  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  // 📝 Caso de uso 1: Focar em um input
  const focusEmail = () => {
    // 📌 Acessar o elemento direto via .current
    emailInputRef.current.focus()
    emailInputRef.current.style.borderColor = 'blue'
  }

  // 📹 Caso de uso 2: Controlar vídeo
  const tocarVideo = () => {
    videoRef.current.play()
  }

  const pausarVideo = () => {
    videoRef.current.pause()
  }

  // 📊 Caso de uso 3: Armazenar valores mutáveis sem re-render
  const incrementarSemRender = () => {
    contadorRef.current += 1
    console.log(`Clicou ${contadorRef.current} vezes (sem re-render!)`)
  }

  // 📨 Caso de uso 4: Validação e limpeza de forma
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!emailInputRef.current.value) {
      alert('Email é obrigatório!')
      focusEmail() // Focar automaticamente
      return
    }

    setEnviado(true)
    // Limpar input
    emailInputRef.current.value = ''
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="formulario-ref">
      <h2>Formulário com useRef</h2>

      <div className="form-group">
        <label>Email:</label>
        <input
          ref={emailInputRef} // ← Conectar referência
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
        <button type="button" onClick={focusEmail}>
          Focar no Email
        </button>
      </div>

      <div className="media-controls">
        <video ref={videoRef} width="300">
          <source src="video.mp4" type="video/mp4" />
        </video>
        <button type="button" onClick={tocarVideo}>▶ Tocar</button>
        <button type="button" onClick={pausarVideo}>⏸ Pausar</button>
      </div>

      <button type="button" onClick={incrementarSemRender}>
        Cliques: {contadorRef.current}
      </button>

      <button type="submit">Enviar</button>

      {enviado && <p className="sucesso">✓ Formulário enviado!</p>}
    </form>
  )
}

export default FormularioComRef
```

**✏️ Resumo:**
- `useRef` = referência ao DOM que NÃO causa re-render
- Acessar via `.current`
- Ideal para: inputs, vídeos, valores mutáveis
- EVITAR para: estado que afeta a UI

---

### 📋 **EXEMPLO 3: Formulários Controlados**

```jsx
import { useState, useRef } from 'react'

function FormularioControlado() {
  // 🎓 FORMULÁRIO CONTROLADO = React controla cada input
  // O estado é a "fonte da verdade" para os valores

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    categoria: 'usuario', // select
    termos: false, // checkbox
    genero: 'outro', // radio
    bio: '', // textarea
  })

  const [enviado, setEnviado] = useState(false)
  const nomeRef = useRef(null)
  const [erros, setErros] = useState({})

  // 🔄 Atualizar campo único no estado
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  // ✅ Validar formulário
  const validar = () => {
    const novoserros = {}

    if (!formData.nome.trim()) {
      novoserros.nome = 'Nome é obrigatório'
    }
    if (!formData.email.includes('@')) {
      novoserros.email = 'Email inválido'
    }
    if (!formData.termos) {
      novoserros.termos = 'Aceite os termos'
    }

    setErros(novoserros)
    return Object.keys(novoserros).length === 0
  }

  // 📨 Enviar formulário
  const handleSubmit = (e) => {
    e.preventDefault() // ← Prevenir reload da página

    if (!validar()) {
      nomeRef.current?.focus()
      return
    }

    console.log('Dados enviados:', formData)
    setEnviado(true)

    // Limpar formulário após 2s
    setTimeout(() => {
      setFormData({
        nome: '',
        email: '',
        categoria: 'usuario',
        termos: false,
        genero: 'outro',
        bio: '',
      })
      setEnviado(false)
      setErros({})
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="formulario-controlado">
      <h2>Formulário Controlado</h2>

      {/* 📝 INPUT TEXT - Controlado pelo estado */}
      <div className="form-group">
        <label htmlFor="nome">Nome:</label>
        <input
          ref={nomeRef}
          id="nome"
          name="nome"
          type="text"
          value={formData.nome} // ← Valor vem do estado
          onChange={handleChange} // ← Atualizar estado
          placeholder="Seu nome"
          className={erros.nome ? 'erro' : ''}
        />
        {erros.nome && <p className="mensagem-erro">{erros.nome}</p>}
      </div>

      {/* 📧 INPUT EMAIL */}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          className={erros.email ? 'erro' : ''}
        />
        {erros.email && <p className="mensagem-erro">{erros.email}</p>}
      </div>

      {/* 🎯 SELECT - Dropdown */}
      <div className="form-group">
        <label htmlFor="categoria">Categoria:</label>
        <select
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        >
          <option value="usuario">Usuário</option>
          <option value="admin">Admin</option>
          <option value="moderador">Moderador</option>
        </select>
      </div>

      {/* 🔘 RADIO BUTTONS */}
      <div className="form-group">
        <label>Gênero:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="genero"
              value="masculino"
              checked={formData.genero === 'masculino'}
              onChange={handleChange}
            />
            Masculino
          </label>
          <label>
            <input
              type="radio"
              name="genero"
              value="feminino"
              checked={formData.genero === 'feminino'}
              onChange={handleChange}
            />
            Feminino
          </label>
          <label>
            <input
              type="radio"
              name="genero"
              value="outro"
              checked={formData.genero === 'outro'}
              onChange={handleChange}
            />
            Outro
          </label>
        </div>
      </div>

      {/* 📄 TEXTAREA */}
      <div className="form-group">
        <label htmlFor="bio">Biografia:</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Conte sobre você..."
          rows="5"
        />
      </div>

      {/* ☑️ CHECKBOX */}
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="termos"
            checked={formData.termos}
            onChange={handleChange}
          />
          Aceito os termos e condições
        </label>
        {erros.termos && <p className="mensagem-erro">{erros.termos}</p>}
      </div>

      <button type="submit">Enviar</button>

      {enviado && <p className="sucesso">✓ Formulário enviado com sucesso!</p>}
    </form>
  )
}

export default FormularioControlado
```

**✏️ Resumo:**
- **Controlled input** = valor vem do estado `value={state}`
- **Atualizar** via `onChange` e `setState`
- **Validação** antes de submit
- **Limpeza** após envio

---

### 🛣️ **EXEMPLO 4: React Router - Navegação**

```jsx
// 📌 app/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Produto from './pages/Produto' // Rota dinâmica
import './App.css'

function App() {
  return (
    // 🎯 BrowserRouter: Ativa o roteamento na aplicação
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">Meu Site</h1>
          {/* Link é como um <a>, mas sem reload */}
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">Sobre</Link>
          <Link to="/produtos" className="nav-link">Produtos</Link>
        </div>
      </nav>

      {/* Routes: Define qual componente renderizar baseado na URL */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home na raiz */}
        <Route path="/about" element={<About />} /> {/* /about */}
        <Route path="/produto/:id" element={<Produto />} /> {/* Dinâmico! */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

```jsx
// 📄 pages/Home.jsx
function Home() {
  return (
    <div className="home">
      <h2>Bem-vindo!</h2>
      <p>Esta é a página inicial.</p>
    </div>
  )
}

export default Home
```

```jsx
// 📄 pages/Produto.jsx
import { useParams, Link } from 'react-router-dom'

function Produto() {
  // 🎯 useParams: Pega parâmetros da URL (ex: /produto/123 → id=123)
  const { id } = useParams()

  // 💾 Dados de exemplo (normalmente viriam de uma API)
  const produtos = {
    1: { nome: 'Notebook', preco: 3000 },
    2: { nome: 'Mouse', preco: 50 },
    3: { nome: 'Teclado', preco: 150 },
  }

  const produto = produtos[id]

  if (!produto) {
    return (
      <div className="erro">
        <h2>Produto não encontrado!</h2>
        <Link to="/">← Voltar para Home</Link>
      </div>
    )
  }

  return (
    <div className="produto">
      <h2>{produto.nome}</h2>
      <p>Preço: R$ {produto.preco}</p>
      <button>Adicionar ao Carrinho</button>
      <Link to="/">← Voltar</Link>
    </div>
  )
}

export default Produto
```

**✏️ Resumo:**
- `<BrowserRouter>` = ativa roteamento
- `<Routes>` + `<Route>` = define rotas
- `<Link>` = navegação sem reload
- `useParams()` = parâmetros da URL

---

### ⚡ **EXEMPLO 5: useCallback - Otimização**

```jsx
import { useState, useCallback, memo } from 'react'

// 🎓 useCallback memoiza uma FUNÇÃO
// Evita que a função seja recriada em cada render
// Útil quando a função é prop de um componente filho

// Filho que recebe a função como prop
const Botao = memo(({ onClick, texto }) => {
  console.log(`Renderizando botão: ${texto}`)
  return <button onClick={onClick}>{texto}</button>
})

function Pai() {
  const [contador, setContador] = useState(0)
  const [outro, setOutro] = useState(false)

  // ❌ SEM useCallback - função criada TODA VEZ que renderiza
  // Isso faz o Botao re-renderizar sempre
  const incrementarSemMemo = () => {
    setContador(contador + 1)
  }

  // ✅ COM useCallback - função é reutilizada
  // Botao só re-renderiza se dependências mudam
  const incrementarComMemo = useCallback(() => {
    setContador((prev) => prev + 1) // ← usar prev para não depender de contador
  }, []) // ← dependências vazias = função nunca muda

  // ✅ COM dependências
  const incrementarDependencias = useCallback(() => {
    console.log(`Contador atual: ${contador}`)
    setContador(contador + 1)
  }, [contador]) // ← função recria quando contador muda

  return (
    <div className="pai">
      <h2>Pai - Contador: {contador}</h2>

      <button onClick={() => setOutro(!outro)}>
        Alterar Outro ({outro.toString()})
      </button>

      <hr />

      <div className="botoes">
        <h3>Testando useCallback:</h3>
        {/* Este botão re-renderiza SEMPRE que outro muda */}
        <Botao onClick={incrementarSemMemo} texto="Sem Memo" />

        {/* Este botão NÃO re-renderiza (memo ativa) */}
        <Botao onClick={incrementarComMemo} texto="Com Memo" />

        {/* Este botão re-renderiza apenas quando contador muda */}
        <Botao onClick={incrementarDependencias} texto="Com Deps" />
      </div>
    </div>
  )
}

export default Pai
```

**✏️ Resumo:**
- `useCallback` = memoiza funções
- Usar quando a função é prop de componente filho
- Combinar com `React.memo` no filho
- Sempre especificar dependências

---

### 💾 **EXEMPLO 6: Context API - Estado Global**

```jsx
// 📦 contexts/TemaContext.js
import { createContext, useState } from 'react'

// 1️⃣ Criar o contexto
export const TemaContext = createContext()

// 2️⃣ Criar o Provider (componente que fornece os dados)
export function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro')

  const toggleTema = () => {
    setTema(tema === 'claro' ? 'escuro' : 'claro')
  }

  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      {children}
    </TemaContext.Provider>
  )
}
```

```jsx
// 📌 App.jsx
import { TemaProvider } from './contexts/TemaContext'
import Header from './components/Header'
import Conteudo from './components/Conteudo'

function App() {
  return (
    // Provider deve envolver toda a aplicação
    <TemaProvider>
      <div className="app">
        <Header />
        <Conteudo />
      </div>
    </TemaProvider>
  )
}

export default App
```

```jsx
// 🎨 components/Header.jsx
import { useContext } from 'react'
import { TemaContext } from '../contexts/TemaContext'

function Header() {
  // 🎯 useContext: Acessar dados do contexto
  const { tema, toggleTema } = useContext(TemaContext)

  return (
    <header className={`header ${tema}`}>
      <h1>Meu App</h1>
      <button onClick={toggleTema}>
        {tema === 'claro' ? '🌙' : '☀️'}
      </button>
    </header>
  )
}

export default Header
```

```jsx
// 📄 components/Conteudo.jsx
import { useContext } from 'react'
import { TemaContext } from '../contexts/TemaContext'

function Conteudo() {
  const { tema } = useContext(TemaContext)

  return (
    <main className={`conteudo ${tema}`}>
      <p>Tema atual: {tema}</p>
    </main>
  )
}

export default Conteudo
```

**✏️ Resumo:**
- `createContext()` = criar contexto
- `Context.Provider` = fornecer dados
- `useContext()` = acessar dados
- Evita "prop drilling" (passar props por muitos componentes)

---

### 🌍 **EXEMPLO 7: Fetch/Axios - Requisições HTTP**

```jsx
import { useState, useEffect } from 'react'

function ListaDeUsuarios() {
  // 🎓 Padrão comum: estado para dados, loading, erro
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  // Fetch com useEffect
  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        // 🌍 Fazer requisição GET
        const resposta = await fetch('https://api.github.com/users')

        // ✅ Verificar se a resposta foi bem-sucedida
        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status}`)
        }

        // 📦 Converter para JSON
        const dados = await resposta.json()

        // 💾 Guardar dados no estado
        setUsuarios(dados.slice(0, 5)) // Primeiros 5
      } catch (erro) {
        // ❌ Tratar erros
        console.error('Erro ao buscar usuários:', erro)
        setErro(erro.message)
      } finally {
        // ⏳ Sempre executado
        setLoading(false)
      }
    }

    buscarUsuarios()
  }, []) // Roda só na montagem

  // 🎨 Renderizar estados
  if (loading) return <p>⏳ Carregando usuários...</p>

  if (erro) return <p>❌ Erro: {erro}</p>

  return (
    <div className="lista-usuarios">
      <h2>Usuários do GitHub</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <img src={usuario.avatar_url} alt={usuario.login} width="40" />
            <a href={usuario.html_url}>{usuario.login}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaDeUsuarios
```

```jsx
// 📌 Versão com Axios (mais simples)
import axios from 'axios'

function ListaDeUsuariosAxios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    // ✅ Axios é mais limpo que fetch
    axios
      .get('https://api.github.com/users')
      .then((response) => setUsuarios(response.data.slice(0, 5)))
      .catch((erro) => setErro(erro.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>⏳ Carregando...</p>
  if (erro) return <p>❌ {erro}</p>

  return (
    <ul>
      {usuarios.map((user) => (
        <li key={user.id}>{user.login}</li>
      ))}
    </ul>
  )
}

export default ListaDeUsuariosAxios
```

**✏️ Resumo:**
- `fetch()` = API nativa do JavaScript
- `.then().catch().finally()` ou `async/await`
- Sempre usar `try/catch` com async
- Estados: loading, erro, sucesso

---

## 🎯 PLANO DE ESTUDO PERSONALIZADO

### Semana 1-2: **Ciclo de Vida (useEffect)**
- [ ] Estudar exemplo 1 (useEffect)
- [ ] Praticar com timers
- [ ] Fazer requisição HTTP simples
- [ ] **Desafio:** App que busca dados de uma API e mostra

### Semana 3-4: **Referências e Formulários**
- [ ] Estudar exemplo 2 (useRef)
- [ ] Estudar exemplo 3 (Formulários)
- [ ] Criar formulário com validação
- [ ] **Desafio:** Todo app com localStorage

### Semana 5-6: **Roteamento**
- [ ] Instalar React Router
- [ ] Estudar exemplo 4
- [ ] Criar SPA com múltiplas páginas
- [ ] **Desafio:** Blog com rotas dinâmicas

### Semana 7-8: **Otimização e Estado Global**
- [ ] Estudar exemplo 5 (useCallback)
- [ ] Estudar exemplo 6 (Context API)
- [ ] Implementar Context em projeto
- [ ] **Desafio:** App com tema dark/light global

### Semana 9+: **Requisições Avançadas**
- [ ] Estudar exemplo 7 (Fetch/Axios)
- [ ] Fazer integrações com APIs reais
- [ ] Gerenciar estados de loading/erro
- [ ] **Desafio:** App de GitHub/OMDB API

---

## 📝 CONCEITOS-CHAVE PARA MEMORIZAR

| Conceito | O que é | Quando usar |
|----------|---------|-----------|
| **useState** | Hook que adiciona estado | Estado que afeta a UI |
| **useEffect** | Hook para efeitos colaterais | Fetch, timers, cleanup |
| **useRef** | Referência ao DOM | Inputs, vídeos, valores mutáveis |
| **useCallback** | Memoização de funções | Props de componentes memo |
| **useMemo** | Memoização de valores | Cálculos pesados |
| **Context** | Estado global nativo | Tema, autenticação, idioma |
| **Router** | Navegação SPA | Múltiplas páginas |

---

## ✅ PRÓXIMOS PASSOS RECOMENDADOS

1. **Imediatamente:** Revisar tópicos que o aluno já domina
2. **Próximo:** Começar com `useEffect` e requisições HTTP
3. **Depois:** `useRef` e Formulários Avançados
4. **Seguir:** React Router e navegação
5. **Finalmente:** Context API e otimização

---

**Sucesso no aprendizado! 🚀**
