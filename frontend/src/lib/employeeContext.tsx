import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Employee, OrderWithDetails, Reclamation, Promotion, AppSettings,Order } from './types';
import { MenuItemStatus, appSettings, WeeklyStat } from './employeeData';
import { toast } from 'sonner';

interface EmployeeContextType {
  employee: Employee | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  orders: OrderWithDetails[];
  updateOrderStatus: (orderId: string, status: OrderWithDetails['status']) => void;
  reclamations: Reclamation[];
  updateReclamationStatus: (reclamationId: string, status: Reclamation['status']) => void;
  menuItems: MenuItemStatus[];
  toggleMenuItemAvailability: (itemId: number) => void;
  setDishOfDay: (itemId: number) => void;
  addMenuItem: (item: MenuItemStatus) => void;
  updateMenuItem: (itemId: number, updates: Partial<MenuItemStatus>) => void;
  deleteMenuItem: (itemId: number) => void;
  employees: Employee[];
  fetchAllEmployees: () => Promise<void>;
  addEmployee: (employee: Employee) => Promise<void>;
  updateEmployee: (employeeId: number, updates: Partial<Employee>) => Promise<void>;
  deleteEmployee: (employeeId: number) => Promise<void>;
  promotions: Promotion[];
  weeklyOrders: WeeklyStat[];
  addPromotion: (promotion: Promotion) => void;
  updatePromotion: (promotionId: string, updates: Partial<Promotion>) => void;
  deletePromotion: (promotionId: string) => void;
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  fetchOrders: () => Promise<void>;
  fetchReclamations: () => Promise<void>;
  fetchMenuItems: () => Promise<void>;
  fetchWeeklyOrders: () => Promise<void>;
  fetchPromotions: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  users: any[];
  isLoggedIn: boolean;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);
type UtilisateurPayload = Omit<Employee, 'poste' | 'date_embauche' | 'salaire' | 'est_actif' | 'date_creation' | 'id_employe'>;
type EmployeePayload = Employee;

const API_URL = import.meta.env.VITE_API_URL;

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [weeklyOrders, setWeeklyOrders] = useState<WeeklyStat[]>([]);
  const [reclamations, setReclamations] = useState<Reclamation[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemStatus[]>([]);
  const [employeesList, setEmployeesList] = useState<Employee[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [settings, setSettings] = useState<AppSettings>(appSettings);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 Auto-login on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedEmployee = localStorage.getItem('employee');
      const token = localStorage.getItem('token');

      if (storedEmployee && token) {
        try {
          // Validate token by fetching employee profile
          const res = await fetch(`${API_URL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          });

          if (!res.ok) throw new Error('Unauthorized');
          
          const data = await res.json();
          
          if (data) {
            setEmployee(data);
            setIsLoggedIn(true);
            localStorage.setItem('employee', JSON.stringify(data));
          } else {
            localStorage.removeItem('employee');
            localStorage.removeItem('token');
            setEmployee(null);
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Auto-login validation failed:', error);
          localStorage.removeItem('employee');
          localStorage.removeItem('token');
          setEmployee(null);
          setIsLoggedIn(false);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  // 🔥 Fetch data based on employee role after successful login
  useEffect(() => {
    if (isLoggedIn && !isLoading && employee) {
      const role = employee.id_role;
      console.warn(employee.id_role);

      // Common routes for all roles (2, 3, 4)
      if (role === 2 || role === 3 || role === 4) {
        fetchReclamations();
        fetchOrders();
        fetchUsers();
      }

      // Role 2 (Gerant) specific routes
      if (role === 2) {
        fetchPromotions();
        fetchAllEmployees();
        fetchWeeklyOrders();
      }

      // Fetch articles (menu items) - available publicly but might need for management
      if (role === 2 || role === 3) {
        fetchMenuItems();
      }
    }
  }, [isLoggedIn, isLoading, employee]);

  // --- LOGIN ---
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          mot_de_passe: password 
        }),
      });

      if (!res.ok) throw new Error('Login failed');

      const data = await res.json();
      
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('employee', JSON.stringify(data.user));
      setEmployee(data.user);
      setIsLoggedIn(true);
      
      toast.success('Connexion réussie');
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Échec de la connexion');
      return false;
    }
  };

  // --- LOGOUT ---
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
    setEmployee(null);
    setIsLoggedIn(false);
    setEmployeesList([]);
    setOrders([]);
    setReclamations([]);
    setMenuItems([]);
    setWeeklyOrders([]);
    setPromotions([]);
    setUsers([]);
    toast.info('Déconnexion réussie');
  };

  // --- FETCH FUNCTIONS ---
  
  // Role 2 (Gerant) only
const fetchAllEmployees = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();

    // Normalize function to flatten and add defaults
    const normalizeUser = (item: any) => {
      const user = item.utilisateur ?? item; // nested utilisateur or direct user

      return {
        // employee fields with defaults (if no nested utilisateur, these will be undefined)
        id_employe: item.id_employe ?? -1,
        poste: item.poste ?? '',
        date_embauche: item.date_embauche ?? '',
        salaire:
          item.salaire !== undefined && item.salaire !== null
            ? Number(item.salaire)
            : -1,
        est_actif: item.est_actif ?? false,
        date_creation: item.date_creation ?? '',

        // flattened user fields with defaults
        id_utilisateur: user.id_utilisateur ?? -1,
        nom: user.nom ?? '',
        prenom: user.prenom ?? '',
        email: user.email ?? '',
        telephone: user.telephone ?? '',
        localisation: user.localisation ?? '',
        points_fidelite: user.points_fidelite ?? 0,
        code_parrainage: user.code_parrainage ?? '',
        id_parrain: user.id_parrain ?? null,
        id_role: user.id_role ?? -1,
        date_inscription: user.date_inscription ?? '',
        statut_compte: user.statut_compte ?? false,
        derniere_connexion: user.derniere_connexion ?? '',
        date_modification: user.date_modification ?? '',
        jeux_joues: user.jeux_joues ?? 0,
      };
    };

    // Map + filter out users with id_role === 1
    const filteredNormalizedUsers = data
      .map(normalizeUser)
      .filter((user:Employee) => user.id_role !== 1);

    setEmployeesList(filteredNormalizedUsers);
  } catch (error) {
    console.error("❌ Failed to load users:", error);
    toast.error("Erreur lors du chargement des utilisateurs");
  }
};

  // Role 2, 3, 4 (All management roles)
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/commandes`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch orders');

      const data = await res.json();
      const normalizeOrder = (order: any): Order => ({
  ...order,
  items: order.items.map((i: any) => ({
    ...i,
    menuItem: {
      id_article: i.menuItem.id,
      nom: i.menuItem.name,
      description: i.menuItem.description,
      prix: i.menuItem.price,
      categorie: i.menuItem.category,
      image: i.menuItem.image,
      popular: i.menuItem.popular,
      available: i.menuItem.available,
      stock: i.menuItem.stock
    }
  }))
});
    const normalizedData = Array.isArray(data)
      ? data.map(normalizeOrder)
      : [normalizeOrder(data)]; // just in case it's a single order

    setOrders(normalizedData);
    } catch (error) {
      console.error('❌ Failed to load orders:', error);
      toast.error('Erreur lors du chargement des commandes');
    }
  };

  // Role 2, 3, 4 (All management roles)
const fetchReclamations = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Missing auth token');

    const res = await fetch(`${API_URL}/reclamations`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to fetch reclamations: ${errText}`);
    }

    const rawData = await res.json();

    // ✅ Safely parse and normalize to match the Reclamation interface
    const parsedData: Reclamation[] = Array.isArray(rawData)
      ? rawData.map((r: any) => ({
          id: String(r.id ?? r.id_reclamation ?? ''),
          userId: r.user_id ?? r.utilisateur_id ?? undefined,
          name: r.name ?? r.nom ?? 'Inconnu',
          email: r.email ?? '',
          type: r.type ?? 'other',
          message: r.message ?? '',
          status: r.status ?? r.statut ?? 'en_attente',
          createdAt: r.createdAt ? new Date(r.createdAt) : new Date(r.created_at ?? Date.now()),
        }))
      : [];

    setReclamations(parsedData);
  } catch (error) {
    console.error('❌ Failed to load reclamations:', error);
    toast.error('Erreur lors du chargement des réclamations');
  }
};

// Role 2 (Gerant) only
const fetchPromotions = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8000/api/promotions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to fetch promotions: ${errText}`);
    }

    const rawData = await res.json();

    // ✅ Map backend fields (French/snake_case) → frontend interface (English/camelCase)
      const parsed = rawData.map((promotion: any) => ({
        id: promotion.id_promotion,
        title: promotion.titre,
        description: promotion.description,
        discount: Number(promotion.reduction),
        startDate: promotion.date_debut,
        endDate: promotion.date_fin ?? undefined,
        active: promotion.active ?? false,
      }));

    setPromotions(parsed);
    toast.success('Promotions chargées avec succès');
  } catch (error) {
    console.error('❌ Failed to load promotions:', error);
    toast.error('Erreur lors du chargement des promotions');
  }
};
  // Public route but needed for management
  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch menu items');

      const data = await res.json();
      setMenuItems(data);
    } catch (error) {
      console.error('❌ Failed to load menu items:', error);
      toast.error('Erreur lors du chargement du menu');
    }
  };

  // Role 2 (Gerant) only
  const fetchWeeklyOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/commandes/hebdomadaire`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch weekly statistics');

      const data = await res.json();
      setWeeklyOrders(data);
    } catch (error) {
      console.error('❌ Failed to load weekly statistics:', error);
    }
  };

  // Role 2 (Gerant) only

  // Role 2, 3, 4 (All management roles) - for messaging
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch users');

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('❌ Failed to load users:', error);
    }
  };

  // --- EMPLOYEES API (Role 2 only) ---
const addEmployee = async (newEmployee: Employee) => {
  try {
    const token = localStorage.getItem('token');

    // Prepare payload based on role
    let payload: Partial<Employee> | Partial<UtilisateurPayload>;

    if (newEmployee.id_role === 3) {
      // Employé - send full employee info
      payload = {
        nom: newEmployee.nom,
        prenom: newEmployee.prenom,
        email: newEmployee.email,
        mot_de_passe: newEmployee.mot_de_passe,
        id_role: newEmployee.id_role,
        poste: newEmployee.poste,
        date_embauche: newEmployee.date_embauche,
        salaire: newEmployee.salaire,
        est_actif: newEmployee.est_actif,
        date_creation: newEmployee.date_creation,
        // other employee-specific fields
      };
    } else if (newEmployee.id_role === 2 || newEmployee.id_role === 4) {
      // Gerant or Admin - send only Utilisateur fields
      payload = {
        nom: newEmployee.nom,
        prenom: newEmployee.prenom,
        email: newEmployee.email,
        mot_de_passe: newEmployee.mot_de_passe,
        id_role: newEmployee.id_role,
        // maybe other user fields like telephone, localisation if needed
      };
    } else {
      // fallback or throw error if role not supported
      throw new Error('Role non supporté');
    }

    const res = await fetch(`${API_URL}/employes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Failed to add employee');

    const data = await res.json();
    setEmployeesList((prev) => [...prev, data.data || data]);
    toast.success('Employé ajouté avec succès');
  } catch (error) {
    console.error('Error adding employee:', error);
    toast.error('Erreur lors de l\'ajout de l\'employé');
    throw error;
  }
};

const updateEmployee = async (employeeId: number, updates: Partial<Employee>) => {
  try {
    const token = localStorage.getItem('token');

    let payload: Partial<Employee> | Partial<UtilisateurPayload>;

    if (updates.id_role === 3) {
      // Employé - full update
      payload = updates;
    } else if (updates.id_role === 2 || updates.id_role === 4) {
      // Admin or Gerant - filter only user fields
      const { poste, date_embauche, salaire, est_actif, date_creation, id_employe, ...userFields } = updates;
      payload = userFields;
    } else {
      throw new Error('Role non supporté');
    }

    const res = await fetch(`${API_URL}/employes/${employeeId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Failed to update employee');

    const data = await res.json();
    setEmployeesList((prev) =>
      prev.map((emp) => (emp.id_employe === employeeId ? data.data || data : emp))
    );
    toast.success('Employé mis à jour avec succès');
  } catch (error) {
    console.error('Error updating employee:', error);
    toast.error('Erreur lors de la mise à jour de l\'employé');
    throw error;
  }
};

  const deleteEmployee = async (employeeId: number) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/employes/${employeeId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to delete employee');

      setEmployeesList((prev) => prev.filter((emp) => emp.id_employe !== employeeId));
      toast.success('Employé supprimé avec succès');
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error('Erreur lors de la suppression de l\'employé');
      throw error;
    }
  };

  // --- ORDER STATE UPDATES ---
  const updateOrderStatus = (orderId: string, status: OrderWithDetails['status']) => {
    setOrders((prev) => 
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // --- RECLAMATION STATE UPDATES ---
  const updateReclamationStatus = (reclamationId: string, status: Reclamation['status']) => {
    setReclamations((prev) => 
      prev.map((r) => (r.id === reclamationId ? { ...r, status } : r))
    );
  };

  // --- MENU ITEM STATE UPDATES ---
  const toggleMenuItemAvailability = (itemId: number) => {
    setMenuItems((prev) => 
      prev.map((i) => (i.id_article === itemId ? { ...i, available: !i.available } : i))
    );
  };

  const setDishOfDay = (itemId: number) => {
    setMenuItems((prev) => 
      prev.map((i) => ({ ...i, isDishOfDay: i.id_article === itemId }))
    );
  };

  const addMenuItem = (item: MenuItemStatus) => {
    setMenuItems((prev) => [...prev, item]);
  };

  const updateMenuItem = (itemId: number, updates: Partial<MenuItemStatus>) => {
    setMenuItems((prev) => 
      prev.map((i) => (i.id_article === itemId ? { ...i, ...updates } : i))
    );
  };

  const deleteMenuItem = (itemId: number) => {
    setMenuItems((prev) => prev.filter((i) => i.id_article !== itemId));
  };

  // --- PROMOTION STATE UPDATES (Role 2 only) ---
  const addPromotion = (promotion: Promotion) => {
    setPromotions((prev) => [...prev, promotion]);
  };

  const updatePromotion = (promotionId: string, updates: Partial<Promotion>) => {
    setPromotions((prev) => 
      prev.map((p) => (p.id === promotionId ? { ...p, ...updates } : p))
    );
  };

  const deletePromotion = (promotionId: string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== promotionId));
  };

  // --- SETTINGS STATE UPDATES ---
  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  return (
    <EmployeeContext.Provider
      value={{
        employee,
        login,
        logout,
        orders,
        updateOrderStatus,
        reclamations,
        updateReclamationStatus,
        menuItems,
        toggleMenuItemAvailability,
        setDishOfDay,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        employees: employeesList,
        fetchAllEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        promotions,
        addPromotion,
        updatePromotion,
        deletePromotion,
        settings,
        weeklyOrders,
        updateSettings,
        fetchOrders,
        fetchReclamations,
        fetchMenuItems,
        fetchWeeklyOrders,
        fetchPromotions,
        fetchUsers,
        users,
        isLoggedIn,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
}