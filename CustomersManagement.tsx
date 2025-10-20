import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter,
  Download,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  ShoppingBag,
  Star,
  MoreVertical,
  X
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  loyaltyLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  rating: number;
  avatar?: string;
}

const mockCustomers: Customer[] = [
  {
    id: 'CLT-001',
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '+237 6 XX XX XX XX',
    address: 'Bonapriso, Douala',
    joinDate: '2024-01-15',
    totalOrders: 45,
    totalSpent: 8750000,
    lastOrder: '2025-10-08',
    loyaltyLevel: 'Platinum',
    rating: 4.9
  },
  {
    id: 'CLT-002',
    name: 'Jean Martin',
    email: 'jean.martin@email.com',
    phone: '+237 6 XX XX XX XX',
    address: 'Akwa, Douala',
    joinDate: '2024-03-20',
    totalOrders: 32,
    totalSpent: 5200000,
    lastOrder: '2025-10-09',
    loyaltyLevel: 'Gold',
    rating: 4.7
  },
  {
    id: 'CLT-003',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@email.com',
    phone: '+237 6 XX XX XX XX',
    address: 'Bonanjo, Douala',
    joinDate: '2024-05-10',
    totalOrders: 28,
    totalSpent: 4800000,
    lastOrder: '2025-10-07',
    loyaltyLevel: 'Gold',
    rating: 4.8
  },
  {
    id: 'CLT-004',
    name: 'Pierre Dupont',
    email: 'pierre.dupont@email.com',
    phone: '+237 6 XX XX XX XX',
    address: 'Bali, Douala',
    joinDate: '2024-06-22',
    totalOrders: 18,
    totalSpent: 2950000,
    lastOrder: '2025-10-05',
    loyaltyLevel: 'Silver',
    rating: 4.5
  },
  {
    id: 'CLT-005',
    name: 'Claire Bernard',
    email: 'claire.bernard@email.com',
    phone: '+237 6 XX XX XX XX',
    address: 'Makepe, Douala',
    joinDate: '2024-08-15',
    totalOrders: 12,
    totalSpent: 1850000,
    lastOrder: '2025-10-06',
    loyaltyLevel: 'Silver',
    rating: 4.6
  },
  {
    id: 'CLT-006',
    name: 'Antoine Leroy',
    email: 'antoine.leroy@email.com',
    phone: '+237 6 XX XX XX XX',
    address: 'Logbaba, Douala',
    joinDate: '2024-09-10',
    totalOrders: 8,
    totalSpent: 980000,
    lastOrder: '2025-10-04',
    loyaltyLevel: 'Bronze',
    rating: 4.3
  }
];

const loyaltyColors = {
  Bronze: { bg: 'bg-amber-900/20', border: 'border-amber-700/30', text: 'text-amber-600' },
  Silver: { bg: 'bg-zinc-400/20', border: 'border-zinc-400/30', text: 'text-zinc-400' },
  Gold: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-500' },
  Platinum: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' }
};

export function CustomersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [loyaltyFilter, setLoyaltyFilter] = useState<'all' | Customer['loyaltyLevel']>('all');

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLoyalty = loyaltyFilter === 'all' || customer.loyaltyLevel === loyaltyFilter;
    return matchesSearch && matchesLoyalty;
  });

  const totalCustomers = mockCustomers.length;
  const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
  const averageSpent = totalRevenue / totalCustomers;
  const activeThisMonth = mockCustomers.filter(c => {
    const lastOrder = new Date(c.lastOrder);
    const now = new Date();
    return lastOrder.getMonth() === now.getMonth();
  }).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm">Total Clients</p>
              <p className="text-2xl text-yellow-600 mt-2">{totalCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600/10 rounded-lg flex items-center justify-center">
              <ShoppingBag className="text-yellow-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm">Actifs ce mois</p>
              <p className="text-2xl text-yellow-600 mt-2">{activeThisMonth}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-500" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm">Revenu Total</p>
              <p className="text-2xl text-yellow-600 mt-2">{(totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Award className="text-purple-500" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm">Dépense Moyenne</p>
              <p className="text-2xl text-yellow-600 mt-2">{(averageSpent / 1000).toFixed(0)}K</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Star className="text-blue-500" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Loyalty Level Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setLoyaltyFilter('all')}
          className={`px-4 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
            loyaltyFilter === 'all'
              ? 'bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border-yellow-700/50 text-yellow-500'
              : 'bg-zinc-950/50 border-yellow-900/20 text-zinc-400 hover:border-yellow-700/30'
          }`}
        >
          Tous
        </button>
        {(['Platinum', 'Gold', 'Silver', 'Bronze'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setLoyaltyFilter(level)}
            className={`px-4 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
              loyaltyFilter === level
                ? `${loyaltyColors[level].bg} ${loyaltyColors[level].border} ${loyaltyColors[level].text}`
                : 'bg-zinc-950/50 border-yellow-900/20 text-zinc-400 hover:border-yellow-700/30'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Search and Actions */}
      <div className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300 flex items-center gap-2">
              <Filter size={18} />
              <span>Filtres</span>
            </button>
            <button className="px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300 flex items-center gap-2">
              <Download size={18} />
              <span>Export</span>
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2">
              <UserPlus size={18} />
              <span>Nouveau</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer, index) => {
          const loyaltyStyle = loyaltyColors[customer.loyaltyLevel];
          
          return (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6 hover:border-yellow-700/30 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedCustomer(customer)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center">
                    <span className="text-lg text-black">{customer.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-zinc-100 group-hover:text-yellow-600 transition-colors">{customer.name}</h3>
                    <p className="text-xs text-zinc-500">{customer.id}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-zinc-900 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="text-zinc-400" size={18} />
                </button>
              </div>

              {/* Loyalty Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${loyaltyStyle.bg} ${loyaltyStyle.border} ${loyaltyStyle.text} text-sm`}>
                  <Award size={14} />
                  {customer.loyaltyLevel}
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Commandes</span>
                  <span className="text-zinc-100">{customer.totalOrders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Dépenses</span>
                  <span className="text-yellow-600">{(customer.totalSpent / 1000).toFixed(0)}K FCFA</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Note</span>
                  <span className="flex items-center gap-1 text-zinc-100">
                    <Star size={14} className="text-yellow-600 fill-yellow-600" />
                    {customer.rating}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-4 pt-4 border-t border-yellow-900/20 space-y-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Mail size={14} />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Phone size={14} />
                  <span>{customer.phone}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedCustomer(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-950 border border-yellow-900/20 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center">
                  <span className="text-2xl text-black">{selectedCustomer.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-2xl text-yellow-600">{selectedCustomer.name}</h3>
                  <p className="text-zinc-400 mt-1">{selectedCustomer.id}</p>
                  {(() => {
                    const loyaltyStyle = loyaltyColors[selectedCustomer.loyaltyLevel];
                    return (
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${loyaltyStyle.bg} ${loyaltyStyle.border} ${loyaltyStyle.text} text-sm mt-2`}>
                        <Award size={14} />
                        {selectedCustomer.loyaltyLevel}
                      </span>
                    );
                  })()}
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <X className="text-zinc-400" size={24} />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-zinc-900/50 rounded-lg p-4 border border-yellow-900/10">
                <p className="text-zinc-400 text-sm">Commandes</p>
                <p className="text-2xl text-yellow-600 mt-1">{selectedCustomer.totalOrders}</p>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-4 border border-yellow-900/10">
                <p className="text-zinc-400 text-sm">Dépenses</p>
                <p className="text-2xl text-yellow-600 mt-1">{(selectedCustomer.totalSpent / 1000000).toFixed(1)}M</p>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-4 border border-yellow-900/10">
                <p className="text-zinc-400 text-sm">Note</p>
                <p className="text-2xl text-yellow-600 mt-1 flex items-center gap-1">
                  <Star size={20} className="fill-yellow-600" />
                  {selectedCustomer.rating}
                </p>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-4 border border-yellow-900/10">
                <p className="text-zinc-400 text-sm">Moyenne</p>
                <p className="text-2xl text-yellow-600 mt-1">{(selectedCustomer.totalSpent / selectedCustomer.totalOrders / 1000).toFixed(0)}K</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-zinc-900/50 rounded-lg p-6 border border-yellow-900/10 mb-6">
              <h4 className="text-lg text-yellow-600 mb-4">Informations de contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-yellow-600 mt-1" size={18} />
                  <div>
                    <p className="text-zinc-400 text-sm">Email</p>
                    <p className="text-zinc-100">{selectedCustomer.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-yellow-600 mt-1" size={18} />
                  <div>
                    <p className="text-zinc-400 text-sm">Téléphone</p>
                    <p className="text-zinc-100">{selectedCustomer.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-yellow-600 mt-1" size={18} />
                  <div>
                    <p className="text-zinc-400 text-sm">Adresse</p>
                    <p className="text-zinc-100">{selectedCustomer.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="text-yellow-600 mt-1" size={18} />
                  <div>
                    <p className="text-zinc-400 text-sm">Client depuis</p>
                    <p className="text-zinc-100">{new Date(selectedCustomer.joinDate).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300">
                Modifier le profil
              </button>
              <button className="flex-1 px-4 py-3 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300">
                Voir l'historique
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
