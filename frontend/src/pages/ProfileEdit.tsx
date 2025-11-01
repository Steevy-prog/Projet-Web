import React, { useState,useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { usePageLoading } from '../hooks/usePageLoading';
import Loading from './loading';
import { Camera, Save, X } from 'lucide-react';
import { useApp } from '../lib/context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { toast } from 'sonner';
import { Utilisateur } from '../lib/types';
const API_URL = import.meta.env.VITE_API_URL;

interface Profile {
  onNavigate: (page: string) => void;
}

export function ProfileEdit({ onNavigate }: Profile) {
  const { user, setUser } = useApp();
  const [isLoading] = usePageLoading(800);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<{
  nom: string;
  prenom: string;
  telephone: string;
  localisation: string;
} | null>(null);

  const [formData, setFormData] = useState({
    firstName: user?.nom || '',
    lastName: user?.prenom || '',
    phone: user?.telephone || '',
    address: user?.localisation || '',
    profilePicture: user?.profile_picture || '',
  });

    useEffect(() => {
    if (!pendingUpdate) return;
    if (!user) return;
  
    const syncBackend = async () => {
      try {

        setPendingUpdate(null);
        toast.success('Profil mis à jour avec succès !');
        onNavigate('dashboard');
      } catch (err) {
        console.error('Failed to sync points', err);
      }
    };
  
    syncBackend();
  }, [pendingUpdate]);

  const [previewImage, setPreviewImage] = useState(user?.profile_picture || '');

  if (isLoading) return <Loading />;
  if (!user) {
    onNavigate('login');
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("L'image ne doit pas dépasser 5 MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData(prev => ({ ...prev, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('Le prénom et le nom sont obligatoires');
      return;
    }

    if (formData.phone && !/^[0-9+\s()-]+$/.test(formData.phone)) {
      toast.error('Numéro dex téléphone invalide');
      return;
    }

    setIsSaving(true);

    try {
      const updatedUser = {
        ...user,
        prenom: formData.firstName.trim(),
        nom: formData.lastName.trim(),
        telephone: formData.phone.trim(),
        localisation: formData.address.trim(),
      };
      console.warn(JSON.stringify(updatedUser));
      console.warn(API_URL);
             const res =  await fetch(`${API_URL}/profile/${user.id_utilisateur}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({nom : updatedUser.nom,prenom : updatedUser.prenom,localisation : updatedUser.localisation??"",telephone : updatedUser.telephone}),
        });
        console.warn(JSON.stringify({}));

        if(!res.ok){
            toast.error('Ça a ndem chaud !');
        }


      // ✅ Update context + localStorage
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setPendingUpdate({
  nom: updatedUser.nom,
  prenom: updatedUser.prenom,
  telephone: updatedUser.telephone,
  localisation: updatedUser.localisation,
});
    } catch (err) {
      console.error('Échec de la mise à jour du profil :', err);
      toast.error('Échec de la mise à jour du profil');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => onNavigate('dashboard');

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl mb-2 text-foreground">
            Modifier mon <span className="text-gold-shine animate-gold-glow">Profil</span>
          </h1>
          <p className="text-muted-foreground">Personnalisez vos informations personnelles</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-gold-shine">Informations du profil</CardTitle>
              <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo de profil */}
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="size-32 border-4 border-primary/20">
                    <AvatarImage src={previewImage} alt="Photo de profil" />
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                      {formData.firstName?.[0] || user.nom?.[0] || 'U'}
                      {formData.lastName?.[0] || ''}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
                    <Camera className="size-4" />
                    Changer la photo
                  </Button>
                </div>

                {/* Prénom & Nom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input id="firstName" value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} placeholder="Votre prénom" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input id="lastName" value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} placeholder="Votre nom" required />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground">L'email ne peut pas être modifié</p>
                </div>

                {/* Téléphone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <Input id="phone" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} placeholder="+33 6 12 34 56 78" type="tel" />
                </div>

                {/* Adresse */}
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" value={formData.address} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} placeholder="Votre adresse complète" />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1 gap-2" disabled={isSaving}>
                    <Save className="size-4" />
                    {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel} className="gap-2">
                    <X className="size-4" />
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}