import React, { useState, useMemo } from "react";
import { translations } from "../translations";

export default function CheckoutPage({ cart, goBack, goToAddress, language }) {
  const t = { ...translations.en, ...translations[language] };
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + (item.price || 0) * (item.cartQty || 1),
        0
      ),
    [cart]
  );

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discountAmount;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) {
      setCouponMsg("Enter a coupon code");
      return;
    }

    if (code === "FARM10") {
      setDiscountPercent(10);
      setCouponMsg("FARM10 applied: 10% OFF");
    } else if (code === "GREEN20") {
      setDiscountPercent(20);
      setCouponMsg("GREEN20 applied: 20% OFF");
    } else if (code === "NEW5") {
      setDiscountPercent(5);
      setCouponMsg("NEW5 applied: 5% OFF");
    } else {
      setDiscountPercent(0);
      setCouponMsg("Invalid coupon");
    }
  };

  return (
    <div className="page-wrapper hero-section">
      <div className="checkout-card">
        <h2 className="checkout-title">{t.orderSummary}</h2>

        <div className="order-summary">
          {cart.map((item) => (
            <div className="checkout-item" key={item.id}>
              <span>
                {item.name} × {item.cartQty || 1}
              </span>
              <span>₹{(item.price || 0) * (item.cartQty || 1)}</span>
            </div>
          ))}

          <hr />
          <div className="checkout-item">
            <b>Subtotal</b>
            <b>₹{subtotal}</b>
          </div>
          {discountPercent > 0 && (
            <div className="checkout-item">
              <span>Discount ({discountPercent}%)</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}
          <div className="checkout-item">
            <b>Total</b>
            <b>₹{total}</b>
          </div>
        </div>

        <div className="coupon-section">
          <input
            className="coupon-input"
            placeholder="Apply coupon (FARM10, GREEN20, NEW5)"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button className="coupon-btn" onClick={applyCoupon}>
            Apply
          </button>
        </div>
        {couponMsg && <p className="coupon-message">{couponMsg}</p>}

        <p className="final-total">Payable: ₹{total}</p>

        <div style={{ marginTop: "18px", display: "flex", gap: "10px" }}>
          <button className="btn back" onClick={goBack}>
            ⬅ Back to Cart
          </button>
          <button
            className="btn consumer"
            style={{ flex: 1 }}
            onClick={goToAddress}
          >
            Continue to Address
          </button>
        </div>
      </div>
    </div>
  );
}
