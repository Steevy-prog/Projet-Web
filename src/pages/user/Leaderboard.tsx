import { motion } from 'motion/react';
import { leaderboard, mockUser } from '../../data/mockData';
import { Trophy, Medal, Award } from 'lucide-react';

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400/20 to-yellow-600/10 border-yellow-400/30';
      case 2:
        return 'from-gray-300/20 to-gray-500/10 border-gray-300/30';
      case 3:
        return 'from-amber-600/20 to-amber-800/10 border-amber-600/30';
      default:
        return 'from-[#b88b1f]/10 to-transparent border-[#b88b1f]/20';
    }
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent mb-6">
            Classement
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mx-auto mb-8" />
          <p className="text-gray-400 text-lg">
            Les meilleurs clients du restaurant Zeduc
          </p>
        </motion.div>

        {/* User's Rank Card */}
        <motion.div
          className="bg-gradient-to-br from-[#b88b1f]/20 to-[#d4a74a]/10 border border-[#b88b1f]/40 rounded-3xl p-6 mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-gray-300 text-sm mb-2">Votre classement</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#b88b1f] flex items-center justify-center text-black">
                #{mockUser.rank}
              </div>
              <div>
                <h3 className="text-xl">{mockUser.name}</h3>
                <p className="text-gray-400 text-sm">{mockUser.ordersCount} commandes</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl text-[#b88b1f]">{mockUser.loyaltyPoints}</p>
              <p className="text-gray-400 text-sm">points</p>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard List */}
        <div className="space-y-4">
          {leaderboard.map((entry, index) => {
            const isCurrentUser = entry.name === mockUser.name;
            
            return (
              <motion.div
                key={entry.rank}
                className={`bg-gradient-to-br ${getRankColor(entry.rank)} backdrop-blur-sm border rounded-3xl p-6 ${
                  isCurrentUser ? 'ring-2 ring-[#b88b1f]' : ''
                }`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center relative">
                      {getRankIcon(entry.rank) || (
                        <span className="text-gray-400">#{entry.rank}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl mb-1">
                        {entry.name}
                        {isCurrentUser && (
                          <span className="ml-2 text-sm text-[#b88b1f]">(Vous)</span>
                        )}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {entry.orders} commandes
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-3xl ${
                      entry.rank <= 3 ? 'text-[#b88b1f]' : 'text-gray-300'
                    }`}>
                      {entry.points}
                    </p>
                    <p className="text-gray-400 text-sm">points</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info Card */}
        <motion.div
          className="mt-12 bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl mb-4 text-[#b88b1f]">Comment gagner des points ?</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-[#b88b1f] mt-1">•</span>
              <span>Commandez vos plats préférés (+50 points par commande)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#b88b1f] mt-1">•</span>
              <span>Participez aux mini-jeux (jusqu'à 100 points)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#b88b1f] mt-1">•</span>
              <span>Assistez aux événements spéciaux (points doublés)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#b88b1f] mt-1">•</span>
              <span>Parrainez vos amis (+200 points par parrainage)</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
