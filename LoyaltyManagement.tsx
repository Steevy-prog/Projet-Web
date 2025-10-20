import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Crown,
  Award,
  Users,
  TrendingUp,
  Gift,
  Share2,
  Copy,
  Check,
  Star,
  ChevronRight,
  Sparkles,
  Trophy,
  Target,
  BarChart3
} from 'lucide-react';

type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface LoyaltyStats {
  title: string;
  value: string;
  change: string;
  icon: any;
  trend: 'up' | 'down';
}

interface Referral {
  id: string;
  name: string;
  email: string;
  referralCount: number;
  totalEarned: string;
  tier: LoyaltyTier;
  joinDate: string;
}

interface ReferralCode {
  code: string;
  uses: number;
  maxUses: number;
  discount: string;
  expiresAt: string;
  status: 'active' | 'expired';
}

export function LoyaltyManagement() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<LoyaltyTier | 'all'>('all');

  const loyaltyStats: LoyaltyStats[] = [
    {
      title: 'Membres actifs',
      value: '1,248',
      change: '+18.5%',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Parrainages',
      value: '342',
      change: '+24.8%',
      icon: Share2,
      trend: 'up'
    },
    {
      title: 'Récompenses distribuées',
      value: '15.2M FCFA',
      change: '+12.3%',
      icon: Gift,
      trend: 'up'
    },
    {
      title: 'Taux de conversion',
      value: '68.5%',
      change: '+5.2%',
      icon: TrendingUp,
      trend: 'up'
    }
  ];

  const tierConfig = {
    bronze: {
      name: 'Bronze',
      icon: Award,
      color: 'from-amber-700 to-amber-900',
      bgColor: 'bg-amber-900/20',
      borderColor: 'border-amber-700/30',
      textColor: 'text-amber-600',
      minSpend: '0',
      discount: '5%',
      members: 542
    },
    silver: {
      name: 'Silver',
      icon: Star,
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-500/20',
      borderColor: 'border-gray-500/30',
      textColor: 'text-gray-400',
      minSpend: '500K',
      discount: '10%',
      members: 398
    },
    gold: {
      name: 'Gold',
      icon: Crown,
      color: 'from-yellow-500 to-yellow-700',
      bgColor: 'bg-yellow-600/20',
      borderColor: 'border-yellow-600/30',
      textColor: 'text-yellow-500',
      minSpend: '1.5M',
      discount: '15%',
      members: 234
    },
    platinum: {
      name: 'Platinum',
      icon: Sparkles,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      minSpend: '5M',
      discount: '25%',
      members: 74
    }
  };

  const topReferrers: Referral[] = [
    {
      id: '1',
      name: 'Sophie Kouassi',
      email: 'sophie.k@email.com',
      referralCount: 24,
      totalEarned: '480,000 FCFA',
      tier: 'platinum',
      joinDate: '2024-01'
    },
    {
      id: '2',
      name: 'Jean-Marc Diallo',
      email: 'jm.diallo@email.com',
      referralCount: 18,
      totalEarned: '360,000 FCFA',
      tier: 'gold',
      joinDate: '2024-02'
    },
    {
      id: '3',
      name: 'Aminata Touré',
      email: 'a.toure@email.com',
      referralCount: 15,
      totalEarned: '300,000 FCFA',
      tier: 'gold',
      joinDate: '2024-03'
    },
    {
      id: '4',
      name: 'Patrick Mensah',
      email: 'p.mensah@email.com',
      referralCount: 12,
      totalEarned: '240,000 FCFA',
      tier: 'silver',
      joinDate: '2024-03'
    },
    {
      id: '5',
      name: 'Marie Koné',
      email: 'm.kone@email.com',
      referralCount: 10,
      totalEarned: '200,000 FCFA',
      tier: 'silver',
      joinDate: '2024-04'
    }
  ];

  const activeCodes: ReferralCode[] = [
    {
      code: 'WELCOME2025',
      uses: 145,
      maxUses: 500,
      discount: '15%',
      expiresAt: '31 Déc 2025',
      status: 'active'
    },
    {
      code: 'GOLDMEMBER',
      uses: 89,
      maxUses: 200,
      discount: '20%',
      expiresAt: '30 Juin 2025',
      status: 'active'
    },
    {
      code: 'REFERALFRIEND',
      uses: 234,
      maxUses: 1000,
      discount: '10%',
      expiresAt: '31 Déc 2025',
      status: 'active'
    },
    {
      code: 'PLATINUM25',
      uses: 42,
      maxUses: 100,
      discount: '25%',
      expiresAt: '15 Mars 2025',
      status: 'active'
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {loyaltyStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-zinc-950/50 backdrop-blur-xl border border-yellow-900/20 rounded-xl p-6 relative overflow-hidden group"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-zinc-500 text-sm mb-2">{stat.title}</p>
                  <p className="text-2xl text-zinc-100 mb-1">{stat.value}</p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp size={14} className="text-green-500" />
                    <span className="text-green-500 text-sm">{stat.change}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-700/30 flex items-center justify-center">
                  <Icon size={24} className="text-yellow-500" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Loyalty Tiers Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-950/50 backdrop-blur-xl border border-yellow-900/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-700/30 flex items-center justify-center">
              <Trophy size={20} className="text-yellow-500" />
            </div>
            <div>
              <h3 className="text-xl text-yellow-600">Niveaux de Fidélité</h3>
              <p className="text-zinc-500 text-sm">Gestion des paliers et avantages</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(tierConfig).map(([tier, config], index) => {
            const TierIcon = config.icon;
            return (
              <motion.div
                key={tier}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${config.bgColor} border ${config.borderColor} rounded-xl p-5 relative overflow-hidden group cursor-pointer`}
              >
                {/* Animated Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <TierIcon size={28} className={config.textColor} />
                    <div className={`px-3 py-1 rounded-full bg-zinc-900/50 border ${config.borderColor}`}>
                      <span className={`text-xs ${config.textColor}`}>{config.members}</span>
                    </div>
                  </div>
                  
                  <h4 className={`text-lg mb-2 ${config.textColor}`}>{config.name}</h4>
                  
                  <div className="space-y-2 text-xs text-zinc-400">
                    <div className="flex items-center justify-between">
                      <span>Dépense min.</span>
                      <span className="text-zinc-300">{config.minSpend} FCFA</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Réduction</span>
                      <span className={config.textColor}>{config.discount}</span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="mt-4 flex items-center text-xs text-zinc-500 group-hover:text-yellow-500 transition-colors"
                  >
                    <span>Voir détails</span>
                    <ChevronRight size={14} className="ml-1" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Top Referrers & Active Codes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Referrers */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-yellow-900/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-700/30 flex items-center justify-center">
                <Users size={20} className="text-yellow-500" />
              </div>
              <div>
                <h3 className="text-lg text-yellow-600">Top Parrains</h3>
                <p className="text-zinc-500 text-xs">Les meilleurs ambassadeurs</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {topReferrers.map((referrer, index) => {
              const tierInfo = tierConfig[referrer.tier];
              return (
                <motion.div
                  key={referrer.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-yellow-900/10 hover:border-yellow-900/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center">
                        <span className="text-sm">{index + 1}</span>
                      </div>
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                          <Trophy size={10} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-zinc-200 truncate">{referrer.name}</p>
                        <div className={`px-2 py-0.5 rounded-full ${tierInfo.bgColor} border ${tierInfo.borderColor}`}>
                          <span className={`text-xs ${tierInfo.textColor}`}>{tierInfo.name}</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500 truncate">{referrer.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-yellow-600">{referrer.referralCount} parrainés</p>
                    <p className="text-xs text-zinc-500">{referrer.totalEarned}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-3 rounded-lg bg-yellow-600/10 border border-yellow-600/20 text-yellow-600 hover:bg-yellow-600/20 transition-all duration-300 text-sm"
          >
            Voir tous les parrains
          </motion.button>
        </motion.div>

        {/* Active Referral Codes */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-yellow-900/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-700/30 flex items-center justify-center">
                <Gift size={20} className="text-yellow-500" />
              </div>
              <div>
                <h3 className="text-lg text-yellow-600">Codes Actifs</h3>
                <p className="text-zinc-500 text-xs">Codes de parrainage disponibles</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {activeCodes.map((code, index) => {
              const progress = (code.uses / code.maxUses) * 100;
              return (
                <motion.div
                  key={code.code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="p-4 rounded-lg bg-zinc-900/50 border border-yellow-900/10 hover:border-yellow-900/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="px-3 py-1.5 rounded-lg bg-yellow-600/20 border border-yellow-600/30">
                        <code className="text-yellow-500 text-sm">{code.code}</code>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopyCode(code.code)}
                        className="w-8 h-8 rounded-lg bg-zinc-800/50 border border-yellow-900/20 flex items-center justify-center hover:border-yellow-600/30 transition-all"
                      >
                        {copiedCode === code.code ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy size={14} className="text-zinc-400" />
                        )}
                      </motion.button>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-yellow-600/10 border border-yellow-600/20">
                      <span className="text-yellow-500 text-xs">{code.discount}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>Utilisations</span>
                      <span className="text-zinc-400">{code.uses} / {code.maxUses}</span>
                    </div>
                    
                    <div className="relative w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.6 + index * 0.05, duration: 0.8 }}
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-full"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>Expire le</span>
                      <span className="text-zinc-400">{code.expiresAt}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-800 text-white hover:shadow-lg hover:shadow-yellow-900/50 transition-all duration-300 text-sm"
          >
            Créer un nouveau code
          </motion.button>
        </motion.div>
      </div>

      {/* Program Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-zinc-950/50 backdrop-blur-xl border border-yellow-900/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-700/30 flex items-center justify-center">
              <BarChart3 size={20} className="text-yellow-500" />
            </div>
            <div>
              <h3 className="text-xl text-yellow-600">Statistiques du Programme</h3>
              <p className="text-zinc-500 text-sm">Vue d'ensemble des performances</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-yellow-600/10 border border-yellow-600/20 text-yellow-600 hover:bg-yellow-600/20 transition-all duration-300 text-sm"
          >
            Rapport détaillé
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-lg bg-zinc-900/50 border border-yellow-900/10">
            <div className="flex items-center justify-between mb-3">
              <Target size={20} className="text-yellow-500" />
              <span className="text-xs text-green-500">+28%</span>
            </div>
            <p className="text-2xl text-zinc-100 mb-1">78.5%</p>
            <p className="text-sm text-zinc-500">Taux de rétention</p>
          </div>

          <div className="p-5 rounded-lg bg-zinc-900/50 border border-yellow-900/10">
            <div className="flex items-center justify-between mb-3">
              <Gift size={20} className="text-yellow-500" />
              <span className="text-xs text-green-500">+15%</span>
            </div>
            <p className="text-2xl text-zinc-100 mb-1">4.2M FCFA</p>
            <p className="text-sm text-zinc-500">Valeur moyenne client</p>
          </div>

          <div className="p-5 rounded-lg bg-zinc-900/50 border border-yellow-900/10">
            <div className="flex items-center justify-between mb-3">
              <Share2 size={20} className="text-yellow-500" />
              <span className="text-xs text-green-500">+42%</span>
            </div>
            <p className="text-2xl text-zinc-100 mb-1">2.8</p>
            <p className="text-sm text-zinc-500">Parrainages par membre</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
