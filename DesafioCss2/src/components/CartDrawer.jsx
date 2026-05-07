// ============================================================
// CartDrawer.jsx - Gaveta lateral do carrinho
// ============================================================
// Aparece deslizando da direita quando o usuário clica em "Carrinho".
// Recebe os itens, mostra o total e tem botões de ação.
// ============================================================

function CartDrawer({ isOpen, items, onClose, onRemoveItem, onClearCart }) {

  // .reduce() percorre o array e vai acumulando um valor.
  // Começa em 0 e soma (preço × quantidade) de cada item.
  // Exemplo: [{price: 10, qty: 2}, {price: 5, qty: 1}] → 0 + 20 + 5 = 25
  const total = items.reduce((acumulado, item) => acumulado + item.price * item.quantity, 0)

  return (
    // A classe "open" é adicionada dinamicamente - o CSS usa ela para
    // fazer o drawer aparecer com animação (transform + opacity).
    <aside
      className={`cart-drawer ${isOpen ? 'open' : ''}`}
      aria-hidden={!isOpen}
      // aria-hidden esconde do leitor de tela quando o drawer está fechado
    >

      {/* - Cabeçalho do carrinho - */}
      <div className="cart-header">
        <strong>🛒 Meu carrinho</strong>
        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label="Fechar carrinho"
        >
          ✕
        </button>
      </div>

      {/* - Conteúdo: vazio ou lista de itens -
          Aqui usamos renderização condicional:
          se items.length === 0 mostra mensagem, senão mostra a lista. */}
      {items.length === 0 ? (

        <div className="cart-empty">
          <p>🛍️ Seu carrinho está vazio.</p>
          <small>Adicione alguns produtos para começar!</small>
        </div>

      ) : (

        <div className="cart-items">

          {/* Lista de itens */}
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                {/* Limita o título a uma linha com CSS (text-overflow: ellipsis) */}
                <p>{item.title}</p>
                <span>{item.quantity} × R$ {item.price.toFixed(2)}</span>
              </div>

              {/* Botão de remover - passa o id para o App.jsx saber qual item remover */}
              <button
                type="button"
                className="icon-button cart-remove"
                onClick={() => onRemoveItem(item.id)}
                aria-label={`Remover ${item.title}`}
              >
                ✕
              </button>
            </div>
          ))}

          {/* - Rodapé do carrinho: total + botões - */}
          <div className="cart-footer">
            <div className="cart-summary">
              <span>Total</span>
              <strong>R$ {total.toFixed(2)}</strong>
            </div>

            <button type="button" className="button button-primary button-full">
              Finalizar compra
            </button>

            <button
              type="button"
              className="button button-secondary button-full"
              onClick={onClearCart}
            >
              Limpar carrinho
            </button>
          </div>

        </div>
      )}

    </aside>
  )
}

export default CartDrawer
