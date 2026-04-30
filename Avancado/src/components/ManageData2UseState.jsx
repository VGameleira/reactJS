import { useState } from "react";


const ManageData2UseState = () => {
    let nome = "Marcos";
    const [name, setName] = useState("Lucas");

    // A variável "nome" é uma variável comum, e sua alteração não causa a re-renderização do componente. Já a variável "name" é um estado gerenciado pelo useState, e sua alteração faz com que o componente seja re-renderizado para refletir a nova informação.

    

  return (
    <div>
      <div className="component-card">
        <span className="exercise-badge">Exercício State: Gerenciando Dados com useState</span>
        <h2>Gerenciando Dados com useState: ManageData2</h2>
        <button onClick={() => (nome = "Maria")}>Forma errada</button>
        <p>Nome: {nome}</p>

        {/* USANDO USESTATE */}
        <button onClick={() => setName("Maria")}>Forma correta</button>

        <p>Nome: {name}</p>
      </div>
    </div>
  )
}

export default ManageData2UseState