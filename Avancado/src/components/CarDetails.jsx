const CarDetails = ({id, brand, km, color, novo}) => {

    return (
    <div>
        <div className="component-card">
            <span className="exercise-badge">Exercício Props</span>
            <h2>Detalhes do Carro</h2>
        <ul style={{listStyleType: "none"}}>
            {id != null ? <li><strong>Id:</strong> {id}</li> : null} {/* Verifica se tem ou não ID */}
            <li>Marca: {brand}</li>
            <li>Kilometragem: {km}</li>
            <li>Cor: {color}</li>
            <li>{novo ? <p>Carro Novo</p> : <p>Carro Usado</p>}</li>
        </ul>
     

        </div>
        

    </div>
  )
}

export default CarDetails