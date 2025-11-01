import { loadStripe, Stripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from '../config/stripe';
import { apiService } from './api';

let stripePromise: Promise<Stripe | null>;

// Initialiser Stripe
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

// Rediriger vers la page de paiement Stripe
export const redirectToCheckout = async (
  montant: number,
  description: string
): Promise<void> => {
  try {
    // Créer une session de paiement via l'API backend
    const data = await apiService.createCheckoutSession(montant, description);
    
    // Rediriger vers la page de paiement Stripe
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('URL de paiement non reçue');
    }
  } catch (error) {
    console.error('Erreur lors de la redirection vers Stripe:', error);
    throw error;
  }
};
