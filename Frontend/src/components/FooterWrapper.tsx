import React from 'react';
import { useNavigation } from '../lib/navigationContext';
import { Footer } from './Footer';

export function FooterWrapper() {
  const { navigate } = useNavigation();

  const handleNavigate = (page: string) => {
    const cleanPage = page.startsWith('/') ? page.substring(1) : page;
    navigate(cleanPage || 'home');
  };

  return <Footer onNavigate={handleNavigate} />;
}
