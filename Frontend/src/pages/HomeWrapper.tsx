import React from 'react';
import { useNavigation } from '../lib/navigationContext';
import { Home } from './Home';

export function HomeWrapper() {
  const { navigate } = useNavigation();

  const handleNavigate = (page: string) => {
    const cleanPage = page.startsWith('/') ? page.substring(1) : page;
    navigate(cleanPage || 'home');
  };

  return <Home onNavigate={handleNavigate} />;
}
