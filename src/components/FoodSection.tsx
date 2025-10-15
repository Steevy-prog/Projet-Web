import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FoodItem {
  title: string;
  description: string;
  price: string;
  image: string;
}

interface FoodSectionProps {
  title: string;
  items: FoodItem[];
}

export function FoodSection({ title, items }: FoodSectionProps) {
  return (
    <section className="py-20 px-8 sm:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl mb-4 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative bg-zinc-950/30 border border-yellow-900/20 hover:border-yellow-700/40 transition-all duration-500 overflow-hidden backdrop-blur-sm"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Price Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                  className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-br from-yellow-600 to-yellow-800 backdrop-blur-sm"
                >
                  <span className="text-white tracking-wider">{item.price}</span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl text-yellow-600 tracking-wide group-hover:text-yellow-500 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Decorative Line */}
                <motion.div
                  className="h-px bg-gradient-to-r from-yellow-600/0 via-yellow-600/50 to-yellow-600/0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                />
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-600/0 to-yellow-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}