import React, { useRef } from "react";

export default function ConsumerProfileSetup({ profile, setProfile, onContinue, goHome }) {
  const fileRef = useRef();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfile(prev => ({ ...prev, photo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleContinue = () => {
    if (!profile.name.trim()) {
      alert("Please enter your full name to continue.");
      return;
    }
    onContinue();
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
    }}>
      <div style={{
        background: "#fff", borderRadius: "24px", padding: "36px 32px",
        width: "min(480px, 100%)", boxShadow: "0 12px 40px rgba(0,0,0,0.12)"
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#1b5e20", marginBottom: "6px" }}>
            👤 Set Up Your Profile
          </h2>
          <p style={{ color: "#888", fontSize: "14px" }}>
            Tell us a bit about yourself before you start shopping
          </p>
        </div>

        {/* Profile Photo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "24px" }}>
          <div
            onClick={() => fileRef.current.click()}
            style={{
              width: "100px", height: "100px", borderRadius: "50%",
              background: "#e8f5e9", border: "3px solid #4caf50",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "52px", cursor: "pointer", overflow: "hidden", marginBottom: "10px",
              boxShadow: "0 4px 14px rgba(76,175,80,0.25)"
            }}
          >
            {profile.photo
              ? <img src={profile.photo} alt="avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : "👤"}
          </div>
          <input ref={fileRef} type="file" accept="image/*"
            style={{ display: "none" }} onChange={handlePhotoChange} />
          <button
            onClick={() => fileRef.current.click()}
            style={{
              background: "none", border: "1.5px solid #4caf50", color: "#2e7d32",
              borderRadius: "20px", padding: "5px 16px", cursor: "pointer",
              fontSize: "13px", fontWeight: "600"
            }}
          >
            📷 Upload Photo
          </button>
        </div>

        {/* Form Fields */}
        {[
          { label: "Full Name *", key: "name", placeholder: "Your full name", type: "text" },
          { label: "Email", key: "email", placeholder: "your@email.com", type: "email" },
          { label: "Phone", key: "phone", placeholder: "+91 XXXXX XXXXX", type: "tel" },
          { label: "Address", key: "address", placeholder: "House no, Street, Area", type: "text" },
          { label: "City", key: "city", placeholder: "City", type: "text" },
          { label: "Pincode", key: "pincode", placeholder: "6-digit pincode", type: "text" },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: "14px" }}>
            <label style={{
              fontSize: "13px", fontWeight: "600", color: "#444",
              display: "block", marginBottom: "5px"
            }}>
              {f.label}
            </label>
            <input
              type={f.type}
              value={profile[f.key] || ""}
              onChange={e => handleChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              style={{
                width: "100%", padding: "11px 14px", borderRadius: "12px",
                border: "1.5px solid #ddd", fontSize: "14px", outline: "none",
                boxSizing: "border-box", transition: "border 0.2s"
              }}
              onFocus={e => e.target.style.border = "1.5px solid #4caf50"}
              onBlur={e => e.target.style.border = "1.5px solid #ddd"}
            />
          </div>
        ))}

        {/* Buttons */}
        <button
          onClick={handleContinue}
          style={{
            width: "100%", padding: "13px", borderRadius: "14px", border: "none",
            background: "linear-gradient(135deg, #4caf50, #2e7d32)",
            color: "#fff", fontWeight: "700", fontSize: "16px",
            cursor: "pointer", marginTop: "8px",
            boxShadow: "0 4px 14px rgba(76,175,80,0.35)"
          }}
        >
          Continue to Dashboard →
        </button>

        <button
          onClick={onContinue}
          style={{
            width: "100%", padding: "10px", borderRadius: "14px",
            border: "1.5px solid #ddd", background: "#fff",
            color: "#888", fontSize: "13px", cursor: "pointer", marginTop: "10px"
          }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
