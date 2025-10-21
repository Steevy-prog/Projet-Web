import { useNavigation } from '../lib/navigationContext';

/**
 * Hook personnalisé pour la navigation dans l'application
 */
export function useAppNavigate() {
  const { navigate } = useNavigation();

  const navigateToPage = (page: string) => {
    // Nettoyer le slash initial si présent
    const cleanPage = page.startsWith('/') ? page.substring(1) : page;
    navigate(cleanPage || 'home');
  };

  return navigateToPage;
}

