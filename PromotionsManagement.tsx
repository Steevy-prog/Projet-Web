import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Percent,
  Gift,
  Sparkles,
  X,
  Upload,
  Save,
  Copy,
  TrendingUp
} from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'gift' | 'event' | 'game';
  discount?: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'expired';
  image?: string;
  code?: string;
  usage: number;
  maxUsage: number;
}

const mockPromotions: Promotion[] = [
  {
    id: 'PROMO-001',
    title: 'Menu Étudiant -20%',
    description: 'Profitez de 20% de réduction sur tous nos menus spéciaux étudiants du lundi au vendredi',
    type: 'discount',
    discount: 20,
    startDate: '2025-10-01',
    endDate: '2025-12-31',
    status: 'active',
    code: 'STUDENT20',
    usage: 145,
    maxUsage: 500
  },
  {
    id: 'PROMO-002',
    title: 'Soirée Gastronomique',
    description: 'Venez découvrir notre menu dégustation exceptionnel ce samedi soir',
    type: 'event',
    startDate: '2025-10-18',
    endDate: '2025-10-18',
    status: 'scheduled',
    usage: 32,
    maxUsage: 100
  },
  {
    id: 'PROMO-003',
    title: 'Dessert Offert',
    description: 'Pour toute commande de 2 plats, recevez un dessert gratuit',
    type: 'gift',
    startDate: '2025-10-05',
    endDate: '2025-10-15',
    status: 'active',
    code: 'DESSERT2024',
    usage: 89,
    maxUsage: 200
  },
  {
    id: 'PROMO-004',
    title: 'Roue de la Fortune',
    description: 'Tournez la roue et gagnez jusqu\'à 50% de réduction sur votre addition',
    type: 'game',
    startDate: '2025-09-15',
    endDate: '2025-09-30',
    status: 'expired',
    usage: 234,
    maxUsage: 300
  }
];

const typeConfig = {
  discount: {
    label: 'Réduction',
    icon: Percent,
    color: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500' }
  },
  gift: {
    label: 'Cadeau',
    icon: Gift,
    color: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500' }
  },
  event: {
    label: 'Événement',
    icon: Calendar,
    color: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500' }
  },
  game: {
    label: 'Jeu',
    icon: Sparkles,
    color: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-500' }
  }
};

const statusConfig = {
  active: { label: 'Active', bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500' },
  scheduled: { label: 'Programmée', bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500' },
  expired: { label: 'Expirée', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500' }
};

export function PromotionsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | Promotion['type']>('all');
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [isAddingPromotion, setIsAddingPromotion] = useState(false);

  const filteredPromotions = mockPromotions.filter(promo => {
    const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || promo.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const stats = [
    { label: 'Promotions actives', value: mockPromotions.filter(p => p.status === 'active').length, icon: Sparkles },
    { label: 'Programmées', value: mockPromotions.filter(p => p.status === 'scheduled').length, icon: Calendar },
    { label: 'Total utilisations', value: mockPromotions.reduce((sum, p) => sum + p.usage, 0), icon: TrendingUp },
    { label: 'Taux moyen', value: '67%', icon: Percent }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">{stat.label}</p>
                  <p className="text-2xl text-yellow-600 mt-2">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-600/10 rounded-lg flex items-center justify-center">
                  <Icon className="text-yellow-600" size={24} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Type Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setTypeFilter('all')}
          className={`px-4 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
            typeFilter === 'all'
              ? 'bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border-yellow-700/50 text-yellow-500'
              : 'bg-zinc-950/50 border-yellow-900/20 text-zinc-400 hover:border-yellow-700/30'
          }`}
        >
          Tous les types
        </button>
        {(['discount', 'gift', 'event', 'game'] as const).map((type) => {
          const config = typeConfig[type];
          return (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
                typeFilter === type
                  ? `${config.color.bg} ${config.color.border} ${config.color.text}`
                  : 'bg-zinc-950/50 border-yellow-900/20 text-zinc-400 hover:border-yellow-700/30'
              }`}
            >
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Search and Actions */}
      <div className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={20} />
            <input
              type="text"
              placeholder="Rechercher une promotion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={() => setIsAddingPromotion(true)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Nouvelle promotion</span>
          </button>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.map((promo, index) => {
          const typeInfo = typeConfig[promo.type];
          const TypeIcon = typeInfo.icon;
          const statusInfo = statusConfig[promo.status];
          const usagePercent = (promo.usage / promo.maxUsage) * 100;
          
          return (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg overflow-hidden hover:border-yellow-700/30 transition-all duration-300 group"
            >
              {/* Poster Image */}
              <div className="relative h-48 bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center p-6">
                  <TypeIcon className="w-16 h-16 mx-auto text-yellow-600 mb-3" />
                  <h3 className="text-xl text-zinc-100">{promo.title}</h3>
                  {promo.discount && (
                    <div className="mt-2 inline-block px-4 py-2 bg-yellow-600 rounded-lg text-black">
                      -{promo.discount}%
                    </div>
                  )}
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full border ${statusInfo.bg} ${statusInfo.border} ${statusInfo.text} text-sm backdrop-blur-sm`}>
                    {statusInfo.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-zinc-400 text-sm line-clamp-2">{promo.description}</p>

                {/* Type Badge */}
                <div>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${typeInfo.color.bg} ${typeInfo.color.border} ${typeInfo.color.text} text-sm`}>
                    <TypeIcon size={14} />
                    {typeInfo.label}
                  </span>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Calendar size={14} />
                  <span>
                    {new Date(promo.startDate).toLocaleDateString('fr-FR')} - {new Date(promo.endDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                {/* Code */}
                {promo.code && (
                  <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-yellow-900/10">
                    <code className="text-yellow-600">{promo.code}</code>
                    <button className="p-1 hover:bg-yellow-600/10 rounded transition-colors">
                      <Copy className="text-zinc-400 hover:text-yellow-600" size={16} />
                    </button>
                  </div>
                )}

                {/* Usage Progress */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-zinc-400">Utilisation</span>
                    <span className="text-zinc-100">{promo.usage} / {promo.maxUsage}</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-600 to-yellow-700 transition-all duration-300"
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-yellow-900/20">
                  <button
                    onClick={() => setSelectedPromotion(promo)}
                    className="flex-1 px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    <span>Voir</span>
                  </button>
                  <button className="flex-1 px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300 flex items-center justify-center gap-2">
                    <Edit size={16} />
                    <span>Modifier</span>
                  </button>
                  <button className="p-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-red-600 hover:border-red-700/30 transition-all duration-300">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Promotion Modal */}
      {isAddingPromotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsAddingPromotion(false)}
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
                <h3 className="text-2xl text-yellow-600">Nouvelle promotion</h3>
                <p className="text-zinc-400 mt-1">Créez une nouvelle offre pour vos clients</p>
              </div>
              <button
                onClick={() => setIsAddingPromotion(false)}
                className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <X className="text-zinc-400" size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="text-zinc-100 mb-4">Informations de base</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Titre de la promotion</label>
                    <input
                      type="text"
                      placeholder="Ex: Menu Étudiant -20%"
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Décrivez votre promotion..."
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Type and Discount */}
              <div>
                <h4 className="text-zinc-100 mb-4">Type et valeur</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Type de promotion</label>
                    <select className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors">
                      <option value="discount">Réduction</option>
                      <option value="gift">Cadeau</option>
                      <option value="event">Événement</option>
                      <option value="game">Jeu</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Réduction (%)</label>
                    <input
                      type="number"
                      placeholder="20"
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div>
                <h4 className="text-zinc-100 mb-4">Période de validité</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Date de début</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Date de fin</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Code and Usage */}
              <div>
                <h4 className="text-zinc-100 mb-4">Code et limite</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Code promo (optionnel)</label>
                    <input
                      type="text"
                      placeholder="STUDENT20"
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Nombre max d'utilisations</label>
                    <input
                      type="number"
                      placeholder="500"
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Poster Upload */}
              <div>
                <h4 className="text-zinc-100 mb-4">Affiche de la promotion</h4>
                <div className="border-2 border-dashed border-yellow-900/20 rounded-lg p-8 text-center hover:border-yellow-700/30 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-zinc-500 mb-3" />
                  <p className="text-zinc-400">Cliquez pour télécharger une image</p>
                  <p className="text-zinc-500 text-sm mt-1">PNG, JPG jusqu'à 5MB</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-yellow-900/20">
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center gap-2">
                  <Save size={18} />
                  Créer la promotion
                </button>
                <button
                  onClick={() => setIsAddingPromotion(false)}
                  className="flex-1 px-4 py-3 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300"
                >
                  Annuler
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
