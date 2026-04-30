import { useState, useRef } from 'react'
import './TodoApp.css'

/**
 * 📌 PROJETO 07: TODO APP (Aplicativo de Tarefas)
 * 🎓 Conceitos: Formulários controlados, localStorage, renderização de listas
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - Formulários controlados com múltiplos campos
 * - Manipulação de arrays (adicionar, remover, atualizar)
 * - Persistência com localStorage
 * - Filtros e busca
 */

function TodoApp() {
  // 📝 Estado para a nova tarefa
  const [tarefaInput, setTarefaInput] = useState('')

  // 📋 Estado para a lista de tarefas
  const [tarefas, setTarefas] = useState(() => {
    // 💾 Carregar tarefas do localStorage ao montar
    const salvo = localStorage.getItem('tarefas')
    return salvo ? JSON.parse(salvo) : []
  })

  // 🔍 Estado para filtro
  const [filtro, setFiltro] = useState('todas') // 'todas', 'ativas', 'completas'

  // 📌 Referência ao input
  const inputRef = useRef(null)

  // 💾 Salvar tarefas no localStorage
  const salvarNoLocalStorage = (novasTarefas) => {
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas))
  }

  // ➕ Adicionar nova tarefa
  const adicionarTarefa = (e) => {
    e.preventDefault()

    if (!tarefaInput.trim()) {
      alert('⚠️ Digite uma tarefa!')
      inputRef.current?.focus()
      return
    }

    const novaTarefa = {
      id: Date.now(),
      texto: tarefaInput,
      concluida: false,
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
    }

    const novasTarefas = [...tarefas, novaTarefa]
    setTarefas(novasTarefas)
    salvarNoLocalStorage(novasTarefas)

    setTarefaInput('')
    inputRef.current?.focus()
  }

  // ✅ Marcar tarefa como concluída
  const toggleTarefa = (id) => {
    const novasTarefas = tarefas.map((t) =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    )
    setTarefas(novasTarefas)
    salvarNoLocalStorage(novasTarefas)
  }

  // 🗑️ Deletar tarefa
  const deletarTarefa = (id) => {
    const novasTarefas = tarefas.filter((t) => t.id !== id)
    setTarefas(novasTarefas)
    salvarNoLocalStorage(novasTarefas)
  }

  // 🧹 Limpar todas as concluídas
  const limparConcluidas = () => {
    const novasTarefas = tarefas.filter((t) => !t.concluida)
    setTarefas(novasTarefas)
    salvarNoLocalStorage(novasTarefas)
  }

  // 🔍 Filtrar tarefas
  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === 'ativas') return !t.concluida
    if (filtro === 'completas') return t.concluida
    return true
  })

  // 📊 Contar tarefas
  const totalTarefas = tarefas.length
  const tarefasAcabadas = tarefas.filter((t) => t.concluida).length

  return (
    <div className="todo-container">
      <div className="todo-card">
        <h1>📝 Meu Lista de Tarefas</h1>

        {/* 📊 Estatísticas */}
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Total:</span>
            <span className="stat-valor">{totalTarefas}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Concluídas:</span>
            <span className="stat-valor">{tarefasAcabadas}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Pendentes:</span>
            <span className="stat-valor">{totalTarefas - tarefasAcabadas}</span>
          </div>
        </div>

        {/* ➕ Formulário para adicionar tarefa */}
        <form onSubmit={adicionarTarefa} className="form-adicionar">
          <input
            ref={inputRef}
            type="text"
            value={tarefaInput}
            onChange={(e) => setTarefaInput(e.target.value)}
            placeholder="Digite uma nova tarefa..."
            className="input-tarefa"
          />
          <button type="submit" className="btn-adicionar">
            ➕ Adicionar
          </button>
        </form>

        {/* 🔍 Filtros */}
        <div className="filtros">
          <button
            onClick={() => setFiltro('todas')}
            className={`filtro-btn ${filtro === 'todas' ? 'ativo' : ''}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFiltro('ativas')}
            className={`filtro-btn ${filtro === 'ativas' ? 'ativo' : ''}`}
          >
            Ativas
          </button>
          <button
            onClick={() => setFiltro('completas')}
            className={`filtro-btn ${filtro === 'completas' ? 'ativo' : ''}`}
          >
            Completas
          </button>
        </div>

        {/* 📋 Lista de tarefas */}
        <div className="lista-tarefas">
          {tarefasFiltradas.length === 0 ? (
            <p className="vazio">
              {filtro === 'todas'
                ? '✨ Nenhuma tarefa ainda. Adicione uma!'
                : `✨ Nenhuma tarefa ${filtro === 'ativas' ? 'ativa' : 'completa'}`}
            </p>
          ) : (
            tarefasFiltradas.map((tarefa) => (
              <div key={tarefa.id} className={`tarefa-item ${tarefa.concluida ? 'concluida' : ''}`}>
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => toggleTarefa(tarefa.id)}
                  className="checkbox"
                />
                <div className="tarefa-conteudo">
                  <p className="tarefa-texto">{tarefa.texto}</p>
                  <small className="tarefa-data">{tarefa.dataCriacao}</small>
                </div>
                <button onClick={() => deletarTarefa(tarefa.id)} className="btn-deletar">
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* 🧹 Botão limpar concluídas */}
        {tarefasAcabadas > 0 && (
          <button onClick={limparConcluidas} className="btn-limpar">
            🧹 Limpar Concluídas
          </button>
        )}
      </div>
    </div>
  )
}

export default TodoApp

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar prioridade (baixa, média, alta)
 * - Mostrar tarefas por prioridade
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Adicionar categorias/tags às tarefas
 * - Editar tarefas existentes
 * - Adicionar data de conclusão esperada
 * - Buscar tarefas por texto
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Recursa/undo (desfazer últimas ações)
 * - Exportar tarefas em PDF
 * - Integrar com API de backend
 * - Adicionar som quando completa tarefa
 */
