import React from 'react';
import { motion } from 'motion/react';
import { Coins, Play } from 'lucide-react';
import { Game } from '../lib/types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export function GameCard({ game, onPlay }: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-card border border-border rounded-2xl overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-0">
          <Coins className="size-3 mr-1" />
          {game.pointsReward} pts
        </Badge>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-foreground mb-2">{game.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{game.description}</p>
        </div>

        <Button
          onClick={() => onPlay(game)}
          className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Play className="size-4 mr-2" />
          Jouer maintenant
        </Button>
      </div>
    </motion.div>
  );
}
