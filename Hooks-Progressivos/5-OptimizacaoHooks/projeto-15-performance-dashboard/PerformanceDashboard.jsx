import { useState, useCallback, useMemo, memo } from 'react'
import './PerformanceDashboard.css'

/**
 * 📌 PROJETO 15: PERFORMANCE DASHBOARD
 * 🎓 Conceitos: Integração de useCallback, useMemo, React.memo
 * ⭐ Dificuldade: AVANÇADO
 * 
 * 🎯 O que aprenderá:
 * - Combinar múltiplos hooks para otimização
 * - Medir e exibir performance
 * - Monitorar re-renders
 * - Análise de performance em tempo real
 */

// 📊 Card memoizado de métrica
const MetricaCard = memo(({ titulo, valor, unidade, cor, renderCount }) => {
  console.log(`📊 MetricaCard renderizado: ${titulo}`)

  return (
    <div className={`metrica-card ${cor}`}>
      <h3>{titulo}</h3>
      <div className="valor-grande">{valor}</div>
      <p className="unidade">{unidade}</p>
      <p className="render-count">Renders: {renderCount}</p>
    </div>
  )
})

MetricaCard.displayName = 'MetricaCard'

// 📈 Gráfico simples memoizado
const GraficoSimples = memo(({ dados, titulo }) => {
  console.log(`📈 GraficoSimples renderizado: ${titulo}`)

  const max = Math.max(...dados.map((d) => d.valor))

  return (
    <div className="grafico-card">
      <h3>{titulo}</h3>
      <div className="grafico">
        {dados.map((item, idx) => (
          <div key={idx} className="barra-container">
            <div
              className="barra"
              style={{
                height: `${(item.valor / max) * 100}%`,
              }}
            ></div>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
})

GraficoSimples.displayName = 'GraficoSimples'

// 📱 Componente Principal
function PerformanceDashboard() {
  // 🎯 Estados
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'João', ativo: true, posts: 45 },
    { id: 2, nome: 'Maria', ativo: true, posts: 32 },
    { id: 3, nome: 'Pedro', ativo: false, posts: 18 },
    { id: 4, nome: 'Ana', ativo: true, posts: 67 },
    { id: 5, nome: 'Carlos', ativo: true, posts: 23 },
  ])

  const [renderCount, setRenderCount] = useState(0)
  const [metricasRenderCount, setMetricasRenderCount] = useState({
    usuarios: 0,
    posts: 0,
    performance: 0,
    atividade: 0,
  })

  console.log(`🔄 Dashboard re-renderizado (${renderCount} vezes)`)

  // ➕ Adicionar usuário (memoizado)
  const handleAdicionarUsuario = useCallback(() => {
    const novoUsuario = {
      id: Math.max(...usuarios.map((u) => u.id), 0) + 1,
      nome: `Usuário ${Math.max(...usuarios.map((u) => u.id), 0) + 1}`,
      ativo: true,
      posts: Math.floor(Math.random() * 100),
    }
    setUsuarios((prev) => [...prev, novoUsuario])
    setRenderCount((prev) => prev + 1)
  }, [usuarios])

  // 🧮 Cálculos memoizados
  const analiseUsuarios = useMemo(() => {
    console.log('🧮 Recalculando analiseUsuarios')
    setMetricasRenderCount((prev) => ({
      ...prev,
      usuarios: prev.usuarios + 1,
    }))

    return {
      total: usuarios.length,
      ativos: usuarios.filter((u) => u.ativo).length,
      inativos: usuarios.filter((u) => !u.ativo).length,
    }
  }, [usuarios])

  const analisePosts = useMemo(() => {
    console.log('🧮 Recalculando analisePosts')
    setMetricasRenderCount((prev) => ({
      ...prev,
      posts: prev.posts + 1,
    }))

    const total = usuarios.reduce((acc, u) => acc + u.posts, 0)
    const media = (total / usuarios.length).toFixed(1)
    const maximo = Math.max(...usuarios.map((u) => u.posts), 0)

    return { total, media, maximo }
  }, [usuarios])

  const metricsaPerformance = useMemo(() => {
    console.log('🧮 Recalculando performance')
    setMetricasRenderCount((prev) => ({
      ...prev,
      performance: prev.performance + 1,
    }))

    return {
      componentes: 12,
      memoizados: 8,
      taxaOtimizacao: ((8 / 12) * 100).toFixed(1),
    }
  }, [])

  const dadosAtividade = useMemo(() => {
    console.log('🧮 Recalculando dados de atividade')
    setMetricasRenderCount((prev) => ({
      ...prev,
      atividade: prev.atividade + 1,
    }))

    return usuarios.map((u) => ({
      label: u.nome,
      valor: u.posts,
    }))
  }, [usuarios])

  // 📊 Dados do gráfico de status
  const dadosStatus = useMemo(
    () => [
      { label: 'Ativos', valor: analiseUsuarios.ativos },
      { label: 'Inativos', valor: analiseUsuarios.inativos },
    ],
    [analiseUsuarios],
  )

  return (
    <div className="performance-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>📊 Performance Dashboard</h1>
        <p>Monitoramento de otimização com hooks</p>
      </header>

      {/* Info */}
      <div className="info-box">
        <p>
          💡 Este dashboard demonstra como <strong>useCallback</strong>, <strong>useMemo</strong> e{' '}
          <strong>React.memo</strong> trabalham juntos para otimizar performance.
        </p>
      </div>

      {/* Controles */}
      <div className="controles">
        <button onClick={handleAdicionarUsuario} className="btn-adicionar">
          ➕ Adicionar Usuário
        </button>
        <p>Total de renders: {renderCount}</p>
      </div>

      {/* Métricas */}
      <div className="metricas-grid">
        <MetricaCard
          titulo="👥 Total de Usuários"
          valor={analiseUsuarios.total}
          unidade="usuários"
          cor="azul"
          renderCount={metricasRenderCount.usuarios}
        />
        <MetricaCard
          titulo="✅ Usuários Ativos"
          valor={analiseUsuarios.ativos}
          unidade="ativos"
          cor="verde"
          renderCount={metricasRenderCount.usuarios}
        />
        <MetricaCard
          titulo="📝 Total de Posts"
          valor={analisePosts.total}
          unidade="posts"
          cor="roxo"
          renderCount={metricasRenderCount.posts}
        />
        <MetricaCard
          titulo="📊 Média de Posts"
          valor={analisePosts.media}
          unidade="por usuário"
          cor="laranja"
          renderCount={metricasRenderCount.posts}
        />
        <MetricaCard
          titulo="⚡ Taxa de Otimização"
          valor={metricsaPerformance.taxaOtimizacao}
          unidade="%"
          cor="rosa"
          renderCount={metricasRenderCount.performance}
        />
        <MetricaCard
          titulo="🎯 Componentes Memoizados"
          valor={metricsaPerformance.memoizados}
          unidade={`de ${metricsaPerformance.componentes}`}
          cor="ciano"
          renderCount={metricasRenderCount.performance}
        />
      </div>

      {/* Gráficos */}
      <div className="graficos-container">
        <GraficoSimples dados={dadosStatus} titulo="Status dos Usuários" />
        <GraficoSimples dados={dadosAtividade} titulo="Posts por Usuário" />
      </div>

      {/* Tabela */}
      <div className="tabela-container">
        <h2>📋 Detalhes dos Usuários</h2>
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Posts</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>
                  <span className={usuario.ativo ? 'ativo' : 'inativo'}>
                    {usuario.ativo ? '🟢 Ativo' : '🔴 Inativo'}
                  </span>
                </td>
                <td>{usuario.posts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info sobre otimização */}
      <div className="otimizacao-info">
        <h2>⚡ Estratégias de Otimização Utilizadas:</h2>
        <div className="estrategias">
          <div className="estrategia">
            <h3>🔄 React.memo</h3>
            <p>Componentes MetricaCard e GraficoSimples não re-renderizam se props não mudarem</p>
          </div>
          <div className="estrategia">
            <h3>📌 useCallback</h3>
            <p>handleAdicionarUsuario é memoizado, evita criar nova função a cada render</p>
          </div>
          <div className="estrategia">
            <h3>💾 useMemo</h3>
            <p>Cálculos complexos são armazenados, só recalculam se dependências mudarem</p>
          </div>
          <div className="estrategia">
            <h3>📊 Console</h3>
            <p>Abra o console para ver exatamente quando cada cálculo é realizado</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceDashboard

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar mais métricas (taxa de crescimento, etc)
 * - Adicionar mais gráficos
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Implementar Real-time monitoring
 * - Adicionar histórico de renders
 * - Comparar performance com/sem otimização
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Integrar React DevTools Profiler
 * - Análise detalhada de component renders
 * - Gráficos interativos com library (Chart.js)
 * - Sistema de alertas de performance
 */
