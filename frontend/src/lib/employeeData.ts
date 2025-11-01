import { Employee, OrderWithDetails, Reclamation, MenuItem, Promotion, AppSettings, Order } from './types';
import {fetchArticles, fetchEmployees, fetchOrders, fetchWeekly} from './api';

export async function getEmployees(): Promise<Employee[]> {
  try {
    const data = await fetchEmployees();
    return data as Employee[];
  } catch (error) {
    console.error("Failed to load employees:", error);
    return [];
  }
}

export async function getOrders(): Promise<OrderWithDetails[]> {
  try {
    const data = await fetchOrders();
    return data as OrderWithDetails[];
  } catch (error) {
    console.error("Failed to load Orders:", error);
    return [];
  }
}
export async function getWeeklyOrders(): Promise<WeeklyStat[]> {
  try {
    const data = await fetchWeekly();
    return data as WeeklyStat[];
  } catch (error) {
    console.error("Failed to load Weekly Orders:", error);
    return [];
  }
}

export async function getReclamation(): Promise<Employee[]> {
  try {
    const data = await fetchOrders();
    return data as Employee[];
  } catch (error) {
    console.error("Failed to load recalmations:", error);
    return [];
  }
}
export async function getArticles(): Promise<MenuItem[]> {
  try {
    const data = await fetchArticles();
    return data as MenuItem[];
  } catch (error) {
    console.error("Failed to load articles:", error);
    return [];
  }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const data = await fetchArticles();
    return data as MenuItem[];
  } catch (error) {
    console.error("Failed to load Menu Items:", error);
    return [];
  }
}

export async function getPromotions(): Promise<Employee[]> {
  try {
    const data = await fetchOrders();
    return data as Employee[];
  } catch (error) {
    console.error("Failed to load Promotions:", error);
    return [];
  }
}


// Mock employee accounts


// Mock orders with details

// Weekly statistics data
export interface WeeklyStat {
  day: string;
  orders: number;
  revenue: number;
}



export interface PopularDish {
  name: string;
  orders: number;
  revenue: number;
}

export const popularDishes: PopularDish[] = [
  { name: 'Burger Signature', orders: 89, revenue: 1156.11 },
  { name: 'Pizza Margherita', orders: 76, revenue: 835.24 },
  { name: 'Pâtes Carbonara', orders: 64, revenue: 735.36 },
  { name: 'Steak Frites', orders: 52, revenue: 987.48 },
  { name: 'Sushi Mix', orders: 48, revenue: 767.52 },
];

// Menu availability status
export interface MenuItemStatus extends MenuItem {
  available: boolean;
  isDishOfDay: boolean;
}


// Mock promotions
export const mockPromotions: Promotion[] = [
  {
    id: 'promo1',
    title: 'Happy Hour',
    description: '20% de réduction sur tous les plats entre 17h et 19h',
    discount: 20,
    startDate: new Date('2024-10-01'),
    endDate: new Date('2024-12-31'),
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    active: true,
    type: 'percentage',
  },
  {
    id: 'promo2',
    title: 'Menu Étudiant',
    description: '5€ de réduction sur le menu complet pour les étudiants',
    discount: 5,
    startDate: new Date('2024-09-01'),
    endDate: new Date('2025-06-30'),
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    active: true,
    type: 'fixed',
  },
  {
    id: 'promo3',
    title: 'Achetez-en 1, Obtenez-en 1',
    description: 'Burger gratuit pour tout achat d\'un burger',
    discount: 100,
    startDate: new Date('2024-10-10'),
    endDate: new Date('2024-10-20'),
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    active: false,
    type: 'bogo',
  },
];

// Application settings
export const appSettings: AppSettings = {
  restaurantName: 'Restaurant Élégance',
  openingHours: {
    lundi: { open: '11:00', close: '22:00', closed: false },
    mardi: { open: '11:00', close: '22:00', closed: false },
    mercredi: { open: '11:00', close: '22:00', closed: false },
    jeudi: { open: '11:00', close: '22:00', closed: false },
    vendredi: { open: '11:00', close: '23:00', closed: false },
    samedi: { open: '10:00', close: '23:00', closed: false },
    dimanche: { open: '10:00', close: '21:00', closed: false },
  },
  policies: {
    refundPolicy: 'Remboursement complet dans les 24h si le produit n\'est pas conforme.',
    privacyPolicy: 'Vos données personnelles sont protégées et ne seront jamais partagées.',
    termsOfService: 'En utilisant notre service, vous acceptez nos conditions générales.',
  },
  contactInfo: {
    email: 'contact@restaurant-elegance.fr',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Gastronomie, 75001 Paris',
  },
};
