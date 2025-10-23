import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, CartItem, MenuItem, Referral } from './types';
import { toast } from 'sonner';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  // Système de parrainage
  addReferral: (referralCode: string) => void;
  referrals: Referral[];
  getReferralStats: () => { count: number; earnedPoints: number };
  applyReferralCode: (code: string) => boolean;
  logout: () => void;
  // Nouveau: état de connexion
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  // Nouveau: création du code de parrainage
  createReferralCode: (newCode: string) => boolean;
  // Génération de code de parrainage
  generateReferralCode: () => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // État de connexion
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  });

  // Fonction pour migrer les anciens utilisateurs
  const migrateOldUsers = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const usersData = localStorage.getItem('users');
      if (!usersData) return;
      
      const users = JSON.parse(usersData);
      let needsUpdate = false;
      
      const migratedUsers = users.map((user: any) => {
        // Si l'utilisateur n'a pas de nom mais a un email, générer un nom
        if (!user.name && user.email) {
          needsUpdate = true;
          return {
            ...user,
            name: user.email.split('@')[0]
          };
        }
        return user;
      });
      
      if (needsUpdate) {
        localStorage.setItem('users', JSON.stringify(migratedUsers));
        console.log('🔧 Migration des utilisateurs terminée');
      }
    } catch (error) {
      console.error('Erreur lors de la migration des utilisateurs:', error);
    }
  };

  // Chargement depuis localStorage - AUCUN CODE GÉNÉRÉ AUTOMATIQUEMENT
  const [user, setUserState] = useState<User | null>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true') {
      const saved = localStorage.getItem('user');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            id: parsed.id || '',
            name: parsed.name || '',
            email: parsed.email || '',
            loyaltyPoints: parsed.loyaltyPoints || 0,
            gamesPlayed: parsed.gamesPlayed || 0,
            ordersCount: parsed.ordersCount || 0,
            rank: parsed.rank || 999,
            referralCode: parsed.referralCode || '', // VIDE PAR DÉFAUT
            referralCount: parsed.referralCount || 0,
            role: parsed.role || 'etudiant',
            referredBy: parsed.referredBy || null
          };
        } catch (e) {
          console.error('Erreur de parsing user localStorage:', e);
          localStorage.removeItem('user');
          localStorage.removeItem('isLoggedIn');
        }
      }
    }
    return null;
  });

  const [cart, setCartState] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [referrals, setReferralsState] = useState<Referral[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('referrals');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [users, setUsersState] = useState<User[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('users');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Migration des anciens utilisateurs au chargement
  useEffect(() => {
    migrateOldUsers();
  }, []);

  // Sauvegarde automatique dans localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUsersState(prev => {
        const existingIndex = prev.findIndex(u => u.id === user.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = user;
          return updated;
        } else {
          return [...prev, user];
        }
      });
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('referrals', JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    setIsLoggedIn(!!newUser);
  };

  const setCart = (newCart: CartItem[]) => {
    setCartState(newCart);
  };

  const setReferrals = (newReferrals: Referral[]) => {
    setReferralsState(newReferrals);
  };

  // Fonction pour générer un code de parrainage par défaut
  const generateReferralCode = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Fonction pour CRÉER le code de parrainage (uniquement dans l'interface)
  const createReferralCode = (newCode: string): boolean => {
    if (!user) {
      toast.error('Vous devez être connecté pour créer un code de parrainage');
      return false;
    }
    
    // Nettoyer et formater le code
    const cleanedCode = newCode.trim().toUpperCase();
    
    // Vérifier la longueur minimale
    if (cleanedCode.length < 4) {
      toast.error('Le code doit contenir au moins 4 caractères');
      return false;
    }
    
    // Vérifier si le code contient uniquement des caractères autorisés
    const validChars = /^[A-Z0-9]+$/;
    if (!validChars.test(cleanedCode)) {
      toast.error('Le code ne peut contenir que des lettres majuscules et des chiffres');
      return false;
    }
    
    // Vérifier si le code est déjà utilisé par un autre utilisateur
    const isCodeUsed = users.some(u => u.referralCode === cleanedCode && u.id !== user.id);
    
    if (isCodeUsed) {
      toast.error('Ce code est déjà utilisé par un autre utilisateur');
      return false;
    }
    
    // CRÉER ou MODIFIER le code de parrainage
    setUser(prev => prev ? {
      ...prev,
      referralCode: cleanedCode
    } : null);
    
    toast.success(`Code de parrainage "${cleanedCode}" créé avec succès !`);
    return true;
  };

  // Fonction de déconnexion
  const logout = () => {
    setUserState(null);
    setCartState([]);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('isLoggedIn');
  };

  // Fonction pour appliquer un code de parrainage à l'inscription
  const applyReferralCode = (code: string): boolean => {
    if (!user || !code) return false;
    
    // Vérifier si l'utilisateur a déjà utilisé un code de parrainage
    if (user.referredBy) {
      return false; // Déjà parrainé
    }
    
    const referrer = users.find(u => u.referralCode === code && u.id !== user.id);
    
    if (referrer) {
      // Mettre à jour l'utilisateur actuel
      setUser(prev => prev ? {
        ...prev,
        referredBy: code
      } : null);
      
      // Mettre à jour le parrain
      const updatedReferrer = {
        ...referrer,
        loyaltyPoints: referrer.loyaltyPoints + 100,
        referralCount: referrer.referralCount + 1
      };
      
      setUsersState(prev => prev.map(u => 
        u.id === referrer.id ? updatedReferrer : u
      ));
      
      // Créer la référence
      const newReferral: Referral = {
        id: Date.now().toString(),
        referrerId: referrer.id,
        referredUserId: user.id,
        referralCode: code,
        date: new Date(),
        rewardClaimed: true
      };
      
      setReferrals(prev => [...prev, newReferral]);
      return true;
    }
    
    return false;
  };

  const addReferral = (referralCode: string) => {
    if (!user) return;
    
    const newReferral: Referral = {
      id: Date.now().toString(),
      referrerId: user.id,
      referredUserId: `user_${Date.now()}`,
      referralCode,
      date: new Date(),
      rewardClaimed: true
    };
    
    setReferrals(prev => [...prev, newReferral]);
  };

  const getReferralStats = () => {
    if (!user) return { count: 0, earnedPoints: 0 };
    
    const userReferrals = referrals.filter(ref => ref.referrerId === user.id);
    return {
      count: userReferrals.length,
      earnedPoints: userReferrals.length * 100
    };
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.menuItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.menuItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.menuItem.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.menuItem.price * item.quantity,
    0
  );

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        addReferral,
        referrals,
        getReferralStats,
        applyReferralCode,
        logout,
        isLoggedIn,
        setIsLoggedIn,
        createReferralCode,
        generateReferralCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}