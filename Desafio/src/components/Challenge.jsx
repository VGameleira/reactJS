import React from 'react'

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1; 
}
function sumRandomNumbers() {
    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    const sum = num1 + num2;
    alert(`A soma de ${num1} e ${num2} é: ${sum}`);
}


function Challenge() {
    return (
        <>

            <h1>Desafio: Soma de Números Aleatórios</h1>
            <p>Clique no botão abaixo para gerar dois números aleatórios e exibir a soma deles.</p>
            <button onClick={sumRandomNumbers}>Gerar Números e Somar</button>

        </>
    )
}

export default Challenge