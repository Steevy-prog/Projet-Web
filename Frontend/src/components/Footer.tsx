import React from 'react';
import { motion } from 'motion/react';
import SocialButtons from './SocialButtons';
import { Utensils, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
  ];

  const footerLinks = {
    Restaurant: ['À propos', 'Nos chefs', 'Carrières', 'Actualités'],
    Services: ['Commander', 'Livraison', 'Panier', 'Traiteur'],
    Légal: ['Mentions légales', 'CGU', 'Confidentialité', 'Cookies'],
  };

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-2xl bg-primary flex items-center justify-center">
                <Utensils className="size-6 text-primary-foreground" />
              </div>
              <span className="text-primary">Restaurant Zeduc-Space</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              L'excellence culinaire à portée de main. Découvrez notre programme de fidélité et nos récompenses exclusives.
            </p>
            <div className="flex gap-3">
            <SocialButtons />
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-foreground">{category}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <MapPin className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Adresse</p>
              <p className="text-sm text-foreground">Cite la Terrasse, Yansoki, Douala</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Phone className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Téléphone</p>
              <p className="text-sm text-foreground">+237 6 23 45 67 89</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Mail className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-foreground">contact@zeduc-space.cm</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Restaurant Zedcu-Space. Tous droits réservés.
            </p>
            {onNavigate && (
              <button
                onClick={() => onNavigate('employee-login')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Briefcase className="size-4" />
                Espace Employé
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
