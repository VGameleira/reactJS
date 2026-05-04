// Importando hooks useState e useEffect do React
import { useState, useEffect } from 'react'
// Importando estilos CSS
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

// Componente funcional Timer
function Timer() {
  // Estado para segundos, inicializado em 0
  const [segundos, setSegundos] = useState(0)
  // Estado para controlar se o timer está ativo
  const [ativo, setAtivo] = useState(false)

  // useEffect hook: executa efeitos colaterais
  useEffect(() => {
    // Se não ativo, não executa
    if (!ativo) return

    // Cria intervalo que chama setInterval a cada 1000ms
    const intervalo = setInterval(() => {
      // Atualiza segundos usando função callback para evitar dependência de estado antigo
      setSegundos((prev) => prev + 1)
    }, 1000)

    // Função de cleanup: limpa intervalo quando efeito re-executa ou componente desmonta
    return () => {
      clearInterval(intervalo)
    }
  }, [ativo]) // Array de dependências: re-executa quando 'ativo' muda

  // Função para alternar timer entre iniciar/pausar
  const toggleTimer = () => {
    setAtivo(!ativo)
  }

  // Função para resetar timer
  const resetTimer = () => {
    setSegundos(0)
    setAtivo(false)
  }

  // Função para formatar segundos em MM:SS
  const formatarTempo = () => {
    // Calcula minutos
    const mins = Math.floor(segundos / 60)
    // Calcula segundos restantes
    const segs = segundos % 60
    // Retorna string formatada com padding de zero
    return `${mins.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`
  }

  // Retorno do JSX
  return (
    // Container principal com classe CSS
    <div className="timer-container">
      {/* Título */}
      <h1>⏱️ Timer</h1>
      {/* Display do tempo formatado */}
      <div className="timer-display">{formatarTempo()}</div>

      {/* Controles do timer */}
      <div className="timer-controls">
        {/* Botão para toggle, classe dinâmica baseada em ativo */}
        <button onClick={toggleTimer} className={`btn ${ativo ? 'pause' : 'play'}`}>
          {ativo ? '⏸ Pausar' : '▶ Iniciar'}
        </button>
        {/* Botão para reset */}
        <button onClick={resetTimer} className="btn reset">
          🔄 Resetar
        </button>
      </div>

      {/* Texto informativo */}
      <p className="info">Clique em "Iniciar" para começar o timer</p>
    </div>
  )
}

// Export default
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
