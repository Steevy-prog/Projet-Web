import { motion } from 'motion/react';
import { useState } from 'react';
import { mockReclamations } from '../../data/mockData';
import { Reclamation } from '../../types';
import { MessageSquare, Send, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function EmployeeReclamations() {
  const [reclamations, setReclamations] = useState<Reclamation[]>(mockReclamations);
  const [selectedReclamation, setSelectedReclamation] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [filter, setFilter] = useState<'all' | 'en attente' | 'en cours' | 'traitée'>('all');

  // Filtrer les réclamations
  const filteredReclamations =
    filter === 'all'
      ? reclamations
      : reclamations.filter((rec) => rec.status === filter);

  // Répondre à une réclamation
  const handleRespond = (reclamationId: string) => {
    if (!response.trim()) return;

    setReclamations(
      reclamations.map((rec) =>
        rec.id === reclamationId
          ? { ...rec, status: 'traitée' as const, response: response }
          : rec
      )
    );
    setResponse('');
    setSelectedReclamation(null);
  };

  // Changer le statut
  const handleStatusChange = (reclamationId: string, newStatus: Reclamation['status']) => {
    setReclamations(
      reclamations.map((rec) =>
        rec.id === reclamationId ? { ...rec, status: newStatus } : rec
      )
    );
  };

  // Obtenir la couleur selon le statut
  const getStatusColor = (status: Reclamation['status']) => {
    switch (status) {
      case 'en attente':
        return { bg: 'bg-red-500/20', text: 'text-red-400', icon: AlertCircle };
      case 'en cours':
        return { bg: 'bg-orange-500/20', text: 'text-orange-400', icon: Clock };
      case 'traitée':
        return { bg: 'bg-green-500/20', text: 'text-green-400', icon: CheckCircle };
      default:
        return { bg: 'bg-gray-500/20', text: 'text-gray-400', icon: AlertCircle };
    }
  };

  // Obtenir l'icône du type
  const getTypeIcon = (type: string) => {
    const iconClass = 'w-5 h-5';
    switch (type.toLowerCase()) {
      case 'qualité':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'service':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case 'commande':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        );
      default:
        return <MessageSquare className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <MessageSquare className="w-12 h-12 text-[#b88b1f]" />
            <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent">
              Réclamations
            </h1>
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mb-8" />
          <p className="text-gray-400 text-lg">
            Gérez et répondez aux réclamations des clients
          </p>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <span className="text-gray-400">En attente</span>
            </div>
            <p className="text-4xl text-red-400 font-bold">
              {reclamations.filter((r) => r.status === 'en attente').length}
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-orange-400" />
              <span className="text-gray-400">En cours</span>
            </div>
            <p className="text-4xl text-orange-400 font-bold">
              {reclamations.filter((r) => r.status === 'en cours').length}
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-gray-400">Traitées</span>
            </div>
            <p className="text-4xl text-green-400 font-bold">
              {reclamations.filter((r) => r.status === 'traitée').length}
            </p>
          </div>
        </motion.div>

        {/* Filtres */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {['all', 'en attente', 'en cours', 'traitée'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as typeof filter)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                filter === status
                  ? 'bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black'
                  : 'bg-black/30 border border-[#b88b1f]/30 text-gray-300 hover:border-[#b88b1f]/50'
              }`}
            >
              {status === 'all' ? 'Toutes' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Liste des réclamations */}
        <div className="space-y-6">
          {filteredReclamations.map((reclamation, index) => {
            const statusColor = getStatusColor(reclamation.status);
            const StatusIcon = statusColor.icon;
            const isSelected = selectedReclamation === reclamation.id;

            return (
              <motion.div
                key={reclamation.id}
                className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl overflow-hidden hover:border-[#b88b1f]/40 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="p-6">
                  {/* En-tête */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xl text-[#b88b1f] font-bold">
                          {reclamation.id}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text} flex items-center gap-1`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {reclamation.status}
                        </span>
                        <span className="px-3 py-1 bg-[#b88b1f]/20 text-[#b88b1f] rounded-full text-xs font-semibold flex items-center gap-1">
                          {getTypeIcon(reclamation.type)}
                          {reclamation.type}
                        </span>
                      </div>
                      <p className="text-white text-lg font-semibold mb-1">
                        {reclamation.name}
                      </p>
                      <p className="text-gray-400 text-sm">{reclamation.email}</p>
                      <p className="text-gray-500 text-sm mt-1">{reclamation.date}</p>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-black/20 rounded-2xl p-4 mb-4">
                    <p className="text-gray-300">{reclamation.message}</p>
                  </div>

                  {/* Réponse existante */}
                  {reclamation.response && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-semibold text-sm">
                          Réponse envoyée
                        </span>
                      </div>
                      <p className="text-gray-300">{reclamation.response}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    {reclamation.status === 'en attente' && (
                      <button
                        onClick={() => handleStatusChange(reclamation.id, 'en cours')}
                        className="px-4 py-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-2xl hover:bg-orange-500/30 transition-all duration-300 font-semibold"
                      >
                        <Clock className="w-4 h-4 inline mr-2" />
                        Prendre en charge
                      </button>
                    )}

                    {reclamation.status !== 'traitée' && (
                      <button
                        onClick={() =>
                          setSelectedReclamation(isSelected ? null : reclamation.id)
                        }
                        className="px-4 py-2 bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black rounded-2xl hover:shadow-lg hover:shadow-[#b88b1f]/30 transition-all duration-300 font-semibold"
                      >
                        <Send className="w-4 h-4 inline mr-2" />
                        {isSelected ? 'Annuler' : 'Répondre'}
                      </button>
                    )}
                  </div>

                  {/* Formulaire de réponse */}
                  {isSelected && (
                    <motion.div
                      className="mt-6 pt-6 border-t border-[#b88b1f]/20"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-gray-300 mb-3 font-semibold">
                        Votre réponse
                      </label>
                      <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        className="w-full p-4 bg-black/40 border border-[#b88b1f]/30 rounded-2xl text-white placeholder-gray-500 focus:border-[#b88b1f] focus:outline-none transition-colors duration-300 resize-none"
                        rows={4}
                        placeholder="Rédigez votre réponse au client..."
                      />
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleRespond(reclamation.id)}
                          disabled={!response.trim()}
                          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-4 h-4 inline mr-2" />
                          Envoyer et marquer comme traitée
                        </button>
                        <button
                          onClick={() => {
                            setSelectedReclamation(null);
                            setResponse('');
                          }}
                          className="px-6 py-3 bg-black/40 border border-[#b88b1f]/30 text-gray-300 rounded-2xl hover:border-[#b88b1f]/50 transition-all duration-300 font-semibold"
                        >
                          Annuler
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredReclamations.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Aucune réclamation dans cette catégorie</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
