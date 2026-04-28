import React, { useState } from 'react'

function MyComponents() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Meu Componente</h1>
      
      <h2>Contador: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Aumentar</button>
      <button onClick={() => setCount(count - 1)}>Diminuir</button>
    </div>
  )
}

export default MyComponents