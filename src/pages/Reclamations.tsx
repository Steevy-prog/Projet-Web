import { motion } from 'motion/react';
import { useState } from 'react';
import { Send } from 'lucide-react';

export function Reclamations() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'service',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Réclamation envoyée:', formData);
    // Mock sending to admin/worker/manager
    alert('Votre réclamation a été envoyée avec succès !');
    setFormData({ name: '', email: '', type: 'service', message: '' });
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent mb-6">
            Réclamations
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mx-auto mb-8" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Votre satisfaction est notre priorité. N'hésitez pas à nous faire part de vos remarques.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Storytelling */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8">
              <h2 className="text-3xl mb-6 text-[#b88b1f]">Notre Histoire</h2>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Fondé en 2015, le restaurant Zeduc est né de la passion de notre chef étoilé pour 
                  la gastronomie française raffinée et les saveurs authentiques.
                </p>
                
                <p>
                  Notre mission est simple : offrir à chaque client une expérience culinaire 
                  inoubliable dans un cadre élégant et chaleureux. Chaque plat est une œuvre d'art, 
                  préparé avec des ingrédients frais et de saison soigneusement sélectionnés.
                </p>
                
                <p>
                  Récompensé de 3 étoiles au Guide Michelin, Zeduc est devenu une référence 
                  de la gastronomie moderne, alliant tradition et innovation.
                </p>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8">
              <h3 className="text-2xl mb-4 text-[#b88b1f]">Nos Valeurs</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#b88b1f] mt-1">•</span>
                  <span>Excellence dans chaque assiette</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#b88b1f] mt-1">•</span>
                  <span>Service client irréprochable</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#b88b1f] mt-1">•</span>
                  <span>Ingrédients locaux et durables</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#b88b1f] mt-1">•</span>
                  <span>Innovation et créativité culinaire</span>
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
            <h2 className="text-3xl mb-6 text-[#b88b1f]">Formulaire de Réclamation</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Nom complet</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-[#b88b1f]/30 rounded-2xl text-white placeholder-gray-500 focus:border-[#b88b1f] focus:outline-none transition-colors duration-300"
                  placeholder="Jean Dupont"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-[#b88b1f]/30 rounded-2xl text-white placeholder-gray-500 focus:border-[#b88b1f] focus:outline-none transition-colors duration-300"
                  placeholder="jean.dupont@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Type de réclamation</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-[#b88b1f]/30 rounded-2xl text-white focus:border-[#b88b1f] focus:outline-none transition-colors duration-300"
                  required
                >
                  <option value="service">Service</option>
                  <option value="qualite">Qualité des plats</option>
                  <option value="hygiene">Hygiène</option>
                  <option value="reservation">Réservation</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Votre message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
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
              Votre réclamation sera transmise à notre équipe sous 24h
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
