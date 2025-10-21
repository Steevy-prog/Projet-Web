import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, LogOut, Home, Utensils, MessageSquare, Trophy, Gift, Gamepad2, BarChart3 } from 'lucide-react';
import logo from './assets/logo.svg';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../lib/context';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, cart } = useApp();

  const handleLogout = () => {
    setUser(null);
    onNavigate('home');
    setIsMenuOpen(false);
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const publicMenuItems = [
    { icon: Home, label: 'Accueil', page: 'home' },
    { icon: Utensils, label: 'Menus', page: 'menus' },
    { icon: MessageSquare, label: 'Réclamations', page: 'reclamations' },
  ];

  const userMenuItems = [
    { icon: Home, label: 'Accueil', page: 'user-home' },
    { icon: BarChart3, label: 'Dashboard', page: 'dashboard' },
    { icon: Utensils, label: 'Commander', page: 'user-menus' },
    { icon: ShoppingCart, label: 'Panier', page: 'cart' },
    { icon: Gamepad2, label: 'Jeux', page: 'games' },
    { icon: Trophy, label: 'Classement', page: 'leaderboard' },
    { icon: Gift, label: 'Fidélité', page: 'loyalty' },
    { icon: MessageSquare, label: 'Réclamation', page: 'user-reclamation' },
  ];

  const menuItems = user ? userMenuItems : publicMenuItems;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer hover-gold-lift"
          onClick={() => handleNavigation(user ? 'user-home' : 'home')}
        >
          <div className="size-12 rounded-2xl overflow-hidden animate-gold-pulse">
            <img src={logo} alt="Restaurant Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-gold-shine">Restaurant Zeduc Space</span>
        </motion.div>

        <div className="flex items-center gap-4">
          {user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-secondary border border-border hover-gold-glow"
            >
              <User className="size-5 text-primary animate-gold-sparkle" />
              <div className="text-left">
                <p className="text-sm hover-gold-brighten">{user.name}</p>
                <p className="text-xs text-primary">{user.loyaltyPoints} pts</p>
              </div>
            </motion.div>
          )}

          {user && cart.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('cart')}
              className="relative p-2 rounded-2xl bg-secondary hover:bg-primary/20 transition-colors hover-gold-scale"
            >
              <ShoppingCart className="size-6 text-primary" />
              <Badge className="absolute -top-1 -right-1 size-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground animate-gold-pulse">
                {cart.length}
              </Badge>
            </motion.button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-2xl bg-secondary hover:bg-primary/20 transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="size-6 text-primary" />
            ) : (
              <Menu className="size-6 text-primary" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6">
              <div className="grid gap-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.page;
                  return (
                    <motion.button
                      key={item.page}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavigation(item.page)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors text-left ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary'
                      }`}
                    >
                      <Icon className="size-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}

                {user && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: menuItems.length * 0.05 }}
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-destructive/20 text-destructive transition-colors text-left"
                  >
                    <LogOut className="size-5" />
                    <span>Déconnexion</span>
                  </motion.button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}