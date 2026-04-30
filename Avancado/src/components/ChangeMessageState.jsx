const ChangeMessageState = ({changeMessage}) => {
  
    const messages = [
        "Primeira mensagem",
        "Segunda mensagem",
        "Terceira mensagem"
    ];

    return (
    <div>
        <div className="component-card">
            <span className="exercise-badge">Exercício State Lift</span>
            <h2>Componente ChangeMessageState</h2>
        <button onClick={() => changeMessage(messages[0])}>1</button>
        <button onClick={() => changeMessage(messages[1])}>2</button>
        <button onClick={() => changeMessage(messages[2])}>3</button>
        </div>
    </div>
  )
}

export default ChangeMessageState