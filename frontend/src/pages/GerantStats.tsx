import {useMemo } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Award, Users } from 'lucide-react';
import { popularDishes } from '../lib/employeeData';
import { useEmployee } from '../lib/employeeContext';
import { Order } from '../lib/types';


interface DayStats {
  day: string;
  orders: number;
  revenue: number;
}

// ✅ Compute weekly stats from orders
const computeWeeklyStats = (orders: Order[]): DayStats[] => {
  const getDayName = (date: Date): string => {
    return date.toLocaleDateString("fr-FR", { weekday: "long" });
  };

  const stats: Record<string, DayStats> = orders.reduce(
    (acc, order) => {
      const date = new Date(order.createdAt);
      const day = getDayName(date);

      if (!acc[day]) {
        acc[day] = { day, orders: 0, revenue: 0 };
      }

      acc[day].orders += 1;
      acc[day].revenue += order.total;

      return acc;
    },
    {} as Record<string, DayStats>
  );

  // 🗓️ Optional: sort days Monday → Sunday
  const orderedDays = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];

  return orderedDays
    .map((day) => stats[day])
    .filter(Boolean) as DayStats[];
};

export function GerantStats() {
  const { orders, employees } = useEmployee();
  const weeklyStats = useMemo(() => computeWeeklyStats(orders), [orders]);
const totalOrders = weeklyStats.reduce((sum, day) => sum + day.orders, 0);
const totalRevenue = weeklyStats.reduce((sum, day) => sum + day.revenue, 0);
const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

// ✅ Avoid reduce crash
const bestDay =
  weeklyStats.length > 0
    ? weeklyStats.reduce(
        (max, day) => (day.revenue > max.revenue ? day : max),
        weeklyStats[0]
      )
    : null;

// ✅ Avoid Math.max crash
const maxOrderss =
  weeklyStats.length > 0
    ? Math.max(...weeklyStats.map((day) => day.orders))
    : 0;

const maxRevenues =
  weeklyStats.length > 0
    ? Math.max(...weeklyStats.map((day) => day.revenue))
    : 0;

  const maxOrders = Math.max(...weeklyStats.map((day) => day.orders));
  const maxRevenue = Math.max(...weeklyStats.map((day) => day.revenue));

  // Calculate loyalty/referral stats
  const loyaltyUsage = Math.floor(Math.random() * 150) + 50; // Mock data
  const referralCount = Math.floor(Math.random() * 30) + 10; // Mock data
const popularDishes = useMemo(() => {
  const dishStats: Record<string, { name: string; orders: number; revenue: number }> = {};

  orders.forEach((order) => {
    if (!order.items) return;

    order.items.forEach((item) => {
      const dishName = item.menuItem.nom || `Plat #${item.menuItem.id_article}`;
      const dishPrice = item.menuItem.prix || 0;

      if (!dishStats[dishName]) {
        dishStats[dishName] = { name: dishName, orders: 0, revenue: 0 };
      }

      dishStats[dishName].orders += item.quantity;
      dishStats[dishName].revenue += item.quantity * dishPrice;
    });
  });
    const sorted = Object.values(dishStats).sort((a, b) => b.revenue - a.revenue);
  return sorted.slice(0, 5);
}, [orders]);
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl mb-2 text-foreground">
            Statistiques <span className="text-primary">Générales</span>
          </h1>
          <p className="text-muted-foreground">
            Vue d'ensemble des performances du restaurant
          </p>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-blue-500/10">
                <ShoppingBag className="size-6 text-blue-500" />
              </div>
              <span className="text-muted-foreground">Total Commandes</span>
            </div>
            <p className="text-3xl text-foreground mb-1">{totalOrders}</p>
            <p className="text-sm text-muted-foreground">Cette semaine</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-green-500/10">
                <DollarSign className="size-6 text-green-500" />
              </div>
              <span className="text-muted-foreground">Chiffre d'affaires</span>
            </div>
            <p className="text-3xl text-foreground mb-1">{totalRevenue.toFixed(2)}FCFA</p>
            <p className="text-sm text-muted-foreground">Cette semaine</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-purple-500/10">
                <TrendingUp className="size-6 text-purple-500" />
              </div>
              <span className="text-muted-foreground">Panier moyen</span>
            </div>
            <p className="text-3xl text-foreground mb-1">{averageOrderValue.toFixed(2)}FCFA</p>
            <p className="text-sm text-muted-foreground">Par commande</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-orange-500/10">
                <Award className="size-6 text-orange-500" />
              </div>
              <span className="text-muted-foreground">Meilleur jour</span>
            </div>
            <p className="text-2xl text-foreground mb-1">{bestDay?.day ?? ''}</p>
            <p className="text-sm text-muted-foreground">{bestDay?.revenue.toFixed(2)}</p>
          </motion.div>
        </div>

        {/* Loyalty & Referral Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-primary/10">
                <Award className="size-5 text-primary" />
              </div>
              <h3 className="text-xl text-foreground">Programme de fidélité</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Points distribués</span>
                <span className="text-2xl text-primary">{loyaltyUsage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Récompenses échangées</span>
                <span className="text-2xl text-primary">{Math.floor(loyaltyUsage / 10)}</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-green-500/10">
                <Users className="size-5 text-green-500" />
              </div>
              <h3 className="text-xl text-foreground">Programme de parrainage</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nouveaux parrainages</span>
                <span className="text-2xl text-green-500">{referralCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Bonus distribués</span>
                <span className="text-2xl text-green-500">{referralCount * 10}FCFA</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Orders Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-primary/10">
                <BarChart3 className="size-5 text-primary" />
              </div>
              <h3 className="text-xl text-foreground">Commandes par jour</h3>
            </div>
            <div className="space-y-4">
              {weeklyStats.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{day.day}</span>
                    <span className="text-primary">{day.orders} commandes</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.orders / maxOrders) * 100}%` }}
                      transition={{ delay: 0.8 + index * 0.05, duration: 0.5 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-green-500/10">
                <DollarSign className="size-5 text-green-500" />
              </div>
              <h3 className="text-xl text-foreground">Revenus par jour</h3>
            </div>
            <div className="space-y-4">
              {weeklyStats.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{day.day}</span>
                    <span className="text-green-500">{day.revenue.toFixed(2)}FCFA</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.revenue / maxRevenue) * 100}%` }}
                      transition={{ delay: 0.8 + index * 0.05, duration: 0.5 }}
                      className="h-full bg-green-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sales by Dish */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8"
        >
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-orange-500/10">
                <Award className="size-5 text-orange-500" />
              </div>
              <h3 className="text-xl text-foreground">Répartition des ventes par plat</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground">Rang</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">Plat</th>
                    <th className="text-right py-3 px-4 text-muted-foreground">Commandes</th>
                    <th className="text-right py-3 px-4 text-muted-foreground">Revenus</th>
                    <th className="text-right py-3 px-4 text-muted-foreground">Part</th>
                  </tr>
                </thead>
                <tbody>
                  {popularDishes.map((dish, index) => {
                    const percentage = ((dish.revenue / totalRevenue) * 100).toFixed(1);
                    return (
                      <motion.tr
                        key={dish.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 + index * 0.1 }}
                        className="border-b border-border last:border-0 hover:bg-secondary transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {index === 0 && <span className="text-2xl">🥇</span>}
                            {index === 1 && <span className="text-2xl">🥈</span>}
                            {index === 2 && <span className="text-2xl">🥉</span>}
                            {index > 2 && (
                              <span className="text-muted-foreground">#{index + 1}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-foreground">{dish.name}</td>
                        <td className="py-4 px-4 text-right text-primary">{dish.orders}</td>
                        <td className="py-4 px-4 text-right text-green-500">
                          {dish.revenue.toFixed(2)}FCFA
                        </td>
                        <td className="py-4 px-4 text-right text-muted-foreground">
                          {percentage}%
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
