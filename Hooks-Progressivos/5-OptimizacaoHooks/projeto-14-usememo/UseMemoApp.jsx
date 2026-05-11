import { useState, useMemo } from 'react'
import './UseMemoApp.css'

/**
 * 📌 PROJETO 14: USEMEMO - CÁLCULOS PESADOS
 * 🎓 Conceitos: useMemo para otimização, cálculos custosos
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - useMemo para memoizar valores computados
 * - Evitar cálculos desnecessários
 * - Dependências do useMemo
 * - Quando usar useMemo
 */

// 🧮 Funções de cálculo
const calcularNumerosPrimos = (limite) => {
  console.log(`🔄 Calculando primos até ${limite}...`)
  const inicio = performance.now()

  const primos = []
  for (let i = 2; i <= limite; i++) {
    let ePrimo = true
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        ePrimo = false
        break
      }
    }
    if (ePrimo) primos.push(i)
  }

  const fim = performance.now()
  console.log(`✅ Cálculo concluído em ${(fim - inicio).toFixed(2)}ms`)

  return { primos, tempo: (fim - inicio).toFixed(2) }
}

const calcularFibonacci = (n) => {
  console.log(`🔄 Calculando Fibonacci até ${n}...`)
  const inicio = performance.now()

  const fib = [0, 1]
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2])
  }

  const fim = performance.now()
  console.log(`✅ Cálculo concluído em ${(fim - inicio).toFixed(2)}ms`)

  return { fib, tempo: (fim - inicio).toFixed(2) }
}

const calcularFatorial = (n) => {
  console.log(`🔄 Calculando fatores de ${n}...`)
  const inicio = performance.now()

  const fatores = []
  let numero = n
  for (let i = 2; i * i <= numero; i++) {
    while (numero % i === 0) {
      fatores.push(i)
      numero /= i
    }
  }
  if (numero > 1) fatores.push(numero)

  const fim = performance.now()
  console.log(`✅ Cálculo concluído em ${(fim - inicio).toFixed(2)}ms`)

  return { fatores, tempo: (fim - inicio).toFixed(2) }
}

// 📱 Componente Principal
function UseMemoApp() {
  // 🎯 Estados
  const [primoLimite, setPrimoLimite] = useState(100)
  const [fibonacci, setFibonacci] = useState(20)
  const [fatoriar, setFatoriar] = useState(24)
  const [contador, setContador] = useState(0)

  console.log('🔄 UseMemoApp re-renderizado')

  // 🧮 Cálculos com useMemo
  const resultadoPrimos = useMemo(
    () => calcularNumerosPrimos(primoLimite),
    [primoLimite], // Só recalcula se primoLimite mudar
  )

  const resultadoFibonacci = useMemo(
    () => calcularFibonacci(fibonacci),
    [fibonacci], // Só recalcula se fibonacci mudar
  )

  const resultadoFatorial = useMemo(
    () => calcularFatorial(fatoriar),
    [fatoriar], // Só recalcula se fatoriar mudar
  )

  // 💡 Análise de primos
  const analiseoPrimos = useMemo(() => {
    const quantidadePrimos = resultadoPrimos.primos.length
    const percentual = ((quantidadePrimos / primoLimite) * 100).toFixed(2)
    return { quantidadePrimos, percentual }
  }, [resultadoPrimos, primoLimite])

  return (
    <div className="usememo-container">
      <h1>📊 useMemo - Otimizar Cálculos</h1>

      <div className="info-banner">
        <p>
          💡 <strong>Abra o console</strong> para ver quando os cálculos são executados. Trocar o
          contador NÃO ativa os cálculos porque useMemo previne isso!
        </p>
      </div>

      {/* Botão de teste (não afeta cálculos) */}
      <div className="contador-teste">
        <h3>🧪 Teste (Não afeta cálculos)</h3>
        <p>Contador: {contador}</p>
        <button onClick={() => setContador(contador + 1)} className="btn-teste">
          Incrementar
        </button>
        <p className="hint">Veja o console - não há recálculo!</p>
      </div>

      <div className="calculos-grid">
        {/* 🔢 Números Primos */}
        <div className="calculo-card">
          <h2>🔢 Números Primos</h2>
          <div className="input-group">
            <label>Limite:</label>
            <input
              type="range"
              min="10"
              max="1000"
              value={primoLimite}
              onChange={(e) => setPrimoLimite(parseInt(e.target.value))}
              className="slider"
            />
            <span className="valor">{primoLimite}</span>
          </div>

          <div className="resultado">
            <p>
              <strong>Quantidade:</strong> {analiseoPrimos.quantidadePrimos} primos
            </p>
            <p>
              <strong>Percentual:</strong> {analiseoPrimos.percentual}%
            </p>
            <p className="tempo">⏱️ Tempo: {resultadoPrimos.tempo}ms</p>

            <div className="primos-preview">
              <strong>Primos:</strong>
              <div className="primos-lista">
                {resultadoPrimos.primos.slice(0, 10).join(', ')}
                {resultadoPrimos.primos.length > 10 && '...'}
              </div>
            </div>
          </div>
        </div>

        {/* 📈 Fibonacci */}
        <div className="calculo-card">
          <h2>📈 Fibonacci</h2>
          <div className="input-group">
            <label>Quantidade:</label>
            <input
              type="range"
              min="5"
              max="40"
              value={fibonacci}
              onChange={(e) => setFibonacci(parseInt(e.target.value))}
              className="slider"
            />
            <span className="valor">{fibonacci}</span>
          </div>

          <div className="resultado">
            <p>
              <strong>Elementos:</strong> {resultadoFibonacci.fib.length}
            </p>
            <p className="tempo">⏱️ Tempo: {resultadoFibonacci.tempo}ms</p>

            <div className="fib-preview">
              <strong>Sequência:</strong>
              <div className="fib-lista">
                {resultadoFibonacci.fib.slice(0, 10).join(', ')}
                {resultadoFibonacci.fib.length > 10 && '...'}
              </div>
            </div>

            <div className="fib-ultimo">
              <strong>Último valor:</strong> {resultadoFibonacci.fib[resultadoFibonacci.fib.length - 1]}
            </div>
          </div>
        </div>

        {/* ⚙️ Fatoração */}
        <div className="calculo-card">
          <h2>⚙️ Fatoração Prime</h2>
          <div className="input-group">
            <label>Número:</label>
            <input
              type="range"
              min="2"
              max="500"
              value={fatoriar}
              onChange={(e) => setFatoriar(parseInt(e.target.value))}
              className="slider"
            />
            <span className="valor">{fatoriar}</span>
          </div>

          <div className="resultado">
            <p>
              <strong>Fatores primos de {fatoriar}:</strong>
            </p>
            <div className="fatores">
              {resultadoFatorial.fatores.length > 0
                ? resultadoFatorial.fatores.join(' × ')
                : 'Número primo'}
            </div>
            <p className="tempo">⏱️ Tempo: {resultadoFatorial.tempo}ms</p>
          </div>
        </div>
      </div>

      {/* Explicação */}
      <div className="explicacao">
        <h2>📚 Como Funciona useMemo:</h2>
        <ul>
          <li>
            <strong>Sem useMemo:</strong> Cada render recalcula tudo, mesmo que as dependências não
            mudaram
          </li>
          <li>
            <strong>Com useMemo:</strong> Só recalcula quando as dependências mudam
          </li>
          <li>
            <strong>Console:</strong> Observe que mudar o contador não gera novos cálculos
          </li>
          <li>
            <strong>Sliders:</strong> Mover um slider só recalcula seu valor específico
          </li>
        </ul>
      </div>

      {/* Comparação */}
      <div className="comparacao">
        <h2>⚡ Sem vs Com useMemo:</h2>
        <div className="comparacao-grid">
          <div className="sem">
            <h3>❌ Sem useMemo</h3>
            <p>- Recalcula toda vez que o componente renderiza</p>
            <p>- Mesmo que as dependências não mudaram</p>
            <p>- Mais lento em cálculos custosos</p>
            <p>- Console mostra cálculo repetido</p>
          </div>
          <div className="com">
            <h3>✅ Com useMemo</h3>
            <p>- Só recalcula se dependências mudam</p>
            <p>- Reutiliza resultado anterior</p>
            <p>- Mais rápido</p>
            <p>- Console mostra cálculo apenas 1x</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UseMemoApp

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar mais cálculos (raiz quadrada, potência, etc)
 * - Mostrar histórico de cálculos
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Comparador visual de performance (com/sem useMemo)
 * - Estatísticas de economia de tempo
 * - Cache de resultados anteriores
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Implementar Web Workers para cálculos
 * - Profiler de performance em tempo real
 * - Visualizar gráficos de tempo
 * - Comparar várias estratégias de memoização
 */
