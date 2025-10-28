// CardForm.jsx
import React, { useState, useEffect } from "react";

/*
Props:
 - onSubmit(paymentData) : fonction appelée avec { cardHolder, cardNumber, expiry, cvv, amount, cardBrand }
 - submitting (bool) : si true, désactive le bouton
*/

const cardBrands = [
  { name: "Visa", pattern: /^4/ },
  { name: "Mastercard", pattern: /^5[1-5]/ },
  { name: "Amex", pattern: /^3[47]/ },
  { name: "Discover", pattern: /^6(?:011|5)/ },
];

// Luhn algorithm pour validation du numéro de carte
function luhnCheck(value = "") {
  const s = value.replace(/\D/g, "");
  let sum = 0;
  let shouldDouble = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let digit = parseInt(s.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return s.length > 0 && sum % 10 === 0;
}

function detectBrand(number) {
  const n = number.replace(/\D/g, "");
  for (const b of cardBrands) {
    if (b.pattern.test(n)) return b.name;
  }
  return "Unknown";
}

export default function CardForm({ onSubmit, submitting }) {
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState(""); // MM/YY
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("49.90");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // format automatique numéro : xxxx xxxx xxxx xxxx
    setCardNumber((prev) => prev.replace(/[^\d ]/g, ""));
  }, []);

  function validateAll() {
    const e = {};
    const digits = cardNumber.replace(/\s+/g, "");
    if (!cardHolder.trim()) e.cardHolder = "Nom du titulaire requis.";
    if (digits.length < 12) e.cardNumber = "Numéro de carte incomplet.";
    else if (!luhnCheck(digits)) e.cardNumber = "Numéro de carte invalide.";
    if (!/^\d{2}\/\d{2}$/.test(expiry)) e.expiry = "Format MM/AA requis.";
    else {
      // vérif date non expirée
      const [m, y] = expiry.split("/").map((s) => parseInt(s, 10));
      if (m < 1 || m > 12) e.expiry = "Mois invalide.";
      else {
        const current = new Date();
        const fullYear = 2000 + y;
        const expDate = new Date(fullYear, m, 1);
        // expire à la fin du mois => on met (expMonth+1, 1) compare
        if (expDate <= new Date(current.getFullYear(), current.getMonth(), 1)) {
          e.expiry = "Carte expirée.";
        }
      }
    }
    if (!/^\d{3,4}$/.test(cvv)) e.cvv = "CVV invalide.";
    if (!/^\d+(\.\d{1,2})?$/.test(amount) || parseFloat(amount) <= 0) e.amount = "Montant invalide.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (validateAll()) {
      const cardBrand = detectBrand(cardNumber);
      onSubmit({
        cardHolder: cardHolder.trim(),
        cardNumber: cardNumber.replace(/\s+/g, ""),
        expiry,
        cvv,
        amount: parseFloat(amount).toFixed(2),
        cardBrand,
      });
    } else {
      // focus sur le premier champ en erreur pour accessibilité
      const firstError = Object.keys(errors)[0];
      // On ne lance pas d'action asynchrone ici, juste UX
    }
  }

  function handleNumberChange(e) {
    // Permet la saisie et formatage en groupes de 4
    const raw = e.target.value.replace(/\D/g, "").slice(0, 19); // max 19 digits (Amex 15)
    const groups = raw.match(/.{1,4}/g);
    setCardNumber(groups ? groups.join(" ") : raw);
  }

  function handleExpiryChange(e) {
    let v = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
    setExpiry(v);
  }

  return (
    <form className="card-form" onSubmit={handleSubmit} noValidate>
      <label className="field">
        <span>Nom sur la carte</span>
        <input
          type="text"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          placeholder="Jean Dupont"
          aria-invalid={!!errors.cardHolder}
        />
        {errors.cardHolder && <small className="error">{errors.cardHolder}</small>}
      </label>

      <label className="field">
        <span>Numéro de carte</span>
        <input
          inputMode="numeric"
          value={cardNumber}
          onChange={handleNumberChange}
          placeholder="1234 5678 9012 3456"
          aria-invalid={!!errors.cardNumber}
          maxLength={23}
        />
        {cardNumber && <small className="hint">Marque probable: {detectBrand(cardNumber)}</small>}
        {errors.cardNumber && <small className="error">{errors.cardNumber}</small>}
      </label>

      <div className="row">
        <label className="field small">
          <span>Expiration (MM/AA)</span>
          <input
            inputMode="numeric"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="08/27"
            aria-invalid={!!errors.expiry}
            maxLength={5}
          />
          {errors.expiry && <small className="error">{errors.expiry}</small>}
        </label>

        <label className="field small">
          <span>CVV</span>
          <input
            inputMode="numeric"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="123"
            aria-invalid={!!errors.cvv}
            maxLength={4}
          />
          {errors.cvv && <small className="error">{errors.cvv}</small>}
        </label>
      </div>

      <label className="field">
        <span>Montant (€)</span>
        <input
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="49.90"
        />
        {errors.amount && <small className="error">{errors.amount}</small>}
      </label>

      <div className="actions">
        <button type="submit" className="pay-btn" disabled={submitting}>
          {submitting ? "Processing..." : "Payer maintenant"}
        </button>
      </div>

      <div className="security">
        <span>🔒 Paiement sécurisé — vos données ne sont pas envoyées ici. Intégrez votre backend / gateway.</span>
      </div>
    </form>
  );
}
