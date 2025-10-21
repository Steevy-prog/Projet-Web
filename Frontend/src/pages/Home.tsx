import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Utensils, Award, Sparkles } from 'lucide-react';
import { menuItems } from '../lib/data';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { formatPriceFromEur } from '../lib/formatPrice';
import { Login } from './Login';
import { ForgotPassword } from './ForgotPassword';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const popularMenus = menuItems.filter((item) => item.popular);

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
      {/* CONTENU PRINCIPAL avec effet de flou */}
      <div className={`min-h-screen transition-all duration-300 ${isPopupOpen ? 'blur-md brightness-90 pointer-events-none' : ''}`}>
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
              L'Excellence Culinaire <span className="text-gold-gradient animate-gold-glow">à Portée de Main</span>
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

        {/* Popular Menus Carousel */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl mb-4 text-foreground">Nos Plats <span className="text-gold-shine">Populaires</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez nos créations les plus appréciées par nos clients
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularMenus.map((item, index) => (
                <motion.div
                  key={item.id}
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
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl text-white mb-1">{item.name}</h3>
                      <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <span className="text-primary text-xl hover-gold-brighten">{formatPriceFromEur(item.price)}</span>
                    <ChevronRight className="size-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button
                onClick={() => onNavigate('menus')}
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground hover-gold-scale"
              >
                Voir tous les menus
                <ChevronRight className="ml-2 size-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Utensils,
                  title: 'Cuisine d\'Excellence',
                  description: 'Des plats préparés par nos chefs avec des ingrédients premium',
                },
                {
                  icon: Award,
                  title: 'Programme de Fidélité',
                  description: 'Gagnez des points et profitez de récompenses exclusives',
                },
                {
                  icon: Sparkles,
                  title: 'Jeux & Événements',
                  description: 'Participez à des jeux interactifs et gagnez des bonus',
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-8 rounded-2xl bg-card border border-border hover-gold-lift card-animated"
                  >
                    <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4 animate-gold-pulse">
                      <Icon className="size-8 text-primary" />
                    </div>
                    <h3 className="mb-3 text-foreground hover-gold-brighten">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Popup Login */}
      {/* Popup Login */}
<AnimatePresence>
  {showLogin && (
    <>
      {/* Overlay avec effet de flou */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={() => setShowLogin(false)}
      />
      
      {/* Popup centré avec limites */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div 
          className="w-full max-w-md mx-auto max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
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

      {/* Popup Forgot Password */}
      <AnimatePresence>
        {showForgotPassword && (
          <>
            {/* Overlay avec effet de flou */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setShowForgotPassword(false)}
            />
            
            {/* Popup centré */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div 
                className="w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
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
    </div>
  );
}