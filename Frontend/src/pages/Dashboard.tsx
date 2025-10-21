import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Gamepad2, ShoppingBag, TrendingUp, Award } from 'lucide-react';
import { useApp } from '../lib/context';
import { StatCard } from '../components/StatCard';
import { Progress } from '../components/ui/progress';

export function Dashboard() {
  const { user } = useApp();

  const stats = [
    {
      icon: Gamepad2,
      label: 'Jeux joués',
      value: user?.gamesPlayed || 0,
      trend: '+3 ce mois',
    },
    {
      icon: Trophy,
      label: 'Points de fidélité',
      value: user?.loyaltyPoints || 0,
      trend: '+50 cette semaine',
    },
    {
      icon: ShoppingBag,
      label: 'Commandes',
      value: user?.ordersCount || 0,
      trend: '+2 ce mois',
    },
    {
      icon: Award,
      label: 'Classement',
      value: `#${user?.rank || 0}`,
      trend: 'Top 20%',
    },
  ];

  const nextRewardPoints = 500;
  const currentPoints = user?.loyaltyPoints || 0;
  const progress = (currentPoints / nextRewardPoints) * 100;

  const recentActivities = [
    { title: 'Quiz Culinaire complété', points: 50, date: 'Il y a 2 jours' },
    { title: 'Commande #1234 validée', points: 30, date: 'Il y a 3 jours' },
    { title: 'Roue de la Fortune', points: 100, date: 'Il y a 5 jours' },
    { title: 'Commande #1233 validée', points: 25, date: 'Il y a 1 semaine' },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl mb-2 text-foreground">
            Mon <span className="text-gold-shine animate-gold-glow">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Suivez vos performances et vos récompenses
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress to Next Reward */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-2xl p-8 card-animated hover-gold-lift bg-gold-gradient"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-primary/10 animate-gold-pulse">
                <TrendingUp className="size-6 text-primary animate-gold-sparkle" />
              </div>
              <div>
                <h3 className="text-foreground hover-gold-brighten">Prochaine Récompense</h3>
                <p className="text-sm text-primary">
                  {nextRewardPoints - currentPoints} points restants
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progression</span>
                <span className="text-primary hover-gold-brighten">
                  {currentPoints} / {nextRewardPoints} pts
                </span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Continuez à commander et à jouer pour débloquer un menu complet gratuit !
              </p>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-2xl p-8 card-animated hover-gold-lift"
          >
            <h3 className="mb-6 text-foreground text-gold-gradient">Activités Récentes</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start justify-between pb-4 border-b border-border last:border-0 last:pb-0 hover-gold-glow"
                >
                  <div>
                    <p className="text-foreground mb-1 hover-gold-brighten">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <span className="text-primary hover-gold-brighten">+{activity.points}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <h2 className="text-2xl mb-6 text-foreground">
            <span className="text-gold-shine">Succès</span> Débloqués
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎮', title: 'Joueur Débutant', desc: '5 jeux complétés' },
              { icon: '🍔', title: 'Gourmet', desc: '10 commandes passées' },
              { icon: '⭐', title: 'Fidèle', desc: '100 points accumulés' },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-card border border-primary/30 rounded-2xl p-6 text-center card-animated hover-gold-lift border-gold-gradient"
              >
                <div className="text-4xl mb-3 animate-gold-sparkle">{achievement.icon}</div>
                <h4 className="mb-2 text-foreground text-gold-gradient">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
