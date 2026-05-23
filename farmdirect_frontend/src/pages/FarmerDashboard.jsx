// FarmerDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  fetchFarmerProducts,
  addProduct as addProductApi,
  deleteProduct,
} from "../api/api";
import { translations } from "../translations";

/* ---------------- Translation Helper ---------------- */
const t = (lang, key, fallback) => {
  return translations[lang] && translations[lang][key]
    ? translations[lang][key]
    : fallback || translations["en"][key] || key;
};

export default function FarmerDashboard({
  farmerId,
  language = "en",
  goHome,
  darkMode,
}) {
  /* ---------------- STATES ---------------- */
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [msg, setMsg] = useState("");

  /* WEATHER STATES */
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState("");

  /* CHAT STATES */
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! Ask me anything about farming." },
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  /* ---------------- LOAD PRODUCTS ---------------- */
  useEffect(() => {
    loadProducts();
  }, [farmerId, language]);

  const loadProducts = async () => {
    try {
      const data = farmerId
        ? await fetchFarmerProducts(farmerId)
        : await fetchFarmerProducts(null);

      setProducts(data || []);
    } catch (e) {
      console.error("loadProducts error:", e);
    }
  };

  /* ---------------- ADD PRODUCT ---------------- */
  const handleAdd = async () => {
    if (!form.name.trim()) {
      setMsg(t(language, "missingFields", "Enter product name"));
      return;
    }

    try {
      await addProductApi({ ...form, farmerId });
      setForm({ name: "", description: "", price: "" });
      setMsg(t(language, "addProduct", "Added!"));
      loadProducts();
      setTimeout(() => setMsg(""), 1800);
    } catch (e) {
      console.error("addProduct error:", e);
      setMsg(t(language, "errorTryAgain", "Failed to add"));
    }
  };

  /* ---------------- DELETE PRODUCT ---------------- */
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (e) {
      console.error("deleteProduct error:", e);
    }
  };

  /* ---------------- WEATHER ---------------- */
  const getWeather = async () => {
    if (!city.trim()) {
      setWeatherError(t(language, "enterCity", "Please enter a city"));
      return;
    }
    setWeatherError("");
    setWeather(null);

    try {
      const res = await fetch(`http://localhost:8080/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      if (data.condition === "City not found") {
        setWeatherError("City not found. Please check the spelling.");
        return;
      }
      setWeather({
        city: data.city,
        temperature: data.temperature,
        condition: data.condition,
        humidity: data.humidity,
        wind: data.windSpeed,
        cropTip: data.cropTip,
      });
    } catch (err) {
      console.error("Weather error:", err);
      setWeatherError("Failed to fetch weather. Please try again.");
    }
  };

  /* ---------------- CHAT ---------------- */
  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg = { sender: "user", text: chatInput };
    setMessages((prev) => [...prev, userMsg]);

    const query = chatInput;
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      if (!res.ok) {
        throw new Error("Chat API error");
      }

      const data = await res.json();
      const reply = data.reply || "⚠️ No response";
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("chat error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error connecting to chatbot server." },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  /* ---------------- TRANSPORTATION PARTNERS ---------------- */
  const transportPartners = [
    {
      name: "Delhivery",
      contact: "+91 9876543210",
      services: t(language, "transportFastDelivery", "Fast & Reliable Delivery"),
      website: "https://www.delhivery.com",
    },
    {
      name: "Blue Dart",
      contact: "+91 9801234567",
      services: t(language, "transportPremiumDelivery", "Premium Delivery"),
      website: "https://www.bluedart.com",
    },
    {
      name: "India Post Logistics",
      contact: "1800 266 6868",
      services: t(language, "transportAffordableDelivery", "Affordable Delivery"),
      website: "https://www.indiapost.gov.in",
    },
  ];

  /* ---------------------------------------------------------- */

  const productCount = products.length;

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
      <div className="dashboard-layout">
        
        {/* SIDEBAR */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-profile">
            <div className="avatar-circle">👨‍🌾</div>
            <h3 className="sidebar-name">{t(language, "farmerDashboard")}</h3>
            <p className="sidebar-sub">{t(language, "tipsText")}</p>
          </div>

          <nav className="sidebar-nav">

            <button className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              📊 {t(language, "overview")}
            </button>

            <button className={`nav-link ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              🛒 {t(language, "products")}
            </button>

            {/* ⭐ NEW TRANSPORTATION TAB HERE (Option A) */}
            <button className={`nav-link ${activeTab === "transport" ? "active" : ""}`}
              onClick={() => setActiveTab("transport")}
            >
              🚚 {t(language, "transportationFacilities", "Transportation Facilities")}
            </button>

            <button className={`nav-link ${activeTab === "schemes" ? "active" : ""}`}
              onClick={() => setActiveTab("schemes")}
            >
              🏛 {t(language, "schemes")}
            </button>

            <button className={`nav-link ${activeTab === "weather" ? "active" : ""}`}
              onClick={() => setActiveTab("weather")}
            >
              ⛅ {t(language, "weather")}
            </button>

            <button className={`nav-link ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              💬 {t(language, "chat")}
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1>{t(language, "farmerDashboard")}</h1>
          </div>

          {/* ---------------- OVERVIEW ---------------- */}
          {activeTab === "overview" && (
            <div>
              <h2 className="section-title">📊 {t(language, "overview")}</h2>

              <div className="overview-grid">
                <div className="overview-card">
                  <h3>{t(language, "totalProducts")}</h3>
                  <p>{productCount}</p>
                </div>

                <div className="overview-card">
                  <h3>{t(language, "quickTips")}</h3>
                  <p>{t(language, "tipsText")}</p>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- PRODUCTS ---------------- */}
          {activeTab === "products" && (
            <div>
              <h2 className="section-title">🛒 {t(language, "manageProducts")}</h2>

              <div className="products-layout">
                <div className="add-product-wrapper">
                  
                  <h3 className="add-product-title"><span>🌱</span> {t(language, "addNewProduct")}</h3>

                  <div className="floating-input">
                    <input
                      placeholder=" "
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <label>{t(language, "productName")}</label>
                  </div>

                  <div className="floating-input">
                    <input
                      type="number"
                      placeholder=" "
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                    <label>{t(language, "price")}</label>
                  </div>

                  <div className="floating-input">
                    <textarea
                      placeholder=" "
                      rows="3"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                    <label>{t(language, "description")}</label>
                  </div>

                  <button className="add-product-btn" onClick={handleAdd}>
                    ➕ {t(language, "addProduct")}
                  </button>

                  {msg && <p className="form-msg">{msg}</p>}
                </div>

                <div className="product-list-card">
                  {products.length === 0 ? (
                    <p>{t(language, "noProducts")}</p>
                  ) : (
                    products.map((p) => (
                      <div className="product-card-row" key={p.id}>
                        <div className="product-info-box">
                          <h4>{p.name}</h4>
                          <p className="product-desc">{p.description}</p>
                          <p className="product-price">₹{p.price}</p>
                        </div>

                        <div className="product-row-actions">
                          <button className="btn-edit">Edit</button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(p.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- ⭐ TRANSPORTATION FACILITIES ---------------- */}
        {/* ⭐ BEAUTIFUL TRANSPORTATION FACILITIES SECTION */}
{activeTab === "transport" && (
  <div className="transport-wrapper">
    
    <h2 className="section-title">
      🚚 {t(language, "transportationFacilities", "Transportation Facilities")}
    </h2>

    <p className="transport-subtitle-beauty">
      {t(language, "transportSubtitle", "Connect with trusted logistics partners to deliver your products safely and quickly.")}
    </p>

    <div className="transport-grid-beauty">
      {transportPartners.map((p, index) => (
        <div key={p.name} className="transport-card-beauty">
          
          <div className="transport-logo">
            {index === 0 && "📦"}
            {index === 1 && "🚀"}
            {index === 2 && "🏤"}
          </div>

          <h3 className="transport-title">{p.name}</h3>

          <p><strong>{t(language, "contact")}:</strong> {p.contact}</p>
          <p><strong>{t(language, "services")}:</strong> {p.services}</p>

          <a 
            href={p.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="transport-visit-btn"
          >
            🔗 {t(language, "visitWebsite", "Visit Website")}
          </a>
        </div>
      ))}
    </div>
  </div>
)}


          {/* ---------------- SCHEMES ---------------- */}
          {activeTab === "schemes" && (
            <div>
              <h2 className="section-title">🏛 {t(language, "govtSchemes")}</h2>
              <p style={{ color: "#666", marginBottom: "16px", fontSize: "14px" }}>
                Click on any scheme to visit the official government website.
              </p>

              <div className="schemes-list">
                {[
                  {
                    icon: "🌾",
                    title: "PM-Kisan Samman Nidhi",
                    desc: "₹6000/year direct income support to farmer families in 3 installments.",
                    url: "https://pmkisan.gov.in",
                  },
                  {
                    icon: "🛡️",
                    title: "PM Fasal Bima Yojana",
                    desc: "Crop insurance against drought, flood, pest & disease at low premium.",
                    url: "https://pmfby.gov.in",
                  },
                  {
                    icon: "💧",
                    title: "PM Krishi Sinchai Yojana",
                    desc: "55–75% subsidy on drip & sprinkler irrigation systems.",
                    url: "https://pmksy.gov.in",
                  },
                  {
                    icon: "🌱",
                    title: "Soil Health Card Scheme",
                    desc: "Free soil testing and customized fertilizer recommendations.",
                    url: "https://soilhealth.dac.gov.in",
                  },
                  {
                    icon: "💳",
                    title: "Kisan Credit Card (KCC)",
                    desc: "Low-interest crop loans at 4% per annum up to ₹3 lakh.",
                    url: "https://www.nabard.org/content.aspx?id=572",
                  },
                  {
                    icon: "📈",
                    title: "eNAM — National Agriculture Market",
                    desc: "Sell produce online across India at better market prices.",
                    url: "https://enam.gov.in",
                  },
                  {
                    icon: "🚜",
                    title: "SMAM — Farm Machinery Scheme",
                    desc: "40–50% subsidy on purchase of farm machinery & equipment.",
                    url: "https://agrimachinery.nic.in",
                  },
                  {
                    icon: "🏭",
                    title: "PM Kisan SAMPADA Yojana",
                    desc: "Subsidy for food processing units, cold chain & agri-infrastructure.",
                    url: "https://mofpi.gov.in/pmksy",
                  },
                ].map((scheme) => (
                  <a
                    key={scheme.title}
                    href={scheme.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="scheme-card"
                    style={{ textDecoration: "none", color: "inherit", cursor: "pointer", display: "block" }}
                  >
                    <h3>{scheme.icon} {scheme.title}</h3>
                    <p>{scheme.desc}</p>
                    <span style={{ fontSize: "12px", color: "#4caf50", fontWeight: "600", marginTop: "8px", display: "inline-block" }}>
                      🔗 Visit Official Website →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- WEATHER ---------------- */}
          {activeTab === "weather" && (
            <div className="weather-section">
              <h2 className="section-title">⛅ {t(language, "weatherInfo")}</h2>

              <div className="weather-search">
                <input
                  type="text"
                  placeholder={t(language, "enterCity")}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="weather-input"
                />

                <button className="weather-btn" onClick={getWeather}>
                  {t(language, "getWeather")}
                </button>
              </div>

              {weatherError && (
                <p className="weather-error">{weatherError}</p>
              )}

              {weather && (
                <div className="weather-info">
                  <div className="weather-main-card">
                    <h3>🌍 {weather.city}</h3>
                    <h1>{weather.temperature}°C</h1>
                    <p>{weather.condition}</p>
                    <p>💧 Humidity: {weather.humidity}%</p>
                    <p>🌬 Wind: {weather.wind} km/h</p>
                  </div>

                  <div className="crop-tip-card">
                    <h3>🌱 Crop Tip</h3>
                    <p>{weather.cropTip}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------------- CHAT ---------------- */}
          {activeTab === "chat" && (
            <div className="chat-wrapper">
              <h2 className="section-title">
                💬 {t(language, "chatAssistant")}
              </h2>

              <div className="chat-box">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`chat-bubble ${
                      m.sender === "user" ? "user" : "bot"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="chat-input-box">
                <input
                  type="text"
                  className="chat-input"
                  placeholder={t(language, "typeMessage")}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />

                <button
                  className="chat-send-btn"
                  onClick={sendMessage}
                  disabled={chatLoading}
                >
                  {chatLoading ? "..." : "➤"}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
