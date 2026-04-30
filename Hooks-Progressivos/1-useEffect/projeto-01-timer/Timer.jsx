import { useState, useEffect } from 'react'
import './Timer.css'

/**
 * 📌 PROJETO 01: TIMER SIMPLES
 * 🎓 Conceitos: useEffect básico, setInterval, cleanup
 * ⭐ Dificuldade: FÁCIL
 * 
 * 🎯 O que aprenderá:
 * - useEffect sem dependências
 * - useEffect com array vazio (executar uma vez)
 * - Cleanup function (return)
 * - setInterval e clearInterval
 */

function Timer() {
  // 🔢 Estado para armazenar o tempo em segundos
  const [segundos, setSegundos] = useState(0)
  const [ativo, setAtivo] = useState(false)

  // ⏳ useEffect para controlar o timer
  useEffect(() => {
    // 📌 Se não está ativo, não faz nada
    if (!ativo) return

    // ⏱️ Criar intervalo que incrementa segundos a cada 1000ms (1s)
    const intervalo = setInterval(() => {
      // ⚠️ IMPORTANTE: usar função (prev) para não depender de 'segundos'
      setSegundos((prev) => prev + 1)
    }, 1000)

    // 🧹 CLEANUP: Limpar o intervalo quando componente desmonta ou ativo muda
    return () => {
      clearInterval(intervalo)
    }
  }, [ativo]) // ← Dependência: recriar intervalo quando ativo muda

  // 🎮 Iniciar/Pausar timer
  const toggleTimer = () => {
    setAtivo(!ativo)
  }

  // 🔄 Resetar timer
  const resetTimer = () => {
    setSegundos(0)
    setAtivo(false)
  }

  // 🎨 Formatar tempo em MM:SS
  const formatarTempo = () => {
    const mins = Math.floor(segundos / 60)
    const segs = segundos % 60
    return `${mins.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer-container">
      <h1>⏱️ Timer</h1>
      <div className="timer-display">{formatarTempo()}</div>

      <div className="timer-controls">
        <button onClick={toggleTimer} className={`btn ${ativo ? 'pause' : 'play'}`}>
          {ativo ? '⏸ Pausar' : '▶ Iniciar'}
        </button>
        <button onClick={resetTimer} className="btn reset">
          🔄 Resetar
        </button>
      </div>

      <p className="info">Clique em "Iniciar" para começar o timer</p>
    </div>
  )
}

export default Timer

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Modificar para mostrar o timer em milissegundos também (MM:SS:MS)
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Adicionar um contador de "voltas" (laps)
 * - Cada vez que clica em "Volta", armazena o tempo atual
 * - Mostrar lista de voltas abaixo do timer
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Adicionar alarme: quando timer atinge 60 segundos, toca um som
 * - Ou: permitir que o usuário defina um tempo limite
 * - Quando chega ao tempo, fazer alert() ou mudar cor de fundo
 */
