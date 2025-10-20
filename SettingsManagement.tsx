import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings,
  Bell,
  Shield,
  Users,
  Globe,
  CreditCard,
  Clock,
  Save,
  Upload,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react';

type SettingsTab = 'general' | 'notifications' | 'security' | 'team' | 'payment' | 'hours';

export function SettingsManagement() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // General
    restaurantName: 'Restaurant ZEDUC',
    email: 'contact@zeduc.com',
    phone: '+237 6 XX XX XX XX',
    address: 'Bonapriso, Douala, Cameroun',
    currency: 'FCFA',
    language: 'fr',
    timezone: 'Africa/Douala',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    orderAlerts: true,
    customerAlerts: false,
    stockAlerts: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    
    // Payment
    cashEnabled: true,
    cardEnabled: true,
    mobileMoneyEnabled: true,
    taxRate: 19.25,
    
    // Hours
    hours: {
      monday: { open: '10:00', close: '23:00', closed: false },
      tuesday: { open: '10:00', close: '23:00', closed: false },
      wednesday: { open: '10:00', close: '23:00', closed: false },
      thursday: { open: '10:00', close: '23:00', closed: false },
      friday: { open: '10:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '12:00', close: '22:00', closed: false }
    }
  });

  const tabs = [
    { id: 'general' as const, label: 'Général', icon: Settings },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'security' as const, label: 'Sécurité', icon: Shield },
    { id: 'team' as const, label: 'Équipe', icon: Users },
    { id: 'payment' as const, label: 'Paiements', icon: CreditCard },
    { id: 'hours' as const, label: 'Horaires', icon: Clock }
  ];

  const teamMembers = [
    { name: 'Admin Principal', email: 'admin@zeduc.com', role: 'Administrateur', status: 'active' },
    { name: 'Chef Cuisine', email: 'chef@zeduc.com', role: 'Chef', status: 'active' },
    { name: 'Manager Salle', email: 'manager@zeduc.com', role: 'Manager', status: 'active' },
    { name: 'Serveur 1', email: 'serveur1@zeduc.com', role: 'Serveur', status: 'active' }
  ];

  const handleSave = () => {
    // Save settings logic
    console.log('Settings saved:', settings);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Tabs */}
      <div className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border border-yellow-700/30 text-yellow-500'
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl text-yellow-600 mb-4">Paramètres généraux</h3>
              <p className="text-zinc-400 text-sm mb-6">Configurez les informations de base de votre restaurant</p>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-zinc-400 text-sm mb-2">Logo du restaurant</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center">
                  <span className="text-2xl text-black">Z</span>
                </div>
                <button className="px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300 flex items-center gap-2">
                  <Upload size={18} />
                  <span>Changer le logo</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Nom du restaurant</label>
                <input
                  type="text"
                  value={settings.restaurantName}
                  onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-sm mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-sm mb-2">Devise</label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                >
                  <option value="FCFA">FCFA</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 text-sm mb-2">Adresse complète</label>
              <textarea
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors resize-none"
              />
            </div>
          </motion.div>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl text-yellow-600 mb-4">Notifications</h3>
              <p className="text-zinc-400 text-sm mb-6">Gérez vos préférences de notifications</p>
            </div>

            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Notifications par email', description: 'Recevez des notifications importantes par email' },
                { key: 'smsNotifications', label: 'Notifications SMS', description: 'Recevez des alertes urgentes par SMS' },
                { key: 'orderAlerts', label: 'Alertes de commandes', description: 'Soyez notifié des nouvelles commandes' },
                { key: 'customerAlerts', label: 'Alertes clients', description: 'Notifications sur les nouveaux clients et avis' },
                { key: 'stockAlerts', label: 'Alertes de stock', description: 'Soyez prévenu quand les stocks sont bas' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-lg border border-yellow-900/10">
                  <div className="flex-1">
                    <p className="text-zinc-100">{item.label}</p>
                    <p className="text-sm text-zinc-500 mt-1">{item.description}</p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                    className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                      settings[item.key as keyof typeof settings] ? 'bg-yellow-600' : 'bg-zinc-700'
                    }`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                      settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Security */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl text-yellow-600 mb-4">Sécurité</h3>
              <p className="text-zinc-400 text-sm mb-6">Renforcez la sécurité de votre compte</p>
            </div>

            {/* Two Factor Auth */}
            <div className="p-4 bg-zinc-900/30 rounded-lg border border-yellow-900/10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-zinc-100">Authentification à deux facteurs</p>
                  <p className="text-sm text-zinc-500 mt-1">Ajoutez une couche de sécurité supplémentaire</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, twoFactorAuth: !settings.twoFactorAuth })}
                  className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                    settings.twoFactorAuth ? 'bg-yellow-600' : 'bg-zinc-700'
                  }`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                    settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            {/* Change Password */}
            <div className="space-y-4">
              <h4 className="text-zinc-100">Changer le mot de passe</h4>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Mot de passe actuel</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 pr-10 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-yellow-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Nouveau mot de passe</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Confirmer le mot de passe</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Session Settings */}
            <div className="space-y-4">
              <h4 className="text-zinc-100">Paramètres de session</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Timeout de session (minutes)</label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Expiration mot de passe (jours)</label>
                  <input
                    type="number"
                    value={settings.passwordExpiry}
                    onChange={(e) => setSettings({ ...settings, passwordExpiry: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Team */}
        {activeTab === 'team' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl text-yellow-600 mb-1">Équipe</h3>
                <p className="text-zinc-400 text-sm">Gérez les membres de votre équipe</p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2">
                <Users size={18} />
                <span>Inviter</span>
              </button>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-lg border border-yellow-900/10 hover:border-yellow-700/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center">
                      <span className="text-black">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-zinc-100">{member.name}</p>
                      <p className="text-sm text-zinc-500">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-yellow-600/10 border border-yellow-700/30 rounded-full text-yellow-600 text-sm">
                      {member.role}
                    </span>
                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-500 text-sm flex items-center gap-1">
                      <Check size={14} />
                      Actif
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Payment */}
        {activeTab === 'payment' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl text-yellow-600 mb-4">Méthodes de paiement</h3>
              <p className="text-zinc-400 text-sm mb-6">Configurez les options de paiement acceptées</p>
            </div>

            <div className="space-y-4">
              {[
                { key: 'cashEnabled', label: 'Espèces', description: 'Accepter les paiements en espèces' },
                { key: 'cardEnabled', label: 'Carte bancaire', description: 'Visa, Mastercard, etc.' },
                { key: 'mobileMoneyEnabled', label: 'Mobile Money', description: 'Orange Money, MTN Money, etc.' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-lg border border-yellow-900/10">
                  <div className="flex-1">
                    <p className="text-zinc-100">{item.label}</p>
                    <p className="text-sm text-zinc-500 mt-1">{item.description}</p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                    className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                      settings[item.key as keyof typeof settings] ? 'bg-yellow-600' : 'bg-zinc-700'
                    }`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                      settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-zinc-400 text-sm mb-2">Taux de TVA (%)</label>
              <input
                type="number"
                step="0.01"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: parseFloat(e.target.value) })}
                className="w-full md:w-1/2 px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
              />
            </div>
          </motion.div>
        )}

        {/* Hours */}
        {activeTab === 'hours' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl text-yellow-600 mb-4">Horaires d'ouverture</h3>
              <p className="text-zinc-400 text-sm mb-6">Définissez vos heures d'ouverture</p>
            </div>

            <div className="space-y-3">
              {Object.entries(settings.hours).map(([day, hours], index) => {
                const dayNames: Record<string, string> = {
                  monday: 'Lundi',
                  tuesday: 'Mardi',
                  wednesday: 'Mercredi',
                  thursday: 'Jeudi',
                  friday: 'Vendredi',
                  saturday: 'Samedi',
                  sunday: 'Dimanche'
                };

                return (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 bg-zinc-900/30 rounded-lg border border-yellow-900/10"
                  >
                    <div className="w-32">
                      <p className="text-zinc-100">{dayNames[day]}</p>
                    </div>
                    
                    {!hours.closed ? (
                      <>
                        <div className="flex-1 flex items-center gap-4">
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) => {
                              const newHours = { ...settings.hours };
                              newHours[day as keyof typeof settings.hours].open = e.target.value;
                              setSettings({ ...settings, hours: newHours });
                            }}
                            className="px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                          />
                          <span className="text-zinc-500">-</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) => {
                              const newHours = { ...settings.hours };
                              newHours[day as keyof typeof settings.hours].close = e.target.value;
                              setSettings({ ...settings, hours: newHours });
                            }}
                            className="px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const newHours = { ...settings.hours };
                            newHours[day as keyof typeof settings.hours].closed = true;
                            setSettings({ ...settings, hours: newHours });
                          }}
                          className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 hover:bg-red-500/20 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex-1">
                          <span className="text-zinc-500">Fermé</span>
                        </div>
                        <button
                          onClick={() => {
                            const newHours = { ...settings.hours };
                            newHours[day as keyof typeof settings.hours].closed = false;
                            setSettings({ ...settings, hours: newHours });
                          }}
                          className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 hover:bg-green-500/20 transition-colors"
                        >
                          <Check size={18} />
                        </button>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-yellow-900/20">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2"
          >
            <Save size={18} />
            <span>Enregistrer les modifications</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
