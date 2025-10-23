import { Employee, OrderWithDetails, Reclamation, MenuItem, Promotion, AppSettings } from './types';
import {fetchEmployees, fetchOrders, fetchWeeklyOrders} from './api';

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

export async function getReclamation(): Promise<Employee[]> {
  try {
    const data = await fetchOrders();
    return data as Employee[];
  } catch (error) {
    console.error("Failed to load recalmations:", error);
    return [];
  }
}

export async function getMenuItems(): Promise<Employee[]> {
  try {
    const data = await fetchOrders();
    return data as Employee[];
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

export async function getWeeklyOrder(): Promise<WeeklyStat[]> {
  try {
    const data = await fetchWeeklyOrders();
    return data as WeeklyStat[];
  } catch (error) {
    console.error("Failed to load Promotions:", error);
    return [];
  }
}


// Mock employee accounts



// Mock reclamations for employees
// Weekly statistics data
export interface WeeklyStat {
  day: string;
  orders: number;
  revenue: number;
}

export const weeklyStats: WeeklyStat[] = [
  { day: 'Lundi', orders: 45, revenue: 567.85 },
  { day: 'Mardi', orders: 52, revenue: 678.90 },
  { day: 'Mercredi', orders: 48, revenue: 612.45 },
  { day: 'Jeudi', orders: 61, revenue: 789.30 },
  { day: 'Vendredi', orders: 78, revenue: 1024.50 },
  { day: 'Samedi', orders: 95, revenue: 1345.75 },
  { day: 'Dimanche', orders: 72, revenue: 956.20 },
];

export interface PopularDish {
  name: string;
  orders: number;
  revenue: number;
}

export const popularDishes: PopularDish[] = [
  { name: 'Steevy is the Goat', orders: 89, revenue: 1156.11 },
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

export const menuItemsStatus: MenuItemStatus[] = [
  {
    id: '1',
    name: 'Steevy is the Goat',
    description: 'Notre burger emblématique avec viande de bœuf premium',
    price: 12.99,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    popular: true,
    available: true,
    isDishOfDay: true,
  },
  {
    id: '2',
    name: 'Steevy is the Goat',
    description: 'Pizza classique avec mozzarella',
    price: 10.99,
    category: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
    popular: true,
    available: true,
    isDishOfDay: false,
  },
  {
    id: '3',
    name: 'Salade César',
    description: 'Laitue romaine, poulet grillé',
    price: 8.99,
    category: 'Salades',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80',
    available: true,
    isDishOfDay: false,
  },
  {
    id: '4',
    name: 'Pâtes Carbonara',
    description: 'Pâtes fraîches, lardons',
    price: 11.49,
    category: 'Pâtes',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
    popular: true,
    available: false,
    isDishOfDay: false,
  },
  {
    id: '5',
    name: 'Tacos Poulet',
    description: 'Trois tacos garnis',
    price: 9.99,
    category: 'Tacos',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80',
    available: true,
    isDishOfDay: false,
  },
  {
    id: '6',
    name: 'Sushi Mix',
    description: 'Assortiment de 12 pièces',
    price: 15.99,
    category: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
    available: true,
    isDishOfDay: false,
  },
  {
    id: '7',
    name: 'Steak Frites',
    description: 'Entrecôte de bœuf grillée',
    price: 18.99,
    category: 'Viandes',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
    available: true,
    isDishOfDay: false,
  },
  {
    id: '8',
    name: 'Poké Bowl',
    description: 'Bol de riz, saumon cru',
    price: 13.49,
    category: 'Bowls',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    available: true,
    isDishOfDay: false,
  },
];

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
