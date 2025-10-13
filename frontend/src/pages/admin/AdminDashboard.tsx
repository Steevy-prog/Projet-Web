import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  AlertCircle, 
  DollarSign,
  ChefHat,
  Clock,
  Star
} from 'lucide-react';
import Layout from '../../components/layout/Layout';
import AnimatedCard from '../../components/common/AnimatedCard';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Revenus du jour',
      value: '2,450,000',
      unit: 'FCFA',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: 'Commandes',
      value: '156',
      unit: 'aujourd\'hui',
      icon: ShoppingBag,
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-500/10',
      change: '+8%',
      changeType: 'positive',
    },
    {
      title: 'Clients actifs',
      value: '1,247',
      unit: 'ce mois',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      change: '+15%',
      changeType: 'positive',
    },
    {
      title: 'Réclamations',
      value: '3',
      unit: 'en attente',
      icon: AlertCircle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      change: '-2',
      changeType: 'negative',
    },
  ];

  const recentOrders = [
    {
      id: '#1234',
      customer: 'Alexandre M.',
      items: 3,
      total: 45000,
      status: 'preparing',
      time: '10:30',
    },
    {
      id: '#1235',
      customer: 'Marie D.',
      items: 2,
      total: 32000,
      status: 'ready',
      time: '10:25',
    },
    {
      id: '#1236',
      customer: 'Jean K.',
      items: 5,
      total: 78000,
      status: 'delivered',
      time: '10:20',
    },
  ];

  const topDishes = [
    { name: 'Taro Sauce Jaune', orders: 45, revenue: 675000 },
    { name: 'Homard Thermidor', orders: 28, revenue: 700000 },
    { name: 'Triade de Brochette', orders: 38, revenue: 684000 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'text-yellow-500 bg-yellow-500/10';
      case 'ready': return 'text-green-500 bg-green-500/10';
      case 'delivered': return 'text-blue-500 bg-blue-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing': return 'En préparation';
      case 'ready': return 'Prêt';
      case 'delivered': return 'Livré';
      default: return status;
    }
  };

  return (
    <Layout variant="admin">
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Dashboard Admin 👨‍💼
            </h1>
            <p className="text-gray-400 text-lg">
              Vue d'ensemble de votre restaurant
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AnimatedCard hover3d glowEffect className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} size={24} />
                    </div>
                    <span className={`text-sm font-semibold px-2 py-1 rounded ${
                      stat.changeType === 'positive' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                    {stat.unit && <span className="text-sm text-gray-400 ml-1">{stat.unit}</span>}
                  </h3>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <AnimatedCard className="p-6" glowEffect>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <ShoppingBag className="mr-3 text-yellow-500" size={24} />
                Commandes récentes
              </h2>
              
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white font-medium">{order.id} - {order.customer}</p>
                        <p className="text-gray-400 text-sm">
                          {order.items} article{order.items > 1 ? 's' : ''} • {order.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        {order.total.toLocaleString()} FCFA
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>

            {/* Top Dishes */}
            <AnimatedCard className="p-6" glowEffect>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <ChefHat className="mr-3 text-yellow-500" size={24} />
                Plats populaires
              </h2>
              
              <div className="space-y-4">
                {topDishes.map((dish, index) => (
                  <motion.div
                    key={dish.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{dish.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-500" size={16} />
                        <span className="text-yellow-500 text-sm font-semibold">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {dish.orders} commandes
                      </span>
                      <span className="text-green-500 font-semibold">
                        {dish.revenue.toLocaleString()} FCFA
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(dish.orders / 50) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <AnimatedCard className="p-6" glowEffect>
              <h2 className="text-2xl font-bold text-white mb-6">Actions rapides</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Nouveau plat', icon: ChefHat, color: 'from-green-500 to-emerald-500' },
                  { name: 'Gérer staff', icon: Users, color: 'from-blue-500 to-purple-500' },
                  { name: 'Promotions', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
                  { name: 'Rapports', icon: Clock, color: 'from-purple-500 to-pink-500' },
                ].map((action) => (
                  <motion.button
                    key={action.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg transition-colors text-center"
                  >
                    <action.icon className={`mx-auto mb-2 bg-gradient-to-r ${action.color} bg-clip-text text-transparent`} size={24} />
                    <p className="text-white text-sm font-medium">{action.name}</p>
                  </motion.button>
                ))}
              </div>
            </AnimatedCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
