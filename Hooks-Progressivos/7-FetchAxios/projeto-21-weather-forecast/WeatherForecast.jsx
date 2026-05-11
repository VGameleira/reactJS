import { useState, useEffect } from 'react'
import './WeatherForecast.css'

/**
 * 📌 PROJETO 21: PREVISÃO DO TEMPO - 5 DIAS
 * 🎓 Conceitos: Fetch avançado, múltiplos dados, gráficos, estado complexo
 * ⭐ Dificuldade: AVANÇADO
 * 
 * 🎯 O que aprenderá:
 * - API com múltiplas camadas de dados
 * - Processamento de dados de forecast
 * - Visualização de gráficos simples
 * - Tratamento de erros de API
 * - Dados agregados por dia
 */

// 🌍 Dados mock de previsão
const PREVISAO_MOCK = {
  latitude: -23.5505,
  longitude: -46.6333,
  cidade: 'São Paulo',
  pais: 'Brasil',
  dias: [
    {
      dia: 'Seg, 15 Jan',
      tempMax: 28,
      tempMin: 22,
      condicao: 'Ensolarado',
      umidade: 65,
      velocidadeVento: 12,
      icone: '☀️',
      precipitacao: 0,
    },
    {
      dia: 'Ter, 16 Jan',
      tempMax: 27,
      tempMin: 21,
      condicao: 'Nublado',
      umidade: 72,
      velocidadeVento: 15,
      icone: '⛅',
      precipitacao: 10,
    },
    {
      dia: 'Qua, 17 Jan',
      tempMax: 26,
      tempMin: 19,
      condicao: 'Chuvoso',
      umidade: 85,
      velocidadeVento: 20,
      icone: '🌧️',
      precipitacao: 45,
    },
    {
      dia: 'Qui, 18 Jan',
      tempMax: 25,
      tempMin: 18,
      condicao: 'Chuvoso',
      umidade: 88,
      velocidadeVento: 22,
      icone: '⛈️',
      precipitacao: 65,
    },
    {
      dia: 'Sex, 19 Jan',
      tempMax: 27,
      tempMin: 20,
      condicao: 'Nublado',
      umidade: 75,
      velocidadeVento: 16,
      icone: '⛅',
      precipitacao: 20,
    },
  ],
}

function WeatherForecast() {
  // 🪝 Estados
  const [localizacao, setLocalizacao] = useState('São Paulo')
  const [previsao, setPrevisao] = useState(PREVISAO_MOCK)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)
  const [diaSelecionado, setDiaSelecionado] = useState(0)
  const [unidade, setUnidade] = useState('C') // Celsius ou Fahrenheit

  // 📡 Converter temperatura
  const converterTemp = (celsius) => {
    return unidade === 'C' ? Math.round(celsius) : Math.round((celsius * 9) / 5 + 32)
  }

  // 🌡️ Cor baseada na temperatura
  const corTemperatura = (temp) => {
    if (temp >= 28) return '#FF6B6B'
    if (temp >= 22) return '#FFA500'
    if (temp >= 15) return '#4ECDC4'
    return '#3498DB'
  }

  // 📊 Calcular altura da barra (gráfico simples)
  const calcularAltura = (temp) => {
    return Math.max(10, (Math.abs(temp) * 5) + 30)
  }

  return (
    <div className="weather-container">
      <header className="weather-header">
        <h1>🌍 Previsão do Tempo</h1>
        <p>5 dias de forecast meteorológico</p>
      </header>

      {/* Informações da localização */}
      <div className="info-localizacao">
        <div className="localizacao-card">
          <h2>📍 {previsao.cidade}</h2>
          <p>
            Latitude: {previsao.latitude}° | Longitude: {previsao.longitude}°
          </p>
          <p>País: {previsao.pais}</p>
        </div>

        <div className="unidade-toggle">
          <button
            onClick={() => setUnidade('C')}
            className={`btn-unidade ${unidade === 'C' ? 'ativo' : ''}`}
          >
            °C
          </button>
          <button
            onClick={() => setUnidade('F')}
            className={`btn-unidade ${unidade === 'F' ? 'ativo' : ''}`}
          >
            °F
          </button>
        </div>
      </div>

      {/* Dias da previsão */}
      <div className="dias-container">
        {previsao.dias.map((dia, index) => (
          <div
            key={index}
            className={`dia-card ${diaSelecionado === index ? 'selecionado' : ''}`}
            onClick={() => setDiaSelecionado(index)}
          >
            <div className="dia-icone">{dia.icone}</div>
            <p className="dia-nome">{dia.dia}</p>
            <p className="dia-condicao">{dia.condicao}</p>
            <p className="dia-temperatura">
              {converterTemp(dia.tempMax)}° / {converterTemp(dia.tempMin)}°
            </p>
          </div>
        ))}
      </div>

      {/* Detalhes do dia selecionado */}
      <div className="detalhes-card">
        <h3>📊 Detalhes - {previsao.dias[diaSelecionado].dia}</h3>

        <div className="detalhes-grid">
          <div className="detalhe-item">
            <span className="label">Temperatura Máxima</span>
            <span className="valor">
              {converterTemp(previsao.dias[diaSelecionado].tempMax)}°{unidade}
            </span>
          </div>

          <div className="detalhe-item">
            <span className="label">Temperatura Mínima</span>
            <span className="valor">
              {converterTemp(previsao.dias[diaSelecionado].tempMin)}°{unidade}
            </span>
          </div>

          <div className="detalhe-item">
            <span className="label">Umidade</span>
            <span className="valor">{previsao.dias[diaSelecionado].umidade}%</span>
          </div>

          <div className="detalhe-item">
            <span className="label">Vento</span>
            <span className="valor">{previsao.dias[diaSelecionado].velocidadeVento} km/h</span>
          </div>

          <div className="detalhe-item">
            <span className="label">Precipitação</span>
            <span className="valor">{previsao.dias[diaSelecionado].precipitacao} mm</span>
          </div>

          <div className="detalhe-item">
            <span className="label">Condição</span>
            <span className="valor">{previsao.dias[diaSelecionado].condicao}</span>
          </div>
        </div>
      </div>

      {/* Gráfico simples de temperatura */}
      <div className="grafico-container">
        <h3>📈 Gráfico de Temperatura (5 dias)</h3>
        <div className="grafico">
          {previsao.dias.map((dia, index) => (
            <div key={index} className="coluna-grafico">
              <div
                className="barra-temperatura"
                style={{
                  height: calcularAltura(dia.tempMax) + 'px',
                  backgroundColor: corTemperatura(dia.tempMax),
                }}
              >
                <span className="temp-label">{converterTemp(dia.tempMax)}°</span>
              </div>
              <p className="dia-label">{dia.dia.split(',')[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas (se houver chuva intensa ou vento forte) */}
      <div className="alertas-container">
        <h3>⚠️ Alertas</h3>
        <div className="alertas-list">
          {previsao.dias
            .filter((dia) => dia.precipitacao > 40 || dia.velocidadeVento > 20)
            .map((dia, index) => (
              <div key={index} className="alerta-item">
                <span className="alerta-icone">
                  {dia.precipitacao > 40 ? '🌧️' : '💨'}
                </span>
                <div className="alerta-texto">
                  <p className="alerta-titulo">
                    {dia.precipitacao > 40 ? 'Chuva Intensa' : 'Vento Forte'}
                  </p>
                  <p className="alerta-descricao">
                    {dia.dia} -{' '}
                    {dia.precipitacao > 40
                      ? `Precipitação de ${dia.precipitacao}mm`
                      : `Vento de ${dia.velocidadeVento} km/h`}
                  </p>
                </div>
              </div>
            ))}
          {previsao.dias.filter((dia) => dia.precipitacao > 40 || dia.velocidadeVento > 20)
            .length === 0 && <p className="sem-alertas">Sem alertas para os próximos 5 dias</p>}
        </div>
      </div>

      {/* Índice UV (simulado) */}
      <div className="indice-uv-container">
        <h3>☀️ Índice UV</h3>
        <div className="uv-items">
          {previsao.dias.map((dia, index) => (
            <div key={index} className="uv-item">
              <p className="uv-dia">{dia.dia.split(',')[0]}</p>
              <div className="uv-escala">
                <div
                  className="uv-barra"
                  style={{
                    width: Math.random() * 80 + 20 + '%',
                    background: `hsl(${Math.random() * 60}, 100%, 50%)`,
                  }}
                />
              </div>
              <p className="uv-nivel">{Math.floor(Math.random() * 10) + 1}+</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeatherForecast

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar mais dias (10 dias)
 * - Adicionar mais cidades
 * - Permitir mudar a localização
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Integrar com API real (Open-Meteo)
 * - Usar geolocalização do navegador
 * - Adicionar histórico de buscas (localStorage)
 * - Gráfico com Chart.js
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Notificações de alertas
 * - Comparação com dias anteriores
 * - Previsão mensal agregada
 * - Cache de dados e sincronização em tempo real
 */
