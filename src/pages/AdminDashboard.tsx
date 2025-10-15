import React from 'react';
import { motion } from 'motion/react';
import { Users, ShoppingBag, TrendingUp, MessageSquare, DollarSign, Award, UtensilsCrossed, Tag } from 'lucide-react';
import { useEmployee } from '../lib/employeeContext';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/ui/button';
import { formatPriceFromEur } from '../lib/formatPrice';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { employee, orders, reclamations, employees, menuItems, promotions } = useEmployee();

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingReclamations = reclamations.filter((rec) => rec.status === 'pending').length;
  const activePromotions = promotions.filter((promo) => promo.active).length;

  const stats = [
    {
      icon: ShoppingBag,
      label: 'Commandes totales',
      value: totalOrders,
      trend: 'Toutes périodes',
    },
    {
      icon: DollarSign,
      label: 'Chiffre d\'affaires',
      value: formatPriceFromEur(totalRevenue),
      trend: 'Total',
    },
    {
      icon: Users,
      label: 'Employés',
      value: employees.length,
      trend: 'Actifs',
    },
    {
      icon: UtensilsCrossed,
      label: 'Plats au menu',
      value: menuItems.length,
      trend: `${menuItems.filter(m => m.available).length} disponibles`,
    },
    {
      icon: Tag,
      label: 'Promotions',
      value: activePromotions,
      trend: `${promotions.length} total`,
    },
    {
      icon: MessageSquare,
      label: 'Réclamations',
      value: pendingReclamations,
      trend: 'En attente',
    },
  ];

  const quickActions = [
    {
      icon: UtensilsCrossed,
      label: 'Gérer le menu',
      description: 'CRUD complet du menu',
      page: 'admin-menu',
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      icon: Users,
      label: 'Gérer employés',
      description: 'Gestion des comptes',
      page: 'admin-employees',
      color: 'bg-green-500/10 text-green-500',
    },
    {
      icon: Tag,
      label: 'Promotions',
      description: 'Créer des offres',
      page: 'admin-promotions',
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      icon: TrendingUp,
      label: 'Statistiques',
      description: 'Temps réel',
      page: 'admin-stats',
      color: 'bg-orange-500/10 text-orange-500',
    },
    {
      icon: MessageSquare,
      label: 'Réclamations',
      description: 'Suivi complet',
      page: 'admin-reclamations',
      color: 'bg-red-500/10 text-red-500',
    },
    {
      icon: Award,
      label: 'Paramètres',
      description: 'Configuration globale',
      page: 'admin-settings',
      color: 'bg-indigo-500/10 text-indigo-500',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'preparing':
        return 'bg-blue-500/20 text-blue-400';
      case 'ready':
        return 'bg-green-500/20 text-green-400';
      case 'delivered':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-primary/20 text-primary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'preparing':
        return 'En préparation';
      case 'ready':
        return 'Prête';
      case 'delivered':
        return 'Livrée';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl mb-2 text-foreground">
            Tableau de bord <span className="text-primary">Administrateur</span>
          </h1>
          <p className="text-muted-foreground">
            Bienvenue {employee?.name}, contrôle global de l'application
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl mb-6 text-foreground">
            Actions <span className="text-primary">Rapides</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.page}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  onClick={() => onNavigate(action.page)}
                  className="bg-card border border-border rounded-2xl p-6 text-left hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className={`inline-flex p-3 rounded-2xl ${action.color} mb-4`}>
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mb-2 text-foreground">{action.label}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* Recent Orders */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-foreground">Commandes Récentes</h3>
            <Button
              onClick={() => onNavigate('admin-stats')}
              variant="outline"
              className="rounded-2xl"
            >
              Voir tout
            </Button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-secondary border border-border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-foreground">#{order.id}</p>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.userName}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.items.length} article{order.items.length > 1 ? 's' : ''} • {formatPriceFromEur(order.total)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
