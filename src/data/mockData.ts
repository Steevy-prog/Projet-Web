import { MenuItem, Reward, Game, User, Employee, Order, WeeklyStat, Reclamation } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  loyaltyPoints: 1250,
  gamesPlayed: 15,
  ordersCount: 23,
  rank: 3,
};

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Filet Mignon Rossini',
    description: 'Filet de bœuf, foie gras poêlé, sauce Périgueux, légumes de saison',
    price: 45,
    category: 'Plats Principaux',
    image: 'https://images.unsplash.com/photo-1676471912422-defa79bd178c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwc3RlYWt8ZW58MXx8fHwxNzYwMzY1NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    name: 'Homard à l\'Armoricaine',
    description: 'Homard breton, sauce armoricaine, riz pilaf aux aromates',
    price: 62,
    category: 'Plats Principaux',
    image: 'https://images.unsplash.com/photo-1695606452818-f22013a5c2de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcGxhdGUlMjBlbGVnYW50fGVufDF8fHx8MTc2MDM2NTczMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    name: 'Fondant au Chocolat',
    description: 'Chocolat Valrhona, cœur coulant, glace vanille bourbon',
    price: 14,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1586195831800-24f14c992cea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2hvY29sYXRlJTIwbHV4dXJ5fGVufDF8fHx8MTc2MDM2NTczMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    name: 'Ravioles de Foie Gras',
    description: 'Ravioles maison, émulsion de truffe, réduction au porto',
    price: 28,
    category: 'Entrées',
    image: 'https://images.unsplash.com/photo-1689997122000-c94449288dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwcmVzdGF1cmFudCUyMGRpc2h8ZW58MXx8fHwxNzYwMzA5NzU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    name: 'Turbot Sauce Hollandaise',
    description: 'Filet de turbot sauvage, asperges vertes, pommes grenaille',
    price: 48,
    category: 'Plats Principaux',
    image: 'https://images.unsplash.com/photo-1695606452818-f22013a5c2de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcGxhdGUlMjBlbGVnYW50fGVufDF8fHx8MTc2MDM2NTczMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    name: 'Tarte Tatin',
    description: 'Pommes caramélisées, pâte feuilletée, crème fraîche',
    price: 12,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1586195831800-24f14c992cea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2hvY29sYXRlJTIwbHV4dXJ5fGVufDF8fHx8MTc2MDM2NTczMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export const rewards: Reward[] = [
  {
    id: '1',
    name: 'Menu Dégustation',
    description: 'Menu 5 services du chef',
    pointsCost: 1000,
    image: 'https://images.unsplash.com/photo-1689997122000-c94449288dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwcmVzdGF1cmFudCUyMGRpc2h8ZW58MXx8fHwxNzYwMzA5NzU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    name: 'Bouteille de Vin Premium',
    description: 'Sélection du sommelier',
    pointsCost: 500,
    image: 'https://images.unsplash.com/photo-1676471912422-defa79bd178c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwc3RlYWt8ZW58MXx8fHwxNzYwMzY1NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    name: 'Dessert Offert',
    description: 'Dessert du jour offert',
    pointsCost: 200,
    image: 'https://images.unsplash.com/photo-1586195831800-24f14c992cea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2hvY29sYXRlJTIwbHV4dXJ5fGVufDF8fHx8MTc2MDM2NTczMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    name: 'Réduction 20%',
    description: 'Sur votre prochaine visite',
    pointsCost: 300,
    image: 'https://images.unsplash.com/photo-1695606452818-f22013a5c2de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcGxhdGUlMjBlbGVnYW50fGVufDF8fHx8MTc2MDM2NTczMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export const games: Game[] = [
  {
    id: '1',
    name: 'Roulette Gourmande',
    description: 'Tournez la roue et gagnez des points !',
    pointsReward: 50,
    image: 'https://images.unsplash.com/photo-1689997122000-c94449288dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwcmVzdGF1cmFudCUyMGRpc2h8ZW58MXx8fHwxNzYwMzA5NzU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    name: 'Quiz du Chef',
    description: 'Testez vos connaissances culinaires',
    pointsReward: 100,
    image: 'https://images.unsplash.com/photo-1676471912422-defa79bd178c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwc3RlYWt8ZW58MXx8fHwxNzYwMzY1NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    name: 'Memory Gourmand',
    description: 'Retrouvez les paires de plats',
    pointsReward: 75,
    image: 'https://images.unsplash.com/photo-1586195831800-24f14c992cea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2hvY29sYXRlJTIwbHV4dXJ5fGVufDF8fHx8MTc2MDM2NTczMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export const leaderboard = [
  { rank: 1, name: 'Marie Laurent', points: 2450, orders: 45 },
  { rank: 2, name: 'Pierre Martin', points: 2100, orders: 38 },
  { rank: 3, name: 'Jean Dupont', points: 1250, orders: 23 },
  { rank: 4, name: 'Sophie Bernard', points: 980, orders: 18 },
  { rank: 5, name: 'Luc Dubois', points: 750, orders: 15 },
];

// Employee Data
export const mockEmployee: Employee = {
  id: 'emp1',
  name: 'Sophie Martin',
  email: 'sophie.martin@restaurant.com',
  role: 'Serveur',
};

// Orders Data
export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'Marie Laurent',
    items: [
      { menuItem: menuItems[0], quantity: 2 },
      { menuItem: menuItems[3], quantity: 1 },
    ],
    total: 118,
    status: 'en attente',
    date: '2024-10-13',
    time: '12:30',
  },
  {
    id: 'ORD002',
    customerName: 'Pierre Martin',
    items: [
      { menuItem: menuItems[1], quantity: 1 },
      { menuItem: menuItems[2], quantity: 2 },
    ],
    total: 90,
    status: 'en préparation',
    date: '2024-10-13',
    time: '12:45',
  },
  {
    id: 'ORD003',
    customerName: 'Jean Dupont',
    items: [
      { menuItem: menuItems[4], quantity: 1 },
      { menuItem: menuItems[5], quantity: 1 },
    ],
    total: 60,
    status: 'en attente',
    date: '2024-10-13',
    time: '13:00',
  },
  {
    id: 'ORD004',
    customerName: 'Sophie Bernard',
    items: [
      { menuItem: menuItems[0], quantity: 1 },
      { menuItem: menuItems[2], quantity: 1 },
    ],
    total: 59,
    status: 'validée',
    date: '2024-10-13',
    time: '11:30',
  },
  {
    id: 'ORD005',
    customerName: 'Luc Dubois',
    items: [
      { menuItem: menuItems[1], quantity: 2 },
    ],
    total: 124,
    status: 'livrée',
    date: '2024-10-13',
    time: '11:00',
  },
];

// Weekly Stats Data
export const weeklyStats: WeeklyStat[] = [
  { day: 'Lundi', sales: 1250, orders: 18 },
  { day: 'Mardi', sales: 1580, orders: 22 },
  { day: 'Mercredi', sales: 1420, orders: 20 },
  { day: 'Jeudi', sales: 1890, orders: 26 },
  { day: 'Vendredi', sales: 2340, orders: 32 },
  { day: 'Samedi', sales: 2680, orders: 38 },
  { day: 'Dimanche', sales: 2120, orders: 28 },
];

// Reclamations Data
export const mockReclamations: Reclamation[] = [
  {
    id: 'REC001',
    type: 'Qualité',
    name: 'Marie Laurent',
    email: 'marie.laurent@example.com',
    message: 'Le plat était froid à l\'arrivée. Pourriez-vous améliorer le service de livraison ?',
    date: '2024-10-12',
    status: 'en attente',
  },
  {
    id: 'REC002',
    type: 'Service',
    name: 'Pierre Martin',
    email: 'pierre.martin@example.com',
    message: 'Temps d\'attente trop long, plus de 45 minutes pour recevoir ma commande.',
    date: '2024-10-11',
    status: 'en cours',
    response: 'Nous sommes désolés pour ce désagrément. Nous travaillons à améliorer nos délais.',
  },
  {
    id: 'REC003',
    type: 'Commande',
    name: 'Sophie Bernard',
    email: 'sophie.bernard@example.com',
    message: 'Article manquant dans ma commande (dessert non livré).',
    date: '2024-10-10',
    status: 'traitée',
    response: 'Nous vous avons remboursé le dessert et offert un bon de réduction de 20%.',
  },
  {
    id: 'REC004',
    type: 'Qualité',
    name: 'Luc Dubois',
    email: 'luc.dubois@example.com',
    message: 'Le homard n\'était pas aussi frais que d\'habitude. Déçu de la qualité.',
    date: '2024-10-09',
    status: 'en attente',
  },
];
