import { useState } from 'react'
import styles from './Avancado.module.css'

const Avancado = () => {
  const [direction, setDirection] = useState('row')

  const toggleDirection = () => {
    setDirection(direction === 'row' ? 'column' : 'row')
  }

  return (
    <div className={styles.container}>
      <h2 title="Demonstra Flexbox com mudanças dinâmicas">Exemplo Avançado: Flexbox Dinâmico</h2>
      <button onClick={toggleDirection} title="Alterna a direção do layout Flexbox">
        Alternar Direção: {direction === 'row' ? 'Linha' : 'Coluna'}
      </button>
      <div className={styles.flexContainer} style={{ flexDirection: direction }}>
        <div className={styles.item}>Item 1</div>
        <div className={styles.item}>Item 2</div>
        <div className={styles.item}>Item 3</div>
      </div>
      <p>Flexbox permite layouts responsivos. Aqui, mudamos a direção dinamicamente com React state.</p>
    </div>
  )
}

export default Avancado