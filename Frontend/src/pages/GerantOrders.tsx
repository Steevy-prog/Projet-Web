import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Clock, CheckCircle, Package, Truck, Filter, Calendar, User } from 'lucide-react';
import { useEmployee } from '../lib/employeeContext';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function GerantOrders() {
  const { orders } = useEmployee();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');

  let filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((order) => order.status === filterStatus);

  // Sort orders
  filteredOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'amount') {
      return b.total - a.total;
    } else if (sortBy === 'customer') {
      return a.userName.localeCompare(b.userName);
    }
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'preparing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ready':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'delivered':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'preparing':
        return 'En préparation';
      case 'ready':
        return 'Prête';
      case 'delivered':
        return 'Livrée';
      default:
        return status;
    }
  };

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    ready: orders.filter((o) => o.status === 'ready').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
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
            Supervision des <span className="text-primary">Commandes</span>
          </h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de toutes les commandes en temps réel
          </p>
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-2 block">Filtrer par statut</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'Toutes', icon: ShoppingBag },
                  { value: 'pending', label: 'En attente', icon: Clock },
                  { value: 'preparing', label: 'En préparation', icon: Package },
                  { value: 'ready', label: 'Prêtes', icon: CheckCircle },
                  { value: 'delivered', label: 'Livrées', icon: Truck },
                ].map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <button
                      key={filter.value}
                      onClick={() => setFilterStatus(filter.value)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                        filterStatus === filter.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-primary/20'
                      }`}
                    >
                      <Icon className="size-4" />
                      <span>{filter.label}</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-background/20 text-xs">
                        {statusCounts[filter.value as keyof typeof statusCounts]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full md:w-64">
              <label className="text-sm text-muted-foreground mb-2 block">Trier par</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="rounded-2xl bg-input-background border-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4" />
                      Date (récent)
                    </div>
                  </SelectItem>
                  <SelectItem value="amount">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="size-4" />
                      Montant
                    </div>
                  </SelectItem>
                  <SelectItem value="customer">
                    <div className="flex items-center gap-2">
                      <User className="size-4" />
                      Client
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card border border-border rounded-2xl p-12 text-center"
            >
              <ShoppingBag className="size-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune commande trouvée</p>
            </motion.div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl text-foreground">Commande #{order.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Client</p>
                        <p className="text-foreground">{order.userName}</p>
                        <p className="text-sm text-muted-foreground">{order.userEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Date & Heure</p>
                        <p className="text-foreground">
                          {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="bg-secondary rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-2">Articles commandés :</p>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-primary">×{item.quantity}</span>
                              <span className="text-foreground">{item.menuItem.name}</span>
                            </div>
                            <span className="text-muted-foreground">
                              {(item.menuItem.price * item.quantity).toFixed(2)}€
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-border mt-3 pt-3 flex items-center justify-between">
                        <span className="text-foreground">Total</span>
                        <span className="text-xl text-primary">{order.total.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
