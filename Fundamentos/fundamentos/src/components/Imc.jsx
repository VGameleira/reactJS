// Importando React e useState
import React, { useState } from 'react'

// Componente funcional Imc para calcular IMC
function Imc() {
  // Estados para peso, altura e resultado do IMC
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [imc, setImc] = useState(null)

  // Função para calcular o IMC
  const calcularImc = () => {
    // Verificando se peso e altura foram preenchidos
    if (peso && altura) {
      // Fórmula do IMC: peso / (altura^2), arredondado para 2 casas decimais
      const imcCalc = (peso / (altura * altura)).toFixed(2)
      // Atualizando o estado com o resultado
      setImc(imcCalc)
    }
  }
  

  return (
    <div>
      {/* Título da calculadora */}
      <h1>Calculadora de IMC</h1>
      
      {/* Input para peso, controlado pelo estado */}
      <input
        type="number"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
        placeholder="Peso (kg)"
      />
      {/* Input para altura, controlado pelo estado */}
      <input
        type="number"
        value={altura}
        onChange={(e) => setAltura(e.target.value)}
        placeholder="Altura (m)"
      />
      
      {/* Botão para calcular, chama calcularImc ao clicar */}
      <button onClick={calcularImc}>Calcular</button>
      
      {/* Renderização condicional: só mostra se imc não for null */}
      {imc && <p>Seu IMC é: {imc}</p>}
    </div>
  )
}

// Export default
export default Imc