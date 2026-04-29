// Exemplo de CSS normal: se descomentar esta linha, o estilo será global.
// import './Exemplo.css'

// Exemplo de CSS Module: estilo local ao componente.
import styles from './Exemplo.module.css'
import { useState } from 'react'

const Exemplo = () => {
  const [isActive, setIsActive] = useState(false)

  const toggleActive = () => {
    setIsActive(!isActive)
  }

  return (
    <div>
        {/* Antes: <h1>Exemplo de Componente</h1> */}
        <h1 className={`${styles.titulo} ${isActive ? styles.active : ''}`}>Exemplo de Componente</h1>
        <button onClick={toggleActive}>
          {isActive ? 'Desativar Estilo Extra' : 'Ativar Estilo Extra'}
        </button>
        <p>Este componente demonstra CSS Module. Clique no botão para ver mudanças dinâmicas.</p>
    </div>

  )
}

export default Exemplo