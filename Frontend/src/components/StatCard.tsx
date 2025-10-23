import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  delay?: number;
}

export function StatCard({ icon: Icon, label, value, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className="bg-card border border-border rounded-2xl p-6 space-y-3 card-animated hover-gold-lift bg-gold-gradient"
    >
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-2xl bg-primary/10 animate-gold-pulse">
          <Icon className="size-6 text-primary animate-gold-sparkle" />
        </div>
        {trend && (
          <span className="text-sm text-primary hover-gold-brighten">{trend}</span>
        )}
      </div>

      <div>
        <p className="text-3xl text-foreground text-gold-gradient">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </div>
    </motion.div>
  );
}
