import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tag, Plus, Edit, Trash2, Calendar, Percent } from 'lucide-react';
import { useEmployee } from '../lib/employeeContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { Promotion } from '../lib/types';

export function AdminPromotions() {
  const { promotions, addPromotion, updatePromotion, deletePromotion } = useEmployee();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount: '',
    startDate: '',
    endDate: '',
    image: '',
    active: true,
    type: 'percentage' as Promotion['type'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.discount || !formData.startDate || !formData.endDate) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (editingId) {
      updatePromotion(editingId, {
        ...formData,
        discount: parseFloat(formData.discount),
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
      });
      toast.success('Promotion modifiée avec succès');
      setEditingId(null);
    } else {
      const newPromotion: Promotion = {
        id: `promo${Date.now()}`,
        title: formData.title,
        description: formData.description,
        discount: parseFloat(formData.discount),
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        image: formData.image || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
        active: formData.active,
        type: formData.type,
      };
      addPromotion(newPromotion);
      toast.success('Promotion ajoutée avec succès');
      setIsAdding(false);
    }

    setFormData({
      title: '',
      description: '',
      discount: '',
      startDate: '',
      endDate: '',
      image: '',
      active: true,
      type: 'percentage',
    });
  };

  const handleEdit = (promo: Promotion) => {
    setEditingId(promo.id);
    setFormData({
      title: promo.title,
      description: promo.description,
      discount: promo.discount.toString(),
      startDate: new Date(promo.startDate).toISOString().split('T')[0],
      endDate: new Date(promo.endDate).toISOString().split('T')[0],
      image: promo.image,
      active: promo.active,
      type: promo.type,
    });
    setIsAdding(true);
  };

  const handleDelete = (promoId: string, promoTitle: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${promoTitle}" ?`)) {
      deletePromotion(promoId);
      toast.success('Promotion supprimée');
    }
  };

  const handleToggleActive = (promoId: string, currentStatus: boolean) => {
    updatePromotion(promoId, { active: !currentStatus });
    toast.success(currentStatus ? 'Promotion désactivée' : 'Promotion activée');
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'Pourcentage';
      case 'fixed':
        return 'Montant fixe';
      case 'bogo':
        return 'Achetez-en 1, Obtenez-en 1';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'bg-blue-500/20 text-blue-400';
      case 'fixed':
        return 'bg-green-500/20 text-green-400';
      case 'bogo':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-primary/20 text-primary';
    }
  };

  const activePromotions = promotions.filter(p => p.active).length;
  const inactivePromotions = promotions.filter(p => !p.active).length;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl mb-2 text-foreground">
                Gestion des <span className="text-primary">Promotions</span>
              </h1>
              <p className="text-muted-foreground">
                Créer et gérer les offres promotionnelles
              </p>
            </div>
            <Button
              onClick={() => {
                setIsAdding(!isAdding);
                setEditingId(null);
                setFormData({
                  title: '',
                  description: '',
                  discount: '',
                  startDate: '',
                  endDate: '',
                  image: '',
                  active: true,
                  type: 'percentage',
                });
              }}
              className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="size-5 mr-2" />
              Créer une promotion
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <Tag className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground">Total</span>
            </div>
            <p className="text-3xl text-foreground">{promotions.length}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-green-500/10">
                <Tag className="size-5 text-green-500" />
              </div>
              <span className="text-muted-foreground">Actives</span>
            </div>
            <p className="text-3xl text-foreground">{activePromotions}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-gray-500/10">
                <Tag className="size-5 text-gray-500" />
              </div>
              <span className="text-muted-foreground">Inactives</span>
            </div>
            <p className="text-3xl text-foreground">{inactivePromotions}</p>
          </div>
        </motion.div>

        {/* Add/Edit Form */}
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card border border-border rounded-2xl p-8 mb-8"
          >
            <h3 className="text-xl text-foreground mb-6">
              {editingId ? 'Modifier la promotion' : 'Nouvelle promotion'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Happy Hour"
                    className="rounded-2xl bg-input-background border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: Promotion['type']) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger className="rounded-2xl bg-input-background border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Pourcentage</SelectItem>
                      <SelectItem value="fixed">Montant fixe</SelectItem>
                      <SelectItem value="bogo">Achetez-en 1, Obtenez-en 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">
                    {formData.type === 'percentage' ? 'Réduction (%)' : 'Réduction (€)'} *
                  </Label>
                  <Input
                    id="discount"
                    type="number"
                    step="0.01"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder={formData.type === 'percentage' ? '20' : '5.00'}
                    className="rounded-2xl bg-input-background border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL de l'image</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="rounded-2xl bg-input-background border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Date de début *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="rounded-2xl bg-input-background border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Date de fin *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="rounded-2xl bg-input-background border-input"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description de la promotion..."
                    rows={3}
                    className="rounded-2xl bg-input-background border-input resize-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-foreground">Active</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {editingId ? 'Modifier' : 'Créer'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({
                      title: '',
                      description: '',
                      discount: '',
                      startDate: '',
                      endDate: '',
                      image: '',
                      active: true,
                      type: 'percentage',
                    });
                  }}
                  className="rounded-2xl"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className={`bg-card border rounded-2xl overflow-hidden ${
                promo.active ? 'border-border' : 'border-gray-500/30'
              }`}
            >
              <div className="relative">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className={`w-full h-48 object-cover ${!promo.active ? 'opacity-50 grayscale' : ''}`}
                />
                {!promo.active && (
                  <div className="absolute top-3 left-3 bg-gray-500 text-white px-3 py-1 rounded-full text-sm">
                    Inactive
                  </div>
                )}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm ${getTypeColor(promo.type)}`}>
                  {getTypeLabel(promo.type)}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg text-foreground mb-2">{promo.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{promo.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Percent className="size-4 text-primary" />
                    <span className="text-foreground">
                      {promo.type === 'percentage' ? `${promo.discount}%` : `${promo.discount}€`} de réduction
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {new Date(promo.startDate).toLocaleDateString('fr-FR')} - {new Date(promo.endDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(promo)}
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl"
                    >
                      <Edit className="size-4 mr-2" />
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleToggleActive(promo.id, promo.active)}
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl"
                    >
                      {promo.active ? 'Désactiver' : 'Activer'}
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleDelete(promo.id, promo.title)}
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-destructive hover:bg-destructive/20"
                  >
                    <Trash2 className="size-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
