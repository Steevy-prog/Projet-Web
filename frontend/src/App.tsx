import React from 'react';
import { AppProvider } from './lib/context';
import { EmployeeProvider } from './lib/employeeContext';
import { NavigationProvider, useNavigation } from './lib/navigationContext';
import { HeaderWrapper } from './components/HeaderWrapper';
import { FooterWrapper } from './components/FooterWrapper';
import { Home } from './pages/Home';
import { Menus } from './pages/Menus';
import { Reclamations } from './pages/Reclamations';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { UserHome } from './pages/UserHome';
import { Dashboard } from './pages/Dashboard';
import { UserMenus } from './pages/UserMenus';
import { UserMessaging } from './pages/UserMessaging';
import { UserReclamation } from './pages/UserReclamation';
import { Games } from './pages/Games';
import { Leaderboard } from './pages/Leaderboard';
import { Loyalty } from './pages/Loyalty';
import { Cart } from './pages/Cart';
import { EmployeeLogin } from './pages/EmployeeLogin';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { EmployeeOrders } from './pages/EmployeeOrders';
import { EmployeeMenu } from './pages/EmployeeMenu';
import { EmployeeMessaging } from './pages/EmployeeMessaging';
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
import { Referral } from './pages/Referral';
import { CookieConsent } from './components/CookieConsent';


function AppContent() {
  const { currentPage, navigate, goBack } = useNavigation();

  const isEmployeePage = currentPage.startsWith('employee');
  const isGerantPage = currentPage.startsWith('gerant');
  const isAdminPage = currentPage.startsWith('admin');
  const showFooter = !isEmployeePage && !isGerantPage && !isAdminPage;

  const handleNavigate = (page: string) => {
    const cleanPage = page.startsWith('/') ? page.substring(1) : page;
    navigate(cleanPage || 'home');
  };

  const renderPage = () => {
    const props = {
      onNavigate: handleNavigate,
      onClose: goBack,
      onForgotPassword: () => navigate('forgot-password')
    };

    switch (currentPage) {
      // Routes publiques
      case 'home':
        return <Home {...props} />;
      case 'menus':
        return <Menus />;
      case 'reclamations':
        return <Reclamations />;
      case 'login':
        return <Login {...props} />;
      case 'forgot-password':
        return <ForgotPassword {...props} />;
      
      // Routes utilisateur
      case 'user-home':
        return <UserHome {...props} />;
      case 'dashboard':
        return <Dashboard />;
      case 'user-menus':
        return <UserMenus />;
      case 'user-messaging':
        return <UserMessaging />;
      case 'user-reclamation':
        return <UserReclamation />;
      case 'referral':
        return <Referral />;
      case 'games':
        return <Games />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'loyalty':
        return <Loyalty />;
      case 'cart':
        return <Cart {...props} />;    
      // Routes employé
      case 'employee-login':
        return <EmployeeLogin {...props} />;
      case 'employee-dashboard':
        return <EmployeeDashboard {...props} />;
      case 'employee-orders':
        return <EmployeeOrders />;
      case 'employee-menu':
        return <EmployeeMenu />;
      case 'employee-messaging':
        return <EmployeeMessaging />;
      case 'employee-reclamations':
        return <EmployeeReclamations />;
      case 'employee-stats':
        return <EmployeeStats />;
      
      // Routes gérant
      case 'gerant-dashboard':
        return <GerantDashboard {...props} />;
      case 'gerant-orders':
        return <GerantOrders />;
      case 'gerant-employees':
        return <GerantEmployees />;
      case 'gerant-reclamations':
        return <GerantReclamations />;
      case 'gerant-stats':
        return <GerantStats />;
      
      // Routes admin
      case 'admin-dashboard':
        return <AdminDashboard {...props} />;
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
        return <Home {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <HeaderWrapper />
      <main className="flex-1">
        {renderPage()}
      </main>
      {showFooter && <FooterWrapper />}
      <Toaster />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppProvider>
        <EmployeeProvider>
          <AppContent />
        </EmployeeProvider>
      </AppProvider>
    </NavigationProvider>
  );
}
