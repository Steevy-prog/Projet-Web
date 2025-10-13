import { motion } from 'motion/react';
import { weeklyStats, menuItems, mockOrders } from '../../data/mockData';
import { TrendingUp, DollarSign, ShoppingBag, Award } from 'lucide-react';

export function EmployeeStats() {
  // Calcul des statistiques
  const totalWeeklySales = weeklyStats.reduce((sum, day) => sum + day.sales, 0);
  const totalWeeklyOrders = weeklyStats.reduce((sum, day) => sum + day.orders, 0);
  const averageDailySales = Math.round(totalWeeklySales / weeklyStats.length);
  const averageOrderValue = Math.round(totalWeeklySales / totalWeeklyOrders);

  // Trouver le jour avec le plus de ventes
  const bestDay = weeklyStats.reduce((max, day) => (day.sales > max.sales ? day : max));

  // Calculer les plats les plus commandés
  const dishCounts: { [key: string]: { name: string; count: number; revenue: number } } = {};
  mockOrders.forEach((order) => {
    order.items.forEach((item) => {
      if (!dishCounts[item.menuItem.id]) {
        dishCounts[item.menuItem.id] = {
          name: item.menuItem.name,
          count: 0,
          revenue: 0,
        };
      }
      dishCounts[item.menuItem.id].count += item.quantity;
      dishCounts[item.menuItem.id].revenue += item.menuItem.price * item.quantity;
    });
  });

  const topDishes = Object.values(dishCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Trouver la valeur maximale pour normaliser les barres
  const maxSales = Math.max(...weeklyStats.map((day) => day.sales));

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <TrendingUp className="w-12 h-12 text-[#b88b1f]" />
            <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent">
              Statistiques de Vente
            </h1>
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mb-8" />
          <p className="text-gray-400 text-lg">Analyse des performances hebdomadaires</p>
        </motion.div>

        {/* KPIs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8 hover:border-[#b88b1f]/40 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-[#b88b1f]/20">
                <DollarSign className="w-6 h-6 text-[#b88b1f]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Ventes totales (semaine)</p>
            <p className="text-4xl text-[#b88b1f] font-bold">{totalWeeklySales}€</p>
          </motion.div>

          <motion.div
            className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8 hover:border-[#b88b1f]/40 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-green-500/20">
                <ShoppingBag className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Commandes totales</p>
            <p className="text-4xl text-green-400 font-bold">{totalWeeklyOrders}</p>
          </motion.div>

          <motion.div
            className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8 hover:border-[#b88b1f]/40 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-blue-500/20">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Moyenne par jour</p>
            <p className="text-4xl text-blue-400 font-bold">{averageDailySales}€</p>
          </motion.div>

          <motion.div
            className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8 hover:border-[#b88b1f]/40 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-purple-500/20">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Panier moyen</p>
            <p className="text-4xl text-purple-400 font-bold">{averageOrderValue}€</p>
          </motion.div>
        </div>

        {/* Graphique des ventes hebdomadaires */}
        <motion.div
          className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl text-[#b88b1f] mb-8 font-semibold">Ventes par jour</h2>
          <div className="space-y-6">
            {weeklyStats.map((day, index) => {
              const barWidth = (day.sales / maxSales) * 100;
              const isBestDay = day.day === bestDay.day;

              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-white font-semibold w-24">{day.day}</span>
                    <div className="flex-1 relative">
                      <div className="h-12 bg-black/40 rounded-2xl overflow-hidden">
                        <motion.div
                          className={`h-full rounded-2xl flex items-center justify-end px-4 ${
                            isBestDay
                              ? 'bg-gradient-to-r from-[#b88b1f] to-[#d4a74a]'
                              : 'bg-gradient-to-r from-[#b88b1f]/60 to-[#d4a74a]/60'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${barWidth}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        >
                          <span className="text-black font-bold">{day.sales}€</span>
                        </motion.div>
                      </div>
                      {isBestDay && (
                        <motion.div
                          className="absolute -top-8 right-0 bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black px-3 py-1 rounded-full text-xs font-bold"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 1.5 }}
                        >
                          Meilleur jour
                        </motion.div>
                      )}
                    </div>
                    <span className="text-gray-400 w-32 text-right">
                      {day.orders} commandes
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Plats les plus commandés */}
        <motion.div
          className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h2 className="text-3xl text-[#b88b1f] mb-8 font-semibold">
            Top 5 des plats les plus commandés
          </h2>
          <div className="space-y-4">
            {topDishes.map((dish, index) => (
              <motion.div
                key={dish.name}
                className="flex items-center gap-6 p-6 bg-black/20 rounded-2xl border border-[#b88b1f]/10 hover:border-[#b88b1f]/30 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-xl ${
                    index === 0
                      ? 'bg-gradient-to-br from-[#b88b1f] to-[#d4a74a] text-black'
                      : 'bg-[#b88b1f]/20 text-[#b88b1f]'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-lg mb-1">{dish.name}</p>
                  <p className="text-gray-400 text-sm">
                    {dish.count} commande{dish.count > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl text-[#b88b1f] font-bold">{dish.revenue}€</p>
                  <p className="text-gray-400 text-sm">Revenus générés</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/20 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-green-400 font-semibold mb-2">Performance positive</h3>
                <p className="text-gray-300 text-sm">
                  Le {bestDay.day} a été votre meilleur jour avec {bestDay.sales}€ de ventes et{' '}
                  {bestDay.orders} commandes. Continuez sur cette lancée !
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#b88b1f]/10 to-[#d4a74a]/5 border border-[#b88b1f]/30 rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#b88b1f]/20 rounded-2xl">
                <Award className="w-6 h-6 text-[#b88b1f]" />
              </div>
              <div>
                <h3 className="text-[#b88b1f] font-semibold mb-2">Plat vedette</h3>
                <p className="text-gray-300 text-sm">
                  {topDishes[0]?.name} est votre plat le plus populaire avec {topDishes[0]?.count}{' '}
                  commandes. Assurez-vous d'avoir suffisamment de stock !
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
