import { motion } from 'motion/react';
import { mockEmployee, mockOrders } from '../../data/mockData';
import { ShoppingBag, Clock, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';

export function EmployeeDashboard() {
  // Calcul des statistiques
  const pendingOrders = mockOrders.filter(o => o.status === 'en attente').length;
  const inProgressOrders = mockOrders.filter(o => o.status === 'en préparation').length;
  const completedOrders = mockOrders.filter(o => o.status === 'validée' || o.status === 'livrée').length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);

  const stats = [
    {
      icon: AlertCircle,
      label: 'Commandes en attente',
      value: pendingOrders,
      color: '#ff6b6b',
      bgColor: '#ff6b6b20',
    },
    {
      icon: Clock,
      label: 'En préparation',
      value: inProgressOrders,
      color: '#ffa500',
      bgColor: '#ffa50020',
    },
    {
      icon: CheckCircle,
      label: 'Validées',
      value: completedOrders,
      color: '#4caf50',
      bgColor: '#4caf5020',
    },
    {
      icon: TrendingUp,
      label: 'Revenus du jour',
      value: `${totalRevenue}€`,
      color: '#b88b1f',
      bgColor: '#b88b1f20',
    },
  ];

  // Dernières commandes
  const recentOrders = mockOrders.slice(0, 3);

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent mb-4">
            Bienvenue, {mockEmployee.name}
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mb-8" />
          <p className="text-gray-400 text-lg">
            {mockEmployee.role} • Tableau de bord du jour
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8 hover:border-[#b88b1f]/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="p-3 rounded-2xl"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-4xl font-semibold" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <motion.div
          className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="w-6 h-6 text-[#b88b1f]" />
            <h2 className="text-3xl text-[#b88b1f]">Dernières Commandes</h2>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                className="p-6 bg-black/20 rounded-2xl border border-[#b88b1f]/10 hover:border-[#b88b1f]/30 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#b88b1f] font-semibold">{order.id}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'en attente'
                            ? 'bg-red-500/20 text-red-400'
                            : order.status === 'en préparation'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-white mb-1">{order.customerName}</p>
                    <p className="text-gray-400 text-sm">
                      {order.items.length} article(s) • {order.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-[#b88b1f] font-semibold">{order.total}€</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="p-6 bg-gradient-to-br from-[#b88b1f]/20 to-[#d4a74a]/10 border border-[#b88b1f]/30 rounded-3xl hover:border-[#b88b1f]/50 hover:scale-105 transition-all duration-300 text-left group">
            <ShoppingBag className="w-8 h-8 text-[#b88b1f] mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl mb-2 text-[#b88b1f] font-semibold">Commandes</h3>
            <p className="text-gray-400 text-sm">Gérer les commandes</p>
          </button>

          <button className="p-6 bg-gradient-to-br from-[#b88b1f]/20 to-[#d4a74a]/10 border border-[#b88b1f]/30 rounded-3xl hover:border-[#b88b1f]/50 hover:scale-105 transition-all duration-300 text-left group">
            <svg className="w-8 h-8 text-[#b88b1f] mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl mb-2 text-[#b88b1f] font-semibold">Menu</h3>
            <p className="text-gray-400 text-sm">Modifier le menu</p>
          </button>

          <button className="p-6 bg-gradient-to-br from-[#b88b1f]/20 to-[#d4a74a]/10 border border-[#b88b1f]/30 rounded-3xl hover:border-[#b88b1f]/50 hover:scale-105 transition-all duration-300 text-left group">
            <svg className="w-8 h-8 text-[#b88b1f] mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 className="text-xl mb-2 text-[#b88b1f] font-semibold">Réclamations</h3>
            <p className="text-gray-400 text-sm">Gérer les réclamations</p>
          </button>

          <button className="p-6 bg-gradient-to-br from-[#b88b1f]/20 to-[#d4a74a]/10 border border-[#b88b1f]/30 rounded-3xl hover:border-[#b88b1f]/50 hover:scale-105 transition-all duration-300 text-left group">
            <TrendingUp className="w-8 h-8 text-[#b88b1f] mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl mb-2 text-[#b88b1f] font-semibold">Statistiques</h3>
            <p className="text-gray-400 text-sm">Voir les ventes</p>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
