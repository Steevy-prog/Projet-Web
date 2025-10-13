import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover3d?: boolean;
  glowEffect?: boolean;
  onClick?: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  delay = 0,
  hover3d = true,
  glowEffect = false,
  onClick,
}) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={hover3d ? { scale: 1.05, rotateX: 5, rotateY: 5 } : { scale: 1.02 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      onClick={onClick}
      className={`
        bg-gradient-to-br from-gray-800/50 to-gray-900/50 
        backdrop-blur-sm border border-gray-700/50 rounded-xl 
        shadow-xl hover:shadow-2xl transition-all duration-300
        ${hover3d ? 'transform-gpu perspective-1000' : ''}
        ${glowEffect ? 'hover:shadow-glow' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
