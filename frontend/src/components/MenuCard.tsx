import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Star, Sparkles } from 'lucide-react';
import { MenuItem } from '../lib/types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { formatPriceFromEur } from '../lib/formatPrice';
import { useFoodAI } from '../hooks/useFoodAI';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
}

export function MenuCard({ item, onAddToCart }: MenuCardProps) {
  const [showAIDescription, setShowAIDescription] = useState(false);
  const { tooltipText, isVisible, showTooltip, hideTooltip } = useFoodAI(item.nom);
  
  // Gestion du survol
  const handleMouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAIDescription(true);
    showTooltip();
  };
  
  const handleMouseLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAIDescription(false);
    hideTooltip();
  };
  
  // Gestion du clic pour éviter les conflits
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-card border border-border rounded-2xl overflow-hidden group cursor-pointer card-animated hover-gold-lift"
    >
      <div 
        className="relative h-48 overflow-hidden group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Conteneur de l'image avec effet de flou au survol */}
        <div className="relative w-full h-full">
          {/* Image avec flou conditionnel */}
          <ImageWithFallback
            src={item.image}
            alt={item.nom}
            className={`w-full h-full object-cover transition-all duration-500 ${
              showAIDescription ? 'blur-lg scale-110' : 'blur-0 scale-100'
            }`}
            style={{
              filter: showAIDescription ? 'blur(12px) brightness(0.7)' : 'none',
              transform: showAIDescription ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        </div>
        
        {/* Overlay de survol */}
        <div 
          className="absolute inset-0 flex items-center justify-center p-4 text-center"
          onClick={handleClick}
        >
          {/* Badge Populaire */}
          {item.popular && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-0 animate-gold-pulse z-10">
              <Star className="size-3 mr-1 fill-current animate-gold-sparkle" />
              Populaire
            </Badge>
          )}
          
          {/* Description du plat */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: showAIDescription ? 1 : 0,
              y: showAIDescription ? 0 : 10
            }}
            transition={{ duration: 0.3 }}
            className="px-4 py-2 w-full"
          >
            <div className="bg-white/95 text-black text-base font-medium px-4 py-3 rounded-lg shadow-lg border border-gray-100">
              {tooltipText}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-foreground hover-gold-brighten">{item.nom}</h3>
            <span className="text-primary whitespace-nowrap hover-gold-brighten">{formatPriceFromEur(item.prix)}</span>
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
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground hover-gold-scale"
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
