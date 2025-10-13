import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Zap, Target, Brain, Clock } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import AnimatedCard from '../../components/common/AnimatedCard';
import Button from '../../components/common/Button';

const UserGames: React.FC = () => {
  const [_selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: 'quiz-culinaire',
      name: 'Quiz Culinaire',
      description: 'Testez vos connaissances sur la gastronomie et gagnez des points !',
      icon: Brain,
      difficulty: 'Facile',
      points: '50-100',
      duration: '5 min',
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      id: 'memory-ingredients',
      name: 'Mémoire des Ingrédients',
      description: 'Mémorisez les ingrédients et retrouvez les paires !',
      icon: Target,
      difficulty: 'Moyen',
      points: '75-150',
      duration: '8 min',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
    {
      id: 'speed-cooking',
      name: 'Speed Cooking',
      description: 'Préparez les plats le plus rapidement possible !',
      icon: Zap,
      difficulty: 'Difficile',
      points: '100-200',
      duration: '10 min',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
    },
    {
      id: 'recipe-puzzle',
      name: 'Puzzle Recette',
      description: 'Reconstituez les étapes de nos recettes signature !',
      icon: Gamepad2,
      difficulty: 'Moyen',
      points: '80-160',
      duration: '12 min',
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Chef Master', score: 15420, avatar: 'CM' },
    { rank: 2, name: 'Cooking Pro', score: 14850, avatar: 'CP' },
    { rank: 3, name: 'Alexandre', score: 12850, avatar: 'A', isCurrentUser: true },
    { rank: 4, name: 'Food Lover', score: 11200, avatar: 'FL' },
    { rank: 5, name: 'Taste Expert', score: 10950, avatar: 'TE' },
  ];

  const achievements = [
    { name: 'Premier Quiz', description: 'Complétez votre premier quiz', unlocked: true },
    { name: 'Série de 5', description: 'Gagnez 5 jeux consécutifs', unlocked: true },
    { name: 'Speed Master', description: 'Terminez Speed Cooking en moins de 3 min', unlocked: false },
    { name: 'Perfectionniste', description: 'Obtenez un score parfait', unlocked: false },
  ];

  return (
    <Layout variant="user">
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center">
              <Gamepad2 className="mr-3 text-yellow-500" size={40} />
              Centre de Jeux
            </h1>
            <p className="text-gray-400 text-lg">
              Jouez, amusez-vous et gagnez des points de fidélité !
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Games Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">Jeux Disponibles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {games.map((game, index) => (
                  <AnimatedCard
                    key={game.id}
                    delay={index * 0.1}
                    hover3d
                    glowEffect
                    className="p-6 cursor-pointer"
                    onClick={() => setSelectedGame(game.id)}
                  >
                    <div className={`inline-flex p-4 rounded-full ${game.bgColor} mb-4`}>
                      <game.icon className={`bg-gradient-to-r ${game.color} bg-clip-text text-transparent`} size={32} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{game.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Difficulté:</span>
                        <span className={`font-semibold ${
                          game.difficulty === 'Facile' ? 'text-green-500' :
                          game.difficulty === 'Moyen' ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {game.difficulty}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Points:</span>
                        <span className="text-yellow-500 font-semibold">{game.points}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Durée:</span>
                        <span className="text-blue-500 font-semibold">{game.duration}</span>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      className="w-full"
                      glow
                    >
                      Jouer Maintenant
                    </Button>
                  </AnimatedCard>
                ))}
              </div>

              {/* Achievements */}
              <h2 className="text-2xl font-bold text-white mb-6">Succès</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      achievement.unlocked
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-gray-800/50 border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        achievement.unlocked ? 'bg-yellow-500' : 'bg-gray-600'
                      }`}>
                        <Trophy className={achievement.unlocked ? 'text-black' : 'text-gray-400'} size={20} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${
                          achievement.unlocked ? 'text-yellow-500' : 'text-gray-400'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className="text-gray-400 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Leaderboard Sidebar */}
            <div>
              <AnimatedCard className="p-6" glowEffect>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Trophy className="mr-2 text-yellow-500" size={24} />
                  Classement
                </h2>
                
                <div className="space-y-4">
                  {leaderboard.map((player, index) => (
                    <motion.div
                      key={player.rank}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        player.isCurrentUser
                          ? 'bg-yellow-500/20 border border-yellow-500/30'
                          : 'bg-gray-800/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        player.rank === 1 ? 'bg-yellow-500 text-black' :
                        player.rank === 2 ? 'bg-gray-400 text-black' :
                        player.rank === 3 ? 'bg-orange-500 text-black' :
                        'bg-gray-600 text-white'
                      }`}>
                        {player.rank}
                      </div>
                      
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {player.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <p className={`font-medium ${
                          player.isCurrentUser ? 'text-yellow-500' : 'text-white'
                        }`}>
                          {player.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {player.score.toLocaleString()} pts
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg text-center">
                  <Clock className="text-yellow-500 mx-auto mb-2" size={24} />
                  <p className="text-sm text-gray-400">
                    Classement mis à jour toutes les heures
                  </p>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserGames;
