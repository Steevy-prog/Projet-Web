import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UtensilsCrossed, Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import { useEmployee } from '../lib/employeeContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { MenuItemStatus } from '../lib/employeeData';

export function AdminMenu() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useEmployee();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    available: true,
    popular: false,
    isDishOfDay: false,
  });

  const categories = Array.from(new Set(menuItems.map((item) => item.category)));
  const filteredItems = filterCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === filterCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (editingId) {
      updateMenuItem(editingId, {
        ...formData,
        price: parseFloat(formData.price),
      });
      toast.success('Plat modifié avec succès');
      setEditingId(null);
    } else {
      const newItem: MenuItemStatus = {
        id: `item${Date.now()}`,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
        available: formData.available,
        popular: formData.popular,
        isDishOfDay: formData.isDishOfDay,
      };
      addMenuItem(newItem);
      toast.success('Plat ajouté avec succès');
      setIsAdding(false);
    }

    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      available: true,
      popular: false,
      isDishOfDay: false,
    });
  };

  const handleEdit = (item: MenuItemStatus) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
      available: item.available,
      popular: item.popular || false,
      isDishOfDay: item.isDishOfDay,
    });
    setIsAdding(true);
  };

  const handleDelete = (itemId: string, itemName: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${itemName}" ?`)) {
      deleteMenuItem(itemId);
      toast.success('Plat supprimé');
    }
  };

  const handleToggleAvailability = (itemId: string, currentStatus: boolean) => {
    updateMenuItem(itemId, { available: !currentStatus });
    toast.success(currentStatus ? 'Plat marqué comme indisponible' : 'Plat marqué comme disponible');
  };

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
                Gestion du <span className="text-primary">Menu</span>
              </h1>
              <p className="text-muted-foreground">
                CRUD complet des plats et boissons
              </p>
            </div>
            <Button
              onClick={() => {
                setIsAdding(!isAdding);
                setEditingId(null);
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  category: '',
                  image: '',
                  available: true,
                  popular: false,
                  isDishOfDay: false,
                });
              }}
              className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="size-5 mr-2" />
              Ajouter un plat
            </Button>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-2xl transition-all ${
              filterCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-primary/20'
            }`}
          >
            Tous ({menuItems.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-2xl transition-all ${
                filterCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-primary/20'
              }`}
            >
              {category} ({menuItems.filter(i => i.category === category).length})
            </button>
          ))}
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
              {editingId ? 'Modifier le plat' : 'Nouveau plat'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du plat *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Burger Signature"
                    className="rounded-2xl bg-input-background border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Prix (€) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="12.99"
                    className="rounded-2xl bg-input-background border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Burgers"
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

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description du plat..."
                    rows={3}
                    className="rounded-2xl bg-input-background border-input resize-none"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-foreground">Disponible</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-foreground">Populaire</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isDishOfDay}
                      onChange={(e) => setFormData({ ...formData, isDishOfDay: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-foreground">Plat du jour</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {editingId ? 'Modifier' : 'Ajouter'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({
                      name: '',
                      description: '',
                      price: '',
                      category: '',
                      image: '',
                      available: true,
                      popular: false,
                      isDishOfDay: false,
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

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className={`bg-card border rounded-2xl overflow-hidden ${
                item.available ? 'border-border' : 'border-red-500/30'
              }`}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-48 object-cover ${!item.available ? 'opacity-50 grayscale' : ''}`}
                />
                {item.isDishOfDay && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Star className="size-4 fill-current" />
                    Plat du jour
                  </div>
                )}
                {!item.available && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    Indisponible
                  </div>
                )}
                {item.popular && item.available && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                    Populaire
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg text-foreground">{item.name}</h3>
                  <span className="text-primary">{item.price.toFixed(2)}€</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <span className="inline-block px-2 py-1 rounded-lg bg-secondary text-xs text-muted-foreground mb-4">
                  {item.category}
                </span>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(item)}
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl"
                    >
                      <Edit className="size-4 mr-2" />
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleToggleAvailability(item.id, item.available)}
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl"
                    >
                      {item.available ? (
                        <>
                          <EyeOff className="size-4 mr-2" />
                          Désactiver
                        </>
                      ) : (
                        <>
                          <Eye className="size-4 mr-2" />
                          Activer
                        </>
                      )}
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleDelete(item.id, item.name)}
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
