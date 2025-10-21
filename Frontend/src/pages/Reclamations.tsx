import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Award, Heart, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner@2.0.3';
import { companyStory } from '../lib/data';

export function Reclamations() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.type || !formData.message) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    toast.success('Votre réclamation a été envoyée avec succès. Nous vous contacterons bientôt.');
    setFormData({ name: '', email: '', type: '', message: '' });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Company Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl mb-6 text-foreground">
            {companyStory.title}
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground">
            {companyStory.content.split('\n\n').map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 p-8 rounded-2xl bg-card border border-border"
          >
            <h3 className="mb-4 text-primary">Notre Mission</h3>
            <p className="text-muted-foreground">{companyStory.mission}</p>
          </motion.div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl text-center mb-8 text-foreground">
            Nos <span className="text-primary">Valeurs</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyStory.values.map((value, index) => {
              const icons = [Award, Heart, Users, Award];
              const Icon = icons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border text-center"
                >
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-3">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <p className="text-foreground">{value}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Reclamation Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-4 text-foreground">
              Formulaire de <span className="text-primary">Réclamation</span>
            </h2>
            <p className="text-muted-foreground">
              Votre satisfaction est notre priorité. N'hésitez pas à nous faire part de vos remarques.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jean Dupont"
                className="rounded-2xl bg-input-background border-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jean.dupont@example.com"
                className="rounded-2xl bg-input-background border-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type de réclamation</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="rounded-2xl bg-input-background border-input">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="food">Qualité de la nourriture</SelectItem>
                  <SelectItem value="delivery">Livraison</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Décrivez votre réclamation en détail..."
                rows={6}
                className="rounded-2xl bg-input-background border-input resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="size-5 mr-2" />
              Envoyer la réclamation
            </Button>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
