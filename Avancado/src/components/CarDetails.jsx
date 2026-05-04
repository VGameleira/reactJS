// Componente funcional CarDetails que recebe props
// Props são argumentos passados para componentes, como parâmetros de função
const CarDetails = ({id, brand, km, color, novo}) => {

    return (
    <div>
        {/* Div com classe CSS para estilização */}
        <div className="component-card">
            {/* Badge indicando que é um exercício de props */}
            <span className="exercise-badge">Exercício Props</span>
            {/* Título do componente */}
            <h2>Detalhes do Carro</h2>
        {/* Lista não ordenada sem bullets */}
        <ul style={{listStyleType: "none"}}>
            {/* Renderização condicional: só mostra ID se não for null */}
            {id != null ? <li><strong>Id:</strong> {id}</li> : null} {/* Verifica se tem ou não ID */}
            {/* Exibindo as props recebidas */}
            <li>Marca: {brand}</li>
            <li>Kilometragem: {km}</li>
            <li>Cor: {color}</li>
            {/* Operador ternário para mostrar se é novo ou usado */}
            <li>{novo ? <p>Carro Novo</p> : <p>Carro Usado</p>}</li>
        </ul>
     

        </div>
        

    </div>
  )
}

// Export default
export default CarDetails