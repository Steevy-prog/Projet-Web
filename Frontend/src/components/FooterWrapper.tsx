import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';

export function FooterWrapper() {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    const route = page.startsWith('/') ? page : `/${page}`;
    navigate(route);
  };

  return <Footer onNavigate={handleNavigate as any} />;
}
