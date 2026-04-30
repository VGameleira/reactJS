import { useRef, useState } from 'react'
import './Stopwatch.css'

/**
 * 📌 PROJETO 06: CRONÔMETRO COM useRef
 * 🎓 Conceitos: useRef para armazenar sem re-render, setInterval, clearInterval
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - useRef para manter valores mutáveis entre renders
 * - Diferença entre useRef e useState
 * - Armazenar intervalID em useRef
 * - Controle de timers complexos
 */

function Stopwatch() {
  // 🕐 Estado para o display (causa re-render)
  const [tempo, setTempo] = useState(0)
  const [ativo, setAtivo] = useState(false)

  // 📌 Referências (NÃO causam re-render)
  const intervalRef = useRef(null)
  const tempoRef = useRef(0) // Guardar tempo sem re-render

  // ▶️ Iniciar cronômetro
  const iniciar = () => {
    if (ativo) return

    setAtivo(true)

    // Usar useRef para armazenar o intervalo
    intervalRef.current = setInterval(() => {
      // 📌 Usar useRef para não depender de 'tempo'
      tempoRef.current += 1
      setTempo(tempoRef.current)
    }, 10) // 10ms = precisão de centésimos
  }

  // ⏸️ Pausar cronômetro
  const pausar = () => {
    setAtivo(false)
    clearInterval(intervalRef.current)
  }

  // 🔄 Resetar
  const resetar = () => {
    setAtivo(false)
    clearInterval(intervalRef.current)
    setTempo(0)
    tempoRef.current = 0
  }

  // 🎨 Formatar tempo MM:SS:MS
  const formatarTempo = () => {
    const minutos = Math.floor(tempo / 6000)
    const segundos = Math.floor((tempo % 6000) / 100)
    const centesimos = tempo % 100

    return `${minutos.toString().padStart(2, '0')}:${segundos
      .toString()
      .padStart(2, '0')}.${centesimos.toString().padStart(2, '0')}`
  }

  return (
    <div className="stopwatch-container">
      <h1>⏱️ Cronômetro</h1>

      <div className="tempo-display">{formatarTempo()}</div>

      <div className="controles">
        <button onClick={iniciar} disabled={ativo} className="btn play">
          ▶ Iniciar
        </button>
        <button onClick={pausar} disabled={!ativo} className="btn pause">
          ⏸ Pausar
        </button>
        <button onClick={resetar} className="btn reset">
          🔄 Resetar
        </button>
      </div>

      <div className="info">
        <p>📌 useRef vs useState:</p>
        <p>- useRef: Muda sem re-render (privado)</p>
        <p>- useState: Muda e re-renderiza (público)</p>
      </div>
    </div>
  )
}

export default Stopwatch

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar botão "Volta" (laps)
 * - Mostrar lista de voltas abaixo do cronômetro
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Salvar cronômetro em localStorage
 * - Recuperar tempo anterior ao recarregar página
 * - Exportar resultados em CSV
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Múltiplos cronômetros independentes
 * - Comparar tempos entre cronômetros
 * - Gráfico de velocidade ao longo do tempo
 */
