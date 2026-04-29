const ListRender = () => {
  const products = [
    { id: 1, name: 'Teclado Mecânico', price: 279.9 },
    { id: 2, name: 'Mouse Gamer', price: 149.5 },
    { id: 3, name: 'Monitor 24"', price: 849.0 },
  ];

  return (
    <div className="component-card">
      <span className="exercise-badge">Exercício ListRender</span>
      <h2>Renderização de Lista</h2>
      <ul className="list-reset">
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R$ {product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListRender;
