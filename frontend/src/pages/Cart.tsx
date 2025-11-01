import {useEffect, useState, useRef} from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Plus, Minus, Trash2, Send , CreditCard, Loader2} from 'lucide-react';
import { useApp } from '../lib/context';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { formatPriceFromEur } from '../lib/formatPrice';
import {Order} from '../lib/types';
import { redirectToCheckout } from '../services/stripeServices';
import { Recommendations } from '../components/Recommendations';


const API_URL = import.meta.env.VITE_API_URL;

interface CartProps {
  onNavigate: (page: string) => void;
}

export function Cart({ onNavigate }: CartProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, setUser, user ,orders,setOrders} = useApp();
  const [pendingUpdate, setPendingUpdate] = useState<{ points?: number } | null>(null);
  const isUpdatingRef = useRef(false);
    const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
  if (!pendingUpdate)  {
    // Show a message if user is not present
    toast.error('Impossible de mettre à jour les points : utilisateur non connecté.');
    console.warn('User not present, cannot sync points.');
    return;
  }

  if (!user) {
    // Show a message if user is not present
    toast.error('Impossible de mettre à jour les points : utilisateur non connecté.');
    console.warn('User not present, cannot sync points.');
    return;
  }
  if(pendingUpdate){
        console.warn('User present, cannot sync points.');
  }
  const syncBackend = async () => {
    try { 
      await fetch(`${API_URL}/profile/${user.id_utilisateur}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          points_fidelite: pendingUpdate.points,
        }),
      });
      // After successful sync, clear pending update
      setPendingUpdate(null);
      toast.success('Commande envoyée avec succès !');
      clearCart();
      onNavigate('user-home');
    } catch (err) {
      console.error('Failed to sync points', err);
      // Optionally: retry later or ignore
    }
  };

  syncBackend();
}, [pendingUpdate]);

  const handleCheckout2 = async () => {
    if (cart.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Créer la description de la commande
      const itemNames = cart.map(item => item.menuItem.nom).join(', ');
      const description = `Commande: ${itemNames.substring(0, 100)}${itemNames.length > 100 ? '...' : ''}`;
      
      // Rediriger vers Stripe Checkout
      await redirectToCheckout(cartTotal, description);
      
      // La redirection se fera automatiquement
      // Le panier sera vidé après le retour de Stripe
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      toast.error('Erreur lors de la création de la session de paiement. Veuillez réessayer.');
      setIsProcessing(false);
    }
  };

const handleCheckout = async () => {
  if (!user) {
    toast.error("Vous devez être connecté pour passer une commande.");
    return;
  }

  if (cart.length === 0) {
    toast.error("Votre panier est vide.");
    return;
  }

  // 🧮 Calculate totals and loyalty points
  const total = cart.reduce(
    (sum, item) => sum + item.menuItem.prix * item.quantity,
    0
  );
  const pointsGagnes = Math.floor(total / 10);
  const newPoints = (user.loyaltyPoints ?? 0) + pointsGagnes;

  // 🧱 Build payload matching backend structure
  const payload = {
    id_utilisateur: user.id_utilisateur,
    date_commande: new Date().toISOString(),
    montant_total: total,
    points_gagnes: pointsGagnes,
    type_service: "livraison",
    heure_arrivee: null,
    statut: "en_preparation",
    numero_commande: `CMD${Date.now()}`,
    items: cart.map((item) => ({
      menuItem: {
        id: item.menuItem.id_article ?? item.menuItem.id_article,
        name: item.menuItem.nom,
        description: item.menuItem.description,
        price: item.menuItem.prix,
        category: item.menuItem.category,
        image: item.menuItem.image,
        popular: item.menuItem.popular,
        available: item.menuItem.available,
        stock: item.menuItem.stock,
      },
      quantity: item.quantity,
      subtotal: item.menuItem.prix * item.quantity,
      comment: item.comment ?? null,
    })),
  };

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/commandes/keep`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Erreur lors de la création de la commande");

    const createdOrder = await res.json();

    // 🎉 Local updates (optimistic)
    const updatedUser = { ...user, loyaltyPoints: newPoints };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Optional async backend update for points
    setPendingUpdate({ points: newPoints });

    // 🧹 Reset cart
    clearCart();
    toast.success("Commande créée avec succès !");
  } catch (err) {
    console.error("❌ handleCheckout error:", err);
    toast.error("Impossible de créer la commande.");
  }
};

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="inline-flex p-6 rounded-2xl bg-primary/10 mb-6"
          >
            <ShoppingCart className="size-12 text-primary" />
          </motion.div>
          <h2 className="text-2xl mb-3 text-foreground">Panier Vide</h2>
          <p className="text-muted-foreground mb-8">
            Votre panier est actuellement vide. Ajoutez des plats pour continuer.
          </p>
          <Button
            onClick={() => onNavigate('user-menus')}
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Parcourir les menus
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl mb-2 text-foreground">
            Mon <span className="text-primary">Panier</span>
          </h1>
          <p className="text-muted-foreground">
            {cart.length} article{cart.length > 1 ? 's' : ''} dans votre panier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.menuItem.id_article}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 flex gap-4"
              >
                <div className="relative size-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.menuItem.image}
                    alt={item.menuItem.nom}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-foreground truncate">{item.menuItem.nom}</h3>
                    <button
                      onClick={() => removeFromCart(item.menuItem.id_article)}
                      className="p-2 rounded-full hover:bg-destructive/20 text-destructive transition-colors flex-shrink-0"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                    {item.menuItem.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => updateQuantity(item.menuItem.id_article, item.quantity - 1)}
                        size="sm"
                        variant="outline"
                        className="size-8 p-0 rounded-full"
                      >
                        <Minus className="size-4" />
                      </Button>
                      <span className="w-8 text-center text-foreground">{item.quantity}</span>
                      <Button
                        onClick={() => updateQuantity(item.menuItem.id_article, item.quantity + 1)}
                        size="sm"
                        variant="outline"
                        className="size-8 p-0 rounded-full"
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>

                    <span className="text-primary">
                      {formatPriceFromEur(item.menuItem.prix * item.quantity)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h3 className="mb-6 text-foreground">Récapitulatif</h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="text-foreground">{formatPriceFromEur(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="text-foreground">Gratuite</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Total</span>
                    <span className="text-2xl text-primary">{formatPriceFromEur(cartTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleCheckout}
                  className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Send className="size-5 mr-2" />
                  Valider la commande
                </Button>
                                <Button
                  onClick={handleCheckout2}
                  disabled={isProcessing}
                  className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="size-5 mr-2 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    <>
                      <CreditCard className="size-5 mr-2" />
                      Payer avec Stripe
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => onNavigate('user-menus')}
                  variant="outline"
                  className="w-full rounded-2xl border-border"
                >
                  Continuer mes achats
                </Button>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-primary/10">
                <p className="text-sm text-muted-foreground">
                  💰 Cette commande vous rapportera{' '}
                  <span className="text-primary">{Math.floor(cartTotal / 10)} points</span> de fidélité
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}