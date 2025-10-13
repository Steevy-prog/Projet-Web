import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Plus } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import AnimatedCard from '../../components/common/AnimatedCard';
import Button from '../../components/common/Button';

const MenuPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous', count: 24 },
    { id: 'entrees', name: 'Entrées', count: 6 },
    { id: 'plats', name: 'Plats principaux', count: 12 },
    { id: 'desserts', name: 'Desserts', count: 4 },
    { id: 'boissons', name: 'Boissons', count: 8 },
  ];

  const menuItems = [
    {
      id: 1,
      name: 'Taro Sauce Jaune',
      description: 'Un volcan de Taro présenté de sauce jaune et de trip de chevron tenuée.',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'plats',
      isSpecialty: true,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Homard Thermidor',
      description: 'Homard gratiné à la sauce thermidor, relevé d\'une pointe de cognac et d\'herbes fraîches.',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'plats',
      isSpecialty: true,
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Triade de Brochette',
      description: 'Fournée de brochette de porc, boeuf, chèvre, poulet grillé et frit à la perfection.',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'plats',
      isSpecialty: true,
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Salade César Revisitée',
      description: 'Salade fraîche avec croûtons maison, parmesan et notre sauce César signature.',
      price: 8000,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'entrees',
      isSpecialty: false,
      rating: 4.5,
    },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout variant="main">
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-yellow-500 mb-4">Notre Menu</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez nos créations culinaires exceptionnelles, préparées avec passion et les meilleurs ingrédients.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un plat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {category.name} ({category.count})
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Menu Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => (
              <AnimatedCard
                key={item.id}
                delay={index * 0.1}
                hover3d
                glowEffect
                className="overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {item.isSpecialty && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      Spécialité
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="text-yellow-500" size={14} />
                    <span className="text-white text-sm">{item.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-yellow-500">
                      {item.price.toLocaleString()} FCFA
                    </span>
                    <Button
                      size="sm"
                      icon={Plus}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black"
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-white mb-2">Aucun plat trouvé</h3>
              <p className="text-gray-400">
                Essayez de modifier vos critères de recherche ou de filtrage.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MenuPage;
