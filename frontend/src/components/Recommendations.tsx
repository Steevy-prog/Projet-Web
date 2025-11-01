import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';
import { Button } from './ui/button';

interface RecommendationsProps {
  onNavigate?: (page: string) => void;
}

export function Recommendations({ onNavigate }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const data = await apiService.getRecommendations();
        setRecommendations(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des recommandations:', err);
        setError('Impossible de charger les recommandations pour le moment');
      } finally {
        setLoading(false);
      }
    };

    // Vérifier si l'utilisateur est connecté avant de charger les recommandations
    const token = localStorage.getItem('token');
    if (token) {
      fetchRecommendations();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 p-6 bg-card border border-border rounded-2xl"
      >
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="size-5 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement des recommandations...</p>
        </div>
      </motion.div>
    );
  }

  if (error || recommendations.length === 0) {
    return null; // Ne rien afficher en cas d'erreur ou si pas de recommandations
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="size-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">
          Recommandations <span className="text-primary">pour vous</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 bg-card border border-border rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-primary/50"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="size-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground leading-relaxed">
                  {recommendation}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {onNavigate && (
        <div className="mt-6 text-center">
          <Button
            onClick={() => onNavigate('user-menus')}
            variant="outline"
            className="rounded-full border-border hover:border-primary"
          >
            Découvrir nos menus
          </Button>
        </div>
      )}
    </motion.div>
  );
}
