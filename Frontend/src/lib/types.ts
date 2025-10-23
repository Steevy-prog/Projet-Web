export interface User {
  id: string;
  name: string;
  email: string;
  loyaltyPoints: number;
  gamesPlayed: number;
  ordersCount: number;
  rank: number;
  // Système de parrainage
  referralCode: string;
  referredBy?: string;
  referralCount: number;
  phone?: string;
  location?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  createdAt: Date;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  pointsReward: number;
  image: string;
  type: 'quiz' | 'spin' | 'scratch' | 'memory';
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  available: boolean;
}

export interface Reclamation {
  id: string;
  userId?: string;
  name: string;
  email: string;
  type: 'service' | 'food' | 'delivery' | 'other';
  message: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: Date;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  points: number;
  rank: number;
  gamesPlayed: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'gerant' | 'employe' | 'etudiant';
}

export interface OrderWithDetails extends Order {
  userName: string;
  userEmail: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  startDate: Date;
  endDate: Date;
  image: string;
  active: boolean;
  type: 'percentage' | 'fixed' | 'bogo';
}

export interface AppSettings {
  restaurantName: string;
  openingHours: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
  policies: {
    refundPolicy: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  referralCode: string;
  date: Date;
  rewardClaimed: boolean;
}

export interface ReferralStats {
  referralCount: number;
  earnedPoints: number;
  pendingRewards: number;
}
