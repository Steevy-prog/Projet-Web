import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  Users, 
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  Package,
  Eye,
  Edit,
  Trash2,
  Plus,
  Award,
  UserCog,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { StatsCard } from './StatsCard';
import { RecentOrders } from './RecentOrders';
import { MenuManagement } from './MenuManagement';
import { DashboardChart } from './DashboardChart';
import { LoyaltyManagement } from './LoyaltyManagement';
import { OrdersManagement } from './OrdersManagement';
import { CustomersManagement } from './CustomersManagement';
import { SettingsManagement } from './SettingsManagement';
import { EmployeesManagement } from './EmployeesManagement';
import { PromotionsManagement } from './PromotionsManagement';
import { ComplaintsManagement } from './ComplaintsManagement';

type TabType = 'dashboard' | 'menu' | 'orders' | 'customers' | 'employees' | 'promotions' | 'complaints' | 'loyalty' | 'settings';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'menu' as TabType, label: 'Menu', icon: UtensilsCrossed },
    { id: 'orders' as TabType, label: 'Commandes', icon: ShoppingBag },
    { id: 'customers' as TabType, label: 'Clients', icon: Users },
    { id: 'employees' as TabType, label: 'Employés', icon: UserCog },
    { id: 'promotions' as TabType, label: 'Promotions', icon: Sparkles },
    { id: 'complaints' as TabType, label: 'Réclamations', icon: MessageSquare },
    { id: 'loyalty' as TabType, label: 'Fidélité', icon: Award },
    { id: 'settings' as TabType, label: 'Paramètres', icon: Settings },
  ];

  const stats = [
    {
      title: 'Revenus du jour',
      value: '2,450,000 FCFA',
      change: '+12.5%',
      icon: DollarSign,
      trend: 'up' as const
    },
    {
      title: 'Commandes',
      value: '48',
      change: '+8.2%',
      icon: ShoppingBag,
      trend: 'up' as const
    },
    {
      title: 'Plats servis',
      value: '127',
      change: '+15.3%',
      icon: Package,
      trend: 'up' as const
    },
    {
      title: 'Nouveaux clients',
      value: '12',
      change: '+5.1%',
      icon: Users,
      trend: 'up' as const
    }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex dark">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-yellow-900/5 via-transparent to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-yellow-800/5 via-transparent to-transparent blur-3xl"
        />
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed left-0 top-0 h-full w-64 bg-zinc-950/80 backdrop-blur-xl border-r border-yellow-900/20 z-40"
      >
        {/* Logo */}
        <div className="p-6 border-b border-yellow-900/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 shadow-lg shadow-yellow-900/50" />
            <div>
              <h2 className="tracking-wider text-yellow-600">ZEDUC</h2>
              <p className="text-xs text-zinc-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border border-yellow-700/30 text-yellow-500'
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <motion.button
            whileHover={{ x: 4 }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-zinc-400 hover:bg-red-900/20 hover:text-red-400 transition-all duration-300"
          >
            <LogOut size={20} />
            <span>Déconnexion</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 relative z-10">
        {/* Header */}
        <header className="bg-zinc-950/50 backdrop-blur-xl border-b border-yellow-900/20 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h1>
              <p className="text-zinc-500 text-sm mt-1">
                Bienvenue sur votre tableau de bord
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-zinc-400">Aujourd'hui</p>
                <p className="text-yellow-600">{new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 space-y-8">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <StatsCard key={index} {...stat} index={index} />
                ))}
              </div>

              {/* Charts and Recent Orders */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardChart />
                <RecentOrders />
              </div>
            </motion.div>
          )}

          {activeTab === 'menu' && <MenuManagement />}

          {activeTab === 'orders' && <OrdersManagement />}

          {activeTab === 'customers' && <CustomersManagement />}

          {activeTab === 'employees' && <EmployeesManagement />}

          {activeTab === 'promotions' && <PromotionsManagement />}

          {activeTab === 'complaints' && <ComplaintsManagement />}

          {activeTab === 'loyalty' && <LoyaltyManagement />}

          {activeTab === 'settings' && <SettingsManagement />}
        </div>
      </main>
    </div>
  );
}