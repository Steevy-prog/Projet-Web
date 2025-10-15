import { motion } from 'motion/react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export function RecentOrders() {
  const orders = [
    {
      id: '#CMD-001',
      customer: 'Marie Dubois',
      items: 'Filet de Bœuf Wagyu, Pasta Truffe',
      amount: '73,000 FCFA',
      status: 'completed' as const,
      time: '12:34'
    },
    {
      id: '#CMD-002',
      customer: 'Jean Martin',
      items: 'Plateau de Fruits de Mer',
      amount: '38,000 FCFA',
      status: 'pending' as const,
      time: '13:15'
    },
    {
      id: '#CMD-003',
      customer: 'Sophie Laurent',
      items: 'Burger Premium, Dessert Élégance',
      amount: '30,000 FCFA',
      status: 'completed' as const,
      time: '13:42'
    },
    {
      id: '#CMD-004',
      customer: 'Pierre Kamga',
      items: 'Assiette Gastronomique',
      amount: '35,000 FCFA',
      status: 'cancelled' as const,
      time: '14:08'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return { text: 'Complétée', color: 'text-green-500' };
      case 'pending':
        return { text: 'En cours', color: 'text-yellow-500' };
      case 'cancelled':
        return { text: 'Annulée', color: 'text-red-500' };
      default:
        return { text: status, color: 'text-zinc-400' };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl text-yellow-600">Commandes Récentes</h3>
        <button className="text-sm text-zinc-400 hover:text-yellow-500 transition-colors">
          Voir tout
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => {
          const status = getStatusText(order.status);
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              className="group p-4 bg-black/30 border border-yellow-900/10 hover:border-yellow-700/30 rounded-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-zinc-300">{order.customer}</p>
                  <p className="text-sm text-zinc-500 mt-1">{order.items}</p>
                </div>
                <span className="text-yellow-600">{order.amount}</span>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-yellow-900/10">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className={`text-sm ${status.color}`}>{status.text}</span>
                </div>
                <div className="flex items-center space-x-2 text-zinc-500 text-sm">
                  <Clock size={14} />
                  <span>{order.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}