import React, { useState } from 'react'

function Imc() {
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [imc, setImc] = useState(null)

  const calcularImc = () => {
    if (peso && altura) {
      const imcCalc = (peso / (altura * altura)).toFixed(2)
      setImc(imcCalc)
    }
  }
  

  return (
    <div>
      <h1>Calculadora de IMC</h1>
      
      <input
        type="number"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
        placeholder="Peso (kg)"
      />
      <input
        type="number"
        value={altura}
        onChange={(e) => setAltura(e.target.value)}
        placeholder="Altura (m)"
      />
      
      <button onClick={calcularImc}>Calcular</button>
      
      {imc && <p>Seu IMC é: {imc}</p>}
    </div>
  )
}

export default Imc