import { API_BASE_URL } from '../config/stripe';

// Service API pour les appels au backend Laravel
class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Créer une session de paiement Stripe
  async createCheckoutSession(montant: number, description: string) {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${this.baseURL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          montant,
          description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création de la session de paiement');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur API createCheckoutSession:', error);
      throw error;
    }
  }



  // Récupérer les recommandations IA
  async getRecommendations() {
    try {
      const response = await fetch(`${this.baseURL}/recommendations`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des recommandations');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur API getRecommendations:', error);
      throw error;
    }
  }

  // Créer une commande
  async createOrder(orderData: any) {
    try {
      const response = await fetch(`${this.baseURL}/commandes`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la commande');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur API createOrder:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
