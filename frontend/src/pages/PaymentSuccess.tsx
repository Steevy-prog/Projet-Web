import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';

interface PaymentSuccessProps {
  onNavigate: (page: string) => void;
}

export function PaymentSuccess({ onNavigate }: PaymentSuccessProps) {
  useEffect(() => {
    // Récupérer le session_id depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const paymentStatus = urlParams.get('payment');
    
    if (sessionId && paymentStatus === 'success') {
      console.log('Paiement réussi ! Session Stripe:', sessionId);
      
      // Vider le panier après un paiement réussi
      // Note: Le panier est géré par le contexte, il sera vidé automatiquement
      // lors du rechargement ou vous pouvez appeler clearCart() si disponible
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          {/* Icône de succès */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
            className="inline-flex p-6 rounded-full bg-green-500/10 mb-6"
          >
            <CheckCircle className="size-16 text-green-500" />
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-3 text-foreground"
          >
            Paiement <span className="text-primary">réussi</span> !
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mb-8"
          >
            Merci pour votre commande ! Votre paiement a été traité avec succès. 
            Vous recevrez bientôt une confirmation par email.
          </motion.p>

          {/* Message de points de fidélité */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-2xl bg-primary/10 mb-8"
          >
            <p className="text-sm text-foreground">
              🎉 Des points de fidélité ont été ajoutés à votre compte !
            </p>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <Button
              onClick={() => onNavigate('user-home')}
              className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Home className="size-5 mr-2" />
              Retour à l'accueil
            </Button>
            <Button
              onClick={() => onNavigate('user-menus')}
              variant="outline"
              className="w-full rounded-2xl border-border"
            >
              <ShoppingBag className="size-5 mr-2" />
              Continuer mes achats
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
