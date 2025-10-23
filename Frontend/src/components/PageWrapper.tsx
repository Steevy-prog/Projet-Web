import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PageWrapperProps {
  component: React.ComponentType<any>;
  requiresNavigation?: boolean;
}

/**
 * Wrapper générique pour les pages qui nécessitent onNavigate
 */
export function PageWrapper({ component: Component, requiresNavigation = false }: PageWrapperProps) {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    const route = page.startsWith('/') ? page : `/${page}`;
    navigate(route);
  };

  if (requiresNavigation) {
    return <Component onNavigate={handleNavigate} onClose={() => navigate(-1)} onForgotPassword={() => navigate('/forgot-password')} />;
  }

  return <Component />;
}

// Fonction helper pour créer des wrappers
export function withNavigation<P extends object>(
  Component: React.ComponentType<P & { onNavigate?: (page: string) => void }>
) {
  return function WrappedComponent(props: Omit<P, 'onNavigate'>) {
    const navigate = useNavigate();

    const handleNavigate = (page: string) => {
      const route = page.startsWith('/') ? page : `/${page}`;
      navigate(route);
    };

    return <Component {...(props as P)} onNavigate={handleNavigate} />;
  };
}
