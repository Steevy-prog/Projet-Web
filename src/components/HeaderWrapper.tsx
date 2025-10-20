import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { EmployeeHeader } from './EmployeeHeader';
import { GerantHeader } from './GerantHeader';
import { AdminHeader } from './AdminHeader';

// Mapping des routes vers les pages (format ancien)
const routeToPage: Record<string, string> = {
  '/': 'home',
  '/menus': 'menus',
  '/reclamations': 'reclamations',
  '/login': 'login',
  '/forgot-password': 'forgot-password',
  '/user-home': 'user-home',
  '/dashboard': 'dashboard',
  '/user-menus': 'user-menus',
  '/user-messaging': 'user-messaging',
  '/user-reclamation': 'user-reclamation',
  '/referral': 'referral',
  '/games': 'games',
  '/leaderboard': 'leaderboard',
  '/loyalty': 'loyalty',
  '/cart': 'cart',
  '/employee-login': 'employee-login',
  '/employee-dashboard': 'employee-dashboard',
  '/employee-orders': 'employee-orders',
  '/employee-menu': 'employee-menu',
  '/employee-messaging': 'employee-messaging',
  '/employee-reclamations': 'employee-reclamations',
  '/employee-stats': 'employee-stats',
  '/gerant-dashboard': 'gerant-dashboard',
  '/gerant-orders': 'gerant-orders',
  '/gerant-employees': 'gerant-employees',
  '/gerant-reclamations': 'gerant-reclamations',
  '/gerant-stats': 'gerant-stats',
  '/admin-dashboard': 'admin-dashboard',
  '/admin-menu': 'admin-menu',
  '/admin-employees': 'admin-employees',
  '/admin-promotions': 'admin-promotions',
  '/admin-stats': 'admin-stats',
  '/admin-reclamations': 'admin-reclamations',
  '/admin-settings': 'admin-settings',
};

export function HeaderWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Convertir la route en page (format ancien)
  const currentPage = routeToPage[pathname] || 'home';

  // Fonction de navigation compatible avec l'ancien système
  const handleNavigate = (page: string) => {
    const route = page.startsWith('/') ? page : `/${page}`;
    navigate(route);
  };

  const isEmployeePage = pathname.startsWith('/employee');
  const isGerantPage = pathname.startsWith('/gerant');
  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) {
    return <AdminHeader currentPage={currentPage as any} onNavigate={handleNavigate as any} />;
  } else if (isGerantPage) {
    return <GerantHeader currentPage={currentPage as any} onNavigate={handleNavigate as any} />;
  } else if (isEmployeePage) {
    return <EmployeeHeader currentPage={currentPage as any} onNavigate={handleNavigate as any} />;
  } else {
    return <Header currentPage={currentPage as any} onNavigate={handleNavigate as any} />;
  }
}
