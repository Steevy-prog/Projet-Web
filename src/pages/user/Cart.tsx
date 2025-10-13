import { motion } from 'motion/react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { menuItems } from '../../data/mockData';
import { Trash2, Plus, Minus, Send } from 'lucide-react';
import { useState } from 'react';

export function Cart() {
  const [cartItems, setCartItems] = useState([
    { menuId: '1', quantity: 2 },
    { menuId: '3', quantity: 1 },
  ]);

  const getMenuItem = (menuId: string) => {
    return menuItems.find((item) => item.id === menuId);
  };

  const updateQuantity = (menuId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.menuId === menuId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (menuId: string) => {
    setCartItems((prev) => prev.filter((item) => item.menuId !== menuId));
  };

  const total = cartItems.reduce((sum, item) => {
    const menuItem = getMenuItem(item.menuId);
    return sum + (menuItem?.price || 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      alert('Commande envoyée au chef ! Vous recevrez une confirmation sous peu.');
      setCartItems([]);
    }
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent mb-4">
            Mon Panier
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mb-8" />
          <p className="text-gray-400 text-lg">
            {cartItems.length} article{cartItems.length > 1 ? 's' : ''} dans votre panier
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-400 text-lg mb-6">Votre panier est vide</p>
            <button className="px-8 py-4 bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black rounded-2xl hover:shadow-lg hover:shadow-[#b88b1f]/30 transition-all duration-300">
              Parcourir les menus
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => {
                const menuItem = getMenuItem(item.menuId);
                if (!menuItem) return null;

                return (
                  <motion.div
                    key={item.menuId}
                    className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl overflow-hidden hover:border-[#b88b1f]/40 transition-all duration-300"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="grid md:grid-cols-3 gap-4 p-4">
                      <div className="relative h-32 md:h-auto rounded-2xl overflow-hidden">
                        <ImageWithFallback
                          src={menuItem.image}
                          alt={menuItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="md:col-span-2 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl mb-2">{menuItem.name}</h3>
                          <p className="text-gray-400 text-sm mb-4">
                            {menuItem.description.substring(0, 80)}...
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.menuId, -1)}
                              className="p-2 bg-[#b88b1f]/20 border border-[#b88b1f]/30 rounded-xl hover:bg-[#b88b1f]/30 transition-all duration-300"
                            >
                              <Minus className="w-4 h-4 text-[#b88b1f]" />
                            </button>
                            <span className="text-xl w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.menuId, 1)}
                              className="p-2 bg-[#b88b1f]/20 border border-[#b88b1f]/30 rounded-xl hover:bg-[#b88b1f]/30 transition-all duration-300"
                            >
                              <Plus className="w-4 h-4 text-[#b88b1f]" />
                            </button>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-2xl text-[#b88b1f]">
                              {(menuItem.price * item.quantity).toFixed(2)}€
                            </span>
                            <button
                              onClick={() => removeItem(item.menuId)}
                              className="p-2 text-red-400 hover:text-red-300 transition-colors"
                              aria-label="Supprimer"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8 sticky top-24">
                <h2 className="text-2xl mb-6 text-[#b88b1f]">Récapitulatif</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Sous-total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Frais de service</span>
                    <span>2.50€</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#b88b1f]/30 to-transparent" />
                  <div className="flex justify-between text-xl">
                    <span>Total</span>
                    <span className="text-[#b88b1f]">{(total + 2.5).toFixed(2)}€</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black rounded-2xl hover:shadow-lg hover:shadow-[#b88b1f]/30 transition-all duration-300 mb-4"
                >
                  <Send className="w-5 h-5" />
                  Valider la commande
                </button>

                <p className="text-gray-500 text-sm text-center">
                  Vous gagnerez +50 points de fidélité
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
