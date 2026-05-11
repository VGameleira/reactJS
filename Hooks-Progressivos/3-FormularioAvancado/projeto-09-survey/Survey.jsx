import { useState } from 'react'
import './Survey.css'

/**
 * 📌 PROJETO 09: QUESTIONÁRIO/QUIZ
 * 🎓 Conceitos: Formulário multi-step, condicional, score
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - Formulários com múltiplas etapas
 * - Condicional rendering
 * - Cálculo de pontuação
 * - Estado complexo com progresso
 */

// 📋 Perguntas do questionário
const PERGUNTAS = [
  {
    id: 1,
    pergunta: 'Qual é seu nível de experiência com React?',
    tipo: 'multipla',
    opcoes: [
      { valor: 'iniciante', label: 'Iniciante - Nunca usei', pontos: 1 },
      { valor: 'basico', label: 'Básico - Alguns meses', pontos: 2 },
      { valor: 'intermediario', label: 'Intermediário - Vários projetos', pontos: 3 },
      { valor: 'avancado', label: 'Avançado - Expert', pontos: 4 },
    ],
  },
  {
    id: 2,
    pergunta: 'Com que frequência você pratica?',
    tipo: 'multipla',
    opcoes: [
      { valor: 'nunca', label: 'Nunca pratico', pontos: 0 },
      { valor: 'raramente', label: 'Raramente (1x ao mês)', pontos: 1 },
      { valor: 'algumas', label: 'Algumas vezes (1-2x semana)', pontos: 2 },
      { valor: 'frequente', label: 'Frequentemente (3+ vezes semana)', pontos: 3 },
    ],
  },
  {
    id: 3,
    pergunta: 'Você sabe usar Hooks?',
    tipo: 'binaria',
    opcoes: [
      { valor: 'sim', label: 'Sim, com facilidade', pontos: 2 },
      { valor: 'nao', label: 'Não, quero aprender', pontos: 0 },
    ],
  },
  {
    id: 4,
    pergunta: 'Qual área te interessa mais?',
    tipo: 'multipla',
    opcoes: [
      { valor: 'frontend', label: '🎨 Frontend - Interface', pontos: 2 },
      { valor: 'backend', label: '⚙️ Backend - Servidor', pontos: 2 },
      { valor: 'fullstack', label: '🔄 Full Stack - Tudo', pontos: 3 },
      { valor: 'dados', label: '📊 Data Science - Dados', pontos: 2 },
    ],
  },
  {
    id: 5,
    pergunta: 'Você prefere aprender por:',
    tipo: 'multipla',
    opcoes: [
      { valor: 'video', label: '🎥 Vídeos', pontos: 1 },
      { valor: 'texto', label: '📝 Documentação/Texto', pontos: 2 },
      { valor: 'pratica', label: '💻 Prática/Exercícios', pontos: 3 },
      { valor: 'projetos', label: '🚀 Projetos reais', pontos: 3 },
    ],
  },
]

function Survey() {
  // 🎯 Estado do questionário
  const [etapa, setEtapa] = useState(0) // 0 = inicio, 1-5 = perguntas, 6 = resultado
  const [respostas, setRespostas] = useState({})
  const [pontuacaoTotal, setPontuacaoTotal] = useState(0)

  // ✅ Iniciar questionário
  const iniciarQuestionario = () => {
    setEtapa(1)
    setRespostas({})
    setPontuacaoTotal(0)
  }

  // 📝 Selecionar resposta
  const selecionarResposta = (perguntaId, opcaoSelecionada) => {
    const pergunta = PERGUNTAS.find((p) => p.id === perguntaId)
    const opcao = pergunta.opcoes.find((o) => o.valor === opcaoSelecionada)

    setRespostas((prev) => ({
      ...prev,
      [perguntaId]: {
        resposta: opcaoSelecionada,
        pontos: opcao.pontos,
      },
    }))
  }

  // ➡️ Próxima pergunta
  const proximaPergunta = () => {
    const perguntaAtual = PERGUNTAS[etapa - 1]

    // Validar se respondeu
    if (!respostas[perguntaAtual.id]) {
      alert('Por favor, selecione uma opção!')
      return
    }

    if (etapa < PERGUNTAS.length) {
      setEtapa(etapa + 1)
    } else {
      calcularResultado()
    }
  }

  // ⬅️ Pergunta anterior
  const perguntaAnterior = () => {
    if (etapa > 1) {
      setEtapa(etapa - 1)
    }
  }

  // 🏆 Calcular resultado final
  const calcularResultado = () => {
    const total = Object.values(respostas).reduce((acc, r) => acc + r.pontos, 0)
    setPontuacaoTotal(total)
    setEtapa(PERGUNTAS.length + 1)
  }

  // 🔄 Reiniciar
  const reiniciar = () => {
    setEtapa(0)
    setRespostas({})
    setPontuacaoTotal(0)
  }

  // 📊 Obter feedback baseado em pontos
  const obterFeedback = () => {
    if (pontuacaoTotal <= 3) {
      return {
        titulo: '🌱 Iniciante',
        cor: 'iniciante',
        mensagem: 'Você está começando! Foco em fundamentos e prática consistente.',
      }
    } else if (pontuacaoTotal <= 7) {
      return {
        titulo: '📈 Básico',
        cor: 'basico',
        mensagem: 'Você tem uma boa base! Explore projetos mais complexos.',
      }
    } else if (pontuacaoTotal <= 11) {
      return {
        titulo: '🎯 Intermediário',
        cor: 'intermediario',
        mensagem: 'Excelente progresso! Aprofunde em Hooks avançados e padrões.',
      }
    } else {
      return {
        titulo: '🚀 Avançado',
        cor: 'avancado',
        mensagem: 'Parabéns! Você está no nível avançado. Crie projetos inovadores!',
      }
    }
  }

  // 🎨 Render da página inicial
  if (etapa === 0) {
    return (
      <div className="survey-container">
        <div className="welcome-box">
          <h1>📝 Questionário de Diagnóstico</h1>
          <p>Responda algumas perguntas para sabermos melhor sobre seu nível e preferências</p>
          <button onClick={iniciarQuestionario} className="btn-principal">
            Começar Questionário
          </button>
        </div>
      </div>
    )
  }

  // 🏆 Render do resultado
  if (etapa === PERGUNTAS.length + 1) {
    const feedback = obterFeedback()

    return (
      <div className="survey-container">
        <div className={`resultado-box ${feedback.cor}`}>
          <h1>{feedback.titulo}</h1>
          <div className="pontuacao">
            <span className="numero">{pontuacaoTotal}</span>
            <span className="max">/ {PERGUNTAS.reduce((acc, p) => acc + Math.max(...p.opcoes.map((o) => o.pontos)), 0)}</span>
          </div>
          <p className="mensagem">{feedback.mensagem}</p>

          <div className="respostas-resumo">
            <h3>📋 Suas Respostas:</h3>
            {PERGUNTAS.map((pergunta) => {
              const resposta = respostas[pergunta.id]
              const opcaoSelecionada = pergunta.opcoes.find(
                (o) => o.valor === resposta.resposta,
              )

              return (
                <div key={pergunta.id} className="resposta-item">
                  <strong>{pergunta.pergunta}</strong>
                  <p>{opcaoSelecionada.label}</p>
                  <span className="pontos">+{resposta.pontos} pts</span>
                </div>
              )
            })}
          </div>

          <button onClick={reiniciar} className="btn-principal">
            Refazer Questionário
          </button>
        </div>
      </div>
    )
  }

  // 📋 Render da pergunta
  const perguntaAtual = PERGUNTAS[etapa - 1]
  const respostaAtual = respostas[perguntaAtual.id]

  return (
    <div className="survey-container">
      <div className="question-box">
        {/* Barra de progresso */}
        <div className="progresso">
          <div className="progresso-barra">
            <div
              className="progresso-fill"
              style={{
                width: `${((etapa - 1) / PERGUNTAS.length) * 100}%`,
              }}
            />
          </div>
          <span className="progresso-texto">
            Pergunta {etapa} de {PERGUNTAS.length}
          </span>
        </div>

        {/* Pergunta */}
        <div className="pergunta-area">
          <h2>{perguntaAtual.pergunta}</h2>

          {/* Opções */}
          <div className="opcoes">
            {perguntaAtual.opcoes.map((opcao) => (
              <label key={opcao.valor} className="opcao">
                <input
                  type="radio"
                  name={`pergunta-${perguntaAtual.id}`}
                  value={opcao.valor}
                  checked={respostaAtual?.resposta === opcao.valor}
                  onChange={() => selecionarResposta(perguntaAtual.id, opcao.valor)}
                />
                <span className="opcao-label">{opcao.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Botões de navegação */}
        <div className="navegacao">
          <button
            onClick={perguntaAnterior}
            className="btn-secundario"
            disabled={etapa === 1}
          >
            ⬅️ Anterior
          </button>

          <button onClick={proximaPergunta} className="btn-principal">
            {etapa === PERGUNTAS.length ? '🏆 Ver Resultado' : 'Próxima ➡️'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Survey

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar mais perguntas (10+ total)
 * - Salvar respostas em localStorage
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Adicionar diferentes tipos de pergunta (aberta, múltipla, etc)
 * - Criar relatório detalhado com gráficos
 * - Permitir compartilhar resultado
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Adicionar recomendações personalizadas
 * - Integrar com banco de dados
 * - Permitir criar próprios questionários
 * - Adicionar análise de respostas
 */
