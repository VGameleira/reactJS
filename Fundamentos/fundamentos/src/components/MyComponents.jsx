// Importando React e useState
import React, { useState } from 'react'

// Componente funcional MyComponents
function MyComponents() {
  // Estado para o contador, inicializado em 0
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* Título do componente */}
      <h1>Meu Componente</h1>
      
      {/* Exibindo o valor do contador usando template expression */}
      <h2>Contador: {count}</h2>
      {/* Botão para aumentar o contador, chama setCount com count + 1 */}
      <button onClick={() => setCount(count + 1)}>Aumentar</button>
      {/* Botão para diminuir o contador */}
      <button onClick={() => setCount(count - 1)}>Diminuir</button>
    </div>
  )
}

// Export default
export default MyComponents