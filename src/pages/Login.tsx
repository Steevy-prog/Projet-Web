import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useApp } from '../lib/context';
import { toast } from 'sonner@2.0.3';

interface LoginProps {
  onNavigate: (page: string) => void;
}

export function Login({ onNavigate }: LoginProps) {
  const { setUser } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    if (isSignUp && !formData.name) {
      toast.error('Veuillez entrer votre nom');
      return;
    }

    // Mock user login
    const mockUser = {
      id: '1',
      name: formData.name || 'Utilisateur',
      email: formData.email,
      loyaltyPoints: 450,
      gamesPlayed: 12,
      ordersCount: 8,
      rank: 15,
    };

    setUser(mockUser);
    toast.success(`Bienvenue ${mockUser.name} !`);
    onNavigate('user-home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4"
          >
            {isSignUp ? (
              <UserPlus className="size-8 text-primary" />
            ) : (
              <LogIn className="size-8 text-primary" />
            )}
          </motion.div>
          <h1 className="text-3xl mb-2 text-foreground">
            {isSignUp ? 'Créer un compte' : 'Connexion'}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp
              ? 'Rejoignez notre programme de fidélité'
              : 'Accédez à votre espace personnel'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jean Dupont"
                className="rounded-2xl bg-input-background border-input"
              />
            </motion.div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="jean.dupont@example.com"
              className="rounded-2xl bg-input-background border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="rounded-2xl bg-input-background border-input"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSignUp ? (
              <>
                <UserPlus className="size-5 mr-2" />
                S'inscrire
              </>
            ) : (
              <>
                <LogIn className="size-5 mr-2" />
                Se connecter
              </>
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp
                ? 'Déjà un compte ? Se connecter'
                : 'Pas de compte ? S\'inscrire'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
