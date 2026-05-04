// Importando React e useState hook
import React, { useState } from 'react'

// Componente funcional Events (usando arrow function)
const Events = () => {
  // Estado para armazenar a mensagem exibida
  const [mensagem, setMensagem] = useState('')

  // Função handler para o evento de clique
  const handleMyEvent = () => {
    // Atualizando o estado com uma nova mensagem
    setMensagem('Botão clicado!')
  }

  return (
    <div>
      {/* Título do componente */}
      <h1>Eventos Simples</h1>
      
      {/* Botão com evento onClick que chama handleMyEvent */}
      <button onClick={handleMyEvent}>
        Clique aqui
      </button>
      
      {/* Parágrafo que exibe a mensagem do estado */}
      <p>{mensagem}</p>

      
    </div>
  )
}

// Export default
export default Events