export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'worker';
  points?: number;
  avatar?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isSpecialty?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: Date;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  price: number;
}

export interface Complaint {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: Date;
}

export interface GameScore {
  id: string;
  userId: string;
  game: string;
  score: number;
  points: number;
  createdAt: Date;
}
