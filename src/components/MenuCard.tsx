import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star } from 'lucide-react';
import { MenuItem } from '../lib/types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
}

export function MenuCard({ item, onAddToCart }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-card border border-border rounded-2xl overflow-hidden group cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.popular && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-0">
            <Star className="size-3 mr-1 fill-current" />
            Populaire
          </Badge>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-foreground">{item.name}</h3>
            <span className="text-primary whitespace-nowrap">{item.price.toFixed(2)}€</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="rounded-full">
            {item.category}
          </Badge>

          {onAddToCart && (
            <Button
              onClick={() => onAddToCart(item)}
              size="sm"
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <ShoppingCart className="size-4 mr-2" />
              Ajouter
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
