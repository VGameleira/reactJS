// Importando React (embora não seja estritamente necessário em React 17+, é uma boa prática)
import React from 'react'

// Definindo um componente funcional chamado FirstComponents
// Componentes funcionais são funções que retornam JSX
function FirstComponents() {
  // Retornando JSX, que é uma extensão de JavaScript para escrever HTML-like
  return (
    // Fragmento React para agrupar múltiplos elementos sem um wrapper DOM
    <>
    {/*
      Este é o meu primeiro componente React!
      Comentários em JSX usam a sintaxe {/* */ ou // para linhas únicas
    }
    {/* Elemento h1 para o título */}
    <h1>First Components</h1>
    {/* Parágrafo explicativo sobre componentes */}
    <p>Componentes são blocos de construção reutilizáveis em React. Eles permitem que você divida a interface do usuário em partes menores e mais gerenciáveis, facilitando a manutenção e a reutilização do código.</p>

    </>

  )
}

// Exportando o componente como padrão (default export) para importação em outros arquivos
export default FirstComponents