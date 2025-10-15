import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  X,
  Send,
  Eye
} from 'lucide-react';

interface Complaint {
  id: string;
  studentName: string;
  studentEmail: string;
  subject: string;
  category: 'service' | 'food' | 'hygiene' | 'pricing' | 'other';
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  response?: string;
}

const mockComplaints: Complaint[] = [
  {
    id: 'REC-001',
    studentName: 'Marie Dupont',
    studentEmail: 'marie.dupont@student.com',
    subject: 'Attente trop longue',
    category: 'service',
    description: 'J\'ai attendu plus de 45 minutes pour ma commande alors qu\'il n\'y avait pas beaucoup de monde. C\'est vraiment trop long.',
    status: 'pending',
    priority: 'high',
    createdAt: '2025-10-10T14:30:00',
    assignedTo: 'Manager Salle'
  },
  {
    id: 'REC-002',
    studentName: 'Jean Martin',
    studentEmail: 'jean.martin@student.com',
    subject: 'Plat froid',
    category: 'food',
    description: 'Mon plat est arrivé à peine tiède, ce qui a gâché mon expérience. Pour un restaurant de ce standing, c\'est décevant.',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2025-10-09T12:15:00',
    assignedTo: 'Chef Cuisine',
    response: 'Nous sommes désolés pour cette expérience. Nous enquêtons actuellement sur le problème.'
  },
  {
    id: 'REC-003',
    studentName: 'Sophie Laurent',
    studentEmail: 'sophie.laurent@student.com',
    subject: 'Table mal nettoyée',
    category: 'hygiene',
    description: 'La table n\'était pas propre quand je me suis assise. Il y avait encore des miettes du client précédent.',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2025-10-08T18:45:00',
    resolvedAt: '2025-10-09T09:00:00',
    assignedTo: 'Manager Salle',
    response: 'Nous nous excusons sincèrement. Le personnel a été formé à nouveau sur les procédures de nettoyage.'
  },
  {
    id: 'REC-004',
    studentName: 'Pierre Dubois',
    studentEmail: 'pierre.dubois@student.com',
    subject: 'Prix non conforme',
    category: 'pricing',
    description: 'Le prix affiché sur le menu ne correspond pas à ce qui m\'a été facturé. Il y a une différence de 2000 FCFA.',
    status: 'resolved',
    priority: 'high',
    createdAt: '2025-10-07T13:20:00',
    resolvedAt: '2025-10-08T10:30:00',
    assignedTo: 'Admin Principal',
    response: 'Erreur corrigée et remboursement effectué. Merci d\'avoir signalé ce problème.'
  },
  {
    id: 'REC-005',
    studentName: 'Claire Bernard',
    studentEmail: 'claire.bernard@student.com',
    subject: 'Serveur impoli',
    category: 'service',
    description: 'Le serveur qui m\'a servi était très désagréable et n\'a pas répondu à mes questions poliment.',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2025-10-10T16:00:00',
    assignedTo: 'Manager Salle'
  }
];

const categoryConfig = {
  service: { label: 'Service', color: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500' } },
  food: { label: 'Nourriture', color: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500' } },
  hygiene: { label: 'Hygiène', color: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500' } },
  pricing: { label: 'Tarification', color: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500' } },
  other: { label: 'Autre', color: { bg: 'bg-zinc-500/10', border: 'border-zinc-500/30', text: 'text-zinc-500' } }
};

const statusConfig = {
  pending: { label: 'En attente', icon: Clock, color: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500' } },
  'in-progress': { label: 'En cours', icon: MessageSquare, color: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500' } },
  resolved: { label: 'Résolue', icon: CheckCircle, color: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500' } },
  closed: { label: 'Fermée', icon: X, color: { bg: 'bg-zinc-500/10', border: 'border-zinc-500/30', text: 'text-zinc-500' } }
};

const priorityConfig = {
  low: { label: 'Basse', color: { bg: 'bg-zinc-500/10', border: 'border-zinc-500/30', text: 'text-zinc-500' } },
  medium: { label: 'Moyenne', color: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500' } },
  high: { label: 'Haute', color: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500' } }
};

export function ComplaintsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Complaint['status']>('all');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total réclamations', value: mockComplaints.length, icon: MessageSquare },
    { label: 'En attente', value: mockComplaints.filter(c => c.status === 'pending').length, icon: Clock },
    { label: 'En cours', value: mockComplaints.filter(c => c.status === 'in-progress').length, icon: AlertCircle },
    { label: 'Résolues', value: mockComplaints.filter(c => c.status === 'resolved').length, icon: CheckCircle }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">{stat.label}</p>
                  <p className="text-2xl text-yellow-600 mt-2">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-600/10 rounded-lg flex items-center justify-center">
                  <Icon className="text-yellow-600" size={24} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Status Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
            statusFilter === 'all'
              ? 'bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border-yellow-700/50 text-yellow-500'
              : 'bg-zinc-950/50 border-yellow-900/20 text-zinc-400 hover:border-yellow-700/30'
          }`}
        >
          Tous les statuts
        </button>
        {(['pending', 'in-progress', 'resolved', 'closed'] as const).map((status) => {
          const config = statusConfig[status];
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
                statusFilter === status
                  ? `${config.color.bg} ${config.color.border} ${config.color.text}`
                  : 'bg-zinc-950/50 border-yellow-900/20 text-zinc-400 hover:border-yellow-700/30'
              }`}
            >
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom, sujet ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
            />
          </div>

          <button className="px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300 flex items-center gap-2">
            <Filter size={18} />
            <span>Filtres avancés</span>
          </button>
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint, index) => {
          const statusInfo = statusConfig[complaint.status];
          const StatusIcon = statusInfo.icon;
          const categoryInfo = categoryConfig[complaint.category];
          const priorityInfo = priorityConfig[complaint.priority];
          
          return (
            <motion.div
              key={complaint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedComplaint(complaint)}
              className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6 hover:border-yellow-700/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg text-zinc-100">{complaint.subject}</h3>
                        <span className={`px-3 py-1 rounded-full border ${priorityInfo.color.bg} ${priorityInfo.color.border} ${priorityInfo.color.text} text-sm`}>
                          {priorityInfo.label}
                        </span>
                      </div>
                      <p className="text-zinc-500 text-sm">{complaint.id}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 line-clamp-2">{complaint.description}</p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <User size={14} />
                      <span>{complaint.studentName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Calendar size={14} />
                      <span>{new Date(complaint.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${categoryInfo.color.bg} ${categoryInfo.color.border} ${categoryInfo.color.text}`}>
                      {categoryInfo.label}
                    </span>
                  </div>

                  {/* Assigned To */}
                  {complaint.assignedTo && (
                    <p className="text-sm text-zinc-500">
                      Assignée à: <span className="text-yellow-600">{complaint.assignedTo}</span>
                    </p>
                  )}
                </div>

                {/* Status */}
                <div className="flex md:flex-col items-start gap-2">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${statusInfo.color.bg} ${statusInfo.color.border} ${statusInfo.color.text}`}>
                    <StatusIcon size={16} />
                    {statusInfo.label}
                  </span>
                  <button className="px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300 flex items-center gap-2">
                    <Eye size={16} />
                    <span>Détails</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedComplaint(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-950 border border-yellow-900/20 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-2xl text-yellow-600">{selectedComplaint.subject}</h3>
                <p className="text-zinc-400 mt-1">{selectedComplaint.id}</p>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <X className="text-zinc-400" size={24} />
              </button>
            </div>

            {/* Status and Priority */}
            <div className="flex gap-3 mb-6">
              {(() => {
                const statusInfo = statusConfig[selectedComplaint.status];
                const StatusIcon = statusInfo.icon;
                return (
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${statusInfo.color.bg} ${statusInfo.color.border} ${statusInfo.color.text}`}>
                    <StatusIcon size={18} />
                    {statusInfo.label}
                  </span>
                );
              })()}
              {(() => {
                const priorityInfo = priorityConfig[selectedComplaint.priority];
                return (
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${priorityInfo.color.bg} ${priorityInfo.color.border} ${priorityInfo.color.text}`}>
                    <AlertCircle size={18} />
                    Priorité {priorityInfo.label}
                  </span>
                );
              })()}
              {(() => {
                const categoryInfo = categoryConfig[selectedComplaint.category];
                return (
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${categoryInfo.color.bg} ${categoryInfo.color.border} ${categoryInfo.color.text}`}>
                    {categoryInfo.label}
                  </span>
                );
              })()}
            </div>

            {/* Student Info */}
            <div className="bg-zinc-900/50 rounded-lg p-6 border border-yellow-900/10 mb-6">
              <h4 className="text-lg text-yellow-600 mb-4">Informations de l'étudiant</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-400 text-sm">Nom</p>
                  <p className="text-zinc-100 mt-1">{selectedComplaint.studentName}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Email</p>
                  <p className="text-zinc-100 mt-1">{selectedComplaint.studentEmail}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Date de soumission</p>
                  <p className="text-zinc-100 mt-1">{new Date(selectedComplaint.createdAt).toLocaleString('fr-FR')}</p>
                </div>
                {selectedComplaint.assignedTo && (
                  <div>
                    <p className="text-zinc-400 text-sm">Assignée à</p>
                    <p className="text-yellow-600 mt-1">{selectedComplaint.assignedTo}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-lg text-yellow-600 mb-3">Description</h4>
              <p className="text-zinc-400 leading-relaxed">{selectedComplaint.description}</p>
            </div>

            {/* Response */}
            {selectedComplaint.response ? (
              <div className="bg-zinc-900/50 rounded-lg p-6 border border-yellow-900/10 mb-6">
                <h4 className="text-lg text-yellow-600 mb-3">Réponse</h4>
                <p className="text-zinc-400 leading-relaxed">{selectedComplaint.response}</p>
                {selectedComplaint.resolvedAt && (
                  <p className="text-sm text-zinc-500 mt-3">
                    Résolu le {new Date(selectedComplaint.resolvedAt).toLocaleString('fr-FR')}
                  </p>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <h4 className="text-lg text-yellow-600 mb-3">Répondre à la réclamation</h4>
                <textarea
                  rows={4}
                  placeholder="Écrivez votre réponse..."
                  className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors resize-none"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-yellow-900/20">
              {selectedComplaint.status !== 'resolved' && (
                <>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center gap-2">
                    <Send size={18} />
                    Envoyer la réponse
                  </button>
                  <button className="flex-1 px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 hover:bg-green-500/20 transition-all duration-300 flex items-center justify-center gap-2">
                    <CheckCircle size={18} />
                    Marquer comme résolue
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-3 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
