import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Coins } from 'lucide-react';
import { games } from '../lib/data';
import { GameCard } from '../components/GameCard';
import { Game } from '../lib/types';
import { Button } from '../components/ui/button';
import { useApp } from '../lib/context';
import { toast } from 'sonner@2.0.3';

export function Games() {
  const { user, setUser } = useApp();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCompleteGame = () => {
    if (user) {
      const pointsEarned = selectedGame?.pointsReward || 0;
      setUser({
        ...user,
        loyaltyPoints: user.loyaltyPoints + pointsEarned,
        gamesPlayed: user.gamesPlayed + 1,
      });
      toast.success(`Félicitations ! Vous avez gagné ${pointsEarned} points !`);
    }
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl mb-4 text-foreground">
            Jeux & <span className="text-primary">Événements</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jouez à nos mini-jeux interactifs et gagnez des points de fidélité
          </p>
        </motion.div>

        {/* User Points */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto mb-12 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Coins className="size-6 text-primary" />
            <span className="text-3xl text-primary">{user?.loyaltyPoints || 0}</span>
          </div>
          <p className="text-sm text-muted-foreground">Points de fidélité</p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <GameCard game={game} onPlay={handlePlayGame} />
            </motion.div>
          ))}
        </div>

        {/* Events Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl mb-6 text-foreground text-center">
            Événements <span className="text-primary">Spéciaux</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Double Points Weekend',
                description: 'Gagnez 2x plus de points sur tous les jeux ce weekend',
                date: '25-27 Oct 2025',
                status: 'Bientôt',
              },
              {
                title: 'Tournoi Mensuel',
                description: 'Affrontez les meilleurs mangeur et remportez des prix exclusifs',
                date: '20 Oct 2025',
                status: 'Inscription ouverte',
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-foreground">{event.title}</h3>
                  <span className="px-3 py-1 rounded-full text-xs bg-primary/20 text-primary">
                    {event.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                <p className="text-sm text-primary">{event.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedGame(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-foreground">{selectedGame.title}</h3>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="text-center py-12 space-y-4">
                <div className="text-6xl mb-4">🎮</div>
                <p className="text-muted-foreground">
                  Le jeu "{selectedGame.title}" sera bientôt disponible !
                </p>
                <p className="text-sm text-primary">
                  Récompense : {selectedGame.pointsReward} points
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCompleteGame}
                  className="flex-1 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Simuler victoire
                </Button>
                <Button
                  onClick={() => setSelectedGame(null)}
                  variant="outline"
                  className="flex-1 rounded-2xl border-border"
                >
                  Fermer
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
