import React, { useState } from "react";

export default function FarmerLogin({ goHome, onLoginSuccess, t }) {
  const [tab, setTab] = useState("login"); // "login" | "register"

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("error"); // "error" | "success"
  const [loading, setLoading] = useState(false);

  const showMsg = (text, type = "error") => {
    setMsg(text);
    setMsgType(type);
  };

  /* ── LOGIN ── */
  const doLogin = async () => {
    if (!email || !password) return showMsg("Please enter email and password.");
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/farmer/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        showMsg(data.message || t.invalidCredentials || "Invalid email or password.");
      } else {
        onLoginSuccess(data.farmerId);
      }
    } catch (err) {
      console.error("Login error:", err);
      showMsg(t.errorTryAgain || "Error! Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── REGISTER ── */
  const doRegister = async () => {
    if (!regName || !regEmail || !regPassword) {
      return showMsg("Name, email and password are required.");
    }
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/farmer/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
          phone: regPhone,
          address: regAddress,
        }),
      });
      const text = await res.text();
      if (!res.ok) {
        showMsg(text || "Registration failed.");
      } else {
        showMsg("Registered successfully! Please login.", "success");
        setTab("login");
        setEmail(regEmail);
        setPassword("");
        setRegName(""); setRegEmail(""); setRegPassword("");
        setRegPhone(""); setRegAddress("");
      }
    } catch (err) {
      console.error("Register error:", err);
      showMsg("Error! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <button className="back-btn" onClick={goHome}>← {t.back}</button>

      <div className="auth-card">
        <div className="auth-icon">👨‍🌾</div>
        <h2 className="auth-title">{t.farmerLoginTitle || "Farmer Portal"}</h2>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button
            onClick={() => { setTab("login"); setMsg(""); }}
            style={{
              flex: 1, padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: tab === "login" ? "#4caf50" : "#e0e0e0",
              color: tab === "login" ? "#fff" : "#333", fontWeight: "600"
            }}
          >
            {t.login || "Login"}
          </button>
          <button
            onClick={() => { setTab("register"); setMsg(""); }}
            style={{
              flex: 1, padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: tab === "register" ? "#4caf50" : "#e0e0e0",
              color: tab === "register" ? "#fff" : "#333", fontWeight: "600"
            }}
          >
            {t.register || "Register"}
          </button>
        </div>

        {/* LOGIN FORM */}
        {tab === "login" && (
          <>
            <input className="auth-input" placeholder={t.email || "Email"}
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="auth-input" type="password" placeholder={t.password || "Password"}
              value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doLogin()} />
            {msg && <p className={msgType === "success" ? "auth-success" : "auth-error"}>{msg}</p>}
            <button className="auth-btn" onClick={doLogin} disabled={loading}>
              {loading ? (t.loggingIn || "Logging in...") : (t.login || "Login")}
            </button>
          </>
        )}

        {/* REGISTER FORM */}
        {tab === "register" && (
          <>
            <input className="auth-input" placeholder={t.name || "Full Name *"}
              value={regName} onChange={(e) => setRegName(e.target.value)} />
            <input className="auth-input" placeholder={t.email || "Email *"}
              value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
            <input className="auth-input" type="password" placeholder={t.password || "Password *"}
              value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
            <input className="auth-input" placeholder={t.phone || "Phone (optional)"}
              value={regPhone} onChange={(e) => setRegPhone(e.target.value)} />
            <input className="auth-input" placeholder={t.address || "Address (optional)"}
              value={regAddress} onChange={(e) => setRegAddress(e.target.value)} />
            {msg && <p className={msgType === "success" ? "auth-success" : "auth-error"}>{msg}</p>}
            <button className="auth-btn" onClick={doRegister} disabled={loading}>
              {loading ? "Registering..." : (t.register || "Register")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
