import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
  ];

  const footerLinks = {
    Restaurant: ['À propos', 'Nos chefs', 'Carrières', 'Actualités'],
    Services: ['Commander', 'Livraison', 'Réservation', 'Traiteur'],
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
              <span className="text-primary">Restaurant Élégance</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              L'excellence culinaire à portée de main. Découvrez notre programme de fidélité et nos récompenses exclusives.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="size-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="size-5 text-primary" />
                  </motion.a>
                );
              })}
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
              <p className="text-sm text-foreground">123 Rue de la Gastronomie, Paris</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Phone className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Téléphone</p>
              <p className="text-sm text-foreground">+33 1 23 45 67 89</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Mail className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-foreground">contact@restaurant-elegance.fr</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Restaurant Élégance. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
