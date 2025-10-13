import { motion } from 'motion/react';
import { mockUser } from '../../data/mockData';
import { Award, ShoppingBag, Gamepad2, Gift } from 'lucide-react';

export function UserHome() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0d] via-[#12121a] to-[#0b0b0d]" />
        
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl mb-8 bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Bienvenue, {mockUser.name.split(' ')[0]}
          </motion.h1>

          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Votre espace personnel pour profiter pleinement de votre expérience Zeduc
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="px-6 py-3 bg-[#b88b1f]/20 border border-[#b88b1f]/30 rounded-2xl">
              <p className="text-gray-400 text-sm mb-1">Points</p>
              <p className="text-2xl text-[#b88b1f]">{mockUser.loyaltyPoints}</p>
            </div>
            <div className="px-6 py-3 bg-[#b88b1f]/20 border border-[#b88b1f]/30 rounded-2xl">
              <p className="text-gray-400 text-sm mb-1">Rang</p>
              <p className="text-2xl text-[#b88b1f]">#{mockUser.rank}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#b88b1f]/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-4xl text-center mb-12 bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Que souhaitez-vous faire ?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShoppingBag,
                title: 'Commander',
                description: 'Parcourir les menus',
                color: '#b88b1f',
              },
              {
                icon: Gamepad2,
                title: 'Jouer',
                description: 'Gagner des points',
                color: '#d4a74a',
              },
              {
                icon: Gift,
                title: 'Récompenses',
                description: 'Échanger vos points',
                color: '#b88b1f',
              },
              {
                icon: Award,
                title: 'Classement',
                description: 'Voir votre progression',
                color: '#d4a74a',
              },
            ].map((action, index) => (
              <motion.div
                key={action.title}
                className="group bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8 hover:border-[#b88b1f]/40 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <action.icon className="w-6 h-6" style={{ color: action.color }} />
                </div>
                <h3 className="text-xl mb-2">{action.title}</h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Info */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-[#12121a]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl mb-4 text-[#b88b1f]">Nouveautés</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#b88b1f] mt-1">•</span>
                  <span>Nouveau menu automnal disponible</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#b88b1f] mt-1">•</span>
                  <span>Événement "Soirée Dégustation" le 25 octobre</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#b88b1f] mt-1">•</span>
                  <span>Nouvelles récompenses dans le catalogue</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl mb-4 text-[#b88b1f]">Vos Avantages</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#b88b1f] mt-1">•</span>
                  <span>Réservation prioritaire</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#b88b1f] mt-1">•</span>
                  <span>Offres exclusives membres</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#b88b1f] mt-1">•</span>
                  <span>Points doublés tous les mardis</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
