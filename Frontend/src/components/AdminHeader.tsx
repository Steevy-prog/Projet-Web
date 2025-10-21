import React, { useState } from 'react';
import { Menu, X, Utensils, UtensilsCrossed, Users, Tag, MessageSquare, BarChart3, Settings, LogOut, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEmployee } from '../lib/employeeContext';
import { Badge } from './ui/badge';

interface AdminHeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function AdminHeader({ currentPage, onNavigate }: AdminHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { employee, logout, reclamations, promotions } = useEmployee();

  const handleLogout = () => {
    logout();
    onNavigate('employee-login');
    setIsMenuOpen(false);
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const pendingReclamations = reclamations.filter((rec) => rec.status === 'pending').length;
  const activePromotions = promotions.filter((promo) => promo.active).length;

  const menuItems = [
    { icon: Home, label: 'Dashboard', page: 'admin-dashboard' },
    { icon: UtensilsCrossed, label: 'Menu', page: 'admin-menu' },
    { icon: Users, label: 'Employés', page: 'admin-employees' },
    { icon: Tag, label: 'Promotions', page: 'admin-promotions', badge: activePromotions },
    { icon: BarChart3, label: 'Statistiques', page: 'admin-stats' },
    { icon: MessageSquare, label: 'Réclamations', page: 'admin-reclamations', badge: pendingReclamations },
    { icon: Settings, label: 'Paramètres', page: 'admin-settings' },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleNavigation('admin-dashboard')}
        >
          <div className="size-10 rounded-2xl bg-primary flex items-center justify-center">
            <Utensils className="size-6 text-primary-foreground" />
          </div>
          <div>
            <span className="text-primary block">Espace Admin</span>
            <span className="text-xs text-muted-foreground">Restaurant Zeduc-space</span>
          </div>
        </motion.div>

        <div className="flex items-center gap-4">
          {employee && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-secondary border border-border"
            >
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm text-primary">{employee.name.charAt(0)}</span>
              </div>
              <div className="text-left">
                <p className="text-sm">{employee.name}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                  Administrateur
                </span>
              </div>
            </motion.div>
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
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-colors text-left ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-5" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && item.badge > 0 && (
                        <Badge className="bg-destructive text-destructive-foreground">
                          {item.badge}
                        </Badge>
                      )}
                    </motion.button>
                  );
                })}

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
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
