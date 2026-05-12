import React, { useState, useRef, useEffect } from 'react'

import './MyForm.css'


// Componente de formulário que aceita um usuário opcional para preencher valores iniciais
const MyForm = ({ user }) => {
    // 6- Controlled inputs: usamos useState para armazenar o valor de cada campo
    const [name, setName] = useState(user ? user.name : '')
    const [email, setEmail] = useState(user ? user.email : '')
    const [bio, setBio] = useState(user ? user.bio : '')
    const [role, setRole] = useState(user ? user.role : '')

    // 10- useRef é utilizado para focar o input de nome depois de limpar o formulário
    const nameInputRef = useRef(null)

    // Sincroniza os valores do formulário caso a prop user seja alterada depois do carregamento
    useEffect(() => {
        if (user) {
            setName(user.name || '')
            setEmail(user.email || '')
            setBio(user.bio || '')
            setRole(user.role || '')
        }
    }, [user])

    // 3- gerenciamento de dados - cada campo tem seu próprio handler
    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleBioChange = (e) => {
        setBio(e.target.value)
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }

    // 5- Envio de formulário
    const handleSubmit = (e) => {
        e.preventDefault() // impede o envio tradicional que recarrega a página

        console.log('Enviando o formulário')
        console.log({ name, email, bio, role })

        // 7- Limpar os inputs após o envio
        setName('')
        setEmail('')
        setBio('')
        setRole('')

        if (nameInputRef.current) {
            nameInputRef.current.focus()
        }
    }

    return (
        <div>
            <h1>My Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        ref={nameInputRef}
                        placeholder="Digite seu Nome"
                        onChange={handleNameChange}
                        value={name}
                        autoFocus
                    />
                </div>

                <label>
                    <span>Email:</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Digite seu Email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </label>

                <label>
                    <span>Bio:</span>
                    <textarea
                        name="bio"
                        placeholder="Descrição do usuário"
                        onChange={handleBioChange}
                        value={bio}
                    />
                </label>

                <label>
                    <span>Função do Sistema:</span>
                    <select
                        name="role"
                        required
                        value={role}
                        onChange={handleRoleChange}
                    >
                        <option value="" disabled hidden>
                            Selecione uma opção
                        </option>
                        <option value="user">Usuário</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Administrador</option>
                    </select>
                </label>

                <input type="submit" value="Enviar" />
            </form>
        </div>
    )
}

export default MyForm