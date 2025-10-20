import { useNavigate } from 'react-router-dom';

/**
 * Hook personnalisé pour la navigation dans l'application
 * Convertit les anciennes pages (format string) en routes URL
 */
export function useAppNavigate() {
  const navigate = useNavigate();

  const navigateToPage = (page: string) => {
    // Convertir le format ancien (ex: 'user-home') en route (ex: '/user-home')
    const route = page.startsWith('/') ? page : `/${page}`;
    navigate(route);
  };

  return navigateToPage;
}

/**
 * Mapping des anciennes pages vers les nouvelles routes
 */
export const pageToRoute: Record<string, string> = {
  'home': '/',
  'menus': '/menus',
  'reclamations': '/reclamations',
  'login': '/login',
  'forgot-password': '/forgot-password',
  'user-home': '/user-home',
  'dashboard': '/dashboard',
  'user-menus': '/user-menus',
  'user-messaging': '/user-messaging',
  'user-reclamation': '/user-reclamation',
  'referral': '/referral',
  'games': '/games',
  'leaderboard': '/leaderboard',
  'loyalty': '/loyalty',
  'cart': '/cart',
  'employee-login': '/employee-login',
  'employee-dashboard': '/employee-dashboard',
  'employee-orders': '/employee-orders',
  'employee-menu': '/employee-menu',
  'employee-messaging': '/employee-messaging',
  'employee-reclamations': '/employee-reclamations',
  'employee-stats': '/employee-stats',
  'gerant-dashboard': '/gerant-dashboard',
  'gerant-orders': '/gerant-orders',
  'gerant-employees': '/gerant-employees',
  'gerant-reclamations': '/gerant-reclamations',
  'gerant-stats': '/gerant-stats',
  'admin-dashboard': '/admin-dashboard',
  'admin-menu': '/admin-menu',
  'admin-employees': '/admin-employees',
  'admin-promotions': '/admin-promotions',
  'admin-stats': '/admin-stats',
  'admin-reclamations': '/admin-reclamations',
  'admin-settings': '/admin-settings',
};
