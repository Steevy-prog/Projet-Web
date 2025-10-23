import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import axios from 'axios';
import { LogIn, Briefcase, Shield, User, GraduationCap, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { AuthAPI } from '../lib/apis';
import { getEmployees, getOrders, getWeeklyOrder } from '../lib/employeeData';
import { useEmployee } from '../lib/employeeContext';

interface EmployeeLoginProps {
  onNavigate: (page: string) => void;
}

export function EmployeeLogin({ onNavigate }: EmployeeLoginProps) {
  const { setAllEmployees, setAllOrders, setAllWeeklyOrders } = useEmployee();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // 🔁 Auto-login when token exists
  useEffect(() => {
    const tryAutoLogin = async () => {
      try {
        setLoading(true);
        const auto = await AuthAPI.autoLogin();
        if (auto) {
          const stored = localStorage.getItem('user');
          if (stored) {
            const user = JSON.parse(stored);
            toast.success(`Connexion automatique réussie. Bienvenue ${user.nom} !`);
            await handleRedirectByRole(user);
          }
        }
      } catch (error) {
        console.warn('Auto-login failed:', error);
      } finally {
        setLoading(false);
      }
    };

    tryAutoLogin();
  }, []);

  // 🧭 Redirect based on role
  const handleRedirectByRole = async (user: any) => {
    switch (user.id_role) {
      case 2: // Gérant
        onNavigate('gerant-dashboard');
        try {
          setLoadingData(true);
          const [employees, orders, weeklyOrders] = await Promise.all([
            getEmployees(),
            getOrders(),
            getWeeklyOrder(),
          ]);
          if (Array.isArray(employees)) setAllEmployees(employees);
          if (Array.isArray(orders)) setAllOrders(orders);
          if (Array.isArray(weeklyOrders)) setAllWeeklyOrders(weeklyOrders);
        } catch (err) {
          console.error(err);
          toast.error('Erreur lors du chargement des données.');
        } finally {
          setLoadingData(false);
        }
        break;

      case 3:
        onNavigate('employee-dashboard');
        break;

      case 4:
        onNavigate('admin-dashboard');
        break;

      default:
        onNavigate('home');
    }
  };

  // 🔐 Manual login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      const data = await AuthAPI.login({
        email: formData.email,
        mot_de_passe: formData.password,
      });

      if (!data.success) {
        toast.error(data.message || 'Email ou mot de passe incorrect');
        return;
      }

      localStorage.setItem('user', JSON.stringify({ ...data.user, token: data.access_token }));
      localStorage.setItem('token', data.access_token);

      toast.success(`Bienvenue ${data.user.nom} !`);
      await handleRedirectByRole(data.user);
    } catch (error: any) {
      console.error(error.response || error);
      toast.error(error.response?.data?.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  const roleIcons = [
    { icon: Shield, label: 'Admin', color: 'text-red-500' },
    { icon: Briefcase, label: 'Gérant', color: 'text-blue-500' },
    { icon: User, label: 'Employé', color: 'text-green-500' },
    { icon: GraduationCap, label: 'Étudiant', color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* 🌀 Loading overlay for data */}
      {loadingData && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-50">
          <Loader2 className="animate-spin text-white size-10 mb-3" />
          <p className="text-white text-lg font-medium">Chargement des données...</p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-center text-xl font-bold mb-4">Connexion Employé</h2>

          <div className="space-y-2">
            <Label htmlFor="email">Email professionnel</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="employe@restaurant.com"
              disabled={loading || loadingData}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              disabled={loading || loadingData}
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={loading || loadingData}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2 size-5" /> Connexion...
              </span>
            ) : (
              <>
                <LogIn className="size-5 mr-2" /> Se connecter
              </>
            )}
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6"
        >
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-sm text-primary hover:underline"
          >
            Retour au site principal
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}