import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Employee, OrderWithDetails, Reclamation, MenuItem, Promotion, AppSettings } from './types';
import { employees, mockOrders, mockReclamations, menuItemsStatus, MenuItemStatus, mockPromotions, appSettings } from './employeeData';

interface EmployeeContextType {
  employee: Employee | null;
  login: (email: string, password: string) => boolean;
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
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employeeId: string, updates: Partial<Employee>) => void;
  deleteEmployee: (employeeId: string) => void;
  promotions: Promotion[];
  addPromotion: (promotion: Promotion) => void;
  updatePromotion: (promotionId: string, updates: Partial<Promotion>) => void;
  deletePromotion: (promotionId: string) => void;
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [orders, setOrders] = useState<OrderWithDetails[]>(mockOrders);
  const [reclamations, setReclamations] = useState<Reclamation[]>(mockReclamations);
  const [menuItems, setMenuItems] = useState<MenuItemStatus[]>(menuItemsStatus);
  const [employeesList, setEmployeesList] = useState<Employee[]>(() => {
    // Charger depuis localStorage ou utiliser les données mock initiales
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      try {
        return JSON.parse(storedEmployees);
      } catch (error) {
        console.error('Failed to parse stored employees:', error);
        localStorage.removeItem('employees');
      }
    }
    return employees; // Fallback aux données mock
  });
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [settings, setSettings] = useState<AppSettings>(appSettings);

  // Load employee from localStorage on mount
  useEffect(() => {
    const storedEmployee = localStorage.getItem('employee');
    if (storedEmployee) {
      try {
        setEmployee(JSON.parse(storedEmployee));
      } catch (error) {
        console.error('Failed to parse stored employee:', error);
        localStorage.removeItem('employee');
      }
    }
  }, []);

  // Sauvegarder les employés dans localStorage quand ils changent
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employeesList));
  }, [employeesList]);

  const login = (email: string, password: string): boolean => {
    const foundEmployee = employeesList.find(
      (emp) => emp.email === email && emp.password === password
    );

    if (foundEmployee) {
      setEmployee(foundEmployee);
      localStorage.setItem('employee', JSON.stringify(foundEmployee));
      return true;
    }
    return false;
  };

  const logout = () => {
    setEmployee(null);
    localStorage.removeItem('employee');
  };

  const updateOrderStatus = (orderId: string, status: OrderWithDetails['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const updateReclamationStatus = (reclamationId: string, status: Reclamation['status']) => {
    setReclamations((prevReclamations) =>
      prevReclamations.map((rec) =>
        rec.id === reclamationId ? { ...rec, status } : rec
      )
    );
  };

  const toggleMenuItemAvailability = (itemId: string) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, available: !item.available } : item
      )
    );
  };

  const setDishOfDay = (itemId: string) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        isDishOfDay: item.id === itemId,
      }))
    );
  };

  const addMenuItem = (item: MenuItemStatus) => {
    setMenuItems((prevItems) => [...prevItems, item]);
  };

  const updateMenuItem = (itemId: string, updates: Partial<MenuItemStatus>) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, ...updates } : item
      )
    );
  };

  const deleteMenuItem = (itemId: string) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const addEmployee = (newEmployee: Employee) => {
    setEmployeesList((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const updateEmployee = (employeeId: string, updates: Partial<Employee>) => {
    setEmployeesList((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === employeeId ? { ...emp, ...updates } : emp
      )
    );
  };

  const deleteEmployee = (employeeId: string) => {
    setEmployeesList((prevEmployees) =>
      prevEmployees.filter((emp) => emp.id !== employeeId)
    );
  };

  const addPromotion = (promotion: Promotion) => {
    setPromotions((prevPromotions) => [...prevPromotions, promotion]);
  };

  const updatePromotion = (promotionId: string, updates: Partial<Promotion>) => {
    setPromotions((prevPromotions) =>
      prevPromotions.map((promo) =>
        promo.id === promotionId ? { ...promo, ...updates } : promo
      )
    );
  };

  const deletePromotion = (promotionId: string) => {
    setPromotions((prevPromotions) =>
      prevPromotions.filter((promo) => promo.id !== promotionId)
    );
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...updates }));
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
        addEmployee,
        updateEmployee,
        deleteEmployee,
        promotions,
        addPromotion,
        updatePromotion,
        deletePromotion,
        settings,
        updateSettings,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
}