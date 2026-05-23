import React from "react";

export default function PaymentPage({ t, cart, clearCart, goHome, goSuccess }) {
  const totalPrice = cart.reduce((s,i) => s + (i.price || 0) * (i.cartQty || 1), 0);

  const placeOrder = () => {
    // Place order logic here (mock)
    clearCart();
    goSuccess();
  };

  return (
    <div className="page-wrapper">
      <div className="checkout-card">
        <h2>{t.checkout}</h2>
        <p>{t.orderSummary}</p>

        <div>
          {cart.map(item => (
            <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
              <div>{item.name} × {item.cartQty}</div>
              <div>₹{item.cartQty * item.price}</div>
            </div>
          ))}
        </div>

        <h3>{t.totalAmount}: ₹{totalPrice}</h3>

        <button className="btn primary-btn" onClick={placeOrder}>{t.placeOrder}</button>
        <button className="btn back" onClick={goHome}>{t.back}</button>
      </div>
    </div>
  );
}
