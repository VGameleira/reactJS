import './App.css'
import { useState } from 'react'
import Exemplo from './components/Exemplo.jsx'
import ExemploSemCss from './components/ExemploSemCss'
import Avancado from './components/Avancado.jsx'

function App() {
  
  // Estado para controlar o autor dinamicamente
  const [autor, setAutor] = useState('Marcos')
  // Estado para mostrar/ocultar explicações
  const [showExplanations, setShowExplanations] = useState(false)

  // Função para alternar o autor
  const toggleAutor = () => {
    setAutor(autor === 'Marcos' ? 'Outro' : 'Marcos')
  }

  // Função para alternar explicações
  const toggleExplanations = () => {
    setShowExplanations(!showExplanations)
  }

  return (
    <>
      <h1>Projeto Didático de CSS em React</h1>
      <button onClick={toggleExplanations} title="Clique para mostrar ou ocultar explicações detalhadas sobre CSS">
        {showExplanations ? 'Ocultar Explicações' : 'Mostrar Explicações'}
      </button>
      <button onClick={toggleAutor} title="Alterna o valor do 'autor' para demonstrar estilos dinâmicos">
        Alternar Autor (Atual: {autor})
      </button>

      {showExplanations && (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0', backgroundColor: '#f9f9f9' }}>
          <h2>Explicações Dinâmicas sobre CSS</h2>
          <p><strong>CSS Global:</strong> Definido em index.css (cor vermelha para h1). Aplica-se a toda a aplicação.</p>
          <p><strong>CSS Local:</strong> Definido em App.css (cor azul para h1). Sobrescreve o global devido à especificidade.</p>
          <p><strong>CSS de Componente:</strong> Se importado diretamente (como Exemplo.css), pode vazar para outros componentes (cor verde).</p>
          <p><strong>CSS Module:</strong> Usado em Exemplo.module.css. Gera classes únicas, evitando vazamentos (cor rosa).</p>
          <p><strong>CSS Inline:</strong> Aplicado diretamente no atributo style. Alta especificidade, mas difícil de manter.</p>
          <p><strong>CSS Dinâmico:</strong> Mudanças baseadas em estado do React, permitindo interatividade.</p>
        </div>
      )}

      <h1>TESTE</h1>

      {/* ExemploSemCss não importa CSS próprio. */}
      {/* Ele herda apenas os estilos globais definidos em App.css ou index.css. */}
      {/* Se quiser um estilo exclusivo, use CSS Module ou importe CSS direto no componente. */}
      <ExemploSemCss />

      {/* Exemplo usa CSS Module no próprio componente. */}
      <h1>Formatação Local / Global</h1>

      <Exemplo />

      {/* Formatação com classe do App.css */}
      <h1 className='titulo'>Formatação com Classe</h1>

      {/*Formatação com ID do App.css*/}
      <h1 id='meuid'>Formatação com ID</h1>

      {/* -------------------------------------------------- */}
      
      {/* CSS Inline */}
        <p style={{ color: 'blue', borderTop: '2px solid blue', display: 'inline-block' }} title="CSS Inline: estilos aplicados diretamente no elemento">Formatação com CSS Inline</p>

      {/* CSS Inline Dinâmico */}
        <p style={{ color: autor === 'Marcos' ? 'orange' : 'blue' }} title="CSS Inline Dinâmico: muda baseado no estado do React">Formatação com CSS Inline Dinâmico</p>

        <p style={{ 
                    color: autor === 'Marcos' ? 'orange' : 'blue',          
          backgroundColor: autor === 'Marcos' ? 'lightblue' : 'lightgray' }} title="Mais propriedades dinâmicas">Formatação com CSS Inline Dinâmico 2</p>

      {/* Classes Dinâmicas */}
        <h1 className={autor === 'Marcos' ? 'marcos' : 'titulo'} title="Classe dinâmica: alterna entre 'marcos' e 'titulo' baseada no autor">Formatação com Classe Dinâmica</h1>

      {/* Animação com CSS Maneira */}
      <div className="animacao">
        <h2 title="Demonstra animações CSS com keyframes">Animação CSS</h2>
        <div className="bola" title="Bola animada com @keyframes bounce"></div>
      </div>

      {/* Exemplo Avançado */}
      <Avancado />

    </>
  )
}

export default App