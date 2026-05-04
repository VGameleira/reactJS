// Importando o hook useState do React para gerenciar estado
import { useState } from 'react'
// Importando imagens de assets (logo do React e Vite)
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// Importando estilos CSS para o componente
import './App.css'

// Definindo o componente funcional App
function App() {
  // Usando useState para criar um estado 'count' inicializado em 0
  // useState retorna um array com o valor atual e uma função para atualizá-lo
  const [count, setCount] = useState(0)

  // Retornando o JSX (JavaScript XML) que define a estrutura da UI
  return (
    // Fragmento React (<>) para agrupar elementos sem adicionar um nó DOM extra
    <>
     {/* Título principal da aplicação */}
     <h1>Hello World</h1>
     
    </>
  )
}

// Exportando o componente como padrão para ser usado em outros arquivos
export default App
