const ShowUserName = (props) => {
  return (
    <div>
      <div className="component-card">
        <span className="exercise-badge">Exercício Props</span>
      <h2>Usando Props: ShowUserName</h2>
      <p>O nome do usuário é: {props.name}</p>
      </div>
    </div>
  )
}

export default ShowUserName