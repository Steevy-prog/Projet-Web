import React from 'react';
import { useNavigation } from '../lib/navigationContext';

interface PageWrapperProps {
  component: React.ComponentType<any>;
  requiresNavigation?: boolean;
}

/**
 * Wrapper générique pour les pages qui nécessitent onNavigate
 */
export function PageWrapper({ component: Component, requiresNavigation = false }: PageWrapperProps) {
  const { navigate, goBack } = useNavigation();

  const handleNavigate = (page: string) => {
    const cleanPage = page.startsWith('/') ? page.substring(1) : page;
    navigate(cleanPage || 'home');
  };

  if (requiresNavigation) {
    return <Component onNavigate={handleNavigate} onClose={goBack} onForgotPassword={() => navigate('forgot-password')} />;
  }

  return <Component />;
}

// Fonction helper pour créer des wrappers
export function withNavigation<P extends object>(
  Component: React.ComponentType<P & { onNavigate?: (page: string) => void }>
) {
  return function WrappedComponent(props: Omit<P, 'onNavigate'>) {
    const { navigate } = useNavigation();

    const handleNavigate = (page: string) => {
      const cleanPage = page.startsWith('/') ? page.substring(1) : page;
      navigate(cleanPage || 'home');
    };

    return <Component {...(props as P)} onNavigate={handleNavigate} />;
  };
}
