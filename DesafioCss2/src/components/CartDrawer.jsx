function CartDrawer({ isOpen, items, onClose, onRemoveItem, onClearCart }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="cart-header">
        <strong>Meu carrinho</strong>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Fechar carrinho">✕</button>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Seu carrinho está vazio por enquanto.</p>
        </div>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <p>{item.title}</p>
                <span>{item.quantity} x R$ {item.price.toFixed(2)}</span>
              </div>
              <button type="button" className="icon-button" onClick={() => onRemoveItem(item.id)} aria-label={`Remover ${item.title}`}>
                ✕
              </button>
            </div>
          ))}
          <div className="cart-summary">
            <span>Total</span>
            <strong>R$ {total.toFixed(2)}</strong>
          </div>
          <button type="button" className="button button-primary button-full">Finalizar compra</button>
          <button type="button" className="button button-secondary button-full" onClick={onClearCart}>Limpar carrinho</button>
        </div>
      )}
    </aside>
  )
}

export default CartDrawer
