import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { menuItems } from '../lib/data';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { formatPriceFromEur } from '../lib/formatPrice';
import { Login } from './Login';
import { toast } from 'sonner';
import { useApp } from '../lib/context';
import { AuthAPI } from '../lib/apis';
import { ForgotPassword } from './ForgotPassword';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const popularMenus = menuItems.filter((item) => item.popular);
  const { setUser, user } = useApp();

  // ✅ Handle Google Login Redirect (for popup window)
  useEffect(() => {
    const handleGoogleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      
      if (token) {
        try {
          if (window.opener && window.opener !== window) {
            window.opener.postMessage({ type: 'google-login', token }, '*');
            window.close();
            return;
          }
          
          setLoading(true);
          localStorage.setItem('token', token);
          const userData = await AuthAPI.autoLogin();
          const fetchedUser = userData.user;

          // 🔒 Check if user is role 1 (customer)
          if (fetchedUser.id_role !== 1) {
            toast.error('Accès refusé. Seuls les clients peuvent se connecter ici.');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return;
          }
          
          localStorage.setItem('user', JSON.stringify(fetchedUser));
          setUser(fetchedUser);
          
          window.history.replaceState({}, document.title, window.location.pathname);
          toast.success(`Connexion via Google réussie. Bienvenue ${fetchedUser.nom} !`);
          onNavigate('user-home');
        } catch (error) {
          console.error('Erreur lors de la connexion Google:', error);
          toast.error('Impossible de se connecter au serveur');
        } finally {
          setLoading(false);
        }
      }
    };

    handleGoogleLogin();
  }, [onNavigate, setUser]);

  // ✅ Listen for Google Login from Popup Window
  useEffect(() => {
    const handlePopupMessage = async (event: MessageEvent) => {
      if (event.data?.type === 'google-login' && event.data.token) {
        const token = event.data.token;
        
        try {
          setLoading(true);
          localStorage.setItem('token', token);
          const receive = await AuthAPI.autoLogin();
          const userData = receive.user;

          // 🔒 Check if user is role 1 (customer)
          if (userData.id_role !== 1) {
            toast.error('Accès refusé. Seuls les clients peuvent se connecter ici.');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return;
          }

          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          
          setShowLogin(false);
          toast.success(`Connexion via Google réussie. Bienvenue ${userData.nom} !`);
          onNavigate('user-home');
        } catch (error) {
          console.error('Erreur lors de la connexion Google via popup:', error);
          toast.error('Connexion via Google échouée');
        } finally {
          setLoading(false);
        }
      }
    };

    window.addEventListener('message', handlePopupMessage);
    return () => window.removeEventListener('message', handlePopupMessage);
  }, [onNavigate, setUser]);

  // ✅ Try auto-login with stored token
  useEffect(() => {
    const tryAutoLogin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        setLoading(true);
        const auto = await AuthAPI.autoLogin();

        if (auto && auto.user) {
          const fetchedUser = auto.user;

          // 🔒 Check if user is role 1 (customer)
          if (fetchedUser.id_role !== 1) {
            toast.info('Utilisez la connexion employé pour accéder à votre espace.');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return;
          }

          localStorage.setItem('user', JSON.stringify(fetchedUser));
          setUser(fetchedUser);
        }
      } catch (error) {
        console.warn('Auto-login failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    tryAutoLogin();
  }, [setUser]);

  // ✅ Navigate only when user is available and role 1
  useEffect(() => {
    if (!loading && user && user.id_utilisateur && user.id_role === 1) {
      toast.success(`Connexion automatique réussie. Bienvenue ${user.nom} !`);
      onNavigate('user-home');
    }
  }, [user, loading, onNavigate]);

  const handleLoginNavigate = (page: string) => {
    setShowLogin(false);
    onNavigate(page);
  };

  const handleForgotPasswordNavigate = (page: string) => {
    setShowForgotPassword(false);
    onNavigate(page);
  };

  const handleShowForgotPassword = () => {
    setShowLogin(false);
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setShowLogin(true);
  };

  const isPopupOpen = showLogin || showForgotPassword;

  return (
    <div className="relative min-h-screen">
      {/* MAIN CONTENT */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          isPopupOpen ? 'blur-md brightness-90 pointer-events-none' : ''
        }`}
      >
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
            alt="Restaurant"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 text-center px-4 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm mb-6 animate-gold-pulse"
            >
              <Sparkles className="size-4 text-primary animate-gold-sparkle" />
              <span className="text-sm text-primary">Programme de fidélité exclusif</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl mb-6 text-foreground">
              L'Excellence Culinaire{' '}
              <span className="text-gold-gradient animate-gold-glow">à Portée de Main</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Découvrez une expérience gastronomique unique alliant saveurs authentiques et innovation
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => onNavigate('menus')}
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground hover-gold-scale animate-gold-shine"
              >
                Découvrir nos menus
                <ChevronRight className="ml-2 size-5" />
              </Button>
              <Button
                onClick={() => setShowLogin(true)}
                size="lg"
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary/10 hover-gold-glow"
              >
                Connexion
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Popular Menus */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl mb-4 text-foreground">
                Nos Plats <span className="text-gold-shine">Populaires</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez nos créations les plus appréciées par nos clients
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularMenus.map((item, index) => (
                <motion.div
                  key={item.id_article}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden group cursor-pointer card-animated hover-gold-lift"
                  onClick={() => onNavigate('menus')}
                >
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.nom}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl text-white mb-1">{item.nom}</h3>
                      <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <span className="text-primary text-xl hover-gold-brighten">
                      {formatPriceFromEur(item.prix)}
                    </span>
                    <ChevronRight className="size-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 🔐 Popup Login */}
      <AnimatePresence>
        {showLogin && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setShowLogin(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
                <Login
                  onNavigate={handleLoginNavigate}
                  onClose={() => setShowLogin(false)}
                  onForgotPassword={handleShowForgotPassword}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🔑 Popup Forgot Password */}
      <AnimatePresence>
        {showForgotPassword && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setShowForgotPassword(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <ForgotPassword
                  onNavigate={handleForgotPasswordNavigate}
                  onClose={() => setShowForgotPassword(false)}
                  onBackToLogin={handleBackToLogin}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🔥 LOADING OVERLAY */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-black/50 backdrop-blur-lg pointer-events-auto"
          >
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white text-xl font-semibold animate-pulse">
              Connexion en cours...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}