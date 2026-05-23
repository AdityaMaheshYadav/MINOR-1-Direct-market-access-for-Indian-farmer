import React from "react";

export default function SuccessPage({ t, goHome }) {
  return (
    <div className="page-wrapper">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2>{t.orderSuccess}</h2>
        <p>{t.thankYou}</p>

        <button className="btn primary-btn" onClick={goHome}>{t.continueShopping}</button>
      </div>
    </div>
  );
}
