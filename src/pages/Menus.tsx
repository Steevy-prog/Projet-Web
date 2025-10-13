import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { menuItems } from '../data/mockData';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export function Menus() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  
  const categories = ['Tous', ...new Set(menuItems.map((item) => item.category))];
  
  const filteredMenus = selectedCategory === 'Tous' 
    ? menuItems 
    : menuItems.filter((item) => item.category === selectedCategory);

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
            Nos Menus
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mx-auto mb-8" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Découvrez notre sélection de plats raffinés préparés par notre chef étoilé
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#b88b1f] text-black'
                  : 'bg-black/30 border border-[#b88b1f]/20 text-gray-300 hover:border-[#b88b1f]/40'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenus.map((menu, index) => (
            <motion.div
              key={menu.id}
              className="group bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl overflow-hidden hover:border-[#b88b1f]/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <span className="absolute top-4 right-4 px-4 py-2 bg-[#b88b1f]/90 backdrop-blur-sm text-black text-sm rounded-2xl">
                  {menu.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-2xl mb-3">{menu.name}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {menu.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl text-[#b88b1f]">{menu.price}€</span>
                  <button className="flex items-center gap-2 px-5 py-3 bg-[#b88b1f]/20 border border-[#b88b1f]/30 text-[#b88b1f] rounded-2xl hover:bg-[#b88b1f] hover:text-black transition-all duration-300">
                    <ShoppingCart className="w-4 h-4" />
                    Acheter
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
