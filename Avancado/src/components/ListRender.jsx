// Importando React e useState
import React, { useState } from 'react';

// Componente funcional ListRender
const ListRender = () => {

  // Estado para a lista de produtos, simulando dados de API
  const [products, setProducts] = useState([
    { id: 1, name: 'Teclado Mecânico', price: 279.9 },
    { id: 2, name: 'Mouse Gamer', price: 149.5 },
    { id: 3, name: 'Monitor 24', price: 849.0 },
    { id: 4, name: 'Headset', price: 199.99 },
    { id: 5, name: 'Cadeira Gamer', price: 1299.0 },
    { id: 6, name: 'Placa de Vídeo', price: 2999.99 },
    { id: 7, name: 'Processador', price: 1899.5 },
    { id: 8, name: 'Memória RAM 16GB', price: 499.9 },
    { id: 9, name: 'SSD 1TB', price: 599.0 },
    { id: 10, name: 'Fonte de Alimentação', price: 349.99 },
  ]);


  // Função para excluir um produto aleatório da lista
  const deleteRandom = () => {
    // Se não há produtos, retorna
    if (products.length === 0) return;
    // Gera índice aleatório
    const randomIndex = Math.floor(Math.random() * products.length);
    // Atualiza estado filtrando o produto do índice aleatório
    setProducts((prevProducts) =>
      prevProducts.filter((_, idx) => idx !== randomIndex)
    );
  };

  // Função para adicionar um novo produto à lista
  const createProduct = () => {
    // Cria novo produto com ID incremental
    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      name: `Produto ${products.length + 1}`,
      price: Math.floor(Math.random() * 1000) + 100,
    };
    // Adiciona ao estado usando spread operator
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div>
     <div className="component-card">
      {/* Badge do exercício */}
      <span className="exercise-badge">Renderização de Lista</span>
      {/* Título */}
      <h2>Renderização de Lista</h2>
      {/* Lista não ordenada */}
      <ul className="list-reset">
        {/* Mapeando produtos para elementos li, cada um com key única */}
        {products.map((product) => (
          <li key={product.id} className="list-item">
            <span>{product.name} - R$ {product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      {/* Botão para excluir produto aleatório */}
      <button onClick={deleteRandom}>Excluir Produto Aleatório</button>
      {/* Botão para adicionar produto */}
      <button onClick={createProduct}>Adicionar Produto</button>
      </div>
    </div>
  )
};
// Export default
export default ListRender
