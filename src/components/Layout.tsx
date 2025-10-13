import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, UtensilsCrossed, MessageSquare, LogIn, User, ShoppingBag, TrendingUp, Briefcase } from 'lucide-react';
import { Page } from '../types';

interface LayoutProps {
  children: ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isAuthenticated: boolean;
  isEmployee?: boolean;
  onLogout: () => void;
}

export function Layout({ children, currentPage, onNavigate, isAuthenticated, isEmployee = false, onLogout }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const publicMenuItems = [
    { label: 'Accueil', page: 'home' as Page, icon: Home },
    { label: 'Menus', page: 'menus' as Page, icon: UtensilsCrossed },
    { label: 'Réclamations', page: 'reclamations' as Page, icon: MessageSquare },
    { label: 'Connexion', page: 'login' as Page, icon: LogIn },
    { label: 'Espace Employé', page: 'employee-login' as Page, icon: Briefcase },
  ];

  const userMenuItems = [
    { label: 'Mon Espace', page: 'user-home' as Page, icon: Home },
    { label: 'Menus', page: 'user-menus' as Page, icon: UtensilsCrossed },
    { label: 'Dashboard', page: 'user-dashboard' as Page, icon: User },
    { label: 'Jeux', page: 'user-games' as Page, icon: User },
    { label: 'Classement', page: 'user-leaderboard' as Page, icon: User },
    { label: 'Fidélité', page: 'user-loyalty' as Page, icon: User },
    { label: 'Panier', page: 'user-cart' as Page, icon: User },
  ];

  const employeeMenuItems = [
    { label: 'Tableau de bord', page: 'employee-dashboard' as Page, icon: Home },
    { label: 'Commandes', page: 'employee-orders' as Page, icon: ShoppingBag },
    { label: 'Menu', page: 'employee-menu' as Page, icon: UtensilsCrossed },
    { label: 'Réclamations', page: 'employee-reclamations' as Page, icon: MessageSquare },
    { label: 'Statistiques', page: 'employee-stats' as Page, icon: TrendingUp },
  ];

  const menuItems = isEmployee ? employeeMenuItems : (isAuthenticated ? userMenuItems : publicMenuItems);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      {/* Menu Toggle Button */}
      <motion.button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-[#b88b1f]/20 hover:border-[#b88b1f]/40 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-[#b88b1f]" />
          ) : (
            <Menu className="w-6 h-6 text-[#b88b1f]" />
          )}
        </motion.div>
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />

            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-[#0b0b0d] via-[#12121a] to-[#0b0b0d] border-l border-[#b88b1f]/20 z-40 overflow-y-auto"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.page}
                      onClick={() => handleNavigation(item.page)}
                      className={`flex items-center gap-4 text-2xl transition-colors duration-300 group ${
                        currentPage === item.page ? 'text-[#b88b1f]' : 'text-white hover:text-[#b88b1f]'
                      }`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      whileHover={{ x: 10 }}
                    >
                      <item.icon className="w-6 h-6" />
                      <span className="relative">
                        {item.label}
                        <motion.div
                          className="absolute -bottom-1 left-0 h-0.5 bg-[#b88b1f]"
                          initial={{ width: 0 }}
                          animate={{ width: currentPage === item.page ? '100%' : 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </motion.button>
                  ))}

                  {isAuthenticated && (
                    <motion.button
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-4 text-2xl text-red-400 hover:text-red-300 transition-colors duration-300 mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <LogIn className="w-6 h-6" />
                      Déconnexion
                    </motion.button>
                  )}
                </div>

                <motion.div
                  className="mt-auto pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-[#b88b1f]/50 to-transparent mb-4" />
                  <p className="text-[#b88b1f]/70 text-sm text-center">
                    Restaurant Zeduc
                  </p>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
