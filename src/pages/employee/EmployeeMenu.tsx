import { motion } from 'motion/react';
import { useState } from 'react';
import { menuItems as initialMenuItems } from '../../data/mockData';
import { MenuItem } from '../../types';
import { UtensilsCrossed, Star, AlertTriangle, CheckCircle } from 'lucide-react';

interface MenuItemWithStatus extends MenuItem {
  isAvailable: boolean;
  isDishOfDay: boolean;
}

export function EmployeeMenu() {
  const [menuItemsWithStatus, setMenuItemsWithStatus] = useState<MenuItemWithStatus[]>(
    initialMenuItems.map((item, index) => ({
      ...item,
      isAvailable: true,
      isDishOfDay: index === 0, // Premier plat est le plat du jour par défaut
    }))
  );

  // Marquer un plat comme épuisé/disponible
  const toggleAvailability = (itemId: string) => {
    setMenuItemsWithStatus(
      menuItemsWithStatus.map((item) =>
        item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  // Définir le plat du jour
  const setDishOfDay = (itemId: string) => {
    setMenuItemsWithStatus(
      menuItemsWithStatus.map((item) => ({
        ...item,
        isDishOfDay: item.id === itemId,
      }))
    );
  };

  // Grouper par catégorie
  const categories = Array.from(new Set(menuItemsWithStatus.map((item) => item.category)));

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <UtensilsCrossed className="w-12 h-12 text-[#b88b1f]" />
            <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent">
              Gestion du Menu
            </h1>
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mb-8" />
          <p className="text-gray-400 text-lg">
            Gérez la disponibilité des plats et définissez le plat du jour
          </p>
        </motion.div>

        {/* Statistiques rapides */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-gray-400">Plats disponibles</span>
            </div>
            <p className="text-4xl text-green-400 font-bold">
              {menuItemsWithStatus.filter((item) => item.isAvailable).length}
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <span className="text-gray-400">Plats épuisés</span>
            </div>
            <p className="text-4xl text-red-400 font-bold">
              {menuItemsWithStatus.filter((item) => !item.isAvailable).length}
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-6 h-6 text-[#b88b1f]" />
              <span className="text-gray-400">Plat du jour</span>
            </div>
            <p className="text-xl text-[#b88b1f] font-semibold truncate">
              {menuItemsWithStatus.find((item) => item.isDishOfDay)?.name || 'Non défini'}
            </p>
          </div>
        </motion.div>

        {/* Menu par catégorie */}
        {categories.map((category, catIndex) => (
          <motion.div
            key={category}
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + catIndex * 0.1 }}
          >
            <h2 className="text-3xl text-[#b88b1f] mb-6 font-semibold">{category}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {menuItemsWithStatus
                .filter((item) => item.category === category)
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={`bg-black/30 backdrop-blur-sm border rounded-3xl overflow-hidden transition-all duration-300 ${
                      item.isAvailable
                        ? 'border-[#b88b1f]/20 hover:border-[#b88b1f]/40'
                        : 'border-red-500/30 opacity-75'
                    }`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="relative w-full md:w-48 h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.isDishOfDay && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Plat du jour
                          </div>
                        )}
                        {!item.isAvailable && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <span className="text-red-400 font-bold text-lg">ÉPUISÉ</span>
                          </div>
                        )}
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 p-6">
                        <h3 className="text-xl text-white font-semibold mb-2">{item.name}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        <p className="text-2xl text-[#b88b1f] font-bold mb-4">{item.price}€</p>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => toggleAvailability(item.id)}
                            className={`flex-1 min-w-[140px] px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                              item.isAvailable
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                                : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                            }`}
                          >
                            {item.isAvailable ? (
                              <>
                                <AlertTriangle className="w-4 h-4 inline mr-2" />
                                Marquer épuisé
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 inline mr-2" />
                                Rendre disponible
                              </>
                            )}
                          </button>

                          {item.isAvailable && !item.isDishOfDay && (
                            <button
                              onClick={() => setDishOfDay(item.id)}
                              className="flex-1 min-w-[140px] px-4 py-2 bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black rounded-2xl font-semibold hover:shadow-lg hover:shadow-[#b88b1f]/30 transition-all duration-300"
                            >
                              <Star className="w-4 h-4 inline mr-2" />
                              Plat du jour
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}

        {/* Note informative */}
        <motion.div
          className="bg-[#b88b1f]/10 border border-[#b88b1f]/30 rounded-3xl p-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#b88b1f]/20 rounded-2xl">
              <svg
                className="w-6 h-6 text-[#b88b1f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-[#b88b1f] font-semibold mb-2">Information importante</h3>
              <p className="text-gray-400 text-sm">
                Les modifications apportées ici seront immédiatement visibles pour les clients sur
                le menu public. Assurez-vous de mettre à jour régulièrement la disponibilité des
                plats pour éviter les déceptions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
