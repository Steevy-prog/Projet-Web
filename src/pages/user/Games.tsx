import { motion } from 'motion/react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { games } from '../../data/mockData';
import { Play, Trophy } from 'lucide-react';
import { useState } from 'react';

export function Games() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const playGame = (gameId: string) => {
    setSelectedGame(gameId);
    // Mock game play
    setTimeout(() => {
      alert('Félicitations ! Vous avez gagné des points !');
      setSelectedGame(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent mb-6">
            Jeux & Événements
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mx-auto mb-8" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Participez à nos mini-jeux et gagnez des points de fidélité
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="group bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl overflow-hidden hover:border-[#b88b1f]/40 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                <div className="absolute top-4 right-4 px-4 py-2 bg-[#b88b1f]/90 backdrop-blur-sm rounded-2xl flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-black" />
                  <span className="text-black">+{game.pointsReward} pts</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl mb-3">{game.name}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {game.description}
                </p>

                <button
                  onClick={() => playGame(game.id)}
                  disabled={selectedGame === game.id}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black rounded-2xl hover:shadow-lg hover:shadow-[#b88b1f]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-4 h-4" />
                  {selectedGame === game.id ? 'En cours...' : 'Jouer'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Events Section */}
        <motion.div
          className="mt-16 bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl mb-6 text-[#b88b1f]">Événements Spéciaux</h2>
          
          <div className="space-y-4">
            {[
              {
                title: 'Soirée Dégustation',
                date: '25 Octobre 2025',
                points: 'Double points',
                description: 'Menu spécial 7 services avec accord mets-vins',
              },
              {
                title: 'Challenge du Chef',
                date: '15 Novembre 2025',
                points: '500 points',
                description: 'Testez vos talents culinaires lors de notre atelier',
              },
              {
                title: 'Tournoi Gastronomique',
                date: '5 Décembre 2025',
                points: '1000 points',
                description: 'Compétition entre nos meilleurs clients gourmets',
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                className="p-6 bg-black/20 rounded-2xl border border-[#b88b1f]/10 hover:border-[#b88b1f]/30 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl mb-2 text-white">{event.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{event.description}</p>
                    <p className="text-gray-500 text-sm">{event.date}</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#b88b1f]/20 border border-[#b88b1f]/30 rounded-2xl">
                    <Trophy className="w-4 h-4 text-[#b88b1f]" />
                    <span className="text-[#b88b1f]">{event.points}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
