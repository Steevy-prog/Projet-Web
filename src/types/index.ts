export interface User {
  id: string;
  name: string;
  email: string;
  loyaltyPoints: number;
  gamesPlayed: number;
  ordersCount: number;
  rank: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  image: string;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  pointsReward: number;
  image: string;
}

export interface Reclamation {
  id: string;
  type: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status?: 'en attente' | 'en cours' | 'traitée';
  response?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'en attente' | 'en préparation' | 'validée' | 'livrée';
  date: string;
  time: string;
}

export interface WeeklyStat {
  day: string;
  sales: number;
  orders: number;
}

export type Page = 
  | 'home' 
  | 'menus' 
  | 'reclamations' 
  | 'login'
  | 'user-home'
  | 'user-menus'
  | 'user-dashboard'
  | 'user-games'
  | 'user-leaderboard'
  | 'user-loyalty'
  | 'user-cart'
  | 'user-reclamation'
  | 'employee-login'
  | 'employee-dashboard'
  | 'employee-orders'
  | 'employee-menu'
  | 'employee-reclamations'
  | 'employee-stats';
