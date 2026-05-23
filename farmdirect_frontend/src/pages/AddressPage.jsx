import React, { useState } from "react";
import { translations } from "../translations";

export default function AddressPage({ goBack, language, onSubmit }) {
  const t = { ...translations.en, ...translations[language] };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = () => {
    if (
      !name.trim() ||
      !phone.trim() ||
      !addressLine.trim() ||
      !city.trim() ||
      !pincode.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    onSubmit({ name, phone, addressLine, city, pincode });
  };

  return (
    <div className="hero-section">
      <div className="login-card">
        <h2>{t.addressTitle}</h2>

        <input
          className="input-box"
          placeholder={t.fullName}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input-box"
          placeholder={t.phoneNumber}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          className="input-box"
          placeholder={t.fullAddress}
          value={addressLine}
          onChange={(e) => setAddressLine(e.target.value)}
          rows={3}
        />

        <input
          className="input-box"
          placeholder={t.city}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          className="input-box"
          placeholder={t.pincode}
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />

        <button className="btn farmer" onClick={handleSubmit}>
          {t.saveAddress}
        </button>

        <button className="btn back" onClick={goBack}>
          ⬅ {t.back}
        </button>
      </div>
    </div>
  );
}
