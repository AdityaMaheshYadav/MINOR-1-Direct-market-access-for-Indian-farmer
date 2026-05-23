import React, { useState, useEffect, useRef } from "react";
import { fetchProducts } from "../api/api";
import { translations } from "../translations";

/* ── delivery steps for the tracker ── */
const DELIVERY_STEPS = [
  { icon: "✅", label: "Order Placed" },
  { icon: "💳", label: "Payment Done" },
  { icon: "📦", label: "Packed" },
  { icon: "🚚", label: "Out for Delivery" },
  { icon: "🏠", label: "Delivered" },
];

export default function ConsumerDashboard({
  language, goHome, addToCart, cart, removeFromCart,
  clearCart, placeOrder, orders, goToPayment, darkMode,
  consumerProfile, setConsumerProfile,
}) {
  const t = translations[language] || translations["en"];
  const [activeTab, setActiveTab] = useState("shop");
  const [products, setProducts]   = useState([]);

  /* payment modal state */
  const [payingOrder, setPayingOrder]   = useState(null);
  const [payMethod, setPayMethod]       = useState("upi");
  const [upiId, setUpiId]               = useState("");
  const [cardNum, setCardNum]           = useState("");
  const [cardExp, setCardExp]           = useState("");
  const [cardCvv, setCardCvv]           = useState("");
  const [payDone, setPayDone]           = useState({});
  const [trackingOrder, setTrackingOrder] = useState(null);

  /* profile state — use shared props, fallback to local if not provided */
  const profile = consumerProfile || { name: "Guest", email: "", phone: "", address: "", city: "", pincode: "", photo: null };
  const setProfile = setConsumerProfile || (() => {});
  const [profilePhoto, setProfilePhoto] = useState(profile.photo || null);
  const [profileSaved, setProfileSaved] = useState(false);
  const fileRef = useRef();

  useEffect(() => { loadProducts(); }, [language]);

  const loadProducts = async () => {
    try { const d = await fetchProducts(language); setProducts(d || []); }
    catch (e) { console.error(e); }
  };

  /* product images */
  const IMG = {
    wheat:"https://images.unsplash.com/photo-1598514982627-4c19b201e179",
    rice:"https://images.unsplash.com/photo-1603899122478-9b87c0f205b3",
    tomato:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
    onion:"https://images.unsplash.com/photo-1601004890707-44aa0986e8c0",
    milk:"https://images.unsplash.com/photo-1580910051074-7afc5a50b8d3",
    corn:"https://images.unsplash.com/photo-1506801310323-534be5e7f325",
    cotton:"https://images.unsplash.com/photo-1607083200813-5816240e0eaa",
    fruits:"https://images.unsplash.com/photo-1542834849-5303b953d6a4",
    spices:"https://images.unsplash.com/photo-1615486640180-bd5cb07f461e",
  };
  const resolveImg = (name) => {
    if (!name) return "https://via.placeholder.com/300x170?text=Product";
    const k = name.toLowerCase();
    for (const key in IMG) { if (k.includes(key)) return IMG[key]; }
    return "https://via.placeholder.com/300x170?text=Product";
  };

  const totalPrice = cart.reduce((s,i) => s + (i.price||0)*(i.cartQty||1), 0);

  /* ── payment submit ── */
  const handlePaySubmit = () => {
    if (payMethod === "upi" && !upiId.trim()) { alert("Enter UPI ID"); return; }
    if (payMethod === "card" && (!cardNum || !cardExp || !cardCvv)) { alert("Fill card details"); return; }
    setPayDone(prev => ({ ...prev, [payingOrder.id]: true }));
    setPayingOrder(null);
    setUpiId(""); setCardNum(""); setCardExp(""); setCardCvv("");
  };

  /* ── delivery step based on time elapsed (mock) ── */
  const getDeliveryStep = (orderId) => {
    if (!payDone[orderId]) return 0;
    const elapsed = (Date.now() - orderId) / 1000; // seconds since order
    if (elapsed < 5)  return 1;
    if (elapsed < 10) return 2;
    if (elapsed < 20) return 3;
    if (elapsed < 40) return 4;
    return 4;
  };

  /* ── profile photo ── */
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfilePhoto(ev.target.result);
      setProfile(prev => ({ ...prev, photo: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  /* ────────────────────────────────────────────────────────── */
  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
      <div className="dashboard-layout">

        {/* SIDEBAR */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-profile">
            <div className="avatar-circle" style={{ overflow:"hidden", cursor:"pointer" }}
              onClick={() => setActiveTab("profile")}>
              {profile.photo || profilePhoto
                ? <img src={profile.photo || profilePhoto} alt="avatar"
                    style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%" }} />
                : "🛒"}
            </div>
            <h2 className="sidebar-name">{profile.name}</h2>
            <p className="sidebar-sub">{t.availableProducts || "Available Products"}</p>
          </div>
          <nav className="sidebar-nav">
            <button className={`nav-link ${activeTab==="shop"?"active":""}`} onClick={()=>setActiveTab("shop")}>
              🛍️ {t.shop}
            </button>
            <button className={`nav-link ${activeTab==="cart"?"active":""}`} onClick={()=>setActiveTab("cart")}>
              🛒 {t.cart} ({cart.length})
            </button>
            <button className={`nav-link ${activeTab==="orders"?"active":""}`} onClick={()=>setActiveTab("orders")}>
              📦 {t.orders}
            </button>
            <button className={`nav-link ${activeTab==="profile"?"active":""}`} onClick={()=>setActiveTab("profile")}>
              👤 {t.profile}
            </button>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="dashboard-main">
          <div className="dashboard-header"><h1>{t.consumerDashboard}</h1></div>

          {/* ── SHOP ── */}
          {activeTab === "shop" && (
            <div className="tab-panel">
              <h2>{t.availableProducts}</h2>
              <div className="product-grid">
                {products.map(p => (
                  <div className="shop-card" key={p.id}>
                    <img className="shop-img" src={resolveImg(p.name)} alt={p.name} />
                    <h3>{p.name}</h3>
                    <p className="shop-desc">{p.description}</p>
                    <p className="shop-price">₹{p.price}</p>
                    <button className="primary-btn cart-animate-btn"
                      onClick={e => {
                        addToCart(p);
                        e.target.classList.add("btn-clicked");
                        setTimeout(()=>e.target.classList.remove("btn-clicked"),300);
                      }}>
                      {t.addToCart}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CART ── */}
          {activeTab === "cart" && (
            <div className="cart-section">
              <h2 className="section-title">🛒 {t.yourCart || "Your Cart"}</h2>
              {cart.length === 0 ? (
                <p className="empty-cart-text">{t.emptyCart}</p>
              ) : (
                <>
                  <div className="cart-items-container">
                    {cart.map(item => (
                      <div className="cart-item-card-premium" key={item.id}>
                        <img src={resolveImg(item.name)} alt="product" className="cart-item-img" />
                        <div className="cart-item-info">
                          <h3>{item.name}</h3>
                          <p className="cart-desc">{item.description}</p>
                          <div className="cart-meta">
                            <span className="cart-price">₹{item.price}</span>
                            <span className="cart-qty">{t.quantity||"Qty"}: {item.cartQty}</span>
                          </div>
                        </div>
                        <button className="cart-remove-btn" onClick={()=>removeFromCart(item.id)}>
                          {t.remove}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-summary-premium">
                    <h3>{t.orderSummary||"Order Summary"}</h3>
                    <div className="summary-row"><span>{t.totalItems||"Total Items"}</span><span>{cart.length}</span></div>
                    <div className="summary-row"><span>{t.totalAmount}</span><span>₹{totalPrice}</span></div>
                    <button className="checkout-btn"
                      style={{ background:"#2e7d32", marginBottom:"10px" }}
                      onClick={()=>{ placeOrder(); setActiveTab("orders"); }}>
                      ✅ {t.placeOrder||"Place Order"}
                    </button>
                    <button className="clear-cart-btn" onClick={clearCart}>{t.clearCart}</button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── ORDERS ── */}
          {activeTab === "orders" && (
            <div>
              <h2 className="section-title">📦 {t.orders||"My Orders"}</h2>
              {(!orders||orders.length===0) ? (
                <div style={{textAlign:"center",padding:"40px",color:"#888"}}>
                  <p style={{fontSize:"48px"}}>📭</p>
                  <p>No orders yet. Add items to cart and place an order!</p>
                </div>
              ) : (
                <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
                  {orders.map(order => {
                    const paid = !!payDone[order.id];
                    const step = getDeliveryStep(order.id);
                    return (
                      <div key={order.id} style={{
                        background:"#fff", borderRadius:"16px", padding:"20px",
                        boxShadow:"0 4px 18px rgba(0,0,0,0.09)",
                        borderLeft:`5px solid ${paid?"#4caf50":"#ff9800"}`
                      }}>
                        {/* header */}
                        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px",marginBottom:"10px"}}>
                          <span style={{fontWeight:"700",fontSize:"15px"}}>
                            Order #{order.id.toString().slice(-5)}
                          </span>
                          <span style={{
                            background: paid?"#e8f5e9":"#fff3e0",
                            color: paid?"#2e7d32":"#e65100",
                            padding:"3px 10px", borderRadius:"20px", fontSize:"13px", fontWeight:"600"
                          }}>
                            {paid ? "✅ Paid" : "⏳ Payment Pending"}
                          </span>
                        </div>
                        <p style={{color:"#888",fontSize:"13px",marginBottom:"10px"}}>📅 {order.date}</p>

                        {/* items */}
                        <div style={{borderTop:"1px solid #eee",paddingTop:"10px",marginBottom:"10px"}}>
                          {order.items.map(item => (
                            <div key={item.id} style={{display:"flex",justifyContent:"space-between",fontSize:"14px",marginBottom:"4px"}}>
                              <span>{item.name} × {item.cartQty}</span>
                              <span>₹{item.price*item.cartQty}</span>
                            </div>
                          ))}
                        </div>

                        {/* total */}
                        <div style={{display:"flex",justifyContent:"space-between",fontWeight:"700",borderTop:"1px solid #eee",paddingTop:"10px",marginBottom:"14px"}}>
                          <span>Total</span>
                          <span style={{color:"#2e7d32"}}>₹{order.total}</span>
                        </div>

                        {/* pay button */}
                        {!paid && (
                          <button onClick={()=>setPayingOrder(order)}
                            style={{
                              width:"100%", padding:"11px", borderRadius:"10px", border:"none",
                              background:"linear-gradient(135deg,#ff9800,#f44336)",
                              color:"#fff", fontWeight:"700", fontSize:"15px", cursor:"pointer",
                              marginBottom:"14px"
                            }}>
                            💳 Pay Now ₹{order.total}
                          </button>
                        )}

                        {/* ── DELIVERY TRACKER ── */}
                        {paid && (
                          <div>
                            <p style={{fontWeight:"600",marginBottom:"10px",fontSize:"14px"}}>🚚 Delivery Tracker</p>
                            <div style={{display:"flex",alignItems:"center",gap:"0"}}>
                              {DELIVERY_STEPS.map((s,i) => (
                                <React.Fragment key={i}>
                                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:"60px"}}>
                                    <div style={{
                                      width:"36px",height:"36px",borderRadius:"50%",
                                      background: i<=step?"#4caf50":"#e0e0e0",
                                      display:"flex",alignItems:"center",justifyContent:"center",
                                      fontSize:"16px",
                                      boxShadow: i===step?"0 0 0 4px rgba(76,175,80,0.25)":"none",
                                      transition:"all 0.4s"
                                    }}>
                                      {s.icon}
                                    </div>
                                    <span style={{fontSize:"10px",marginTop:"4px",textAlign:"center",color:i<=step?"#2e7d32":"#aaa",fontWeight:i===step?"700":"400"}}>
                                      {s.label}
                                    </span>
                                  </div>
                                  {i < DELIVERY_STEPS.length-1 && (
                                    <div style={{
                                      flex:1,height:"3px",
                                      background: i<step?"#4caf50":"#e0e0e0",
                                      transition:"background 0.4s",
                                      marginBottom:"18px"
                                    }}/>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                            <p style={{fontSize:"12px",color:"#888",marginTop:"8px",textAlign:"center"}}>
                              {step < 4 ? "Estimated delivery: Today by 6:00 PM" : "🎉 Delivered!"}
                            </p>
                            <button onClick={()=>setTrackingOrder(trackingOrder===order.id?null:order.id)}
                              style={{marginTop:"8px",background:"none",border:"1px solid #4caf50",
                                color:"#2e7d32",borderRadius:"8px",padding:"5px 14px",cursor:"pointer",fontSize:"13px"}}>
                              {trackingOrder===order.id?"Hide Map 🗺️":"View Map 🗺️"}
                            </button>

                            {/* ── MAP (OpenStreetMap embed) ── */}
                            {trackingOrder===order.id && (
                              <div style={{marginTop:"12px",borderRadius:"12px",overflow:"hidden",border:"2px solid #4caf50"}}>
                                <div style={{background:"#e8f5e9",padding:"8px 12px",fontSize:"13px",fontWeight:"600",color:"#2e7d32"}}>
                                  📍 Live Delivery Map — Driver is on the way!
                                </div>
                                <iframe
                                  title="delivery-map"
                                  width="100%"
                                  height="260"
                                  style={{border:"none",display:"block"}}
                                  src="https://www.openstreetmap.org/export/embed.html?bbox=77.1,28.5,77.3,28.7&layer=mapnik&marker=28.6,77.2"
                                  allowFullScreen
                                />
                                <div style={{background:"#f1f8e9",padding:"8px 12px",fontSize:"12px",color:"#555",display:"flex",gap:"16px"}}>
                                  <span>🚚 Driver: Ramesh Kumar</span>
                                  <span>📞 +91 98765 43210</span>
                                  <span>⏱ ETA: ~25 min</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── PROFILE ── */}
          {activeTab === "profile" && (
            <div>
              <h2 className="section-title">👤 My Profile</h2>
              <div style={{
                background:"#fff",borderRadius:"18px",padding:"28px",
                boxShadow:"0 4px 20px rgba(0,0,0,0.08)",maxWidth:"520px"
              }}>
                {/* photo */}
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:"24px"}}>
                  <div onClick={()=>fileRef.current.click()} style={{
                    width:"100px",height:"100px",borderRadius:"50%",
                    background:"#e8f5e9",display:"flex",alignItems:"center",
                    justifyContent:"center",fontSize:"48px",cursor:"pointer",
                    overflow:"hidden",border:"3px solid #4caf50",marginBottom:"8px"
                  }}>
                    {profile.photo || profilePhoto
                      ? <img src={profile.photo || profilePhoto} alt="profile"
                          style={{width:"100%",height:"100%",objectFit:"cover"}} />
                      : "👤"}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*"
                    style={{display:"none"}} onChange={handlePhotoChange} />
                  <button onClick={()=>fileRef.current.click()}
                    style={{background:"none",border:"1px solid #4caf50",color:"#2e7d32",
                      borderRadius:"8px",padding:"4px 14px",cursor:"pointer",fontSize:"13px"}}>
                    📷 Change Photo
                  </button>
                </div>

                {/* fields */}
                {[
                  {label:"Full Name",key:"name",placeholder:"Your full name"},
                  {label:"Email",key:"email",placeholder:"your@email.com"},
                  {label:"Phone",key:"phone",placeholder:"+91 XXXXX XXXXX"},
                  {label:"Address",key:"address",placeholder:"House no, Street, Area"},
                  {label:"City",key:"city",placeholder:"City"},
                  {label:"Pincode",key:"pincode",placeholder:"6-digit pincode"},
                ].map(f => (
                  <div key={f.key} style={{marginBottom:"14px"}}>
                    <label style={{fontSize:"13px",fontWeight:"600",color:"#555",display:"block",marginBottom:"4px"}}>
                      {f.label}
                    </label>
                    <input
                      value={profile[f.key]}
                      onChange={e=>setProfile(prev=>({...prev,[f.key]:e.target.value}))}
                      placeholder={f.placeholder}
                      style={{
                        width:"100%",padding:"10px 14px",borderRadius:"10px",
                        border:"1.5px solid #ddd",fontSize:"14px",outline:"none",
                        boxSizing:"border-box",
                        transition:"border 0.2s"
                      }}
                      onFocus={e=>e.target.style.border="1.5px solid #4caf50"}
                      onBlur={e=>e.target.style.border="1.5px solid #ddd"}
                    />
                  </div>
                ))}

                <button onClick={()=>{setProfileSaved(true);setTimeout(()=>setProfileSaved(false),2500);}}
                  style={{
                    width:"100%",padding:"12px",borderRadius:"12px",border:"none",
                    background:"linear-gradient(135deg,#4caf50,#2e7d32)",
                    color:"#fff",fontWeight:"700",fontSize:"15px",cursor:"pointer",marginTop:"6px"
                  }}>
                  💾 Save Profile
                </button>
                {profileSaved && (
                  <p style={{color:"#2e7d32",textAlign:"center",marginTop:"10px",fontWeight:"600"}}>
                    ✅ Profile saved successfully!
                  </p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── PAYMENT MODAL ── */}
      {payingOrder && (
        <div style={{
          position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",
          display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000
        }}>
          <div style={{
            background:"#fff",borderRadius:"20px",padding:"28px",
            width:"min(420px,92vw)",boxShadow:"0 20px 60px rgba(0,0,0,0.25)"
          }}>
            <h3 style={{marginBottom:"4px",fontSize:"18px"}}>💳 Complete Payment</h3>
            <p style={{color:"#888",fontSize:"13px",marginBottom:"18px"}}>
              Order #{payingOrder.id.toString().slice(-5)} · ₹{payingOrder.total}
            </p>

            {/* method tabs */}
            <div style={{display:"flex",gap:"8px",marginBottom:"18px"}}>
              {["upi","card","cod"].map(m => (
                <button key={m} onClick={()=>setPayMethod(m)}
                  style={{
                    flex:1,padding:"9px",borderRadius:"10px",border:"none",cursor:"pointer",
                    fontWeight:"600",fontSize:"13px",
                    background:payMethod===m?"#4caf50":"#f0f0f0",
                    color:payMethod===m?"#fff":"#333"
                  }}>
                  {m==="upi"?"📱 UPI":m==="card"?"💳 Card":"🤝 COD"}
                </button>
              ))}
            </div>

            {/* UPI */}
            {payMethod==="upi" && (
              <div>
                <p style={{fontSize:"13px",color:"#555",marginBottom:"8px"}}>Enter your UPI ID</p>
                <input value={upiId} onChange={e=>setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  style={{width:"100%",padding:"11px 14px",borderRadius:"10px",
                    border:"1.5px solid #ddd",fontSize:"14px",boxSizing:"border-box"}} />
                <div style={{display:"flex",gap:"10px",marginTop:"10px",flexWrap:"wrap"}}>
                  {["GPay","PhonePe","Paytm","BHIM"].map(app=>(
                    <span key={app} style={{
                      background:"#e8f5e9",color:"#2e7d32",padding:"5px 12px",
                      borderRadius:"20px",fontSize:"12px",fontWeight:"600",cursor:"pointer"
                    }} onClick={()=>setUpiId(`user@${app.toLowerCase()}`)}>
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CARD */}
            {payMethod==="card" && (
              <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                <input value={cardNum} onChange={e=>setCardNum(e.target.value)}
                  placeholder="Card Number (16 digits)"
                  maxLength={16}
                  style={{padding:"11px 14px",borderRadius:"10px",border:"1.5px solid #ddd",fontSize:"14px"}} />
                <div style={{display:"flex",gap:"10px"}}>
                  <input value={cardExp} onChange={e=>setCardExp(e.target.value)}
                    placeholder="MM/YY" maxLength={5}
                    style={{flex:1,padding:"11px 14px",borderRadius:"10px",border:"1.5px solid #ddd",fontSize:"14px"}} />
                  <input value={cardCvv} onChange={e=>setCardCvv(e.target.value)}
                    placeholder="CVV" maxLength={3} type="password"
                    style={{flex:1,padding:"11px 14px",borderRadius:"10px",border:"1.5px solid #ddd",fontSize:"14px"}} />
                </div>
              </div>
            )}

            {/* COD */}
            {payMethod==="cod" && (
              <div style={{
                background:"#fff8e1",borderRadius:"12px",padding:"14px",
                fontSize:"14px",color:"#555",lineHeight:"1.6"
              }}>
                🤝 Pay with cash when your order arrives at your doorstep.<br/>
                No advance payment required.
              </div>
            )}

            <div style={{display:"flex",gap:"10px",marginTop:"20px"}}>
              <button onClick={()=>setPayingOrder(null)}
                style={{flex:1,padding:"11px",borderRadius:"10px",border:"1.5px solid #ddd",
                  background:"#fff",cursor:"pointer",fontWeight:"600"}}>
                Cancel
              </button>
              <button onClick={handlePaySubmit}
                style={{flex:2,padding:"11px",borderRadius:"10px",border:"none",
                  background:"linear-gradient(135deg,#4caf50,#2e7d32)",
                  color:"#fff",fontWeight:"700",fontSize:"15px",cursor:"pointer"}}>
                {payMethod==="cod"?"Confirm COD Order":"Pay ₹"+payingOrder.total}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
