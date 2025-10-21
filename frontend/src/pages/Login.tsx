import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, UserPlus, X, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useApp } from '../lib/context';
import { toast } from 'sonner';

interface LoginProps {
  onNavigate: (page: string) => void;
  onClose: () => void;
  onForgotPassword: () => void;
}

export function Login({ onNavigate, onClose, onForgotPassword }: LoginProps) {
  // États
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [referralCodeInput, setReferralCodeInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Context
  const { setUser, applyReferralCode } = useApp();

  // Handlers
  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Handler vide pour les boutons sociaux
  const handleSocialButtonClick = () => {
    // Aucune action - fonction vide
  };

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

  // Fonction pour trouver un utilisateur existant
  const findExistingUser = () => {
    if (typeof window === 'undefined') return null;
    
    try {
      const usersData = localStorage.getItem('users');
      if (!usersData) return null;
      
      const users = JSON.parse(usersData);
      const existingUser = users.find((user: any) => user.email === formData.email);
      
      console.log('🔍 Utilisateur trouvé:', existingUser);
      return existingUser;
    } catch (error) {
      console.error('Erreur lors de la recherche utilisateur:', error);
      return null;
    }
  };

  // Fonction pour créer ou récupérer un utilisateur
  const getOrCreateUser = () => {
    // En mode connexion, chercher l'utilisateur existant
    if (!isSignUp) {
      const existingUser = findExistingUser();
      if (existingUser) {
        // S'assurer que l'utilisateur existant a un nom
        if (!existingUser.name && formData.email) {
          existingUser.name = formData.email.split('@')[0];
        }
        return existingUser;
      }
    }
    
    // En mode inscription, créer un nouvel utilisateur
    const userName = formData.name || formData.email.split('@')[0];
    
    return {
      id: Date.now().toString(),
      name: userName,
      email: formData.email,
      loyaltyPoints: Math.floor(Math.random() * 1000) + 500,
      gamesPlayed: Math.floor(Math.random() * 20) + 5,
      ordersCount: Math.floor(Math.random() * 15) + 3,
      rank: Math.floor(Math.random() * 100) + 1,
      referralCode: '', // CODE VIDE - pas de génération automatique
      referralCount: 0,
      role: 'etudiant',
      referredBy: null
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Vérifier si c'est une connexion et si l'utilisateur existe
      if (!isSignUp) {
        const existingUser = findExistingUser();
        if (!existingUser) {
          toast.error('Aucun compte trouvé avec cet email');
          setIsLoading(false);
          return;
        }
      }

      const user = getOrCreateUser();
      console.log('🔍 Login - User créé:', user);
      setUser(user);
      
      // Appliquer le code de parrainage si fourni à l'inscription
      if (isSignUp && referralCodeInput.trim()) {
        const referralApplied = applyReferralCode(referralCodeInput.trim().toUpperCase());
        if (referralApplied) {
          toast.success(`Code de parrainage appliqué ! +100 points`);
        } else {
          toast.error('Code de parrainage invalide ou déjà utilisé');
        }
      }
      
      toast.success(isSignUp ? 'Compte créé avec succès !' : 'Connexion réussie !');
      onNavigate('user-home');
      onClose();

    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background/50">
      <div className="relative bg-background rounded-2xl border border-border shadow-2xl w-full max-w-md">
        {/* Bouton de fermeture */}
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
                : 'Accédez à votre espace personnel'
              }
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ Nom (seulement pour l'inscription) */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Nom complet
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail className="size-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    placeholder="Jean Dupont"
                    className="pl-10 pr-4 py-2 h-9 rounded-xl bg-background border-border focus:border-primary w-full text-sm"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Champ Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="size-4 text-muted-foreground pointer-events-none" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="jean.dupont@example.com"
                  className="pl-10 pr-4 py-2 h-9 rounded-xl bg-background border-border focus:border-primary w-full text-sm"
                  required
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Mot de passe
                </Label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-xs text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
                  >
                    Mot de passe oublié ?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="size-4 text-muted-foreground pointer-events-none" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  placeholder="••••••••"
                  className="pl-10 pr-10 py-2 h-9 rounded-xl bg-background border-border focus:border-primary w-full text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Section Code de parrainage */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2 p-3 bg-secondary/30 rounded-lg border border-border"
              >
                <Label htmlFor="referral" className="text-sm font-medium text-foreground">
                  Code de parrainage (optionnel)
                </Label>
                
                <div className="space-y-2">
                  <Input
                    id="referral"
                    value={referralCodeInput}
                    onChange={handleReferralCodeChange}
                    placeholder="Entrez le code de parrainage"
                    className="text-sm uppercase font-mono text-center rounded-xl h-9"
                    maxLength={10}
                  />
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Utilisez le code de parrainage d'un ami pour obtenir 100 points bonus
                  </p>
                </div>
              </motion.div>
            )}

            {/* Bouton de soumission */}
            <div className="pt-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 text-sm font-medium transition-all duration-200 h-11 min-h-11"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    {isSignUp ? 'Création...' : 'Connexion...'}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 px-2">
                    {isSignUp ? (
                      <>
                        <UserPlus className="size-4" />
                        <span className="text-sm">Créer mon compte</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="size-4" />
                        <span className="text-sm">Se connecter</span>
                      </>
                    )}
                  </div>
                )}
              </Button>
            </div>

            {/* Séparateur pour l'authentification sociale */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continuer avec
                </span>
              </div>
            </div>

            {/* Boutons d'authentification sociale - CLIQUABLES MAIS SANS ACTION */}
            <div className="grid grid-cols-2 gap-3">
              {/* Google */}
              <Button
                type="button"
                variant="outline"
                onClick={handleSocialButtonClick}
                className="rounded-xl h-9 text-xs font-medium hover:bg-accent transition-colors"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>

              {/* Facebook */}
              <Button
                type="button"
                variant="outline"
                onClick={handleSocialButtonClick}
                className="rounded-xl h-9 text-xs font-medium hover:bg-accent transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>

            {/* Switch entre connexion/inscription */}
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
    </div>
  );
}
