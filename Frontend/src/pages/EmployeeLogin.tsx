import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, Briefcase, Shield, User, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useEmployee } from '../lib/employeeContext';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface EmployeeLoginProps {
  onNavigate: (page: string) => void;
}

export function EmployeeLogin({ onNavigate }: EmployeeLoginProps) {
  const { login } = useEmployee();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const success = login(formData.email, formData.password);

    if (success) {
      // Get the logged in employee to determine their role
      const storedEmployee = localStorage.getItem('employee');
      if (storedEmployee) {
        const employee = JSON.parse(storedEmployee);
        toast.success(`Bienvenue ${employee.name} !`);
        
        // Redirect based on role
        switch (employee.role) {
          case 'admin':
            onNavigate('admin-dashboard');
            break;
          case 'gerant':
            onNavigate('gerant-dashboard');
            break;
          case 'employe':
          default:
            onNavigate('employee-dashboard');
            break;
        }
      }
    } else {
      toast.error('Email ou mot de passe incorrect');
    }
  };

  const roleIcons = [
    { icon: Shield, label: 'Admin', color: 'text-red-500' },
    { icon: Briefcase, label: 'Gérant', color: 'text-blue-500' },
    { icon: User, label: 'Employé', color: 'text-green-500' },
    { icon: GraduationCap, label: 'Étudiant', color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4"
          >
            <Briefcase className="size-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl mb-2 text-foreground">
            Espace <span className="text-primary">Employé</span>
          </h1>
          <p className="text-muted-foreground">
            Connectez-vous pour accéder à votre interface de gestion
          </p>
        </div>

        {/* Role Icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-8"
        >
          {roleIcons.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="p-2 rounded-xl bg-secondary border border-border">
                  <Icon className={`size-5 ${role.color}`} />
                </div>
                <span className="text-xs text-muted-foreground">{role.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

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
          <div className="mt-6 p-4 rounded-xl bg-secondary border border-border">
            <p className="text-xs text-muted-foreground mb-2">Comptes de démonstration :</p>
            <div className="space-y-1 text-xs">
              <p className="text-foreground">
                <span className="text-red-500">Admin:</span> admin@restaurant.com / admin123
              </p>
              <p className="text-foreground">
                <span className="text-blue-500">Gérant:</span> gerant@restaurant.com / gerant123
              </p>
              <p className="text-foreground">
                <span className="text-green-500">Employé:</span> employe@restaurant.com / employe123
              </p>
            </div>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6"
        >
          <button    type="button"  className="text-sm text-primary hover:underline">
            <Link to='/'>Retour au site principal</Link>

          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
