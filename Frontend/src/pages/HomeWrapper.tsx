import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from './Home';

export function HomeWrapper() {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    const route = page.startsWith('/') ? page : `/${page}`;
    navigate(route);
  };

  return <Home onNavigate={handleNavigate as any} />;
}
