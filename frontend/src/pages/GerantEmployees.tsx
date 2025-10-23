import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, Edit, Trash2, Shield, User, GraduationCap } from 'lucide-react';
import { useEmployee } from '../lib/employeeContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { Employee ,Utilisateur} from '../lib/types';

export function GerantEmployees() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployee();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 3 as Utilisateur['id_role'], // Replace 3 with the correct numeric value for 'employe'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (editingId) {
      updateEmployee(editingId, formData);
      toast.success('Employé modifié avec succès');
      setEditingId(null);
    } else {
      const newEmployee: Employee = { ...(formData as unknown as Employee) };
      addEmployee(newEmployee);
      toast.success('Employé ajouté avec succès');
      setIsAdding(false);
    }

    setFormData({ name: '', email: '', password: '', role: 2 });
  };

  const handleEdit = (employee: Employee) => {
    setEditingId(employee.id_employe);
    setFormData({
      name: employee.nom,
      email: employee.email,
      password: employee.mot_de_passe,
      role: employee.id_role,
    });
    setIsAdding(true);
  };

  const handleDelete = (employeeId: number, employeeName: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${employeeName} ?`)) {
      deleteEmployee(employeeId);
      toast.success('Employé supprimé');
    }
  };

  const getRoleIcon = (role: number) => {
    switch (role) {
      case 1:
        return Shield;
      case 2 :
        return Users;
      case 3:
        return User;
      case 4:
        return GraduationCap;
      default:
        return User;
    }
  };

  const getRoleColor = (role: number) => {
    switch (role) {
      case 4:
        return 'bg-red-500/20 text-red-400';
      case 2:
        return 'bg-blue-500/20 text-blue-400';
      case 3:
        return 'bg-green-500/20 text-green-400';
      case 1:
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-primary/20 text-primary';
    }
  };

  const getRoleLabel = (role: number) => {
    switch (role) {
      case 1:
        return 'Etudiant';
      case 2:
        return 'Gérant';
      case 3:
        return 'Employé';
      case 4:
        return 'Administrateur';
      default:
        return role;
    }
  };

  const employeeStats = {
    total: employees.length,
    employes: employees.filter((e) => e.id_role === 3).length,
    gerants: employees.filter((e) => e.id_role === 2).length,
    admins: employees.filter((e) => e.id_role === 1).length,
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
                Gestion des <span className="text-primary">Employés</span>
              </h1>
              <p className="text-muted-foreground">
                Ajouter, modifier ou supprimer des comptes employés
              </p>
            </div>
            <Button
              onClick={() => {
                setIsAdding(!isAdding);
                setEditingId(null);
                setFormData({ name: '', email: '', password: '', role: 2 });
              }}
              className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <UserPlus className="size-5 mr-2" />
              Ajouter un employé
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <Users className="size-5 text-primary" />
              </div>
              <span className="text-muted-foreground">Total</span>
            </div>
            <p className="text-3xl text-foreground">{employeeStats.total}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-green-500/10">
                <User className="size-5 text-green-500" />
              </div>
              <span className="text-muted-foreground">Employés</span>
            </div>
            <p className="text-3xl text-foreground">{employeeStats.employes}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-blue-500/10">
                <Users className="size-5 text-blue-500" />
              </div>
              <span className="text-muted-foreground">Gérants</span>
            </div>
            <p className="text-3xl text-foreground">{employeeStats.gerants}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-red-500/10">
                <Shield className="size-5 text-red-500" />
              </div>
              <span className="text-muted-foreground">Admins</span>
            </div>
            <p className="text-3xl text-foreground">{employeeStats.admins}</p>
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
              {editingId ? 'Modifier l\'employé' : 'Nouvel employé'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jean Dupont"
                    className="rounded-2xl bg-input-background border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jean.dupont@restaurant.com"
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

                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: Employee['id_role']) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger className="rounded-2xl bg-input-background border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employe">Employé</SelectItem>
                      <SelectItem value="gerant">Gérant</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
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
                    setFormData({ name: '', email: '', password: '', role: 3 });
                  }}
                  className="rounded-2xl"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Employees List */}
        <div className="grid grid-cols-1 gap-4">
          {employees.map((employee, index) => {
            const RoleIcon = getRoleIcon(employee.id_role);
            return (
              <motion.div
                key={employee.id_employe}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <RoleIcon className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg text-foreground mb-1">{employee.nom}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{employee.email}</p>
                      <span className={`px-3 py-1 rounded-full text-xs ${getRoleColor(employee.id_role)}`}>
                        {getRoleLabel(employee.id_role)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(employee)}
                      variant="outline"
                      size="sm"
                      className="rounded-xl"
                    >
                      <Edit className="size-4 mr-2" />
                      Modifier
                    </Button>
                    {employee.id_role !== 4 && (
                      <Button
                        onClick={() => handleDelete(employee.id_employe, employee.nom)}
                        variant="outline"
                        size="sm"
                        className="rounded-xl text-destructive hover:bg-destructive/20"
                      >
                        <Trash2 className="size-4 mr-2" />
                        Supprimer
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
