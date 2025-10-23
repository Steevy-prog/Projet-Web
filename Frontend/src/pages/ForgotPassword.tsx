import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, CheckCircle, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

interface ForgotPasswordProps {
  onNavigate: (page: string) => void;
  onClose?: () => void;
  onBackToLogin?: () => void;
}

export function ForgotPassword({ onNavigate, onClose, onBackToLogin }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Veuillez entrer votre adresse email');
      return;
    }

    setIsLoading(true);

    // Simulation d'envoi d'email
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En production, ici vous enverriez une requête à votre API
      setIsSubmitted(true);
      toast.success('Email de réinitialisation envoyé !');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin();
    } else if (onClose) {
      onClose();
    } else {
      onNavigate('login');
    }
  };

  if (isSubmitted) {
    return (
      <div className="relative bg-background rounded-2xl border border-border shadow-2xl">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 z-10 p-2 rounded-full bg-background border border-border shadow-lg hover:bg-accent transition-colors"
          >
            <X className="size-4" />
          </button>
        )}
        
        <div className="p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="inline-flex p-4 rounded-2xl bg-green-100 dark:bg-green-900/20 mb-4"
            >
              <CheckCircle className="size-8 text-green-600 dark:text-green-400" />
            </motion.div>
            <h1 className="text-3xl mb-2 text-foreground">Email envoyé !</h1>
            <p className="text-muted-foreground">
              Un lien de réinitialisation a été envoyé à <strong>{email}</strong>
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Vérifiez votre boîte de réception et suivez les instructions pour réinitialiser votre mot de passe.
            </p>
            
            <div className="space-y-2">
              <Button
                onClick={handleBackToLogin}
                className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <ArrowLeft className="size-5 mr-2" />
                Retour à la connexion
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="w-full rounded-2xl"
              >
                <Mail className="size-5 mr-2" />
                Renvoyer l'email
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-background rounded-2xl border border-border shadow-2xl">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 p-2 rounded-full bg-background border border-border shadow-lg hover:bg-accent transition-colors"
        >
          <X className="size-4" />
        </button>
      )}
      
      <div className="p-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4"
          >
            <Mail className="size-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl mb-2 text-foreground">Mot de passe oublié</h1>
          <p className="text-muted-foreground">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jean.dupont@example.com"
              className="rounded-2xl bg-input-background border-input"
              required
            />
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Mail className="size-5 mr-2" />
                  Envoyer le lien de réinitialisation
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleBackToLogin}
              className="w-full rounded-2xl"
            >
              <ArrowLeft className="size-5 mr-2" />
              Retour à la connexion
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}