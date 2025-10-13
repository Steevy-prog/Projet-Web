import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  variant?: 'main' | 'user' | 'admin';
}

const Header: React.FC<HeaderProps> = ({ variant = 'main' }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    switch (variant) {
      case 'user':
        return [
          { path: '/user', label: 'Accueil' },
          { path: '/user/dashboard', label: 'Dashboard' },
          { path: '/user/fidelity', label: 'Fidélité' },
          { path: '/user/order', label: 'Commander' },
          { path: '/user/games', label: 'Jeux' },
          { path: '/user/ranking', label: 'Classement' },
          { path: '/user/complaints', label: 'Réclamation' },
        ];
      case 'admin':
        return [
          { path: '/admin', label: 'Dashboard' },
          { path: '/admin/menu', label: 'Gestion Menu' },
          { path: '/admin/promos', label: 'Promotions' },
          { path: '/admin/workers', label: 'Employés' },
          { path: '/admin/complaints', label: 'Réclamations' },
          { path: '/admin/settings', label: 'Paramètres' },
        ];
      default:
        return [
          { path: '/', label: 'Accueil' },
          { path: '/menu', label: 'Menu' },
          { path: '/complaints', label: 'Réclamation' },
          { path: '/login', label: 'Connexion' },
        ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="bg-gray-950/95 backdrop-blur-md border-b border-gold-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-gold-500 hover:text-gold-600 transition-colors">
            <Link to={variant === 'user' ? '/user' : variant === 'admin' ? '/admin' : '/'}>
              ZEDUC SPACE
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-gold-500 ${
                  location.pathname === item.path
                    ? 'text-gold-500'
                    : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Info / Auth */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-300 text-sm">{user.name}</span>
                  {user.points && (
                    <span className="text-gold-500 text-xs font-medium">
                      {user.points.toLocaleString()} pts
                    </span>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-4 py-2 rounded-lg font-medium hover:from-gold-600 hover:to-gold-700 transition-all duration-200"
              >
                <User size={18} />
                <span>Connexion</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
