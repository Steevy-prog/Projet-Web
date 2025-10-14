import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Clock, FileText, Mail, Phone, MapPin, Save } from 'lucide-react';
import { useEmployee } from '../lib/employeeContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

export function AdminSettings() {
  const { settings, updateSettings } = useEmployee();
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    toast.success('Paramètres mis à jour avec succès');
  };

  const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl mb-2 text-foreground">
            Paramètres <span className="text-primary">Globaux</span>
          </h1>
          <p className="text-muted-foreground">
            Configuration générale de l'application
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-primary/10">
                <Settings className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl text-foreground">Configuration Générale</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Nom du restaurant</Label>
                <Input
                  id="restaurantName"
                  value={formData.restaurantName}
                  onChange={(e) =>
                    setFormData({ ...formData, restaurantName: e.target.value })
                  }
                  className="rounded-2xl bg-input-background border-input"
                />
              </div>
            </div>
          </motion.section>

          {/* Opening Hours */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-blue-500/10">
                <Clock className="size-5 text-blue-500" />
              </div>
              <h2 className="text-2xl text-foreground">Heures d'ouverture</h2>
            </div>

            <div className="space-y-4">
              {days.map((day) => (
                <div key={day} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="capitalize text-foreground">{day}</div>
                  <div className="space-y-2">
                    <Label htmlFor={`${day}-open`} className="text-xs">Ouverture</Label>
                    <Input
                      id={`${day}-open`}
                      type="time"
                      value={formData.openingHours[day].open}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          openingHours: {
                            ...formData.openingHours,
                            [day]: { ...formData.openingHours[day], open: e.target.value },
                          },
                        })
                      }
                      disabled={formData.openingHours[day].closed}
                      className="rounded-2xl bg-input-background border-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${day}-close`} className="text-xs">Fermeture</Label>
                    <Input
                      id={`${day}-close`}
                      type="time"
                      value={formData.openingHours[day].close}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          openingHours: {
                            ...formData.openingHours,
                            [day]: { ...formData.openingHours[day], close: e.target.value },
                          },
                        })
                      }
                      disabled={formData.openingHours[day].closed}
                      className="rounded-2xl bg-input-background border-input"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`${day}-closed`}
                      checked={formData.openingHours[day].closed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          openingHours: {
                            ...formData.openingHours,
                            [day]: { ...formData.openingHours[day], closed: e.target.checked },
                          },
                        })
                      }
                      className="rounded"
                    />
                    <Label htmlFor={`${day}-closed`} className="text-sm cursor-pointer">
                      Fermé
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-green-500/10">
                <Phone className="size-5 text-green-500" />
              </div>
              <h2 className="text-2xl text-foreground">Informations de Contact</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="size-4 inline mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: { ...formData.contactInfo, email: e.target.value },
                    })
                  }
                  className="rounded-2xl bg-input-background border-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="size-4 inline mr-2" />
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.contactInfo.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: { ...formData.contactInfo, phone: e.target.value },
                    })
                  }
                  className="rounded-2xl bg-input-background border-input"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">
                  <MapPin className="size-4 inline mr-2" />
                  Adresse
                </Label>
                <Input
                  id="address"
                  value={formData.contactInfo.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: { ...formData.contactInfo, address: e.target.value },
                    })
                  }
                  className="rounded-2xl bg-input-background border-input"
                />
              </div>
            </div>
          </motion.section>

          {/* Policies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-purple-500/10">
                <FileText className="size-5 text-purple-500" />
              </div>
              <h2 className="text-2xl text-foreground">Politiques</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="refundPolicy">Politique de remboursement</Label>
                <Textarea
                  id="refundPolicy"
                  value={formData.policies.refundPolicy}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      policies: { ...formData.policies, refundPolicy: e.target.value },
                    })
                  }
                  rows={3}
                  className="rounded-2xl bg-input-background border-input resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="privacyPolicy">Politique de confidentialité</Label>
                <Textarea
                  id="privacyPolicy"
                  value={formData.policies.privacyPolicy}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      policies: { ...formData.policies, privacyPolicy: e.target.value },
                    })
                  }
                  rows={3}
                  className="rounded-2xl bg-input-background border-input resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="termsOfService">Conditions d'utilisation</Label>
                <Textarea
                  id="termsOfService"
                  value={formData.policies.termsOfService}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      policies: { ...formData.policies, termsOfService: e.target.value },
                    })
                  }
                  rows={3}
                  className="rounded-2xl bg-input-background border-input resize-none"
                />
              </div>
            </div>
          </motion.section>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end"
          >
            <Button
              type="submit"
              className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              <Save className="size-5 mr-2" />
              Sauvegarder les paramètres
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
