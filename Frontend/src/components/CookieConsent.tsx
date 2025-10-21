import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { Button } from './ui/button';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (cookiesAccepted === null) {
      // Afficher la pop-up après un court délai
      setTimeout(() => {
        setShowConsent(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowConsent(false);
  };

  const handleRefuse = () => {
    // Fermer la pop-up sans enregistrer quoi que ce soit
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <>
          {/* Overlay semi-transparent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={(e) => {
              e.stopPropagation();
              handleRefuse();
            }}
          />

          {/* Pop-up centrée */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-md pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700 relative">
              {/* Bouton de fermeture */}
              <button
                onClick={handleRefuse}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Fermer"
              >
                <X className="size-4 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Icône Cookie */}
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Cookie className="size-8 text-primary" />
                </div>
              </div>

              {/* Titre */}
              <h2 className="text-xl font-semibold text-center mb-3 text-gray-900 dark:text-white">
                Cookies & Confidentialité
              </h2>

              {/* Texte explicatif */}
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                Ce site utilise des cookies pour améliorer votre expérience de navigation, 
                personnaliser le contenu et analyser notre trafic.
              </p>

              {/* Boutons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  onClick={handleRefuse}
                  variant="outline"
                  className="flex-1 rounded-xl border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  Refuser
                </Button>
                <Button
                  type="button"
                  onClick={handleAccept}
                  className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium"
                >
                  Accepter
                </Button>
              </div>

              {/* Lien politique de confidentialité (optionnel) */}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                En acceptant, vous acceptez notre politique de cookies.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
