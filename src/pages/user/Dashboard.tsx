import { motion } from 'motion/react';
import { mockUser } from '../../data/mockData';
import { Trophy, ShoppingBag, Gamepad2, Award } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      icon: Gamepad2,
      label: 'Jeux joués',
      value: mockUser.gamesPlayed,
      color: '#b88b1f',
    },
    {
      icon: Award,
      label: 'Points de fidélité',
      value: mockUser.loyaltyPoints,
      color: '#d4a74a',
    },
    {
      icon: ShoppingBag,
      label: 'Commandes',
      value: mockUser.ordersCount,
      color: '#b88b1f',
    },
    {
      icon: Trophy,
      label: 'Classement',
      value: `#${mockUser.rank}`,
      color: '#d4a74a',
    },
  ];

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent mb-4">
            Bienvenue, {mockUser.name}
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mb-8" />
          <p className="text-gray-400 text-lg">
            Voici un aperçu de votre activité
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
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-4xl" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl mb-6 text-[#b88b1f]">Activité Récente</h2>
          
          <div className="space-y-4">
            {[
              { action: 'Commande validée', date: 'Il y a 2 jours', points: '+50' },
              { action: 'Jeu "Quiz du Chef" complété', date: 'Il y a 5 jours', points: '+100' },
              { action: 'Récompense échangée', date: 'Il y a 1 semaine', points: '-500' },
              { action: 'Commande validée', date: 'Il y a 2 semaines', points: '+50' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-[#b88b1f]/10 hover:border-[#b88b1f]/30 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <div>
                  <p className="text-white mb-1">{activity.action}</p>
                  <p className="text-gray-500 text-sm">{activity.date}</p>
                </div>
                <span
                  className={`text-lg ${
                    activity.points.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {activity.points} pts
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="p-6 bg-gradient-to-br from-[#b88b1f]/20 to-[#d4a74a]/10 border border-[#b88b1f]/30 rounded-3xl hover:border-[#b88b1f]/50 transition-all duration-300 text-left">
            <h3 className="text-xl mb-2 text-[#b88b1f]">Commander</h3>
            <p className="text-gray-400 text-sm">Parcourir les menus</p>
          </button>

          <button className="p-6 bg-gradient-to-br from-[#b88b1f]/20 to-[#d4a74a]/10 border border-[#b88b1f]/30 rounded-3xl hover:border-[#b88b1f]/50 transition-all duration-300 text-left">
            <h3 className="text-xl mb-2 text-[#b88b1f]">Jouer</h3>
            <p className="text-gray-400 text-sm">Gagner des points</p>
          </button>

          <button className="p-6 bg-gradient-to-br from-[#b88b1f]/20 to-[#d4a74a]/10 border border-[#b88b1f]/30 rounded-3xl hover:border-[#b88b1f]/50 transition-all duration-300 text-left">
            <h3 className="text-xl mb-2 text-[#b88b1f]">Récompenses</h3>
            <p className="text-gray-400 text-sm">Échanger vos points</p>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
