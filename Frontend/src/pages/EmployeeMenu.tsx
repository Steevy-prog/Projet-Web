import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UtensilsCrossed, Star, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useEmployee } from '../lib/employeeContext';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { formatPriceFromEur } from '../lib/formatPrice';

export function EmployeeMenu() {
  const { menuItems, toggleMenuItemAvailability, setDishOfDay } = useEmployee();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(menuItems.map((item) => item.category)))];

  const filteredItems = filterCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === filterCategory);

  const handleToggleAvailability = (itemId: string, itemName: string, currentStatus: boolean) => {
    toggleMenuItemAvailability(itemId);
    toast.success(
      currentStatus
        ? `${itemName} marqué comme épuisé`
        : `${itemName} de nouveau disponible`
    );
  };

  const handleSetDishOfDay = (itemId: string, itemName: string) => {
    setDishOfDay(itemId);
    toast.success(`${itemName} défini comme plat du jour`);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl mb-2 text-foreground">
            Gestion du <span className="text-primary">Menu</span>
          </h1>
          <p className="text-muted-foreground">
            Mettez à jour la disponibilité des plats et définissez le plat du jour
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
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
              {category === 'all' ? 'Tous' : category}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-green-500/10">
                <CheckCircle className="size-5 text-green-500" />
              </div>
              <span className="text-muted-foreground">Disponibles</span>
            </div>
            <p className="text-3xl text-foreground">
              {menuItems.filter((item) => item.available).length}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-red-500/10">
                <AlertCircle className="size-5 text-red-500" />
              </div>
              <span className="text-muted-foreground">Épuisés</span>
            </div>
            <p className="text-3xl text-foreground">
              {menuItems.filter((item) => !item.available).length}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <Star className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground">Plat du jour</span>
            </div>
            <p className="text-lg text-foreground">
              {menuItems.find((item) => item.isDishOfDay)?.name || 'Aucun'}
            </p>
          </div>
        </motion.div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
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
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <AlertCircle className="size-4" />
                    Épuisé
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg text-foreground">{item.name}</h3>
                  <span className="text-primary">{formatPriceFromEur(item.price)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <span className="inline-block px-2 py-1 rounded-lg bg-secondary text-xs text-muted-foreground mb-4">
                  {item.category}
                </span>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleToggleAvailability(item.id, item.name, item.available)}
                    variant={item.available ? 'outline' : 'default'}
                    className={`w-full rounded-2xl ${
                      !item.available
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : ''
                    }`}
                  >
                    {item.available ? (
                      <>
                        <EyeOff className="size-4 mr-2" />
                        Marquer épuisé
                      </>
                    ) : (
                      <>
                        <Eye className="size-4 mr-2" />
                        Rendre disponible
                      </>
                    )}
                  </Button>

                  {item.available && !item.isDishOfDay && (
                    <Button
                      onClick={() => handleSetDishOfDay(item.id, item.name)}
                      variant="outline"
                      className="w-full rounded-2xl"
                    >
                      <Star className="size-4 mr-2" />
                      Définir plat du jour
                    </Button>
                  )}

                  {item.isDishOfDay && (
                    <div className="text-center py-2 px-3 rounded-xl bg-primary/10 text-primary text-sm">
                      ⭐ Actuellement plat du jour
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
