import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LogIn, UserPlus, X, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useApp } from '../lib/context';
import { login as apiLogin, register as apiRegister } from '../lib/apis/AuthApi';
import { toast } from 'sonner';
import { SocialLoginButtons } from '../components/SocialLoginButtons';
import { AuthAPI } from '../lib/apis';

interface LoginProps {
  onNavigate: (page: string) => void;
  onClose: () => void;
  onForgotPassword: () => void;
}

export function Login({ onNavigate, onClose, onForgotPassword }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referralCodeInput, setReferralCodeInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { setUser } = useApp();

  const handleInputChange =
    (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

  const handleReferralCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferralCodeInput(e.target.value.toUpperCase());
  };

  const toggleSignUpMode = () => {
    setIsSignUp(prev => !prev);
    setReferralCodeInput('');
  };

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs requis');
      return false;
    }
    if (isSignUp && !formData.name) {
      toast.error('Veuillez entrer votre nom');
      return false;
    }
    return true;
  };

  // ✅ Handle Google Login callback
  useEffect(() => {
    const handleGoogleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        try {
          localStorage.setItem('token', token);
          const userData = await AuthAPI.me(token);

          // 🔒 Check if user is role 1 (customer)
          if (userData.id_role !== 1) {
            toast.error('Accès refusé. Seuls les clients peuvent se connecter ici.');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return;
          }

          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);

          window.history.replaceState({}, document.title, window.location.pathname);
          toast.success('Connexion via Google réussie !');

          if (window.opener) {
            window.close();
          } else {
            onNavigate('user-home');
          }
        } catch (error) {
          console.error('Erreur lors de la connexion Google:', error);
          toast.error("Échec de la connexion via Google");
        }
      }
    };

    handleGoogleLogin();
  }, [onNavigate, setUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);

    try {
      if (isSignUp) {
        // ---- REGISTER ----
        const payload = {
          nom: formData.name || formData.email.split('@')[0],
          prenom: 'User',
          email: formData.email,
          mot_de_passe: formData.password,
          mot_de_passe_confirmation: formData.password,
          telephone: '000000000',
        };

        await apiRegister(payload);
        toast.success('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        setIsSignUp(false);
      } else {
        // ---- LOGIN ----
        const payload = {
          email: formData.email,
          mot_de_passe: formData.password,
        };

        const res = await apiLogin(payload);

        if (res.access_token) {
          // 🔒 Check if user is role 1 (customer)
          if (res.user.id_role !== 1) {
            toast.error('Accès refusé. Utilisez la connexion employé pour vous connecter.');
            return;
          }

          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify(res.user));
          setUser(res.user);
          
          toast.success('Connexion réussie !');
          onNavigate('user-home');
          onClose();
        } else {
          toast.error('Token non reçu. Vérifiez la réponse du serveur.');
        }
      }
    } catch (err: any) {
      console.error('❌ Auth Error:', err);
      if (err.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat();
        messages.forEach((msg: any) => toast.error(msg));
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Erreur de connexion au serveur. Vérifiez l'API.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-background rounded-2xl border border-border shadow-2xl mx-4 my-8 max-w-sm w-full">
      <button
        onClick={onClose}
        className="absolute -top-3 -right-3 z-10 p-2 rounded-full bg-background border border-border shadow-lg hover:bg-accent transition-colors"
      >
        <X className="size-4" />
      </button>

      {isSignUp && (
        <button
          onClick={() => setIsSignUp(false)}
          className="absolute -top-3 -left-3 z-10 p-2 rounded-full bg-background border border-border shadow-lg hover:bg-accent transition-colors"
        >
          <ArrowLeft className="size-4" />
        </button>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="inline-flex p-3 rounded-2xl bg-primary/10 mb-3"
          >
            {isSignUp ? (
              <UserPlus className="size-6 text-primary" />
            ) : (
              <LogIn className="size-6 text-primary" />
            )}
          </motion.div>
          <h1 className="text-2xl mb-1 text-foreground font-semibold">
            {isSignUp ? 'Créer un compte' : 'Connexion'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isSignUp
              ? 'Rejoignez notre programme de fidélité'
              : 'Accédez à votre espace personnel'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                onChange={handleInputChange('name')}
                placeholder="Jean Dupont"
                className="rounded-xl"
                required
              />
            </motion.div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="jean.dupont@example.com"
              className="rounded-xl"
              required
            />
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange('password')}
              placeholder="••••••••"
              className="rounded-xl pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2 p-3 bg-secondary/30 rounded-lg border border-border"
            >
              <Label htmlFor="referral">Code de parrainage (optionnel)</Label>
              <Input
                id="referral"
                value={referralCodeInput}
                onChange={handleReferralCodeChange}
                placeholder="Entrez le code de parrainage"
                className="text-sm uppercase font-mono text-center rounded-xl h-9"
                maxLength={10}
              />
            </motion.div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Chargement...' : isSignUp ? 'Créer un compte' : 'Se connecter'}
          </Button>

          <SocialLoginButtons />

          <div className="text-center pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {isSignUp ? 'Déjà un compte ? ' : 'Pas encore de compte ? '}
              <button
                type="button"
                onClick={toggleSignUpMode}
                className="text-primary hover:text-primary/80 font-medium transition-colors text-xs"
              >
                {isSignUp ? 'Se connecter' : 'Créer un compte'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
