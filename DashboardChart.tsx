import { motion } from 'motion/react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DashboardChart() {
  const data = [
    { name: 'Lun', revenus: 1200000, commandes: 35 },
    { name: 'Mar', revenus: 1800000, commandes: 42 },
    { name: 'Mer', revenus: 1500000, commandes: 38 },
    { name: 'Jeu', revenus: 2100000, commandes: 52 },
    { name: 'Ven', revenus: 2800000, commandes: 68 },
    { name: 'Sam', revenus: 3200000, commandes: 75 },
    { name: 'Dim', revenus: 2450000, commandes: 48 }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950/95 border border-yellow-900/30 rounded-lg p-3 backdrop-blur-sm">
          <p className="text-zinc-400 text-sm mb-1">{payload[0].payload.name}</p>
          <p className="text-yellow-600">
            {new Intl.NumberFormat('fr-FR').format(payload[0].value)} FCFA
          </p>
          <p className="text-zinc-400 text-sm mt-1">
            {payload[0].payload.commandes} commandes
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl text-yellow-600">Revenus de la semaine</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-yellow-600" />
          <span className="text-sm text-zinc-400">Revenus</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ca8a04" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ca8a04" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis 
              dataKey="name" 
              stroke="#71717a"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#71717a"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="revenus" 
              stroke="#ca8a04" 
              strokeWidth={2}
              fill="url(#colorRevenus)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}