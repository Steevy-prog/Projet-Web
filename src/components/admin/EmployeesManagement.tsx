import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter,
  Download,
  UserPlus,
  Phone,
  Mail,
  Calendar,
  Edit,
  Trash2,
  MoreVertical,
  X,
  Save,
  Eye,
  EyeOff,
  Shield,
  User,
  ChefHat,
  Briefcase
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Administrateur' | 'Chef' | 'Manager' | 'Serveur' | 'Caissier';
  department: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'vacation';
  salary: number;
  avatar?: string;
}

const mockEmployees: Employee[] = [
  {
    id: 'EMP-001',
    name: 'Admin Principal',
    email: 'admin@zeduc.com',
    phone: '+237 6 XX XX XX XX',
    role: 'Administrateur',
    department: 'Administration',
    hireDate: '2023-01-15',
    status: 'active',
    salary: 850000
  },
  {
    id: 'EMP-002',
    name: 'Chef Cuisine',
    email: 'chef@zeduc.com',
    phone: '+237 6 XX XX XX XX',
    role: 'Chef',
    department: 'Cuisine',
    hireDate: '2023-02-20',
    status: 'active',
    salary: 650000
  },
  {
    id: 'EMP-003',
    name: 'Manager Salle',
    email: 'manager@zeduc.com',
    phone: '+237 6 XX XX XX XX',
    role: 'Manager',
    department: 'Service',
    hireDate: '2023-03-10',
    status: 'active',
    salary: 550000
  },
  {
    id: 'EMP-004',
    name: 'Marie Serveur',
    email: 'marie.s@zeduc.com',
    phone: '+237 6 XX XX XX XX',
    role: 'Serveur',
    department: 'Service',
    hireDate: '2023-06-15',
    status: 'active',
    salary: 350000
  },
  {
    id: 'EMP-005',
    name: 'Jean Caissier',
    email: 'jean.c@zeduc.com',
    phone: '+237 6 XX XX XX XX',
    role: 'Caissier',
    department: 'Comptabilité',
    hireDate: '2023-07-20',
    status: 'active',
    salary: 400000
  },
  {
    id: 'EMP-006',
    name: 'Sophie Serveur',
    email: 'sophie.s@zeduc.com',
    phone: '+237 6 XX XX XX XX',
    role: 'Serveur',
    department: 'Service',
    hireDate: '2023-08-05',
    status: 'vacation',
    salary: 350000
  }
];

const roleIcons = {
  Administrateur: Shield,
  Chef: ChefHat,
  Manager: Briefcase,
  Serveur: User,
  Caissier: User
};

const roleColors = {
  Administrateur: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500' },
  Chef: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500' },
  Manager: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500' },
  Serveur: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500' },
  Caissier: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500' }
};

const statusConfig = {
  active: { label: 'Actif', bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500' },
  inactive: { label: 'Inactif', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500' },
  vacation: { label: 'En congé', bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500' }
};

export function EmployeesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | Employee['role']>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || employee.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = [
    { label: 'Total Employés', value: mockEmployees.length, color: 'yellow' },
    { label: 'Actifs', value: mockEmployees.filter(e => e.status === 'active').length, color: 'green' },
    { label: 'En congé', value: mockEmployees.filter(e => e.status === 'vacation').length, color: 'orange' },
    { label: 'Départements', value: new Set(mockEmployees.map(e => e.department)).size, color: 'blue' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6"
          >
            <p className="text-zinc-400 text-sm">{stat.label}</p>
            <p className="text-2xl text-yellow-600 mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Role Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setRoleFilter('all')}
          className={`px-4 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
            roleFilter === 'all'
              ? 'bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border-yellow-700/50 text-yellow-500'
              : 'bg-zinc-950/50 border-yellow-900/20 text-zinc-400 hover:border-yellow-700/30'
          }`}
        >
          Tous les rôles
        </button>
        {(['Administrateur', 'Chef', 'Manager', 'Serveur', 'Caissier'] as const).map((role) => {
          const roleStyle = roleColors[role];
          return (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
                roleFilter === role
                  ? `${roleStyle.bg} ${roleStyle.border} ${roleStyle.text}`
                  : 'bg-zinc-950/50 border-yellow-900/20 text-zinc-400 hover:border-yellow-700/30'
              }`}
            >
              {role}
            </button>
          );
        })}
      </div>

      {/* Search and Actions */}
      <div className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300 flex items-center gap-2">
              <Filter size={18} />
              <span>Filtres</span>
            </button>
            <button className="px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300 flex items-center gap-2">
              <Download size={18} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setIsAddingEmployee(true)}
              className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2"
            >
              <UserPlus size={18} />
              <span>Nouvel employé</span>
            </button>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-zinc-950/50 border border-yellow-900/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-900/50 border-b border-yellow-900/20">
              <tr>
                <th className="px-6 py-4 text-left text-zinc-400">Employé</th>
                <th className="px-6 py-4 text-left text-zinc-400">Contact</th>
                <th className="px-6 py-4 text-left text-zinc-400">Rôle</th>
                <th className="px-6 py-4 text-left text-zinc-400">Département</th>
                <th className="px-6 py-4 text-left text-zinc-400">Date d'embauche</th>
                <th className="px-6 py-4 text-left text-zinc-400">Salaire</th>
                <th className="px-6 py-4 text-left text-zinc-400">Statut</th>
                <th className="px-6 py-4 text-left text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-900/10">
              {filteredEmployees.map((employee, index) => {
                const roleStyle = roleColors[employee.role];
                const RoleIcon = roleIcons[employee.role];
                const statusStyle = statusConfig[employee.status];
                
                return (
                  <motion.tr
                    key={employee.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-zinc-900/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center">
                          <span className="text-black">{employee.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-zinc-100">{employee.name}</p>
                          <p className="text-xs text-zinc-500">{employee.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-zinc-400 text-sm flex items-center gap-2">
                          <Mail size={14} />
                          {employee.email}
                        </p>
                        <p className="text-zinc-400 text-sm flex items-center gap-2">
                          <Phone size={14} />
                          {employee.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${roleStyle.bg} ${roleStyle.border} ${roleStyle.text} text-sm`}>
                        <RoleIcon size={14} />
                        {employee.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {new Date(employee.hireDate).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-yellow-600">
                      {employee.salary.toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text} text-sm`}>
                        {statusStyle.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedEmployee(employee)}
                          className="p-2 hover:bg-yellow-600/10 rounded-lg transition-colors text-zinc-400 hover:text-yellow-600"
                        >
                          <Edit size={18} />
                        </button>
                        <button className="p-2 hover:bg-red-600/10 rounded-lg transition-colors text-zinc-400 hover:text-red-600">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Employee Modal */}
      {(isAddingEmployee || selectedEmployee) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            setIsAddingEmployee(false);
            setSelectedEmployee(null);
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-950 border border-yellow-900/20 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl text-yellow-600">
                  {isAddingEmployee ? 'Nouvel employé' : 'Modifier l\'employé'}
                </h3>
                <p className="text-zinc-400 mt-1">
                  {isAddingEmployee ? 'Ajoutez un nouveau membre à votre équipe' : selectedEmployee?.name}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAddingEmployee(false);
                  setSelectedEmployee(null);
                }}
                className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <X className="text-zinc-400" size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-zinc-100 mb-4">Informations personnelles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Nom complet</label>
                    <input
                      type="text"
                      defaultValue={selectedEmployee?.name}
                      placeholder="Ex: Marie Dubois"
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={selectedEmployee?.email}
                      placeholder="email@zeduc.com"
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Téléphone</label>
                    <input
                      type="tel"
                      defaultValue={selectedEmployee?.phone}
                      placeholder="+237 6 XX XX XX XX"
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Date d'embauche</label>
                    <input
                      type="date"
                      defaultValue={selectedEmployee?.hireDate}
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Role and Department */}
              <div>
                <h4 className="text-zinc-100 mb-4">Poste et département</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Rôle</label>
                    <select
                      defaultValue={selectedEmployee?.role}
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    >
                      <option value="Administrateur">Administrateur</option>
                      <option value="Chef">Chef</option>
                      <option value="Manager">Manager</option>
                      <option value="Serveur">Serveur</option>
                      <option value="Caissier">Caissier</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Département</label>
                    <select
                      defaultValue={selectedEmployee?.department}
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    >
                      <option value="Administration">Administration</option>
                      <option value="Cuisine">Cuisine</option>
                      <option value="Service">Service</option>
                      <option value="Comptabilité">Comptabilité</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Statut</label>
                    <select
                      defaultValue={selectedEmployee?.status}
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="vacation">En congé</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div>
                <h4 className="text-zinc-100 mb-4">Rémunération</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Salaire mensuel (FCFA)</label>
                    <input
                      type="number"
                      defaultValue={selectedEmployee?.salary}
                      placeholder="350000"
                      className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Account Credentials (only for new employees) */}
              {isAddingEmployee && (
                <div>
                  <h4 className="text-zinc-100 mb-4">Identifiants de connexion</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-400 text-sm mb-2">Nom d'utilisateur</label>
                      <input
                        type="text"
                        placeholder="username"
                        className="w-full px-4 py-2 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-sm mb-2">Mot de passe</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="w-full px-4 py-2 pr-10 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-yellow-700/50 focus:outline-none transition-colors"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-yellow-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-yellow-900/20">
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center gap-2">
                  <Save size={18} />
                  {isAddingEmployee ? 'Ajouter l\'employé' : 'Enregistrer les modifications'}
                </button>
                <button
                  onClick={() => {
                    setIsAddingEmployee(false);
                    setSelectedEmployee(null);
                  }}
                  className="flex-1 px-4 py-3 bg-zinc-900/50 border border-yellow-900/20 rounded-lg text-zinc-400 hover:text-yellow-600 hover:border-yellow-700/30 transition-all duration-300"
                >
                  Annuler
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
