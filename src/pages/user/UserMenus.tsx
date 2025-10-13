import { motion } from 'motion/react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { menuItems } from '../../data/mockData';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  id: string;
  quantity: number;
}

export function UserMenus() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (menuId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === menuId);
      if (existing) {
        return prev.map((item) =>
          item.id === menuId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: menuId, quantity: 1 }];
    });
  };

  const removeFromCart = (menuId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === menuId);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.id === menuId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter((item) => item.id !== menuId);
    });
  };

  const getQuantity = (menuId: string) => {
    return cart.find((item) => item.id === menuId)?.quantity || 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="flex items-center justify-between mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent mb-4">
              Sélection des Menus
            </h1>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent" />
          </div>

          {totalItems > 0 && (
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <ShoppingCart className="w-8 h-8 text-[#b88b1f]" />
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#b88b1f] text-black rounded-full flex items-center justify-center text-sm">
                {totalItems}
              </span>
            </motion.div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((menu, index) => {
            const quantity = getQuantity(menu.id);
            
            return (
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
                    {menu.price}€
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl mb-2">{menu.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {menu.description}
                  </p>

                  {quantity === 0 ? (
                    <button
                      onClick={() => addToCart(menu.id)}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black rounded-2xl hover:shadow-lg hover:shadow-[#b88b1f]/30 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter au panier
                    </button>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <button
                        onClick={() => removeFromCart(menu.id)}
                        className="flex-1 flex items-center justify-center p-3 bg-[#b88b1f]/20 border border-[#b88b1f]/30 text-[#b88b1f] rounded-2xl hover:bg-[#b88b1f]/30 transition-all duration-300"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-2xl text-[#b88b1f] min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => addToCart(menu.id)}
                        className="flex-1 flex items-center justify-center p-3 bg-[#b88b1f]/20 border border-[#b88b1f]/30 text-[#b88b1f] rounded-2xl hover:bg-[#b88b1f]/30 transition-all duration-300"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
