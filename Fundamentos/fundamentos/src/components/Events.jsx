import React, { useState } from 'react'

const Events = () => {
  const [mensagem, setMensagem] = useState('')

  const handleMyEvent = () => {
    setMensagem('Botão clicado!')
  }

  return (
    <div>
      <h1>Eventos Simples</h1>
      
      <button onClick={handleMyEvent}>
        Clique aqui
      </button>
      
      <p>{mensagem}</p>

      
    </div>
  )
}

export default Events