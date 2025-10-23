import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Employee, OrderWithDetails, Reclamation, Promotion, AppSettings } from './types';
import {
  menuItemsStatus,
  MenuItemStatus,
  mockPromotions,
  appSettings,
  WeeklyStat,
} from './employeeData';

interface EmployeeContextType {
  employee: Employee | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  orders: OrderWithDetails[];
  updateOrderStatus: (orderId: string, status: OrderWithDetails['status']) => void;
  reclamations: Reclamation[];
  updateReclamationStatus: (reclamationId: string, status: Reclamation['status']) => void;
  menuItems: MenuItemStatus[];
  toggleMenuItemAvailability: (itemId: string) => void;
  setDishOfDay: (itemId: string) => void;
  addMenuItem: (item: MenuItemStatus) => void;
  updateMenuItem: (itemId: string, updates: Partial<MenuItemStatus>) => void;
  deleteMenuItem: (itemId: string) => void;
  employees: Employee[];
  fetchAllEmployees: () => Promise<void>;
  addEmployee: (employee: Employee) => Promise<void>;
  updateEmployee: (employeeId: number, updates: Partial<Employee>) => Promise<void>;
  deleteEmployee: (employeeId: number) => Promise<void>;
  promotions: Promotion[];
  addPromotion: (promotion: Promotion) => void;
  updatePromotion: (promotionId: string, updates: Partial<Promotion>) => void;
  deletePromotion: (promotionId: string) => void;
  settings: AppSettings;
  weeklystat: WeeklyStat[];
  updateSettings: (updates: Partial<AppSettings>) => void;
  setAllEmployees: (employees: Employee[]) => void;
  setAllOrders: (orders: OrderWithDetails[]) => void;
  setAllWeeklyOrders: (weeklyOrders: WeeklyStat[]) => void;
  setAllReclamations: (reclamation: Reclamation[]) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

const API_URL = 'http://localhost:8000/api';

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [weeklyorders,setWeeklyOrders] = useState<WeeklyStat[]>([]);
  const [reclamations, setReclamations] = useState<Reclamation[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemStatus[]>(menuItemsStatus);
  const [employeesList, setEmployeesList] = useState<Employee[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [settings, setSettings] = useState<AppSettings>(appSettings);



  // Load employee from localStorage on mount
useEffect(() => {
    const storedEmployee = localStorage.getItem('user');
    if (storedEmployee) setEmployee(JSON.parse(storedEmployee));
}, []);

  // --- LOGIN ---
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('employee', JSON.stringify(data.user));
      setEmployee(data.user);
      await fetchAllEmployees(); // load all employees after login
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  // --- LOGOUT ---
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
    setEmployee(null);
    setEmployeesList([]);
  };

  // --- EMPLOYEES API ---
  const fetchAllEmployees = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/employes`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch employees');
      const data = await res.json();
      setEmployeesList(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };


  const addEmployee = async (newEmployee: Employee) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/employes`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });
      if (!res.ok) throw new Error('Failed to add employee');
      const created = await res.json();
      setEmployeesList((prev) => [...prev, created]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateEmployee = async (employeeId: number, updates: Partial<Employee>) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/employes/${employeeId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update employee');
      const updated = await res.json();
      setEmployeesList((prev) =>
        prev.map((emp) => (emp.id_employe === employeeId ? updated : emp))
      );
    } catch (err) {
      console.error(err);
    }
  };

    const deleteEmployee = async (employeeId: number) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/employes/${employeeId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to delete employee');
      setEmployeesList((prev) => prev.filter((emp) => emp.id_employe !== employeeId));
    } catch (err) {
      console.error(err);
    }
  };
  const setAllEmployees = (employees: Employee[]) => {
  setEmployeesList(employees);
  };
  const setAllOrders = (orders: OrderWithDetails[]) => {
  setOrders(orders);
  };
  const setAllWeeklyOrders = (orders : WeeklyStat[]) =>{
  setWeeklyOrders(orders)
  }
  const setAllReclamations = (reclamation: Reclamation[]) => {
  setReclamations(reclamation);
  };

  // --- OTHER STATE UPDATES ---
  const updateOrderStatus = (orderId: string, status: OrderWithDetails['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };
  const updateReclamationStatus = (reclamationId: string, status: Reclamation['status']) => {
    setReclamations((prev) => prev.map((r) => (r.id === reclamationId ? { ...r, status } : r)));
  };
  const toggleMenuItemAvailability = (itemId: string) => {
    setMenuItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, available: !i.available } : i)));
  };
  const setDishOfDay = (itemId: string) => {
    setMenuItems((prev) => prev.map((i) => ({ ...i, isDishOfDay: i.id === itemId })));
  };
  const addMenuItem = (item: MenuItemStatus) => setMenuItems((prev) => [...prev, item]);
  const updateMenuItem = (itemId: string, updates: Partial<MenuItemStatus>) => {
    setMenuItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, ...updates } : i)));
  };
  const deleteMenuItem = (itemId: string) => setMenuItems((prev) => prev.filter((i) => i.id !== itemId));
  const addPromotion = (promotion: Promotion) => setPromotions((prev) => [...prev, promotion]);
  const updatePromotion = (promotionId: string, updates: Partial<Promotion>) => {
    setPromotions((prev) => prev.map((p) => (p.id === promotionId ? { ...p, ...updates } : p)));
  };
  const deletePromotion = (promotionId: string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== promotionId));
  };
  const updateSettings = (updates: Partial<AppSettings>) => setSettings((prev) => ({ ...prev, ...updates }));

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
        weeklystat : weeklyorders,
        updateSettings,
        setAllEmployees,
        setAllOrders,
        setAllWeeklyOrders,
        setAllReclamations,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error('useEmployee must be used within an EmployeeProvider');
  return context;
}