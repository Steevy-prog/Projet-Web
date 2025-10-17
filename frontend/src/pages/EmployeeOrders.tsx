import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Clock, CheckCircle, Package, Truck, Filter } from 'lucide-react';
import { useEmployee } from '../lib/employeeContext';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

export function EmployeeOrders() {
  const { orders, updateOrderStatus } = useEmployee();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((order) => order.status === filterStatus);

  const handleStatusChange = (orderId: string, newStatus: 'pending' | 'preparing' | 'ready' | 'delivered') => {
    updateOrderStatus(orderId, newStatus);
    toast.success('Statut de la commande mis à jour');
  };

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

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pending':
        return 'preparing';
      case 'preparing':
        return 'ready';
      case 'ready':
        return 'delivered';
      default:
        return null;
    }
  };

  const getNextStatusLabel = (currentStatus: string) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return null;
    return getStatusLabel(nextStatus);
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
            Gestion des <span className="text-primary">Commandes</span>
          </h1>
          <p className="text-muted-foreground">
            Suivez et mettez à jour le statut de toutes les commandes
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
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
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all ${
                  filterStatus === filter.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-primary/20'
                }`}
              >
                <Icon className="size-4" />
                <span>{filter.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-background/20 text-xs">
                  {statusCounts[filter.value as keyof typeof statusCounts]}
                </span>
              </button>
            );
          })}
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
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
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

                    <div className="bg-secondary rounded-xl p-4 mb-4">
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

                  <div className="flex flex-col gap-3">
                    {getNextStatus(order.status) && (
                      <Button
                        onClick={() => handleStatusChange(order.id, getNextStatus(order.status) as any)}
                        className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
                      >
                        <CheckCircle className="size-4 mr-2" />
                        Marquer "{getNextStatusLabel(order.status)}"
                      </Button>
                    )}
                    {order.status === 'pending' && (
                      <Button
                        onClick={() => handleStatusChange(order.id, 'preparing')}
                        variant="outline"
                        className="rounded-2xl whitespace-nowrap"
                      >
                        <Package className="size-4 mr-2" />
                        Commencer préparation
                      </Button>
                    )}
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
