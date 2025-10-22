import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider } from './lib/context';
import { EmployeeProvider } from './lib/employeeContext';
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
import Loading from './pages/loading'; // Import du composant Loading

// Wrapper pour les pages avec navigation
function WithNav({ component: Component }: { component: React.ComponentType<any> }) {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const route = page.startsWith('/') ? page : `/${page}`;
    navigate(route);
  };
  return <Component onNavigate={handleNavigate} onClose={() => navigate(-1)} onForgotPassword={() => navigate('/forgot-password')} />;
}

function AppContent() {
  const location = useLocation();
  const pathname = location.pathname;

  const [isLoading, setIsLoading] = React.useState(false); // État de chargement

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000); // Simule un chargement de 2 secondes
    return () => clearTimeout(timer);
  }, [pathname]);

  const isEmployeePage = pathname.startsWith('/employee');
  const isGerantPage = pathname.startsWith('/gerant');
  const isAdminPage = pathname.startsWith('/admin');
  const showFooter = !isEmployeePage && !isGerantPage && !isAdminPage;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <HeaderWrapper />
      <main className="flex-1">
        {isLoading ? (
          <Loading /> // Affichage du composant Loading pendant le chargement
        ) : (
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<WithNav component={Home} />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/reclamations" element={<Reclamations />} />
            <Route path="/login" element={<WithNav component={Login} />} />
            <Route path="/forgot-password" element={<WithNav component={ForgotPassword} />} />

            {/* Routes utilisateur */}
            <Route path="/user-home" element={<WithNav component={UserHome} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-menus" element={<UserMenus />} />
            <Route path="/user-messaging" element={<UserMessaging />} />
            <Route path="/user-reclamation" element={<UserReclamation />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/games" element={<Games />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/cart" element={<WithNav component={Cart} />} />

            {/* Routes employé */}
            <Route path="/employee-login" element={<WithNav component={EmployeeLogin} />} />
            <Route path="/employee-dashboard" element={<WithNav component={EmployeeDashboard} />} />
            <Route path="/employee-orders" element={<EmployeeOrders />} />
            <Route path="/employee-menu" element={<EmployeeMenu />} />
            <Route path="/employee-messaging" element={<EmployeeMessaging />} />
            <Route path="/employee-reclamations" element={<EmployeeReclamations />} />
            <Route path="/employee-stats" element={<EmployeeStats />} />

            {/* Routes gérant */}
            <Route path="/gerant-dashboard" element={<WithNav component={GerantDashboard} />} />
            <Route path="/gerant-orders" element={<GerantOrders />} />
            <Route path="/gerant-employees" element={<GerantEmployees />} />
            <Route path="/gerant-reclamations" element={<GerantReclamations />} />
            <Route path="/gerant-stats" element={<GerantStats />} />

            {/* Routes admin */}
            <Route path="/admin-dashboard" element={<WithNav component={AdminDashboard} />} />
            <Route path="/admin-menu" element={<AdminMenu />} />
            <Route path="/admin-employees" element={<AdminEmployees />} />
            <Route path="/admin-promotions" element={<AdminPromotions />} />
            <Route path="/admin-stats" element={<AdminStats />} />
            <Route path="/admin-reclamations" element={<AdminReclamations />} />
            <Route path="/admin-settings" element={<AdminSettings />} />
          </Routes>
        )}
      </main>
      {showFooter && <FooterWrapper />}
      <Toaster />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <EmployeeProvider>
          <AppContent />
        </EmployeeProvider>
      </AppProvider>
    </BrowserRouter>
  );
}