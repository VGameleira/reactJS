const ExecuteFunction = ({myFunction}) => {
  return (
    <div>
      <div className="component-card">
        <span className="exercise-badge">Exercício Props</span>
        <h2>Executando Funções por Props: ExecuteFunction</h2>
        <button onClick={myFunction}>Clique aqui para executar a função!</button>
      </div>
    </div>
  )
}

export default ExecuteFunction