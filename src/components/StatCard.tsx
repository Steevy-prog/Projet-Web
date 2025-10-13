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
      className="bg-card border border-border rounded-2xl p-6 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-2xl bg-primary/10">
          <Icon className="size-6 text-primary" />
        </div>
        {trend && (
          <span className="text-sm text-primary">{trend}</span>
        )}
      </div>

      <div>
        <p className="text-3xl text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </div>
    </motion.div>
  );
}
