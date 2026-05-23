import React from "react";

export default function Navbar({
  language,
  setLanguage,
  cartCount = 0,
  onCartClick,
  darkMode,
  setDarkMode,
  onLogout,
  goHome,
}) {
  return (
    <nav className="navbar">
      {/* LEFT: Logo */}
      <div className="logo-box" onClick={goHome} role="button">
        <span className="logo-icon" aria-hidden>🌱</span>
        <h2 className="logo-text">FarmDirect</h2>
      </div>

      {/* RIGHT: Language, Dark Toggle, Cart, Logout */}
      <div className="nav-right">

        {/* language select */}
        <select
          className="lang-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
          <option value="ml">മലയാളം</option>
          <option value="kn">ಕನ್ನಡ</option>
          <option value="bn">বাংলা</option>
        </select>

        {/* dark mode toggle */}
        <button
          className={`nav-icon-btn dark-toggle ${darkMode ? "active" : ""}`}
          onClick={() => setDarkMode((d) => !d)}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={darkMode}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      
        {/* logout - premium button */}
        <button
          className="nav-logout-btn"
          onClick={onLogout}
          title="Logout"
        >
          <span className="logout-icon" aria-hidden>⏻</span>
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </nav>
  );
}
