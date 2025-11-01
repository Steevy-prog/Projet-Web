import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Utilisateur, CartItem, MenuItem, Referral, Employee, EmployeeCustommer,Order,LeaderbordUtil } from './types';
import { toast } from 'sonner';
import { autoLogin } from './apis/AuthApi';
import { echo } from './echo';

const API_URL = import.meta.env.VITE_API_URL;

interface AppContextType {
  user: Utilisateur | null;
  users: LeaderbordUtil[] | null;
  setUser: (user: Utilisateur | null) => void;
  setCart: (cart: CartItem[]) => void;
  cart: CartItem[];
  items: MenuItem[];
  employees : EmployeeCustommer[];
  orders : Order[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  referrals: Referral[];
  getReferralStats: () => { count: number; earnedPoints: number };
  applyReferralCode: (code: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  createReferralCode: (newCode: string) => Promise<boolean>;
  generateReferralCode: () => string;
  setAllItems: (items: MenuItem[]) => void;
  fetchUserProfile: () => Promise<void>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  fetchItems: () => Promise<void>;
  fetchEmployees: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<Utilisateur | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cart, setCartState] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [items, setItems] = useState<MenuItem[]>([]);
  const [users, setUsers] = useState<LeaderbordUtil[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 FIXED: Single auto-login useEffect
  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        try {
          // ✅ Try to validate the stored user with auto-login
          const data = await autoLogin();
          
          if (data) {
            // ✅ Backend returned valid user data - use it
            const mappedUser = mapUserData(data);
            setUserState(mappedUser);
            setIsLoggedIn(true);
            localStorage.setItem('user', JSON.stringify(mappedUser));
          } else {
            // ❌ Token invalid - clear storage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUserState(null);
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Auto-login validation failed:', error);
          // ❌ Error during validation - clear storage
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setUserState(null);
          setIsLoggedIn(false);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
  const channel = echo.channel('leaderboard');

  channel.listen('.user.points.updated', (event: any) => {
    setUsers(prev =>
      prev.map(u => (u.id_utilisateur === event.user.id_utilisateur ? event.user : u))
    );
  });

  return () => {
    echo.leaveChannel('leaderboard');
  };
}, [setUsers]);

  // 🟢 Fetch user from API (via JWT token)
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Unauthorized');

      const data = await res.json();
      const mappedUser = mapUserData(data);
      setUserState(mappedUser);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(mappedUser));
    } catch (error) {
      console.error('❌ Fetch user failed:', error);
      setUserState(null);
      setIsLoggedIn(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  // 🟢 Fetch menu items from API
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch items');

      const data = await response.json();
      const parsed = data.map((article: any) => ({
        id_article: article.id_article,
        nom: article.nom,
        description: article.description,
        prix: Number(article.prix),
        category: article.category ?? '',
        image: article.image ?? undefined,
        popular: article.popular ?? false,
        available: article.available ?? false,
        stock: article.stock ?? 0,
      }));
      setItems(parsed);
    } catch (error) {
      console.error('❌ Failed to load articles:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/employes/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch employees');

      const data = await response.json();
      const parsed = data.map((employe: any) => ({
        id_employe: employe.id_employe,
        nom: employe.nom,
        prenom: employe.prenom,
        id_utilisateur: employe.id_utilisateur,
      }));
      setEmployees(parsed);
    } catch (error) {
      console.error('❌ Failed to load employees:', error);
    }
  };

const fetchMyOrders = async () => {
  if(!user){
    console.log('noiyo');
    return;
  }
  try {
    const res = await fetch(`${API_URL}/commandes/${user?.id_utilisateur ?? 0}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await res.json();

    setOrders(
      data.map((order: any) => ({
  id: Number(order.id),
  orderNumber: order.orderNumber,
  price: order.total,
  createdAt: order.createdAt,
  status: order.status,
  typeService: order.typeService,
  userName: order.userName,
  userEmail: order.userEmail,
  items: order.items || []          // new
      }))
    );
  } catch (err) {
    console.error('Failed to load orders', err);
  }
};
const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/utilisateurs/lead`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const data = await res.json();
    
    // Add rank in frontend
    const usersWithRank: LeaderbordUtil[] = data.map((user: any, index: number) => ({
      ...user,
      loyaltyPoints: user.points_fidelite,
      rank: index + 1
    }));
    
    setUsers(usersWithRank);
  } catch (err) {
    console.error('Failed to load users', err);
  }
};

  // 🟢 Save cart in localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // 🟢 Load data after auth is ready
  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      fetchItems();
      fetchEmployees();
      fetchMyOrders();
      fetchUsers();
    }
  }, [isLoggedIn, isLoading]);

  // 🔥 FIXED: Helper function to map backend data to frontend Utilisateur
  const mapUserData = (data: any): Utilisateur => {
    return {
      id_utilisateur: data.id_utilisateur,
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      mot_de_passe: data.mot_de_passe,
      telephone: data.telephone,
      localisation: data.localisation,
      id_role: data.id_role ?? 1,
      id_parrain: data.id_parrain,
      date_creation: data.date_creation,
      derniere_connexion: data.derniere_connexion,
      date_modification: data.date_modification,

      // ✅ Map backend fields to frontend ones
      loyaltyPoints: data.loyaltyPoints ?? data.points_fidelite ?? 0,
      gamesPlayed: data.gamesPlayed ?? data.jeux_joues ?? 0,
      ordersCount: data.ordersCount ?? data.commandes_effectuees ?? 0,
      rank: data.rank ?? data.classement ?? 999,

      referralCode: data.referralCode ?? data.code_parrainage ?? '',
      referredBy: data.referredBy ?? data.parrain ?? '',
      referralCount: data.referralCount ?? data.nombre_filleuls ?? 0,
    };
  };

  // 🔥 FIXED: setUser function
  const setUser = (data: any | null) => {
    if (!data) {
      setUserState(null);
      setIsLoggedIn(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return;
    }

    const mappedUser = mapUserData(data);
    setUserState(mappedUser);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(mappedUser));
  };

  const setCart = (cart: CartItem[]) => {
    setCartState(cart);
  };

  const setAllItems = (newItems: MenuItem[]) => setItems(newItems);

  const generateReferralCode = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 8 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  };

  // 🟢 Create referral code (API)
  const createReferralCode = async (newCode: string): Promise<boolean> => {
    if (!user) {
      toast.error('Vous devez être connecté pour créer un code');
      return false;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/referrals/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: newCode }),
      });

      if (!res.ok) throw new Error('Failed to create referral code');

      toast.success('Code créé avec succès');
      await fetchUserProfile(); // refresh user data
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la création du code');
      return false;
    }
  };

  // 🟢 Apply referral code (API)
  const applyReferralCode = async (code: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/referrals/apply`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) throw new Error('Invalid code');
      toast.success('Code appliqué avec succès');
      await fetchUserProfile();
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Échec de l\'application du code');
      return false;
    }
  };

  const getReferralStats = () => ({
    count: referrals.length,
    earnedPoints: referrals.length * 100,
  });

  const logout = () => {
    setUserState(null);
    setCartState([]);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('Déconnexion réussie');
  };

  // 🛒 CART LOGIC
  const addToCart = (item: MenuItem) => {
    setCartState((prev) => {
      const existing = prev.find((c) => c.menuItem.id_article === item.id_article);
      if (existing) {
        return prev.map((c) =>
          c.menuItem.id_article === item.id_article
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) =>
    setCartState((prev) => prev.filter((i) => i.menuItem.id_article !== itemId));

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(itemId);
    setCartState((prev) =>
      prev.map((i) =>
        i.menuItem.id_article === itemId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setCartState([]);

  const cartTotal = cart.reduce(
    (total, item) => total + item.menuItem.prix * item.quantity,
    0
  );

  return (
    <AppContext.Provider
      value={{
        user,
        users,
        setUser,
        setCart,
        cart,
        items,
        employees,
        orders,
        addToCart,
        setOrders,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        referrals,
        getReferralStats,
        applyReferralCode,
        logout,
        isLoggedIn,
        setIsLoggedIn,
        createReferralCode,
        generateReferralCode,
        setAllItems,
        fetchUserProfile,
        fetchItems,
        fetchEmployees,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}