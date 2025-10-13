import React, { useState } from 'react';
import { AppProvider } from './lib/context';
import { Header } from './components/Header';
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
  | 'cart';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

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
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
