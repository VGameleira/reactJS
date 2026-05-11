import { useState, useCallback, memo } from 'react'
import './MemoCallbackApp.css'

/**
 * 📌 PROJETO 13: OTIMIZAÇÃO COM REACT.MEMO E USECALLBACK
 * 🎓 Conceitos: React.memo, useCallback, prevenção de re-renders desnecessários
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - React.memo para memoizar componentes
 * - useCallback para memoizar funções
 * - Evitar re-renders desnecessários
 * - Profiling de performance
 */

// 🔢 Componente memoizado do contador
const ContadorMemo = memo(({ numero, onIncremento }) => {
  console.log(`🔄 ContadorMemo re-renderizado: ${numero}`)

  return (
    <div className="contador-card">
      <h3>📊 Contador</h3>
      <div className="numero">{numero}</div>
      <button onClick={onIncremento} className="btn-contador">
        ➕ Incrementar
      </button>
    </div>
  )
})

ContadorMemo.displayName = 'ContadorMemo'

// 📝 Componente de tarefa memoizado
const TarefaItem = memo(({ tarefa, onToggle, onDelete }) => {
  console.log(`🔄 TarefaItem re-renderizado: ${tarefa.id}`)

  return (
    <div className="tarefa-item">
      <input
        type="checkbox"
        checked={tarefa.concluida}
        onChange={() => onToggle(tarefa.id)}
      />
      <span className={tarefa.concluida ? 'concluida' : ''}>{tarefa.texto}</span>
      <button onClick={() => onDelete(tarefa.id)} className="btn-delete">
        ❌
      </button>
    </div>
  )
})

TarefaItem.displayName = 'TarefaItem'

// 📱 Componente Principal
function MemoCallbackApp() {
  // 🎯 Estados
  const [contador, setContador] = useState(0)
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: 'Aprender React.memo', concluida: false },
    { id: 2, texto: 'Entender useCallback', concluida: false },
  ])
  const [novaInput, setNovaInput] = useState('')
  const [tema, setTema] = useState('claro')

  // 🎨 Log de renders
  console.log('🔄 MemoCallbackApp re-renderizado')

  // ➕ Incrementar (com useCallback para memoizar)
  const handleIncremento = useCallback(() => {
    setContador((prev) => prev + 1)
  }, [])

  // ✅ Toggle tarefa (memoizado)
  const handleToggleTarefa = useCallback((id) => {
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)),
    )
  }, [])

  // 🗑️ Deletar tarefa (memoizado)
  const handleDeleteTarefa = useCallback((id) => {
    setTarefas((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // ➕ Adicionar tarefa (memoizado)
  const handleAddTarefa = useCallback(() => {
    if (!novaInput.trim()) return

    setTarefas((prev) => [
      ...prev,
      {
        id: Date.now(),
        texto: novaInput,
        concluida: false,
      },
    ])
    setNovaInput('')
  }, [novaInput])

  // 🎨 Trocar tema (não é memoizado - faz re-render completo)
  const handleTrocaTema = () => {
    setTema(tema === 'claro' ? 'escuro' : 'claro')
  }

  return (
    <div className={`memo-callback-container ${tema}`}>
      <div className="header">
        <h1>⚡ Otimização com React.memo e useCallback</h1>
        <button onClick={handleTrocaTema} className="btn-tema">
          {tema === 'claro' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="info-box">
        <p>💡 Abra o console (F12) para ver quando cada componente é re-renderizado</p>
      </div>

      <div className="cards-container">
        {/* Contador memoizado */}
        <ContadorMemo numero={contador} onIncremento={handleIncremento} />

        {/* Stats */}
        <div className="stats-card">
          <h3>📊 Estatísticas</h3>
          <div className="stat-item">
            <span>Contador:</span>
            <strong>{contador}</strong>
          </div>
          <div className="stat-item">
            <span>Total de Tarefas:</span>
            <strong>{tarefas.length}</strong>
          </div>
          <div className="stat-item">
            <span>Tarefas Concluídas:</span>
            <strong>{tarefas.filter((t) => t.concluida).length}</strong>
          </div>
        </div>
      </div>

      {/* Seção de Tarefas */}
      <div className="tarefas-section">
        <h2>📝 Tarefas (Memoizadas)</h2>

        <div className="input-group">
          <input
            type="text"
            value={novaInput}
            onChange={(e) => setNovaInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTarefa()}
            placeholder="Adicione uma nova tarefa..."
            className="input-tarefa"
          />
          <button onClick={handleAddTarefa} className="btn-add">
            ➕ Adicionar
          </button>
        </div>

        <div className="tarefas-lista">
          {tarefas.map((tarefa) => (
            <TarefaItem
              key={tarefa.id}
              tarefa={tarefa}
              onToggle={handleToggleTarefa}
              onDelete={handleDeleteTarefa}
            />
          ))}
        </div>
      </div>

      {/* Info sobre Performance */}
      <div className="performance-info">
        <h3>⚡ Como Funciona a Otimização:</h3>
        <ul>
          <li>
            <strong>React.memo:</strong> O componente ContadorMemo só re-renderiza se suas props
            mudarem
          </li>
          <li>
            <strong>useCallback:</strong> A função handleIncremento é memoizada, não recria a cada
            render
          </li>
          <li>
            <strong>Trocar Tema:</strong> Causa re-render da página inteira (sem memoização)
          </li>
          <li>
            <strong>Console:</strong> Verifique o console para ver qual componente está sendo
            renderizado
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MemoCallbackApp

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Memoizar mais componentes
 * - Adicionar profiler para ver diferença
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Implementar useMemo para cálculos
 * - Medir tempo de render antes/depois
 * - Adicionar filtros memoizados
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Criar componente de performance monitor
 * - Implementar virtual scrolling
 * - Comparar performance com/sem otimização
 */
