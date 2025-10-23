import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer l'état de chargement des pages
 * @param initialDelay - Délai initial en millisecondes (défaut: 1500ms)
 * @returns [isLoading, setIsLoading] - État de chargement et fonction pour le modifier
 */
export const usePageLoading = (initialDelay: number = 1500) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  return [isLoading, setIsLoading] as const;
};
