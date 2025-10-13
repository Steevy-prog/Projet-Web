import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  variant?: 'main' | 'user' | 'admin';
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  variant = 'main', 
  showFooter = true 
}) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Header variant={variant} />
      
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
