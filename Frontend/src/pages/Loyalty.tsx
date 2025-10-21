import React from 'react';
import { motion } from 'motion/react';
import { Gift, Star, Sparkles, Check } from 'lucide-react';
import { rewards } from '../lib/data';
import { useApp } from '../lib/context';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export function Loyalty() {
  const { user, setUser } = useApp();

  const handleRedeemReward = (reward: any) => {
    if (!user) return;
    
    if (user.loyaltyPoints >= reward.pointsCost) {
      setUser({
        ...user,
        loyaltyPoints: user.loyaltyPoints - reward.pointsCost,
      });
      toast.success(`Félicitations ! Vous avez échangé ${reward.title}`);
    } else {
      toast.error(`Il vous manque ${reward.pointsCost - user.loyaltyPoints} points pour cette récompense`);
    }
  };

  const loyaltyTiers = [
    { name: 'Bronze', minPoints: 0, benefits: ['Accès aux jeux', 'Points sur achats'] },
    { name: 'Argent', minPoints: 200, benefits: ['Bonus 10%', 'Récompenses exclusives'] },
    { name: 'Or', minPoints: 500, benefits: ['Bonus 20%', 'Événements VIP'] },
    { name: 'Platine', minPoints: 1000, benefits: ['Bonus 30%', 'Cadeaux premium'] },
  ];

  const currentTier = loyaltyTiers
    .filter((tier) => (user?.loyaltyPoints || 0) >= tier.minPoints)
    .pop();
  const nextTier = loyaltyTiers.find((tier) => (user?.loyaltyPoints || 0) < tier.minPoints);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
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
            <Gift className="size-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl mb-4 text-foreground">
            Programme de <span className="text-primary">Fidélité</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Gagnez des points à chaque commande et jeu, puis échangez-les contre des récompenses exclusives
          </p>
        </motion.div>

        {/* Current Points & Tier */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <Star className="size-6 text-primary fill-primary" />
                <h3 className="text-foreground">Niveau {currentTier?.name}</h3>
              </div>
              <p className="text-3xl text-primary mb-2">{user?.loyaltyPoints || 0} points</p>
              {nextTier && (
                <p className="text-sm text-muted-foreground">
                  {nextTier.minPoints - (user?.loyaltyPoints || 0)} points pour atteindre {nextTier.name}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {currentTier?.benefits.map((benefit, index) => (
                <Badge
                  key={index}
                  className="bg-primary/20 text-primary border-primary/30"
                >
                  <Check className="size-3 mr-1" />
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loyalty Tiers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl mb-6 text-foreground text-center">
            Niveaux de <span className="text-primary">Fidélité</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {loyaltyTiers.map((tier, index) => {
              const isCurrentTier = tier.name === currentTier?.name;
              const isUnlocked = (user?.loyaltyPoints || 0) >= tier.minPoints;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`rounded-2xl p-6 border ${
                    isCurrentTier
                      ? 'bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 ring-2 ring-primary'
                      : isUnlocked
                      ? 'bg-card border-border'
                      : 'bg-card border-border opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-foreground">{tier.name}</h3>
                    {isCurrentTier && (
                      <Badge className="bg-primary text-primary-foreground">Actuel</Badge>
                    )}
                  </div>
                  <p className="text-sm text-primary mb-4">{tier.minPoints}+ points</p>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className={`size-4 mt-0.5 flex-shrink-0 ${isUnlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={isUnlocked ? 'text-foreground' : 'text-muted-foreground'}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Rewards Catalog */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl mb-6 text-foreground text-center">
            Catalogue des <span className="text-primary">Récompenses</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward, index) => {
              const canAfford = (user?.loyaltyPoints || 0) >= reward.pointsCost;
              
              return (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`bg-card border rounded-2xl overflow-hidden ${
                    reward.available ? 'border-border' : 'border-border opacity-60'
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={reward.image}
                      alt={reward.title}
                      className="w-full h-full object-cover"
                    />
                    {!reward.available && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge className="bg-destructive text-destructive-foreground">
                          Indisponible
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="mb-2 text-foreground">{reward.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{reward.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-primary">
                        <Sparkles className="size-4" />
                        <span>{reward.pointsCost} pts</span>
                      </div>
                      <Button
                        onClick={() => handleRedeemReward(reward)}
                        disabled={!reward.available || !canAfford}
                        size="sm"
                        className={`rounded-full ${
                          canAfford && reward.available
                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                            : ''
                        }`}
                      >
                        Échanger
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* How it Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-card border border-border rounded-2xl p-8"
        >
          <h3 className="text-2xl mb-6 text-center text-foreground">
            Comment <span className="text-primary">ça marche ?</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🛒', title: 'Commandez', desc: 'Gagnez 10 points par euro dépensé' },
              { icon: '🎮', title: 'Jouez', desc: 'Participez aux jeux et gagnez jusqu\'à 100 points' },
              { icon: '🎁', title: 'Échangez', desc: 'Utilisez vos points pour des récompenses exclusives' },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{step.icon}</div>
                <h4 className="mb-2 text-foreground">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
