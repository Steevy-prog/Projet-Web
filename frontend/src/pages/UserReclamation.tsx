import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, MessageSquare } from 'lucide-react';
import { useApp } from '../lib/context';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL;

interface ReclamationPayload {
  id_utilisateur: number;
  id_commande: number;     // the order the user has an issue with
  type: string;            // type of the reclamation, e.g., "service", "food"
  message: string;         // the user's message
  status?: string;         // optional, default could be 'en_attente'
  date_creation?: string;  // optional, could be auto-generated on backend
}


export function UserReclamation() {
  const { user,orders } = useApp();

  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    type: '',
    message: '',
  });

  const [pendingReclamations, setPendingReclamation] = useState<{ message?: string; type?: string; id_commande?: number } | null>(null);

  // Fetch user's orders

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.type || !formData.message || !selectedOrder) {
    toast.error('Veuillez remplir tous les champs, y compris la commande concernée');
    return;
  }

  const payload: ReclamationPayload = {
    id_utilisateur: user?.id_utilisateur ?? 0,
    id_commande: selectedOrder,
    type: formData.type,
    message: formData.message,
    status: 'en_attente',
    date_creation: new Date().toISOString(),
  };

  try {
    const res = await fetch(`${API_URL}/reclamations/keep`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Erreur lors de la création de la réclamation');

    toast.success('Réclamation envoyée avec succès !');
    setFormData({ type: '', message: '' });
    setSelectedOrder(null);
  } catch (err) {
    console.error(err);
    toast.error('Impossible d’envoyer la réclamation.');
  }
};

  // Sync reclamation to backend
  useEffect(() => {
    if (!pendingReclamations || !user) return;

    const syncBackend = async () => {
      try {
        await fetch(`${API_URL}/profile/reclamations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(pendingReclamations),
        });
        setPendingReclamation(null);
      } catch (err) {
        console.error('Failed to sync reclamation', err);
      }
    };

    syncBackend();
  }, [pendingReclamations, user]);


  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
            <MessageSquare className="size-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl mb-4 text-foreground">
            Formulaire de <span className="text-primary">Réclamation</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Votre satisfaction est notre priorité. Faites-nous part de vos remarques ou suggestions.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl">{user?.nom.charAt(0) || 'U'}</span>
            </div>
            <div>
              <p className="text-foreground">{user?.nom}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Select order */}
            <div className="space-y-2">
              <Label htmlFor="order">Commande concernée</Label>
              <Select value={selectedOrder?.toString() || ''} onValueChange={(val:string) => setSelectedOrder(Number(val))}>
                <SelectTrigger className="rounded-2xl bg-input-background border-input">
                  <SelectValue placeholder="Sélectionnez une commande" />
                </SelectTrigger>
               <SelectContent>
                 {orders.map((order) => (
                   <SelectItem key={order.id} value={order.id.toString()}>
                     {`FCFA${order.total.toFixed(2)} - ${new Date(order.createdAt).toLocaleDateString()}`}
                   </SelectItem>
                 ))}
               </SelectContent>
              </Select>
            </div>

            {/* Type of reclamation */}
            <div className="space-y-2">
              <Label htmlFor="type">Type de réclamation</Label>
              <Select value={formData.type} onValueChange={(value: string) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="rounded-2xl bg-input-background border-input">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Qualité du service</SelectItem>
                  <SelectItem value="food">Qualité de la nourriture</SelectItem>
                  <SelectItem value="delivery">Problème de livraison</SelectItem>
                  <SelectItem value="billing">Facturation</SelectItem>
                  <SelectItem value="app">Application mobile</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Détails de la réclamation</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Décrivez votre réclamation en détail. Plus vous fournissez d'informations, mieux nous pourrons vous aider..."
                rows={8}
                className="rounded-2xl bg-input-background border-input resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Nous traitons toutes les réclamations dans les 24-48 heures.
              </p>
            </div>

            <Button type="submit" className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground">
              <Send className="size-5 mr-2" />
              Envoyer la réclamation
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}