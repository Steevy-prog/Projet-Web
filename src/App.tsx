import { useState } from 'react';
import { Layout } from './components/Layout';
import { Page } from './types';

// Public Pages
import { Home } from './pages/Home';
import { Menus } from './pages/Menus';
import { Reclamations } from './pages/Reclamations';
import { Login } from './pages/Login';

// User Pages
import { UserHome } from './pages/user/UserHome';
import { UserMenus } from './pages/user/UserMenus';
import { Dashboard } from './pages/user/Dashboard';
import { Games } from './pages/user/Games';
import { Leaderboard } from './pages/user/Leaderboard';
import { Loyalty } from './pages/user/Loyalty';
import { Cart } from './pages/user/Cart';
import { UserReclamation } from './pages/user/UserReclamation';

// Employee Pages
import { EmployeeLogin } from './pages/employee/EmployeeLogin';
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { EmployeeOrders } from './pages/employee/EmployeeOrders';
import { EmployeeMenu } from './pages/employee/EmployeeMenu';
import { EmployeeReclamations } from './pages/employee/EmployeeReclamations';
import { EmployeeStats } from './pages/employee/EmployeeStats';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEmployeeAuthenticated, setIsEmployeeAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('user-home');
  };

  const handleEmployeeLogin = () => {
    setIsEmployeeAuthenticated(true);
    setCurrentPage('employee-dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsEmployeeAuthenticated(false);
    setCurrentPage('home');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    // Employee pages
    if (isEmployeeAuthenticated) {
      switch (currentPage) {
        case 'employee-dashboard':
          return <EmployeeDashboard />;
        case 'employee-orders':
          return <EmployeeOrders />;
        case 'employee-menu':
          return <EmployeeMenu />;
        case 'employee-reclamations':
          return <EmployeeReclamations />;
        case 'employee-stats':
          return <EmployeeStats />;
        default:
          return <EmployeeDashboard />;
      }
    }

    // User pages
    if (isAuthenticated) {
      switch (currentPage) {
        case 'user-home':
          return <UserHome />;
        case 'user-menus':
          return <UserMenus />;
        case 'user-dashboard':
          return <Dashboard />;
        case 'user-games':
          return <Games />;
        case 'user-leaderboard':
          return <Leaderboard />;
        case 'user-loyalty':
          return <Loyalty />;
        case 'user-cart':
          return <Cart />;
        case 'user-reclamation':
          return <UserReclamation />;
        default:
          return <UserHome />;
      }
    }

    // Public pages
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'menus':
        return <Menus />;
      case 'reclamations':
        return <Reclamations />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'employee-login':
        return <EmployeeLogin onLogin={handleEmployeeLogin} />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      isAuthenticated={isAuthenticated || isEmployeeAuthenticated}
      isEmployee={isEmployeeAuthenticated}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
}
