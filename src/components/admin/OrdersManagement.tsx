import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Truck,
  ChefHat,
  AlertCircle,
  MoreVertical
} from 'lucide-react';

type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: OrderStatus;
  time: string;
  table?: string;
  paymentMethod: string;
}

const mockOrders: Order[] = [
  {
    id: 'CMD-001',
    customerName: 'Marie Dubois',
    items: ['Wagyu Steak', 'Truffle Risotto', 'Vintage Wine'],
    total: 285000,
    status: 'preparing',
    time: '14:30',
    table: 'Table 5',
    paymentMethod: 'Carte bancaire'
  },
  {
    id: 'CMD-002',
    customerName: 'Jean Martin',
    items: ['Lobster Thermidor', 'Caesar Salad'],
    total: 175000,
    status: 'ready',
    time: '14:15',
    table: 'Table 12',
    paymentMethod: 'Espèces'
  },
  {
    id: 'CMD-003',
    customerName: 'Sophie Laurent',
    items: ['Filet Mignon', 'Crème Brûlée', 'Champagne'],
    total: 320000,
    status: 'delivered',
    time: '13:45',
    table: 'Table 3',
    paymentMethod: 'Carte bancaire'
  },
  {
    id: 'CMD-004',
    customerName: 'Pierre Dupont',
    items: ['Duck Confit', 'Foie Gras'],
    total: 195000,
    status: 'pending',
    time: '14:45',
    table: 'Table 8',
    paymentMethod: 'Mobile Money'
  },
  {
    id: 'CMD-005',
    customerName: 'Claire Bernard',
    items: ['Sea Bass', 'Chocolate Soufflé'],
    total: 165000,
    status: 'preparing',
    time: '14:20',
    table: 'Table 15',
    paymentMethod: 'Carte bancaire'
  },
  {
    id: 'CMD-006',
    customerName: 'Antoine Leroy',
    items: ['Rack of Lamb'],
    total: 145000,
    status: 'cancelled',
    time: '13:30',
    table: 'Table 7',
    paymentMethod: 'Annulée'
  }
];

const statusConfig = {
  pending: {
    label: 'En attente',
    icon: Clock,
    color: 'yellow',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-500'
  },
  preparing: {
    label: 'En préparation',
    icon: ChefHat,
    color: 'blue',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-500'
  },
  ready: {
    label: 'Prêt',
    icon: Package,
    color: 'purple',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-500'
  },
  delivered: {
    label: 'Livré',
    icon: CheckCircle,
    color: 'green',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-500'
  },
  cancelled: {
    label: 'Annulée',
    icon: XCircle,
    color: 'red',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-500'
  }
};

export function OrdersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total', count: mockOrders.length, status: 'all' as const },
    { label: 'En attente', count: mockOrders.filter(o => o.status === 'pending').length, status: 'pending' as const },
    { label: 'En préparation', count: mockOrders.filter(o => o.status === 'preparing').length, status: 'preparing' as const },
    { label: 'Prêt', count: mockOrders.filter(o => o.status === 'ready').length, status: 'ready' as const },
    { label: 'Livré', count: mockOrders.filter(o => o.status === 'delivered').length, status: 'delivered' as const }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <motion.button
            key={stat.status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setStatusFilter(stat.status)}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              statusFilter === stat.status
                ? 'bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border-yellow-700/50'
                : 'bg-zinc-950/50 border-yellow-900/20 hover:border-yellow-700/30'
            }`}
          >
            <p className="text-2xl text-yellow-600">{stat.count}</p>
            <p className="text-sm text-zinc-400 mt-1">{stat.label}</p>
          </motion.button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom ou numéro de commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300 flex items-center gap-2">
              <Filter size={18} />
              <span>Filtres</span>
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2">
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-900/50 border-b border-yellow-900/20">
              <tr>
                <th className="px-6 py-4 text-left text-zinc-400">Commande</th>
                <th className="px-6 py-4 text-left text-zinc-400">Client</th>
                <th className="px-6 py-4 text-left text-zinc-400">Articles</th>
                <th className="px-6 py-4 text-left text-zinc-400">Table</th>
                <th className="px-6 py-4 text-left text-zinc-400">Heure</th>
                <th className="px-6 py-4 text-left text-zinc-400">Montant</th>
                <th className="px-6 py-4 text-left text-zinc-400">Statut</th>
                <th className="px-6 py-4 text-left text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-900/10">
              {filteredOrders.map((order, index) => {
                const statusInfo = statusConfig[order.status];
                const StatusIcon = statusInfo.icon;
                
                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-zinc-900/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-yellow-600">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 text-zinc-100">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-zinc-400 text-sm max-w-xs truncate">
                        {order.items.join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {order.table}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {order.time}
                    </td>
                    <td className="px-6 py-4 text-yellow-600">
                      {order.total.toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${statusInfo.bg} ${statusInfo.border} ${statusInfo.text}`}>
                        <StatusIcon size={14} />
                        <span className="text-sm">{statusInfo.label}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 hover:bg-yellow-600/10 rounded-lg transition-colors text-zinc-400 hover:text-yellow-600"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-2 hover:bg-yellow-600/10 rounded-lg transition-colors text-zinc-400 hover:text-yellow-600">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedOrder(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-950 border border-yellow-900/20 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl text-yellow-600">{selectedOrder.id}</h3>
                <p className="text-zinc-400 mt-1">{selectedOrder.customerName}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <XCircle className="text-zinc-400" size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Status */}
              <div>
                <label className="text-zinc-400 text-sm">Statut</label>
                <div className="mt-2">
                  {(() => {
                    const statusInfo = statusConfig[selectedOrder.status];
                    const StatusIcon = statusInfo.icon;
                    return (
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${statusInfo.bg} ${statusInfo.border} ${statusInfo.text}`}>
                        <StatusIcon size={18} />
                        <span>{statusInfo.label}</span>
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Items */}
              <div>
                <label className="text-zinc-400 text-sm">Articles commandés</label>
                <div className="mt-2 space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-yellow-900/10">
                      <span className="text-zinc-100">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 text-sm">Table</label>
                  <p className="text-zinc-100 mt-1">{selectedOrder.table}</p>
                </div>
                <div>
                  <label className="text-zinc-400 text-sm">Heure</label>
                  <p className="text-zinc-100 mt-1">{selectedOrder.time}</p>
                </div>
                <div>
                  <label className="text-zinc-400 text-sm">Paiement</label>
                  <p className="text-zinc-100 mt-1">{selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <label className="text-zinc-400 text-sm">Total</label>
                  <p className="text-yellow-600 mt-1">{selectedOrder.total.toLocaleString()} FCFA</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-yellow-900/20">
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300">
                  Marquer comme prêt
                </button>
                <button className="flex-1 px-4 py-3 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300">
                  Annuler la commande
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
