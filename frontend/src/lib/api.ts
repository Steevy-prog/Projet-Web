import { OrderWithDetails } from "./types";

const API_URL = "http://localhost:8000/api"; // adjust to your Laravel endpoint

export async function fetchEmployees() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/employes`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Unauthorized or failed fetch');
  const data = await response.json();

  // Flatten user info if you want
  return data.map((emp: any) => ({
    ...emp,
    nom: emp.utilisateur.nom,
    prenom: emp.utilisateur.prenom,
    email: emp.utilisateur.email,
  }));
}

export async function fetchOrders(): Promise<OrderWithDetails[]> {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/commandes`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Unauthorized or failed fetch');
  const data = await response.json();

  // Transform backend data into Order[]
return data.map((cmd: any) => ({
  id: String(cmd.id),
  userId: String(cmd.userId),
  userEmail: cmd.userEmail,
  userName: cmd.userName,
  total: Number(cmd.total),
  status: cmd.status as 'en attente' | 'confirmee' | 'ready' | 'livree',
  createdAt: new Date(cmd.createdAt),
  typeService: cmd.typeService,
  arrivalTime: cmd.arrivalTime ? new Date(cmd.arrivalTime) : undefined,
  orderNumber: cmd.orderNumber,
  items: (cmd.items ?? []).map((line: any) => ({
    menuItem: {
      id: String(line.menuItem.id),
      name: line.menuItem.name,
      description: line.menuItem.description,
      price: Number(line.menuItem.price),
      category: line.menuItem.category,
      image: line.menuItem.image,
      popular: line.menuItem.popular,
      available: line.menuItem.available,
      stock: line.menuItem.stock,
    },
    quantity: line.quantity,
    subtotal: Number(line.subtotal),
    comment: line.comment,
  })),
}));
}

export async function fetchWeeklyOrders() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/commandes/hebdomadaire`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Unauthorized or failed fetch');
  const data = await response.json();
  return data;
}

export async function fetchPromotions() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/promotions`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Unauthorized or failed fetch');
  const data = await response.json();

  // Flatten user info if you want
  return data.map((emp: any) => ({
    ...emp,
    nom: emp.utilisateur.nom,
    prenom: emp.utilisateur.prenom,
    email: emp.utilisateur.email,
  }));
}

export async function fetchReclamations() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/reclamations`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Unauthorized or failed fetch');
  const data = await response.json();

  // Flatten user info if you want
  return data.map((emp: any) => ({
    ...emp,
    nom: emp.utilisateur.nom,
    prenom: emp.utilisateur.prenom,
    email: emp.utilisateur.email,
  }));
}

export async function fetchMenuItms() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/article`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Unauthorized or failed fetch');
  const data = await response.json();

  // Flatten user info if you want
  return data.map((emp: any) => ({
    ...emp,
    nom: emp.utilisateur.nom,
    prenom: emp.utilisateur.prenom,
    email: emp.utilisateur.email,
  }));
}

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/utilisateurs`, {
    credentials: "include", // important for Sanctum
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
}