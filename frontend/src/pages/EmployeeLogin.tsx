import axios from 'axios';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, Briefcase, Shield, User, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { AuthAPI } from '../lib/apis';
import { getEmployees, getOrders } from '../lib/employeeData';
import { useEmployee } from '../lib/employeeContext';

interface EmployeeLoginProps {
  onNavigate: (page: string) => void;
}

export function EmployeeLogin({ onNavigate }: EmployeeLoginProps) {
  const { setAllEmployees } = useEmployee();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

   try {
    const data = await AuthAPI.login({
      email: formData.email,
      mot_de_passe: formData.password,
    });


      if (data.success) {
        // Store user and token
        localStorage.setItem(
          'user',
          JSON.stringify({ ...data.user, token: data.access_token })
          
        );
        localStorage.setItem(
          'token', data.access_token 
          
        );
        console.log(data);

        toast.success(`Bienvenue ${data.user.nom} !`);

        // Redirect based on role
        switch (data.user.id_role) {
          case 2:
            const allEmployees = await getEmployees();
            const allOrders = await getOrders();
            if (Array.isArray(allOrders)) {
              setAllOrders(allOrders);
            }
            if (Array.isArray(allEmployees)) {
              setAllEmployees(allEmployees);
            }
            onNavigate('gerant-dashboard');
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
      } else {
        toast.error(data.message || 'Email ou mot de passe incorrect');
      }
    } catch (error: any) {
      console.error(error.response || error);
      toast.error(
        error.response?.data?.message || 'Erreur lors de la connexion'
      );
    }
  };

  // Role icons and form remain the same...
  const roleIcons = [
    { icon: Shield, label: 'Admin', color: 'text-red-500' },
    { icon: Briefcase, label: 'Gérant', color: 'text-blue-500' },
    { icon: User, label: 'Employé', color: 'text-green-500' },
    { icon: GraduationCap, label: 'Étudiant', color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        {/* Header + Role Icons */}
        {/* ...same as before... */}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-8 space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email professionnel</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="employe@restaurant.com"
              className="rounded-2xl bg-input-background border-input"
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
              className="rounded-2xl bg-input-background border-input"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <LogIn className="size-5 mr-2" />
            Se connecter
          </Button>

          {/* Demo Credentials */}
          {/* ...same as before... */}
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