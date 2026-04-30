




const Fragment2 = ({propFragment}) => {
  return (
    <>
    <div className="component-card">
      <span className="exercise-badge">Exercício Fragment</span>
     <h2>Fragment</h2>
     <h4>{propFragment}</h4>
      <p>O Fragment é utilizado para agrupar elementos sem adicionar nós extras ao DOM. Ele é útil quando queremos retornar múltiplos elementos de um componente sem envolver-los em uma div ou outro elemento HTML.</p>


    </div>
    </>

  )
}

export default Fragment2