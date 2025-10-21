import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageSquare } from 'lucide-react';
import { useApp } from '../lib/context';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner@2.0.3';

export function UserReclamation() {
  const { user } = useApp();
  const [formData, setFormData] = useState({
    type: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.message) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    toast.success('Votre réclamation a été envoyée avec succès. Nous vous contacterons bientôt.');
    setFormData({ type: '', message: '' });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4"
          >
            <MessageSquare className="size-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl mb-4 text-foreground">
            Formulaire de <span className="text-primary">Réclamation</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Votre satisfaction est notre priorité. Faites-nous part de vos remarques ou suggestions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl">{user?.name.charAt(0) || 'U'}</span>
            </div>
            <div>
              <p className="text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type">Type de réclamation</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
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

            <Button
              type="submit"
              className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="size-5 mr-2" />
              Envoyer la réclamation
            </Button>
          </form>
        </motion.div>

        {/* Recent Reclamations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          <h3 className="mb-6 text-foreground">Mes Réclamations Récentes</h3>
          <div className="space-y-4">
            {[
              { type: 'Livraison', status: 'Résolue', date: 'Il y a 2 semaines' },
              { type: 'Service', status: 'En cours', date: 'Il y a 3 jours' },
            ].map((reclamation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-secondary border border-border"
              >
                <div>
                  <p className="text-foreground mb-1">{reclamation.type}</p>
                  <p className="text-sm text-muted-foreground">{reclamation.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    reclamation.status === 'Résolue'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-primary/20 text-primary'
                  }`}
                >
                  {reclamation.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
