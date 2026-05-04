// Importando React
import React from 'react'

// Componente funcional TemplateExpressions
// Demonstra o uso de expressões JavaScript dentro de JSX usando {}
function TemplateExpressions() {
    // Definindo um objeto aluno com propriedades
    const aluno = {nome: 'João', idade: 30, NOTA1: 8, NOTA2: 9}
    // Calculando a média das notas usando JavaScript
    const media = ((aluno.NOTA1 + aluno.NOTA2) / 2).toFixed(2)
    // Usando operador ternário para determinar situação baseado na média
    const situacao = media >= 6 ? 'Aprovado' : 'Reprovado'

  return (
    // Div container para o componente
    <div>
      {/* Título do componente */}
      <h1>Template Expressions</h1>
      
      
      {/* Usando {} para inserir valores dinâmicos no JSX */}
      <p>Nome: {aluno.nome}</p>
      <p>Idade: {aluno.idade}</p>
      <p>Média: {media}</p>
      <p>Situação: {situacao}</p>
    </div>
  )
}

// Export default
export default TemplateExpressions