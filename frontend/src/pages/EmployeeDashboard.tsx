import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Clock, CheckCircle, AlertCircle, Package, UtensilsCrossed, MessageSquare, BarChart3 } from 'lucide-react';
import { useEmployee } from '../lib/employeeContext';
import { Button } from '../components/ui/button';
import { StatCard } from '../components/StatCard';
import { formatPriceFromEur } from '../lib/formatPrice';

interface EmployeeDashboardProps {
  onNavigate: (page: string) => void;
}

export function EmployeeDashboard({ onNavigate }: EmployeeDashboardProps) {
  const { employee, orders, reclamations } = useEmployee();

  const pendingOrders = orders.filter((order) => order.status === 'pending').length;
  const preparingOrders = orders.filter((order) => order.status === 'preparing').length;
  const readyOrders = orders.filter((order) => order.status === 'ready').length;
  const pendingReclamations = reclamations.filter((rec) => rec.status === 'pending').length;

  const stats = [
    {
      icon: Clock,
      label: 'En attente',
      value: pendingOrders,
      trend: 'À traiter',
    },
    {
      icon: ShoppingBag,
      label: 'En préparation',
      value: preparingOrders,
      trend: 'En cours',
    },
    {
      icon: CheckCircle,
      label: 'Prêtes',
      value: readyOrders,
      trend: 'À livrer',
    },
    {
      icon: AlertCircle,
      label: 'Réclamations',
      value: pendingReclamations,
      trend: 'À traiter',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  const quickActions = [
    {
      icon: ShoppingBag,
      label: 'Gérer les commandes',
      description: 'Voir et traiter les commandes',
      page: 'employee-orders',
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      icon: UtensilsCrossed,
      label: 'Menu du jour',
      description: 'Mettre à jour le menu',
      page: 'employee-menu',
      color: 'bg-green-500/10 text-green-500',
    },
    {
      icon: MessageSquare,
      label: 'Réclamations',
      description: 'Répondre aux clients',
      page: 'employee-reclamations',
      color: 'bg-orange-500/10 text-orange-500',
    },
    {
      icon: BarChart3,
      label: 'Statistiques',
      description: 'Voir les performances',
      page: 'employee-stats',
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      icon: MessageSquare, // Ajoutez cette importation en haut
      title: 'Messagerie',
      description: 'Discuter avec un client',
      page: 'employee-messaging', // Cette page doit exister dans votre routing
      color: 'bg-blue-500',
    },
  ];

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
            Bienvenue <span className="text-primary">{employee?.name}</span>
          </h1>
          <p className="text-muted-foreground">
            Voici un aperçu de votre journée de travail
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl mb-6 text-foreground">
            Actions <span className="text-primary">Rapides</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.page}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
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
          transition={{ delay: 0.9 }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-foreground">Commandes Récentes</h3>
            <Button
              onClick={() => onNavigate('employee-orders')}
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
                transition={{ delay: 1.0 + index * 0.1 }}
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
