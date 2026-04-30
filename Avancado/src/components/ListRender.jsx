import React, { useState } from 'react';

const ListRender = () => {

  // Simulando uma lista de produtos que poderia vir de uma API ou banco de dados
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


  // Função para excluir um produto aleatório
  const deleteRandom = () => {
    if (products.length === 0) return;
    const randomIndex = Math.floor(Math.random() * products.length);
    setProducts((prevProducts) =>
      prevProducts.filter((_, idx) => idx !== randomIndex)
    );
  };

  // Função para adicionar um novo produto
  const createProduct = () => {
    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      name: `Produto ${products.length + 1}`,
      price: Math.floor(Math.random() * 1000) + 100,
    };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div>
     <div className="component-card">
      <span className="exercise-badge">Renderização de Lista</span>
      <h2>Renderização de Lista</h2>
      <ul className="list-reset">
        {products.map((product) => (
          <li key={product.id} className="list-item">
            <span>{product.name} - R$ {product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <button onClick={deleteRandom}>Excluir Produto Aleatório</button>
      <button onClick={createProduct}>Adicionar Produto</button>
      </div>
    </div>
  )
};
export default ListRender
