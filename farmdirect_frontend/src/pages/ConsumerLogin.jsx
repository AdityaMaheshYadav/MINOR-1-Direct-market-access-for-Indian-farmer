import React, { useState } from "react";

export default function ConsumerLogin({ goHome, onLoginSuccess, language, t }) {
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const doLogin = async () => {
    setMsg("");

    // basic validation
    if (!phone.trim() || phone.trim().length !== 10) {
      setMsg(t.invalidPhone || "Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    try {
      /**
       * ----------------------------------------------
       * 🚀 OPTION 1 (Current Working Version – No Backend)
       * ----------------------------------------------
       * We will simply allow the user to login.
       * This avoids white screen & keeps your workflow intact.
       */
      onLoginSuccess(phone.trim());
      setLoading(false);

      /**
       * ----------------------------------------------
       * 🚀 OPTION 2 (Enable this when backend is ready)
       * ----------------------------------------------
       *
       * const res = await fetch("http://localhost:8080/api/consumer/login", {
       *   method: "POST",
       *   headers: { "Content-Type": "application/json" },
       *   body: JSON.stringify({ phone })
       * });
       *
       * const data = await res.json();
       *
       * if (!data.success) {
       *   setMsg("Invalid phone number");
       *   setLoading(false);
       *   return;
       * }
       *
       * onLoginSuccess(data.consumerId);
       */

    } catch (err) {
      console.error("Consumer login error:", err);
      setMsg(t.errorTryAgain || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">

      <button className="back-btn" onClick={goHome}>
        ← {t.back}
      </button>

      <div className="auth-card">

        <div className="auth-icon">🛒</div>

        <h2 className="auth-title">{t.consumerLoginTitle || "Consumer Login"}</h2>

        <input
          className="auth-input"
          placeholder={t.enterPhone || "Enter phone number"}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="number"
        />

        {msg && <p className="auth-error">{msg}</p>}

        <button className="auth-btn" onClick={doLogin} disabled={loading}>
          {loading ? (t.loggingIn || "Logging in…") : (t.login || "Login")}
        </button>

      </div>
    </div>
  );
}
