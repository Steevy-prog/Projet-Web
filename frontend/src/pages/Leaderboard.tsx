import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';
import { leaderboard } from '../lib/data';
import { useApp } from '../lib/context';

export function Leaderboard() {
  const { user } = useApp();

  const getPositionIcon = (rank: number) => {
    if (rank === 1) return <Crown className="size-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="size-6 text-gray-300" />;
    if (rank === 3) return <Medal className="size-6 text-amber-600" />;
    return <span className="text-muted-foreground">#{rank}</span>;
  };

  const getPositionColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-yellow-500/30';
    if (rank === 2) return 'bg-gradient-to-br from-gray-300/20 to-gray-300/5 border-gray-300/30';
    if (rank === 3) return 'bg-gradient-to-br from-amber-600/20 to-amber-600/5 border-amber-600/30';
    return 'bg-card border-border';
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4"
          >
            <Trophy className="size-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl mb-4 text-foreground">
            <span className="text-primary">Classement</span> Global
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les meilleurs joueurs et leur progression
          </p>
        </motion.div>

        {/* User Position */}
        {user && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl text-primary">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-foreground">Votre Position</p>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl text-primary">#{user.rank}</p>
                <p className="text-sm text-muted-foreground">{user.loyaltyPoints} pts</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {leaderboard.slice(0, 3).map((entry, index) => {
            const positions = [1, 0, 2]; // Reorder for podium effect
            const actualIndex = positions.indexOf(index);
            const heightClasses = ['h-32', 'h-40', 'h-28'];
            
            return (
              <motion.div
                key={entry.userId}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + actualIndex * 0.1 }}
                className={`${getPositionColor(entry.rank)} border rounded-2xl p-4 flex flex-col items-center justify-end ${heightClasses[index]}`}
              >
                <div className="mb-2">{getPositionIcon(entry.rank)}</div>
                <p className="text-sm text-center mb-1 text-foreground line-clamp-1">{entry.userName}</p>
                <p className="text-xs text-primary">{entry.points} pts</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.userId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              className={`${getPositionColor(entry.rank)} border rounded-2xl p-5 flex items-center justify-between ${
                user?.email === entry.userName ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 flex items-center justify-center">
                  {getPositionIcon(entry.rank)}
                </div>
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary">{entry.userName.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-foreground">{entry.userName}</p>
                  <p className="text-sm text-muted-foreground">{entry.gamesPlayed} jeux joués</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <p className="text-xl text-primary">{entry.points}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
                {index < leaderboard.length - 1 && entry.rank < 10 && (
                  <TrendingUp className="size-5 text-green-400" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Total Joueurs', value: '1,234' },
            { label: 'Points Distribués', value: '45,890' },
            { label: 'Jeux Complétés', value: '3,456' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 text-center"
            >
              <p className="text-2xl text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
