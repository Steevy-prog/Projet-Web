import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Trophy, Star, Gift, Zap } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import AnimatedCard from '../../components/common/AnimatedCard';
import { useAuth } from '../../context/AuthContext';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Points totaux',
      value: '12.850',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Commandes',
      value: '24',
      icon: ShoppingBag,
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Niveau',
      value: 'Gold',
      icon: Trophy,
      color: 'from-amber-500 to-yellow-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Récompenses',
      value: '8',
      icon: Gift,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'order',
      description: 'Commande #1234 livrée',
      points: '+150 points',
      time: '2h',
      icon: ShoppingBag,
    },
    {
      id: 2,
      type: 'game',
      description: 'Victoire au Quiz Culinaire',
      points: '+50 points',
      time: '5h',
      icon: Zap,
    },
    {
      id: 3,
      type: 'reward',
      description: 'Récompense de fidélité réclamée',
      points: '-500 points',
      time: '1j',
      icon: Gift,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout variant="user">
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Bonjour, {user?.name} 👋
            </h1>
            <p className="text-gray-400 text-lg">
              Bienvenue sur votre tableau de bord
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={stat.title} variants={itemVariants}>
                <AnimatedCard
                  delay={index * 0.1}
                  hover3d
                  glowEffect
                  className="p-6 text-center"
                >
                  <div className={`inline-flex p-4 rounded-full ${stat.bgColor} mb-4`}>
                    <stat.icon className={`text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-400">{stat.title}</p>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Progress Chart */}
            <AnimatedCard className="p-6" glowEffect>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="mr-3 text-yellow-500" size={24} />
                Progression ce mois
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Points gagnés</span>
                    <span className="text-yellow-500 font-semibold">2,450 / 3,000</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '82%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full relative overflow-hidden"
                    >
                      <motion.div
                        animate={{ x: ['0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Commandes</span>
                    <span className="text-blue-500 font-semibold">24 / 30</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Jeux joués</span>
                    <span className="text-green-500 font-semibold">15 / 20</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Recent Activities */}
            <AnimatedCard className="p-6" glowEffect>
              <h2 className="text-2xl font-bold text-white mb-6">
                Activités récentes
              </h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="p-2 bg-gray-700 rounded-full">
                      <activity.icon className="text-yellow-500" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        {activity.description}
                      </p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                    <span className={`text-sm font-semibold ${
                      activity.points.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {activity.points}
                    </span>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserDashboard;
