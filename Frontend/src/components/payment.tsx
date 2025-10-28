// PaymentPage.jsx
import React, { useState } from "react";
import { motion } from "motion/react";
import CardForm from "../pages/cardForm"; 
import "./payment.css";

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-2xl shadow-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold mb-6 text-foreground text-center">
          Finaliser le paiement
        </h2>

        {/* Formulaire de carte */}
        <CardForm />

        {/* Bouton Payer */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-card border border-border rounded-2xl p-4 w-full text-center hover:shadow-lg transition-all hover:scale-105"
        >
          Payer maintenant
        </motion.button>
      </motion.div>
    </div>
  );
}