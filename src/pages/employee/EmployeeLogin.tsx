import { motion } from 'motion/react';
import { useState } from 'react';
import { Mail, Lock, ArrowRight, Briefcase } from 'lucide-react';

interface EmployeeLoginProps {
  onLogin: () => void;
}

export function EmployeeLogin({ onLogin }: EmployeeLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication pour employés
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-[#b88b1f]/20 to-[#d4a74a]/10 border border-[#b88b1f]/30 rounded-3xl">
              <Briefcase className="w-12 h-12 text-[#b88b1f]" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent mb-6">
            Espace Employé
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mx-auto mb-6" />
          <p className="text-gray-400">
            Connectez-vous pour gérer les commandes et le restaurant
          </p>
        </motion.div>

        <motion.div
          className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Email Professionnel</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#b88b1f]/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border border-[#b88b1f]/30 rounded-2xl text-white placeholder-gray-500 focus:border-[#b88b1f] focus:outline-none transition-colors duration-300"
                  placeholder="employe@restaurant.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#b88b1f]/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border border-[#b88b1f]/30 rounded-2xl text-white placeholder-gray-500 focus:border-[#b88b1f] focus:outline-none transition-colors duration-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400">
                <input
                  type="checkbox"
                  className="mr-2 rounded accent-[#b88b1f]"
                />
                Se souvenir de moi
              </label>
              <a href="#" className="text-[#b88b1f] hover:text-[#d4a74a] transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black font-semibold rounded-2xl hover:shadow-lg hover:shadow-[#b88b1f]/30 transition-all duration-300 group"
            >
              Se connecter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#b88b1f]/20">
            <p className="text-gray-400 text-sm text-center">
              Accès réservé au personnel du restaurant
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
