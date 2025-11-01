import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { useEmployee } from '../lib/employeeContext';

interface EmployeeLoginProps {
  onNavigate: (page: string) => void;
}

export function EmployeeLogin({ onNavigate }: EmployeeLoginProps) {
  const { login, employee, isLoggedIn } = useEmployee();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // 🔁 Auto-redirect when already logged in
  useEffect(() => {
    if (isLoggedIn && employee) {
      handleRedirectByRole(employee);
    }
  }, [isLoggedIn, employee]);

  // 🧭 Redirect based on role
  const handleRedirectByRole = (user: any) => {
    switch (user.id_role) {
      case 2: // Gérant
        onNavigate('gerant-dashboard');
        break;
      case 3: // Employee
        onNavigate('employee-dashboard');
        break;
      case 4: // Admin
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
      const success = await login(formData.email, formData.password);

      if (!success) {
        toast.error('Email ou mot de passe incorrect');
        return;
      }

      // The context will handle data fetching automatically
      // Just redirect after successful login
      const storedEmployee = localStorage.getItem('employee');
      if (storedEmployee) {
        const emp = JSON.parse(storedEmployee);
        handleRedirectByRole(emp);
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={loading}
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