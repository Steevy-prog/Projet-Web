import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info Utile */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gold-500 mb-6">INFO UTILE</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="text-gold-500 mt-1 flex-shrink-0" size={18} />
                <span className="text-sm">CITE LA TERRASE DOUALA VANSOKI</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-gold-500 flex-shrink-0" size={18} />
                <span className="text-sm">+237 623 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-gold-500 flex-shrink-0" size={18} />
                <span className="text-sm">RESERVATION@ZEDUCSPACE.COM</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="text-gold-500 mt-1 flex-shrink-0" size={18} />
                <span className="text-sm">OUVERT DU LUNDI AU DIMANCHE 15H - 21H</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gold-500 mb-6">CONTACT</h3>
            <div className="space-y-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 transition-colors duration-200 hover:text-pink-500"
              >
                <Instagram size={18} />
                <span className="text-sm">Instagram</span>
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 transition-colors duration-200 hover:text-green-500"
              >
                <Phone size={18} />
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Moyens de Paiement */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gold-500 mb-6">MOYENS DE PAIEMENT</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">OM</span>
                </div>
                <span className="text-sm">Orange Money</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-bold">MTN</span>
                </div>
                <span className="text-sm">MTN Money</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2024 RESTAURANT ZEDUC – TOUS DROITS RÉSERVÉS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
