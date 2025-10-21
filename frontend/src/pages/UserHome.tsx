import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShoppingCart, Trophy, Gift, Gamepad2, ChevronRight, MessageCircle, Users } from 'lucide-react';
import { useApp } from '../lib/context';
import { Button } from '../components/ui/button';
import { menuItems } from '../lib/data';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { formatPriceFromEur } from '../lib/formatPrice';

interface UserHomeProps {
  onNavigate: (page: string) => void;
}

export function UserHome({ onNavigate }: UserHomeProps) {
  const { user } = useApp();

  // Debug: vérifiez les données utilisateur
  useEffect(() => {
    console.log('🔍 UserHome - User data:', user);
    console.log('🔍 UserHome - User name:', user?.name);
    console.log('🔍 UserHome - LocalStorage user:', localStorage.getItem('user'));
    console.log('🔍 UserHome - LocalStorage users:', localStorage.getItem('users'));
  }, [user]);

  const quickActions = [
    {
      icon: ShoppingCart,
      title: 'Commander',
      description: 'Parcourir les menus',
      page: 'user-menus',
      color: 'bg-primary',
    },
    {
      icon: Gamepad2,
      title: 'Jouer',
      description: 'Mini-jeux & événements',
      page: 'games',
      color: 'bg-chart-2',
    },
    {
      icon: Trophy,
      title: 'Classement',
      description: 'Voir les meilleurs',
      page: 'leaderboard',
      color: 'bg-chart-4',
    },
    {
      icon: Gift,
      title: 'Récompenses',
      description: 'Programme fidélité',
      page: 'loyalty',
      color: 'bg-chart-1',
    },
    {
      icon: Users,
      title: 'Parrainer',
      description: 'Gagne 100 points',
      page: 'referral',
      color: 'bg-purple-500',
    },
    {
      icon: MessageCircle,
      title: 'Messagerie',
      description: 'Contacter le restaurant',
      page: 'user-messaging',
      color: 'bg-blue-500',
    },
  ];

  const featuredMenus = menuItems.filter((item) => item.popular).slice(0, 3);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-8 md:p-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-4"
            >
              <Sparkles className="size-4 text-primary" />
              <span className="text-sm text-primary">Membre Premium</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl mb-3 text-foreground">
              Bienvenue, <span className="text-primary">{user?.name || 'Utilisateur'}</span> !
            </h1>
            <p className="text-muted-foreground mb-6">
              Vous avez accumulé {user?.loyaltyPoints || 0} points de fidélité. Continuez à commander et à jouer pour débloquer des récompenses exclusives !
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => onNavigate('dashboard')}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Voir mon dashboard
                <ChevronRight className="ml-2 size-5" />
              </Button>
              <Button
                onClick={() => onNavigate('loyalty')}
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary/10"
              >
                Mes récompenses
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl mb-6 text-foreground">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(action.page)}
                  className="bg-card border border-border rounded-2xl p-6 text-left group"
                >
                  <div className={`inline-flex p-3 rounded-2xl ${action.color} mb-4`}>
                    <Icon className="size-6 text-primary-foreground" />
                  </div>
                  <h3 className="mb-1 text-foreground">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                  <ChevronRight className="size-5 text-primary mt-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* Featured Menus */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-foreground">Plats du Moment</h2>
            <Button
              onClick={() => onNavigate('user-menus')}
              variant="ghost"
              className="text-primary hover:bg-primary/10"
            >
              Voir tout
              <ChevronRight className="ml-2 size-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMenus.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => onNavigate('user-menus')}
                className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-foreground">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary">{formatPriceFromEur(item.price)}</span>
                    <ChevronRight className="size-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}