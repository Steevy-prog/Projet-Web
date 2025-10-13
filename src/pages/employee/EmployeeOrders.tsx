import { motion } from 'motion/react';
import { useState } from 'react';
import { mockOrders } from '../../data/mockData';
import { Order } from '../../types';
import { ShoppingBag, Clock, CheckCircle, Package, ChevronDown } from 'lucide-react';

export function EmployeeOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<'all' | 'en attente' | 'en préparation' | 'validée'>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Filtrer les commandes
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  // Changer le statut d'une commande
  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Obtenir la couleur selon le statut
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'en attente':
        return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' };
      case 'en préparation':
        return { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' };
      case 'validée':
        return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' };
      case 'livrée':
        return { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' };
      default:
        return { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' };
    }
  };

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
            <ShoppingBag className="w-12 h-12 text-[#b88b1f]" />
            <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent">
              Gestion des Commandes
            </h1>
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mb-8" />
        </motion.div>

        {/* Filtres */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {['all', 'en attente', 'en préparation', 'validée'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as typeof filter)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                filter === status
                  ? 'bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black'
                  : 'bg-black/30 border border-[#b88b1f]/30 text-gray-300 hover:border-[#b88b1f]/50'
              }`}
            >
              {status === 'all' ? 'Toutes' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Liste des commandes */}
        <div className="space-y-6">
          {filteredOrders.map((order, index) => {
            const statusColor = getStatusColor(order.status);
            const isExpanded = expandedOrder === order.id;

            return (
              <motion.div
                key={order.id}
                className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl overflow-hidden hover:border-[#b88b1f]/40 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* En-tête de la commande */}
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl text-[#b88b1f] font-bold">{order.id}</span>
                        <span className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor.bg} ${statusColor.text}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-white text-lg mb-1">{order.customerName}</p>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {order.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          {order.items.length} article(s)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-gray-400 text-sm mb-1">Total</p>
                        <p className="text-3xl text-[#b88b1f] font-bold">{order.total}€</p>
                      </div>
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        className="p-3 bg-black/40 border border-[#b88b1f]/30 rounded-2xl hover:border-[#b88b1f]/50 transition-all duration-300"
                      >
                        <ChevronDown
                          className={`w-5 h-5 text-[#b88b1f] transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Détails de la commande (expandable) */}
                  {isExpanded && (
                    <motion.div
                      className="mt-6 pt-6 border-t border-[#b88b1f]/20"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-[#b88b1f] font-semibold mb-4">Détails de la commande</h3>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 bg-black/20 rounded-2xl"
                          >
                            <div className="flex-1">
                              <p className="text-white font-semibold">{item.menuItem.name}</p>
                              <p className="text-gray-400 text-sm">Quantité: {item.quantity}</p>
                            </div>
                            <p className="text-[#b88b1f] font-semibold">
                              {item.menuItem.price * item.quantity}€
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Actions */}
                {order.status !== 'livrée' && (
                  <div className="px-6 pb-6 flex flex-wrap gap-3">
                    {order.status === 'en attente' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'en préparation')}
                        className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 font-semibold"
                      >
                        Commencer la préparation
                      </button>
                    )}
                    {order.status === 'en préparation' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'validée')}
                        className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 font-semibold"
                      >
                        <CheckCircle className="w-5 h-5 inline mr-2" />
                        Valider la commande
                      </button>
                    )}
                    {order.status === 'validée' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'livrée')}
                        className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-semibold"
                      >
                        Marquer comme livrée
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Aucune commande dans cette catégorie</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
