import React from 'react'

function TemplateExpressions() {
    const aluno = {nome: 'João', idade: 30, NOTA1: 8, NOTA2: 9}
    const media = ((aluno.NOTA1 + aluno.NOTA2) / 2).toFixed(2)
    const situacao = media >= 6 ? 'Aprovado' : 'Reprovado'

  return (
    <div>
      <h1>Template Expressions</h1>
      
      
      <p>Nome: {aluno.nome}</p>
      <p>Idade: {aluno.idade}</p>
      <p>Média: {media}</p>
      <p>Situação: {situacao}</p>
    </div>
  )
}

export default TemplateExpressions