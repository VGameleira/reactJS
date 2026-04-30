import { useState, useRef } from 'react'
import './FormFocus.css'

/**
 * 📌 PROJETO 04: FORMULÁRIO COM FOCO AUTOMÁTICO
 * 🎓 Conceitos: useRef, focar em elementos, referências ao DOM
 * ⭐ Dificuldade: FÁCIL
 * 
 * 🎯 O que aprenderá:
 * - useRef para acessar elementos DOM
 * - Método .focus() em inputs
 * - Validação simples com referências
 * - Diferença entre useRef e useState
 */

function FormFocus() {
  // 🪝 Estado para armazenar valores
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  })

  const [enviado, setEnviado] = useState(false)

  // 📌 Referências aos inputs (não causam re-render!)
  const inputNomeRef = useRef(null)
  const inputEmailRef = useRef(null)
  const textareaMensagemRef = useRef(null)

  // ✍️ Atualizar estado
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 🎯 Focar no input de nome
  const focusNome = () => {
    inputNomeRef.current?.focus()
    inputNomeRef.current?.classList.add('focused')
  }

  // 🎯 Focar no input de email
  const focusEmail = () => {
    inputEmailRef.current?.focus()
    inputEmailRef.current?.classList.add('focused')
  }

  // 🎯 Focar na textarea
  const focusMensagem = () => {
    textareaMensagemRef.current?.focus()
    textareaMensagemRef.current?.classList.add('focused')
  }

  // ✅ Validar e enviar
  const handleSubmit = (e) => {
    e.preventDefault()

    // 🔍 Validar campos vazios
    if (!formData.nome.trim()) {
      alert('⚠️ Por favor, preencha o nome!')
      focusNome() // Focar automaticamente no campo vazio
      return
    }

    if (!formData.email.trim()) {
      alert('⚠️ Por favor, preencha o email!')
      focusEmail()
      return
    }

    if (!formData.mensagem.trim()) {
      alert('⚠️ Por favor, escreva uma mensagem!')
      focusMensagem()
      return
    }

    // ✅ Se tudo OK, enviar
    console.log('Formulário enviado:', formData)
    setEnviado(true)

    // 🧹 Limpar formulário após 2 segundos
    setTimeout(() => {
      setFormData({ nome: '', email: '', mensagem: '' })
      setEnviado(false)
      focusNome() // Focar no primeiro campo
    }, 2000)
  }

  return (
    <div className="form-focus-container">
      <h1>✉️ Formulário com Foco Automático</h1>

      {enviado && (
        <div className="sucesso">
          <h2>✓ Mensagem enviada com sucesso!</h2>
          <p>Obrigado por entrar em contato.</p>
        </div>
      )}

      {!enviado && (
        <>
          <div className="quick-focus">
            <h3>⚡ Focar Rápido:</h3>
            <button onClick={focusNome} className="quick-btn">
              Focar em Nome
            </button>
            <button onClick={focusEmail} className="quick-btn">
              Focar em Email
            </button>
            <button onClick={focusMensagem} className="quick-btn">
              Focar em Mensagem
            </button>
          </div>

          <form onSubmit={handleSubmit} className="form">
            {/* 📝 INPUT NOME */}
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                ref={inputNomeRef}
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome completo"
              />
            </div>

            {/* 📧 INPUT EMAIL */}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                ref={inputEmailRef}
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
              />
            </div>

            {/* 💬 TEXTAREA */}
            <div className="form-group">
              <label htmlFor="mensagem">Mensagem:</label>
              <textarea
                ref={textareaMensagemRef}
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Escreva sua mensagem aqui..."
                rows="5"
              />
            </div>

            <button type="submit" className="btn-submit">
              📨 Enviar
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default FormFocus

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar efeito visual quando foca (borda colorida)
 * - Limpar input com useRef ref.current.value = ''
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Tab para navegar entre campos automaticamente
 * - Quando completa um campo, pula para o próximo
 * - Validação em tempo real com cor de borda (vermelho=erro, verde=ok)
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Criar contador com useRef que não re-renderiza
 * - Salvar em localStorage com useRef
 * - Implementar máscara de entrada (CPF, telefone)
 */
