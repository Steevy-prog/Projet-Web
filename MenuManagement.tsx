import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  available: boolean;
}

export function MenuManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      title: 'Filet de Bœuf Wagyu',
      description: 'Tendre filet de bœuf Wagyu accompagné de légumes de saison',
      price: '45000',
      category: 'Plats Principaux',
      image: 'https://images.unsplash.com/photo-1706650616334-97875fae8521?w=400',
      available: true
    },
    {
      id: 2,
      title: 'Plateau de Fruits de Mer',
      description: 'Sélection raffinée de fruits de mer frais',
      price: '38000',
      category: 'Plats Principaux',
      image: 'https://images.unsplash.com/photo-1695606452818-f22013a5c2de?w=400',
      available: true
    },
    {
      id: 3,
      title: 'Pasta Truffe Noire',
      description: 'Pâtes fraîches à la truffe noire et parmesan vieilli',
      price: '28000',
      category: 'Plats Principaux',
      image: 'https://images.unsplash.com/photo-1682377651820-0234f2abec85?w=400',
      available: false
    }
  ]);

  const categories = ['Entrées', 'Plats Principaux', 'Desserts', 'Boissons'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-yellow-600">Gestion du Menu</h2>
          <p className="text-zinc-500 text-sm mt-1">
            {menuItems.length} plats au total
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 rounded-lg transition-all duration-300"
        >
          <Plus size={20} />
          <span>Ajouter un plat</span>
        </motion.button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border border-yellow-700/30 rounded-lg text-yellow-500 text-sm">
          Tous
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 hover:border-yellow-700/30 rounded-lg text-zinc-400 hover:text-zinc-200 text-sm transition-all duration-300"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group relative bg-zinc-950/50 border border-yellow-900/20 hover:border-yellow-700/40 rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-500"
          >
            {/* Availability Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`px-3 py-1 rounded-full text-xs ${
                item.available 
                  ? 'bg-green-900/50 text-green-400 border border-green-700/30' 
                  : 'bg-red-900/50 text-red-400 border border-red-700/30'
              }`}>
                {item.available ? 'Disponible' : 'Indisponible'}
              </span>
            </div>

            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <div>
                <h3 className="text-lg text-yellow-600 group-hover:text-yellow-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-yellow-900/20">
                <span className="text-lg text-zinc-200">
                  {new Intl.NumberFormat('fr-FR').format(parseInt(item.price))} FCFA
                </span>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-yellow-600 hover:bg-yellow-600/10 rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-zinc-950 border border-yellow-900/30 rounded-lg p-8 z-50 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl text-yellow-600">Ajouter un nouveau plat</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Nom du plat</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 focus:border-yellow-700/70 focus:outline-none rounded-lg text-zinc-200 transition-colors"
                      placeholder="Ex: Filet de Bœuf"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Prix (FCFA)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 focus:border-yellow-700/70 focus:outline-none rounded-lg text-zinc-200 transition-colors"
                      placeholder="45000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Catégorie</label>
                  <select className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 focus:border-yellow-700/70 focus:outline-none rounded-lg text-zinc-200 transition-colors">
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 focus:border-yellow-700/70 focus:outline-none rounded-lg text-zinc-200 transition-colors resize-none"
                    placeholder="Décrivez le plat..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">URL de l'image</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-900/30 focus:border-yellow-700/70 focus:outline-none rounded-lg text-zinc-200 transition-colors"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available"
                    className="w-4 h-4 accent-yellow-600"
                    defaultChecked
                  />
                  <label htmlFor="available" className="text-sm text-zinc-400">
                    Plat disponible
                  </label>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 rounded-lg transition-all duration-300"
                  >
                    Ajouter le plat
                  </motion.button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 bg-zinc-900/50 border border-yellow-900/20 hover:border-yellow-700/30 rounded-lg text-zinc-400 hover:text-zinc-200 transition-all duration-300"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}