import { motion } from 'motion/react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { rewards, mockUser } from '../../data/mockData';
import { Gift, Star, Award } from 'lucide-react';

export function Loyalty() {
  const canAfford = (pointsCost: number) => {
    return mockUser.loyaltyPoints >= pointsCost;
  };

  const handleRedeem = (reward: any) => {
    if (canAfford(reward.pointsCost)) {
      alert(`Récompense "${reward.name}" échangée avec succès !`);
    } else {
      alert('Vous n\'avez pas assez de points pour cette récompense.');
    }
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent mb-6">
            Programme de Fidélité
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mx-auto mb-8" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Échangez vos points contre des récompenses exclusives
          </p>
        </motion.div>

        {/* Points Balance */}
        <motion.div
          className="bg-gradient-to-br from-[#b88b1f]/20 to-[#d4a74a]/10 border border-[#b88b1f]/40 rounded-3xl p-8 mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#b88b1f]/30 flex items-center justify-center">
                <Star className="w-8 h-8 text-[#b88b1f]" />
              </div>
              <div>
                <p className="text-gray-400 mb-1">Vos points disponibles</p>
                <p className="text-4xl text-[#b88b1f]">{mockUser.loyaltyPoints}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Niveau</p>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#b88b1f]" />
                  <p className="text-xl text-white">Or</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Prochain niveau</p>
                <p className="text-xl text-white">250 pts</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#b88b1f] to-[#d4a74a]"
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-2">
              75% avant le niveau Platine
            </p>
          </div>
        </motion.div>

        {/* How it Works */}
        <motion.div
          className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-3xl mb-6 text-[#b88b1f]">Comment ça marche ?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Gagnez des points',
                description: 'Commandez, jouez et participez aux événements',
              },
              {
                step: '2',
                title: 'Cumulez vos points',
                description: 'Suivez votre progression et débloquez des niveaux',
              },
              {
                step: '3',
                title: 'Échangez vos points',
                description: 'Profitez de récompenses exclusives',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#b88b1f] text-black flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rewards Catalog */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl mb-8 text-center text-[#b88b1f]">Catalogue de Récompenses</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward, index) => {
              const affordable = canAfford(reward.pointsCost);
              
              return (
                <motion.div
                  key={reward.id}
                  className={`group bg-black/30 backdrop-blur-sm border rounded-3xl overflow-hidden transition-all duration-300 ${
                    affordable
                      ? 'border-[#b88b1f]/40 hover:border-[#b88b1f]/60'
                      : 'border-[#b88b1f]/10 opacity-60'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={affordable ? { y: -5 } : {}}
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={reward.image}
                      alt={reward.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    
                    {!affordable && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <p className="text-white">Points insuffisants</p>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg mb-2">{reward.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {reward.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-[#b88b1f]" />
                        <span className="text-[#b88b1f]">{reward.pointsCost} pts</span>
                      </div>
                      <button
                        onClick={() => handleRedeem(reward)}
                        disabled={!affordable}
                        className={`px-4 py-2 rounded-2xl text-sm transition-all duration-300 ${
                          affordable
                            ? 'bg-[#b88b1f] text-black hover:shadow-lg hover:shadow-[#b88b1f]/30'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Échanger
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
