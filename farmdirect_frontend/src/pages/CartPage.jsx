import React from "react";

export default function CartPage({ t, cart, removeFromCart, clearCart, goHome, goToPayment }) {
  const totalPrice = cart.reduce((s,i) => s + (i.price || 0) * (i.cartQty || 1), 0);

  return (
    <div className="page-wrapper">
      <div className="checkout-card">
        <h2>{t.cart}</h2>

        {cart.length === 0 ? (
          <p>{t.emptyCart}</p>
        ) : (
          <>
            {cart.map(item => (
              <div className="cart-item-card" key={item.id}>
                <img src={item.image || "https://via.placeholder.com/120"} className="cart-item-img" alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-meta">{item.cartQty} × ₹{item.price}</p>
                  <p>Total: ₹{item.cartQty * item.price}</p>
                </div>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>{t.remove}</button>
              </div>
            ))}

            <div className="cart-summary">
              <h3>{t.totalAmount}: ₹{totalPrice}</h3>
              <button className="btn primary-btn" onClick={goToPayment}>{t.proceedToPayment}</button>
              <button className="btn back" onClick={clearCart}>{t.clearCart}</button>
            </div>
          </>
        )}
        <button className="btn" onClick={goHome}>{t.back}</button>
      </div>
    </div>
  );
}
