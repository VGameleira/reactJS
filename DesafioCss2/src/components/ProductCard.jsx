// ============================================================
// ProductCard.jsx - Card de produto
// ============================================================
// Exibe as informações de um produto e tem um botão
// que avisa o componente pai (App.jsx) para adicionar ao carrinho.
// ============================================================

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card fade-up" style={{ '--delay': '0.1s' }}>

      {/* Imagem do produto */}
      <div className="product-visual">
        <img src={product.image} alt={product.title} loading="lazy" />
        {/* loading="lazy" só carrega a imagem quando ela aparecer na tela - melhora performance */}
      </div>

      {/* Informações do produto */}
      <div className="product-content">

        {/* Categoria em formato de "tag" arredondada */}
        <span className="product-category">{product.category}</span>

        <h3>{product.title}</h3>

        {/* Descrição com limite de 3 linhas (controlado no CSS com -webkit-line-clamp) */}
        <p>{product.description}</p>

        {/* Preço e botão lado a lado */}
        <div className="product-meta">
          {/* toFixed(2) formata o número com sempre 2 casas decimais: 9.9 → 9.90 */}
          <strong className="product-price">R$ {product.price.toFixed(2)}</strong>

          {/* Quando clicado, chama a função onAddToCart passando o produto inteiro.
              O App.jsx recebe isso e atualiza o estado do carrinho. */}
          <button
            type="button"
            className="button button-primary"
            onClick={() => onAddToCart(product)}
          >
            + Adicionar
          </button>
        </div>

      </div>
    </article>
  )
}

export default ProductCard
