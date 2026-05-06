function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card fade-up" style={{ '--delay': '0.1s' }}>
      <div className="product-visual">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className="product-meta">
          <strong>R$ {product.price.toFixed(2)}</strong>
          <button type="button" className="button button-primary" onClick={() => onAddToCart(product)}>
            Adicionar
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
