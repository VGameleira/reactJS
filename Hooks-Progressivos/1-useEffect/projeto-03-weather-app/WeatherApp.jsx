import { useState, useEffect } from 'react'
import './WeatherApp.css'

/**
 * 📌 PROJETO 03: APLICATIVO DE CLIMA
 * 🎓 Conceitos: useEffect com dependências, múltiplos fetches, estado complexo
 * ⭐ Dificuldade: AVANÇADO
 * 
 * 🎯 O que aprenderá:
 * - useEffect com dependências específicas
 * - Fazer múltiplas requisições de forma coordenada
 * - Gerenciar estado complexo com múltiplos campos
 * - Validação de entrada do usuário
 */

function WeatherApp() {
  // 🏘️ Estados para gerenciar a aplicação
  const [cidade, setCidade] = useState('São Paulo')
  const [inputCidade, setInputCidade] = useState('')
  const [clima, setClima] = useState(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  // 🌍 Buscar clima quando a cidade muda
  useEffect(() => {
    if (!cidade.trim()) return // Não fazer requisição se cidade vazia

    const buscarClima = async () => {
      try {
        setLoading(true)
        setErro(null)

        // 🌐 Usar API aberta do Open Meteo (sem autenticação)
        const resposta = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1`
        )

        if (!resposta.ok) throw new Error('Cidade não encontrada')

        const dadosCidade = await resposta.json()

        if (!dadosCidade.results || dadosCidade.results.length === 0) {
          throw new Error('Cidade não encontrada')
        }

        const { latitude, longitude, name, country } = dadosCidade.results[0]

        // 🌡️ Segunda requisição: clima da cidade
        const respostaClima = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
        )

        if (!respostaClima.ok) throw new Error('Erro ao buscar clima')

        const dadosClima = await respostaClima.json()

        // 📊 Processar dados
        setClima({
          cidade: name,
          país: country,
          temperatura: dadosClima.current.temperature_2m,
          tempoMax: dadosClima.current.temperature_2m_max,
          tempoMin: dadosClima.current.temperature_2m_min,
          codigo: dadosClima.current.weather_code,
          descricao: getDescricaoClima(dadosClima.current.weather_code),
        })
      } catch (erro) {
        console.error('Erro:', erro)
        setErro(erro.message)
        setClima(null)
      } finally {
        setLoading(false)
      }
    }

    buscarClima()
  }, [cidade]) // ← Dependência: reexecutar quando cidade muda

  // 🎯 Traduzir código de clima para descrição legível
  function getDescricaoClima(codigo) {
    const descricoes = {
      0: 'Céu limpo',
      1: 'Céu parcialmente nublado',
      2: 'Nublado',
      3: 'Nublado',
      45: 'Neblina',
      48: 'Neblina com cristais de gelo',
      51: 'Chuva leve',
      61: 'Chuva',
      71: 'Neve leve',
      80: 'Chuva forte',
      95: 'Tempestade',
    }
    return descricoes[codigo] || 'Clima desconhecido'
  }

  // 🔍 Pesquisar nova cidade
  const handlePesquisar = (e) => {
    e.preventDefault()
    if (inputCidade.trim()) {
      setCidade(inputCidade)
      setInputCidade('')
    }
  }

  // 🎨 Escolher emoji baseado no clima
  const getEmoji = () => {
    if (!clima) return '❓'
    if (clima.codigo === 0) return '☀️'
    if ([1, 2, 3].includes(clima.codigo)) return '☁️'
    if (clima.codigo === 45 || clima.codigo === 48) return '🌫️'
    if ([51, 61, 80].includes(clima.codigo)) return '🌧️'
    if ([71, 85].includes(clima.codigo)) return '❄️'
    if (clima.codigo === 95) return '⛈️'
    return '🌤️'
  }

  return (
    <div className="weather-container">
      <h1>🌡️ Aplicativo de Clima</h1>

      {/* 🔍 Formulário de pesquisa */}
      <form onSubmit={handlePesquisar} className="search-form">
        <input
          type="text"
          value={inputCidade}
          onChange={(e) => setInputCidade(e.target.value)}
          placeholder="Digite o nome de uma cidade..."
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍 Pesquisar
        </button>
      </form>

      {/* ⏳ Estado de carregamento */}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando clima de {cidade}...</p>
        </div>
      )}

      {/* ❌ Estado de erro */}
      {erro && !loading && (
        <div className="erro-box">
          <p>❌ {erro}</p>
          <small>Tente outra cidade</small>
        </div>
      )}

      {/* ✅ Exibir clima */}
      {clima && !loading && (
        <div className="clima-card">
          <div className="clima-header">
            <span className="emoji-grande">{getEmoji()}</span>
            <div>
              <h2>
                {clima.cidade}, {clima.país}
              </h2>
              <p className="descricao">{clima.descricao}</p>
            </div>
          </div>

          <div className="clima-info">
            <div className="info-item">
              <span className="label">Temperatura</span>
              <span className="valor">{clima.temperatura}°C</span>
            </div>
            <div className="info-item">
              <span className="label">Máxima</span>
              <span className="valor">{clima.tempoMax}°C</span>
            </div>
            <div className="info-item">
              <span className="label">Mínima</span>
              <span className="valor">{clima.tempoMin}°C</span>
            </div>
          </div>
        </div>
      )}

      {/* 💡 Dica inicial */}
      {!clima && !loading && !erro && (
        <div className="info-box">
          <p>💡 Digite o nome de uma cidade para ver o clima</p>
        </div>
      )}
    </div>
  )
}

export default WeatherApp

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar histórico de cidades pesquisadas
 * - Botões de "Cidades Favoritas"
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Usar geolocalização do navegador para buscar clima automático
 * - Adicionar previsão de 5 dias
 * - Incluir umidade, velocidade do vento, UV
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Salvar favoritos em localStorage
 * - Converter entre Celsius/Fahrenheit
 * - Adicionar gráfico de temperatura (Chart.js)
 * - Incluir alertas de clima severo
 */
