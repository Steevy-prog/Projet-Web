const API_URL = "http://localhost:8000/api"; // adjust to your Laravel endpoint

export async function fetchEmployees() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8000/api/employes', {
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

export async function fetchOrders() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8000/api/commandes', {
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

export async function fetchPromotions() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8000/api/commandes', {
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
  const response = await fetch('http://localhost:8000/api/commandes', {
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
  const response = await fetch('http://localhost:8000/api/commandes', {
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