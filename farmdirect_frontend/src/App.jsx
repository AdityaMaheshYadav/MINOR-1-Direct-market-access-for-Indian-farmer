import React, { useState } from "react";
import Navbar from "./components/Navbar";
import FarmerLogin from "./pages/FarmerLogin";
import ConsumerLogin from "./pages/ConsumerLogin";
import ConsumerProfileSetup from "./pages/ConsumerProfileSetup";
import FarmerDashboard from "./pages/FarmerDashboard";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import { translations } from "./translations";

export default function App() {
  const [page, setPage] = useState("home");
  const [language, setLanguage] = useState("en");
  const [farmerId, setFarmerId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // CART STATE
  const [cart, setCart] = useState([]);

  // ORDERS STATE
  const [orders, setOrders] = useState([]);

  // CONSUMER PROFILE STATE
  const [consumerProfile, setConsumerProfile] = useState({
    name: "", email: "", phone: "", address: "", city: "", pincode: "", photo: null,
  });

  // translation object
  const t = translations[language] || translations["en"];

  /* ==========================================================
      🛒 CART LOGIC
  ========================================================== */

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, cartQty: (item.cartQty || 1) + 1 }
            : item
        );
      }

      return [...prev, { ...product, cartQty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (!existing) return prev;

      if (existing.cartQty > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, cartQty: item.cartQty - 1 } : item
        );
      }

      return prev.filter((i) => i.id !== id);
    });
  };

  const clearCart = () => setCart([]);

  const placeOrder = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      items: [...cart],
      total: cart.reduce((s, i) => s + (i.price || 0) * (i.cartQty || 1), 0),
      status: "Confirmed ✅",
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
  };

  /* ==========================================================
      LOGOUT
  ========================================================== */
  const handleLogout = () => {
    setFarmerId(null);
    setPage("home");
  };

  /* ==========================================================
      PAGE ROUTING
  ========================================================== */
  return (
    <div className={darkMode ? "app-root dark" : "app-root"}>
      {/* NAVBAR */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        cartCount={cart.reduce((sum, item) => sum + (item.cartQty || 1), 0)}
        onCartClick={() => setPage("cart")}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
        goHome={() => setPage("home")}
        t={t}
      />

      {/* HOME PAGE */}
      {page === "home" && (
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">{t.appName}</h1>
            <p className="hero-subtitle">{t.loginTitle}</p>

            <div className="hero-buttons">
              <button className="hero-btn farmer" onClick={() => setPage("farmerLogin")}>
                👨‍🌾 {t.farmerLogin}
              </button>

              <button className="hero-btn consumer" onClick={() => setPage("consumerLogin")}>
                🛒 {t.consumerLogin}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FARMER LOGIN */}
      {page === "farmerLogin" && (
        <FarmerLogin
          language={language}
          t={t}
          goHome={() => setPage("home")}
          onLoginSuccess={(idFromApi) => {
            setFarmerId(idFromApi);
            setPage("farmerDashboard");
          }}
        />
      )}

      {/* CONSUMER LOGIN */}
      {page === "consumerLogin" && (
        <ConsumerLogin
          language={language}
          t={t}
          goHome={() => setPage("home")}
          onLoginSuccess={(phone) => {
            setConsumerProfile(prev => ({ ...prev, phone: phone || "" }));
            setPage("consumerProfile");
          }}
        />
      )}

      {/* FARMER DASHBOARD */}
      {page === "farmerDashboard" && (
        <FarmerDashboard
          farmerId={farmerId}
          language={language}
          t={t}
          goHome={() => setPage("home")}
          darkMode={darkMode}
        />
      )}

      {/* CONSUMER PROFILE SETUP (shown right after login) */}
      {page === "consumerProfile" && (
        <ConsumerProfileSetup
          profile={consumerProfile}
          setProfile={setConsumerProfile}
          onContinue={() => setPage("consumerDashboard")}
          goHome={() => setPage("home")}
        />
      )}

      {/* CONSUMER DASHBOARD */}
      {page === "consumerDashboard" && (
        <ConsumerDashboard
          language={language}
          t={t}
          goHome={() => setPage("home")}
          addToCart={addToCart}
          cart={cart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          placeOrder={placeOrder}
          orders={orders}
          goToPayment={() => setPage("payment")}
          darkMode={darkMode}
          consumerProfile={consumerProfile}
          setConsumerProfile={setConsumerProfile}
        />
      )}

      {/* CART PAGE */}
      {page === "cart" && (
        <CartPage
          language={language}
          t={t}
          cart={cart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          goHome={() => setPage("home")}
          goToPayment={() => setPage("payment")}
        />
      )}

      {/* PAYMENT PAGE */}
      {page === "payment" && (
        <PaymentPage
          language={language}
          t={t}
          cart={cart}
          clearCart={clearCart}
          goHome={() => setPage("home")}
          goSuccess={() => setPage("success")}
        />
      )}

      {/* SUCCESS PAGE */}
      {page === "success" && (
        <SuccessPage
          language={language}
          t={t}
          goHome={() => {
            clearCart();
            setPage("home");
          }}
        />
      )}
    </div>
  );
}
