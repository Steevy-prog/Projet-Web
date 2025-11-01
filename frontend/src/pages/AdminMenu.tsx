import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL;

interface Article {
  id_article: number;
  nom: string;
  description: string;
  prix: number;
  categorie: string;
  image?: string;
  disponible: boolean;
  plat_du_jour: boolean;
}

export function AdminMenu() {
  const [menuItems, setMenuItems] = useState<Article[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: '',
    categorie: '',
    image: '',
    disponible: true,
    plat_du_jour: false,
  });

  // 🔹 Load Menu
  const fetchMenu = async () => {
    try {
      const res = await fetch(`${API_URL}/articles`);
      if (!res.ok) throw new Error('Erreur de chargement');
      const data = await res.json();
      setMenuItems(data);
    } catch {
      toast.error('Erreur de chargement du menu');
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nom || !formData.description || !formData.prix || !formData.categorie) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const payload = {
      ...formData,
      prix: parseFloat(formData.prix),
    };

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${API_URL}/articles/${editingId}`
        : `${API_URL}/articles`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      await fetchMenu();
      toast.success(editingId ? 'Plat modifié' : 'Plat ajouté');

      setFormData({
        nom: '',
        description: '',
        prix: '',
        categorie: '',
        image: '',
        disponible: true,
        plat_du_jour: false,
      });
      setEditingId(null);
      setIsAdding(false);
    } catch {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (item: Article) => {
    setEditingId(item.id_article);
    setFormData({
      nom: item.nom,
      description: item.description,
      prix: item.prix.toString(),
      categorie: item.categorie,
      image: item.image || '',
      disponible: item.disponible,
      plat_du_jour: item.plat_du_jour,
    });
    setIsAdding(true);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Supprimer "${name}" ?`)) return;
    try {
      const res = await fetch(`${API_URL}/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setMenuItems((prev) => prev.filter((i) => i.id_article !== id));
      toast.success('Article supprimé');
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleToggleAvailability = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/articles/${id}/toggle`, { method: 'PUT' });
      if (!res.ok) throw new Error();
      await fetchMenu();
    } catch {
      toast.error('Erreur de mise à jour');
    }
  };

  const categories = Array.from(new Set(menuItems.map((i) => i.categorie)));
  const filteredItems =
    filterCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.categorie === filterCategory);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl mb-2 text-foreground">
                Gestion du <span className="text-primary">Menu</span>
              </h1>
              <p className="text-muted-foreground">CRUD complet des plats et boissons</p>
            </div>
            <Button
              onClick={() => {
                setIsAdding(!isAdding);
                setEditingId(null);
                setFormData({
                  nom: '',
                  description: '',
                  prix: '',
                  categorie: '',
                  image: '',
                  disponible: true,
                  plat_du_jour: false,
                });
              }}
              className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="size-5 mr-2" /> Ajouter un plat
            </Button>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-2xl ${
              filterCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-primary/20'
            }`}
          >
            Tous ({menuItems.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-2xl ${
                filterCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-primary/20'
              }`}
            >
              {cat} ({menuItems.filter((i) => i.categorie === cat).length})
            </button>
          ))}
        </motion.div>

        {/* Form */}
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card border border-border rounded-2xl p-8 mb-8"
          >
            <h3 className="text-xl mb-6">
              {editingId ? 'Modifier le plat' : 'Nouveau plat'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nom">Nom du plat *</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    placeholder="Pizza Margarita"
                  />
                </div>

                <div>
                  <Label htmlFor="prix">Prix (FCFA) *</Label>
                  <Input
                    id="prix"
                    type="number"
                    value={formData.prix}
                    onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                    placeholder="2500"
                  />
                </div>

                <div>
                  <Label htmlFor="categorie">Catégorie *</Label>
                  <Input
                    id="categorie"
                    value={formData.categorie}
                    onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                    placeholder="Plats, Boissons..."
                  />
                </div>

                <div>
                  <Label htmlFor="image">URL Image</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description du plat..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.disponible}
                    onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })}
                  />
                  Disponible
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.plat_du_jour}
                    onChange={(e) => setFormData({ ...formData, plat_du_jour: e.target.checked })}
                  />
                  Plat du jour
                </label>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="rounded-2xl bg-primary text-primary-foreground">
                  {editingId ? 'Modifier' : 'Ajouter'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
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
              key={item.id_article}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`bg-card border rounded-2xl overflow-hidden ${
                item.disponible ? 'border-border' : 'border-red-500/30'
              }`}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.nom}
                  className={`w-full h-48 object-cover ${!item.disponible ? 'opacity-50 grayscale' : ''}`}
                />
                {item.plat_du_jour && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Star className="size-4 fill-current" /> Plat du jour
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg">{item.nom}</h3>
                  <span className="text-primary">{item.prix ? Number(item.prix).toFixed(2) : '0.00'} FCFA</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <span className="text-xs bg-secondary px-2 py-1 rounded-lg">{item.categorie}</span>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(item)}
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl"
                    >
                      <Edit className="size-4 mr-2" /> Modifier
                    </Button>
                    <Button
                      onClick={() => handleToggleAvailability(item.id_article)}
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl"
                    >
                      {item.disponible ? (
                        <>
                          <EyeOff className="size-4 mr-2" /> Désactiver
                        </>
                      ) : (
                        <>
                          <Eye className="size-4 mr-2" /> Activer
                        </>
                      )}
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleDelete(item.id_article, item.nom)}
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-destructive hover:bg-destructive/20"
                  >
                    <Trash2 className="size-4 mr-2" /> Supprimer
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