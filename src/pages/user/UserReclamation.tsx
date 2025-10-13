import { motion } from 'motion/react';
import { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { mockUser } from '../../data/mockData';

export function UserReclamation() {
  const [formData, setFormData] = useState({
    type: 'service',
    orderId: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Réclamation utilisateur envoyée:', {
      ...formData,
      userId: mockUser.id,
      userEmail: mockUser.email,
    });
    alert('Votre réclamation a été envoyée avec succès ! Notre équipe vous répondra sous 24h.');
    setFormData({ type: 'service', orderId: '', message: '' });
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent mb-6">
            Faire une Réclamation
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mx-auto mb-8" />
          <p className="text-gray-400 text-lg">
            Nous prenons vos remarques très au sérieux
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Info Card */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#b88b1f]/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-[#b88b1f]" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-[#b88b1f]">Vos informations</h3>
                  <p className="text-gray-400 text-sm">Automatiquement remplies</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between p-3 bg-black/20 rounded-2xl">
                  <span className="text-gray-400">Nom</span>
                  <span>{mockUser.name}</span>
                </div>
                <div className="flex justify-between p-3 bg-black/20 rounded-2xl">
                  <span className="text-gray-400">Email</span>
                  <span>{mockUser.email}</span>
                </div>
                <div className="flex justify-between p-3 bg-black/20 rounded-2xl">
                  <span className="text-gray-400">Commandes</span>
                  <span>{mockUser.ordersCount}</span>
                </div>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8">
              <h3 className="text-xl mb-4 text-[#b88b1f]">Temps de réponse</h3>
              <p className="text-gray-300 mb-4">
                Notre équipe s'engage à vous répondre dans les meilleurs délais :
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#b88b1f]">•</span>
                  <span>Réclamation urgente : sous 4h</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b88b1f]">•</span>
                  <span>Réclamation standard : sous 24h</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b88b1f]">•</span>
                  <span>Suivi par email et dans votre espace</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl mb-6 text-[#b88b1f]">Détails de votre réclamation</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Type de réclamation</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-[#b88b1f]/30 rounded-2xl text-white focus:border-[#b88b1f] focus:outline-none transition-colors duration-300"
                  required
                >
                  <option value="service">Qualité du service</option>
                  <option value="qualite">Qualité des plats</option>
                  <option value="hygiene">Hygiène et propreté</option>
                  <option value="reservation">Problème de réservation</option>
                  <option value="livraison">Livraison/Commande</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Numéro de commande (optionnel)
                </label>
                <input
                  type="text"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-[#b88b1f]/30 rounded-2xl text-white placeholder-gray-500 focus:border-[#b88b1f] focus:outline-none transition-colors duration-300"
                  placeholder="#12345"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Votre message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-3 bg-black/40 border border-[#b88b1f]/30 rounded-2xl text-white placeholder-gray-500 focus:border-[#b88b1f] focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Décrivez votre réclamation en détail..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black rounded-2xl hover:shadow-lg hover:shadow-[#b88b1f]/30 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                Envoyer la réclamation
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-6 text-center">
              Votre réclamation sera traitée en priorité
            </p>
          </motion.div>
        </div>

        {/* Recent Reclamations */}
        <motion.div
          className="mt-16 bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl mb-6 text-[#b88b1f]">Mes réclamations récentes</h3>
          
          <div className="space-y-4">
            {[
              {
                date: '10 Oct 2025',
                type: 'Service',
                status: 'Résolue',
                statusColor: 'text-green-400',
              },
              {
                date: '25 Sep 2025',
                type: 'Qualité des plats',
                status: 'En cours',
                statusColor: 'text-yellow-400',
              },
            ].map((reclamation, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-[#b88b1f]/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <div>
                  <p className="text-white mb-1">{reclamation.type}</p>
                  <p className="text-gray-500 text-sm">{reclamation.date}</p>
                </div>
                <span className={reclamation.statusColor}>{reclamation.status}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
