import { motion } from 'motion/react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  index: number;
}

export function StatsCard({ title, value, change, icon: Icon, trend, index }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-zinc-950/50 border border-yellow-900/20 hover:border-yellow-700/40 rounded-lg p-6 overflow-hidden backdrop-blur-sm transition-all duration-500"
    >
      {/* Hover Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-600/0 to-yellow-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-zinc-400 text-sm tracking-wide">{title}</p>
          <h3 className="text-2xl text-zinc-100">{value}</h3>
          
          <div className="flex items-center space-x-2">
            {trend === 'up' ? (
              <TrendingUp size={16} className="text-green-500" />
            ) : (
              <TrendingDown size={16} className="text-red-500" />
            )}
            <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
            <span className="text-zinc-500 text-sm">vs hier</span>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="p-3 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-lg border border-yellow-700/30"
        >
          <Icon size={24} className="text-yellow-600" />
        </motion.div>
      </div>

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-yellow-600/0 via-yellow-600/50 to-yellow-600/0"
      />
    </motion.div>
  );
}