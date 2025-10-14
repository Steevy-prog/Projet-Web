import React, { useState } from 'react';
import { AppProvider } from './lib/context';
import { EmployeeProvider } from './lib/employeeContext';
import { Header } from './components/Header';
import { EmployeeHeader } from './components/EmployeeHeader';
import { GerantHeader } from './components/GerantHeader';
import { AdminHeader } from './components/AdminHeader';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Menus } from './pages/Menus';
import { Reclamations } from './pages/Reclamations';
import { Login } from './pages/Login';
import { UserHome } from './pages/UserHome';
import { Dashboard } from './pages/Dashboard';
import { UserMenus } from './pages/UserMenus';
import { UserReclamation } from './pages/UserReclamation';
import { Games } from './pages/Games';
import { Leaderboard } from './pages/Leaderboard';
import { Loyalty } from './pages/Loyalty';
import { Cart } from './pages/Cart';
import { EmployeeLogin } from './pages/EmployeeLogin';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { EmployeeOrders } from './pages/EmployeeOrders';
import { EmployeeMenu } from './pages/EmployeeMenu';
import { EmployeeReclamations } from './pages/EmployeeReclamations';
import { EmployeeStats } from './pages/EmployeeStats';
import { GerantDashboard } from './pages/GerantDashboard';
import { GerantOrders } from './pages/GerantOrders';
import { GerantEmployees } from './pages/GerantEmployees';
import { GerantReclamations } from './pages/GerantReclamations';
import { GerantStats } from './pages/GerantStats';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminMenu } from './pages/AdminMenu';
import { AdminEmployees } from './pages/AdminEmployees';
import { AdminPromotions } from './pages/AdminPromotions';
import { AdminStats } from './pages/AdminStats';
import { AdminReclamations } from './pages/AdminReclamations';
import { AdminSettings } from './pages/AdminSettings';
import { Toaster } from './components/ui/sonner';

type Page =
  | 'home'
  | 'menus'
  | 'reclamations'
  | 'login'
  | 'user-home'
  | 'dashboard'
  | 'user-menus'
  | 'user-reclamation'
  | 'games'
  | 'leaderboard'
  | 'loyalty'
  | 'cart'
  | 'employee-login'
  | 'employee-dashboard'
  | 'employee-orders'
  | 'employee-menu'
  | 'employee-reclamations'
  | 'employee-stats'
  | 'gerant-dashboard'
  | 'gerant-orders'
  | 'gerant-employees'
  | 'gerant-reclamations'
  | 'gerant-stats'
  | 'admin-dashboard'
  | 'admin-menu'
  | 'admin-employees'
  | 'admin-promotions'
  | 'admin-stats'
  | 'admin-reclamations'
  | 'admin-settings';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const isEmployeePage = currentPage.startsWith('employee-');
  const isGerantPage = currentPage.startsWith('gerant-');
  const isAdminPage = currentPage.startsWith('admin-');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'menus':
        return <Menus />;
      case 'reclamations':
        return <Reclamations />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'user-home':
        return <UserHome onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard />;
      case 'user-menus':
        return <UserMenus />;
      case 'user-reclamation':
        return <UserReclamation />;
      case 'games':
        return <Games />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'loyalty':
        return <Loyalty />;
      case 'cart':
        return <Cart onNavigate={setCurrentPage} />;
      case 'employee-login':
        return <EmployeeLogin onNavigate={setCurrentPage} />;
      case 'employee-dashboard':
        return <EmployeeDashboard onNavigate={setCurrentPage} />;
      case 'employee-orders':
        return <EmployeeOrders />;
      case 'employee-menu':
        return <EmployeeMenu />;
      case 'employee-reclamations':
        return <EmployeeReclamations />;
      case 'employee-stats':
        return <EmployeeStats />;
      case 'gerant-dashboard':
        return <GerantDashboard onNavigate={setCurrentPage} />;
      case 'gerant-orders':
        return <GerantOrders />;
      case 'gerant-employees':
        return <GerantEmployees />;
      case 'gerant-reclamations':
        return <GerantReclamations />;
      case 'gerant-stats':
        return <GerantStats />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={setCurrentPage} />;
      case 'admin-menu':
        return <AdminMenu />;
      case 'admin-employees':
        return <AdminEmployees />;
      case 'admin-promotions':
        return <AdminPromotions />;
      case 'admin-stats':
        return <AdminStats />;
      case 'admin-reclamations':
        return <AdminReclamations />;
      case 'admin-settings':
        return <AdminSettings />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  const renderHeader = () => {
    if (isAdminPage) {
      return <AdminHeader currentPage={currentPage} onNavigate={setCurrentPage} />;
    } else if (isGerantPage) {
      return <GerantHeader currentPage={currentPage} onNavigate={setCurrentPage} />;
    } else if (isEmployeePage) {
      return <EmployeeHeader currentPage={currentPage} onNavigate={setCurrentPage} />;
    } else {
      return <Header currentPage={currentPage} onNavigate={setCurrentPage} />;
    }
  };

  const showFooter = !isEmployeePage && !isGerantPage && !isAdminPage;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {renderHeader()}
      <main className="flex-1">{renderPage()}</main>
      {showFooter && <Footer onNavigate={setCurrentPage} />}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <EmployeeProvider>
        <AppContent />
      </EmployeeProvider>
    </AppProvider>
  );
}
