import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, CheckCircle, XCircle, Eye, AlertCircle } from 'lucide-react';
import { useEmployee } from '../lib/employeeContext';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

export function GerantReclamations() {
  const { reclamations, updateReclamationStatus } = useEmployee();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedReclamation, setSelectedReclamation] = useState<string | null>(null);
  const [supervisorComment, setSupervisorComment] = useState('');

  const filteredReclamations = filterStatus === 'all'
    ? reclamations
    : reclamations.filter((rec) => rec.status === filterStatus);

  const handleValidate = (reclamationId: string) => {
    if (!supervisorComment.trim()) {
      toast.error('Veuillez ajouter un commentaire de supervision');
      return;
    }
    updateReclamationStatus(reclamationId, 'resolved');
    toast.success('Réclamation validée et résolue');
    setSupervisorComment('');
    setSelectedReclamation(null);
  };

  const handleReject = (reclamationId: string) => {
    if (!supervisorComment.trim()) {
      toast.error('Veuillez ajouter un commentaire de supervision');
      return;
    }
    updateReclamationStatus(reclamationId, 'pending');
    toast.warning('Réclamation renvoyée aux employés');
    setSupervisorComment('');
    setSelectedReclamation(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'reviewed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'reviewed':
        return 'En cours';
      case 'resolved':
        return 'Résolue';
      default:
        return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'service':
        return 'Service';
      case 'food':
        return 'Nourriture';
      case 'delivery':
        return 'Livraison';
      case 'other':
        return 'Autre';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service':
        return 'bg-blue-500/10 text-blue-500';
      case 'food':
        return 'bg-orange-500/10 text-orange-500';
      case 'delivery':
        return 'bg-purple-500/10 text-purple-500';
      case 'other':
        return 'bg-gray-500/10 text-gray-500';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const statusCounts = {
    all: reclamations.length,
    pending: reclamations.filter((r) => r.status === 'pending').length,
    reviewed: reclamations.filter((r) => r.status === 'reviewed').length,
    resolved: reclamations.filter((r) => r.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl mb-2 text-foreground">
            Supervision des <span className="text-primary">Réclamations</span>
          </h1>
          <p className="text-muted-foreground">
            Validez ou rejetez les réponses proposées par les employés
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {[
            { value: 'all', label: 'Toutes', icon: MessageSquare },
            { value: 'pending', label: 'En attente', icon: AlertCircle },
            { value: 'reviewed', label: 'En cours', icon: Eye },
            { value: 'resolved', label: 'Résolues', icon: CheckCircle },
          ].map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all ${
                  filterStatus === filter.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-primary/20'
                }`}
              >
                <Icon className="size-4" />
                <span>{filter.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-background/20 text-xs">
                  {statusCounts[filter.value as keyof typeof statusCounts]}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-yellow-500/10">
                <AlertCircle className="size-5 text-yellow-500" />
              </div>
              <span className="text-muted-foreground">En attente</span>
            </div>
            <p className="text-3xl text-foreground">{statusCounts.pending}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-blue-500/10">
                <Eye className="size-5 text-blue-500" />
              </div>
              <span className="text-muted-foreground">En cours</span>
            </div>
            <p className="text-3xl text-foreground">{statusCounts.reviewed}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-green-500/10">
                <CheckCircle className="size-5 text-green-500" />
              </div>
              <span className="text-muted-foreground">Résolues</span>
            </div>
            <p className="text-3xl text-foreground">{statusCounts.resolved}</p>
          </div>
        </motion.div>

        {/* Reclamations List */}
        <div className="space-y-4">
          {filteredReclamations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card border border-border rounded-2xl p-12 text-center"
            >
              <MessageSquare className="size-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune réclamation trouvée</p>
            </motion.div>
          ) : (
            filteredReclamations.map((reclamation, index) => (
              <motion.div
                key={reclamation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${getTypeColor(reclamation.type)}`}>
                          {getTypeLabel(reclamation.type)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(reclamation.status)}`}>
                          {getStatusLabel(reclamation.status)}
                        </span>
                      </div>
                      <h3 className="text-lg text-foreground mb-1">{reclamation.name}</h3>
                      <p className="text-sm text-muted-foreground">{reclamation.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(reclamation.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="bg-secondary rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">Message du client :</p>
                    <p className="text-foreground">{reclamation.message}</p>
                  </div>

                  {reclamation.status === 'reviewed' && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <p className="text-sm text-blue-400 mb-1">Réponse de l'employé :</p>
                      <p className="text-foreground">
                        Une réponse a été envoyée au client. En attente de validation du gérant.
                      </p>
                    </div>
                  )}

                  {selectedReclamation === reclamation.id ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3"
                    >
                      <Textarea
                        value={supervisorComment}
                        onChange={(e) => setSupervisorComment(e.target.value)}
                        placeholder="Ajoutez un commentaire de supervision..."
                        rows={4}
                        className="rounded-2xl bg-input-background border-input resize-none"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleValidate(reclamation.id)}
                          className="rounded-2xl bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="size-4 mr-2" />
                          Valider et résoudre
                        </Button>
                        <Button
                          onClick={() => handleReject(reclamation.id)}
                          className="rounded-2xl bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          <XCircle className="size-4 mr-2" />
                          Rejeter la réponse
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedReclamation(null);
                            setSupervisorComment('');
                          }}
                          variant="outline"
                          className="rounded-2xl"
                        >
                          Annuler
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {reclamation.status === 'reviewed' && (
                        <Button
                          onClick={() => setSelectedReclamation(reclamation.id)}
                          className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <Eye className="size-4 mr-2" />
                          Superviser
                        </Button>
                      )}
                      {reclamation.status === 'resolved' && (
                        <div className="text-sm text-green-500 flex items-center gap-2">
                          <CheckCircle className="size-4" />
                          Réclamation validée et résolue
                        </div>
                      )}
                      {reclamation.status === 'pending' && (
                        <div className="text-sm text-yellow-500 flex items-center gap-2">
                          <AlertCircle className="size-4" />
                          En attente de traitement par un employé
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
