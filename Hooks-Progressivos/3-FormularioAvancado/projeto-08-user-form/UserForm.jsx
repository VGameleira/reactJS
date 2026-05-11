import { useState, useRef } from 'react'
import './UserForm.css'

/**
 * 📌 PROJETO 08: FORMULÁRIO DE CADASTRO DE USUÁRIO
 * 🎓 Conceitos: Validação avançada, múltiplos campos, estado complexo
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - Validação em tempo real
 * - Múltiplos campos com estado
 * - Feedback visual (erro/sucesso)
 * - Tratamento de formulário complexo
 */

function UserForm() {
  // 📝 Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    dataAcesso: '',
    aceitaTermos: false,
  })

  // 🚨 Estado de erros
  const [erros, setErros] = useState({})

  // ✅ Estado de sucesso
  const [enviado, setEnviado] = useState(false)

  // 📌 Referências
  const nomeRef = useRef(null)

  // ✍️ Atualizar campo do formulário
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // 🔍 Validar em tempo real
    validarCampo(name, type === 'checkbox' ? checked : value)
  }

  // 🔍 Validar campo individual
  const validarCampo = (name, value) => {
    const novoErros = { ...erros }

    switch (name) {
      case 'nome':
        if (!value.trim()) {
          novoErros.nome = 'Nome é obrigatório'
        } else if (value.trim().length < 3) {
          novoErros.nome = 'Nome deve ter no mínimo 3 caracteres'
        } else {
          delete novoErros.nome
        }
        break

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) {
          novoErros.email = 'Email é obrigatório'
        } else if (!emailRegex.test(value)) {
          novoErros.email = 'Email inválido'
        } else {
          delete novoErros.email
        }
        break

      case 'senha':
        if (!value) {
          novoErros.senha = 'Senha é obrigatória'
        } else if (value.length < 6) {
          novoErros.senha = 'Senha deve ter no mínimo 6 caracteres'
        } else if (!/[A-Z]/.test(value)) {
          novoErros.senha = 'Senha deve conter uma letra maiúscula'
        } else if (!/[0-9]/.test(value)) {
          novoErros.senha = 'Senha deve conter um número'
        } else {
          delete novoErros.senha
        }
        break

      case 'confirmarSenha':
        if (value !== formData.senha) {
          novoErros.confirmarSenha = 'Senhas não coincidem'
        } else {
          delete novoErros.confirmarSenha
        }
        break

      case 'telefone':
        const teleRegex = /^\d{10,11}$/
        if (!value) {
          delete novoErros.telefone
        } else if (!teleRegex.test(value.replace(/\D/g, ''))) {
          novoErros.telefone = 'Telefone inválido'
        } else {
          delete novoErros.telefone
        }
        break

      case 'dataAcesso':
        if (!value) {
          novoErros.dataAcesso = 'Data de acesso é obrigatória'
        } else {
          delete novoErros.dataAcesso
        }
        break

      default:
        break
    }

    setErros(novoErros)
  }

  // ✅ Validar todo o formulário
  const validarFormulario = () => {
    const novoErros = {}

    // Nome
    if (!formData.nome.trim()) {
      novoErros.nome = 'Nome é obrigatório'
    } else if (formData.nome.trim().length < 3) {
      novoErros.nome = 'Nome deve ter no mínimo 3 caracteres'
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      novoErros.email = 'Email é obrigatório'
    } else if (!emailRegex.test(formData.email)) {
      novoErros.email = 'Email inválido'
    }

    // Senha
    if (!formData.senha) {
      novoErros.senha = 'Senha é obrigatória'
    } else if (formData.senha.length < 6) {
      novoErros.senha = 'Senha deve ter no mínimo 6 caracteres'
    } else if (!/[A-Z]/.test(formData.senha)) {
      novoErros.senha = 'Senha deve conter uma letra maiúscula'
    } else if (!/[0-9]/.test(formData.senha)) {
      novoErros.senha = 'Senha deve conter um número'
    }

    // Confirmar Senha
    if (formData.senha !== formData.confirmarSenha) {
      novoErros.confirmarSenha = 'Senhas não coincidem'
    }

    // Termos
    if (!formData.aceitaTermos) {
      novoErros.aceitaTermos = 'Você deve aceitar os termos'
    }

    // Data
    if (!formData.dataAcesso) {
      novoErros.dataAcesso = 'Data de acesso é obrigatória'
    }

    setErros(novoErros)
    return Object.keys(novoErros).length === 0
  }

  // 📨 Enviar formulário
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validarFormulario()) {
      nomeRef.current?.focus()
      return
    }

    // ✅ Sucesso
    console.log('Formulário enviado:', formData)
    setEnviado(true)

    // 🔄 Resetar após 3 segundos
    setTimeout(() => {
      setFormData({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        telefone: '',
        dataAcesso: '',
        aceitaTermos: false,
      })
      setEnviado(false)
      setErros({})
      nomeRef.current?.focus()
    }, 3000)
  }

  return (
    <div className="user-form-container">
      <div className="form-card">
        <h1>📝 Cadastro de Usuário</h1>

        {enviado && (
          <div className="sucesso-box">
            <h2>✓ Cadastro Realizado com Sucesso!</h2>
            <p>Seus dados foram registrados.</p>
          </div>
        )}

        {!enviado && (
          <form onSubmit={handleSubmit} className="form">
            {/* Nome */}
            <div className="form-group">
              <label htmlFor="nome">Nome Completo *</label>
              <input
                ref={nomeRef}
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleChange}
                placeholder="João Silva"
                className={erros.nome ? 'erro' : ''}
              />
              {erros.nome && <span className="erro-msg">{erros.nome}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="joao@email.com"
                className={erros.email ? 'erro' : ''}
              />
              {erros.email && <span className="erro-msg">{erros.email}</span>}
            </div>

            {/* Telefone */}
            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                className={erros.telefone ? 'erro' : ''}
              />
              {erros.telefone && <span className="erro-msg">{erros.telefone}</span>}
            </div>

            {/* Data de Acesso */}
            <div className="form-group">
              <label htmlFor="dataAcesso">Data de Acesso *</label>
              <input
                id="dataAcesso"
                name="dataAcesso"
                type="date"
                value={formData.dataAcesso}
                onChange={handleChange}
                className={erros.dataAcesso ? 'erro' : ''}
              />
              {erros.dataAcesso && <span className="erro-msg">{erros.dataAcesso}</span>}
            </div>

            {/* Senha */}
            <div className="form-group">
              <label htmlFor="senha">Senha *</label>
              <input
                id="senha"
                name="senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                placeholder="Mín. 6 caracteres"
                className={erros.senha ? 'erro' : ''}
              />
              {erros.senha && <span className="erro-msg">{erros.senha}</span>}
              <small>Deve conter letra maiúscula e número</small>
            </div>

            {/* Confirmar Senha */}
            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar Senha *</label>
              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                value={formData.confirmarSenha}
                onChange={handleChange}
                placeholder="Repita a senha"
                className={erros.confirmarSenha ? 'erro' : ''}
              />
              {erros.confirmarSenha && (
                <span className="erro-msg">{erros.confirmarSenha}</span>
              )}
            </div>

            {/* Termos */}
            <div className="form-group checkbox">
              <label>
                <input
                  name="aceitaTermos"
                  type="checkbox"
                  checked={formData.aceitaTermos}
                  onChange={handleChange}
                />
                Aceito os termos e condições *
              </label>
              {erros.aceitaTermos && <span className="erro-msg">{erros.aceitaTermos}</span>}
            </div>

            <button type="submit" className="btn-submit">
              📝 Cadastrar
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default UserForm

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar campo de confirmação de email
 * - Mostrar força da senha em tempo real
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Adicionar máscara de telefone
 * - Adicionar avatar upload
 * - Salvar dados em localStorage
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Integrar com API de cadastro
 * - Adicionar verificação de email duplicado
 * - Implementar CAPTCHA
 * - Enviar email de confirmação
 */
