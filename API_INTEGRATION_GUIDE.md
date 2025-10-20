# 📚 Guide d'Intégration API - Connexion à la Base de Données

Ce guide explique comment connecter l'application web à une base de données backend via des APIs REST.

---

## 🎯 Vue d'ensemble

L'application utilise actuellement **localStorage** pour stocker les données côté client. Pour une application en production, vous devez :

1. **Créer un backend API** (Node.js/Express, Python/Django, PHP/Laravel, etc.)
2. **Configurer une base de données** (PostgreSQL, MySQL, MongoDB, etc.)
3. **Remplacer les appels localStorage** par des appels API
4. **Implémenter l'authentification** (JWT, OAuth, etc.)

---

## 🏗️ Architecture Recommandée

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Frontend      │  HTTP   │   Backend API   │   SQL   │   Database      │
│   (React)       │ ◄─────► │   (Express.js)  │ ◄─────► │   (PostgreSQL)  │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

---

## 📋 Étape 1 : Configuration du Backend

### Option A : Node.js + Express + PostgreSQL

#### 1.1 Installation des dépendances

```bash
# Créer un dossier backend
mkdir backend
cd backend

# Initialiser npm
npm init -y

# Installer les dépendances
npm install express cors dotenv bcryptjs jsonwebtoken pg
npm install --save-dev nodemon
```

#### 1.2 Structure du projet backend

```
backend/
├── src/
│   ├── config/
│   │   └── database.js       # Configuration DB
│   ├── controllers/
│   │   ├── authController.js # Authentification
│   │   ├── userController.js # Gestion utilisateurs
│   │   └── menuController.js # Gestion menus
│   ├── models/
│   │   ├── User.js
│   │   ├── Menu.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── menus.js
│   ├── middleware/
│   │   └── auth.js           # Middleware JWT
│   └── server.js             # Point d'entrée
├── .env                      # Variables d'environnement
└── package.json
```

#### 1.3 Configuration de la base de données

**Fichier : `backend/src/config/database.js`**

```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'restaurant_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
```

**Fichier : `backend/.env`**

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=restaurant_db
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe

# JWT
JWT_SECRET=votre_secret_jwt_tres_securise
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# OAuth (optionnel)
GOOGLE_CLIENT_ID=votre_google_client_id
GOOGLE_CLIENT_SECRET=votre_google_client_secret
FACEBOOK_APP_ID=votre_facebook_app_id
FACEBOOK_APP_SECRET=votre_facebook_app_secret
```

---

## 📊 Étape 2 : Schéma de Base de Données

### 2.1 Script SQL pour PostgreSQL

**Fichier : `backend/database/schema.sql`**

```sql
-- Table des utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'etudiant',
    loyalty_points INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    orders_count INTEGER DEFAULT 0,
    rank INTEGER,
    referral_code VARCHAR(10) UNIQUE,
    referral_count INTEGER DEFAULT 0,
    referred_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des menus
CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    image_url TEXT,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des commandes
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    delivery_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des items de commande
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    menu_id INTEGER REFERENCES menus(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des réclamations
CREATE TABLE reclamations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(50) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des sessions OAuth (optionnel)
CREATE TABLE oauth_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    provider VARCHAR(50) NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_referral_code ON users(referral_code);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

---

## 🔐 Étape 3 : Implémentation de l'Authentification

### 3.1 Middleware d'authentification JWT

**Fichier : `backend/src/middleware/auth.js`**

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Récupérer le token du header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = authMiddleware;
```

### 3.2 Contrôleur d'authentification

**Fichier : `backend/src/controllers/authController.js`**

```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Inscription
exports.register = async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Générer un code de parrainage unique
    const generateReferralCode = () => {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    let newReferralCode = generateReferralCode();
    
    // Créer l'utilisateur
    const result = await pool.query(
      `INSERT INTO users (name, email, password, referral_code, loyalty_points)
       VALUES ($1, $2, $3, $4, 500)
       RETURNING id, name, email, role, loyalty_points, referral_code`,
      [name, email, hashedPassword, newReferralCode]
    );

    const user = result.rows[0];

    // Appliquer le code de parrainage si fourni
    if (referralCode) {
      const referrer = await pool.query(
        'SELECT id FROM users WHERE referral_code = $1',
        [referralCode]
      );

      if (referrer.rows.length > 0) {
        await pool.query(
          'UPDATE users SET referred_by = $1, loyalty_points = loyalty_points + 100 WHERE id = $2',
          [referrer.rows[0].id, user.id]
        );
        
        await pool.query(
          'UPDATE users SET referral_count = referral_count + 1, loyalty_points = loyalty_points + 50 WHERE id = $1',
          [referrer.rows[0].id]
        );
      }
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        loyaltyPoints: user.loyalty_points,
        referralCode: user.referral_code
      }
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const user = result.rows[0];

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        loyaltyPoints: user.loyalty_points,
        referralCode: user.referral_code,
        gamesPlayed: user.games_played,
        ordersCount: user.orders_count,
        rank: user.rank
      }
    });
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Connexion Google OAuth
exports.googleLogin = async (req, res) => {
  try {
    const { googleToken } = req.body;
    
    // Vérifier le token Google
    // Utiliser la bibliothèque google-auth-library
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    // Vérifier si l'utilisateur existe
    let user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (user.rows.length === 0) {
      // Créer un nouvel utilisateur
      const result = await pool.query(
        `INSERT INTO users (name, email, password, loyalty_points)
         VALUES ($1, $2, $3, 500)
         RETURNING id, name, email, role, loyalty_points`,
        [name, email, 'OAUTH_USER'] // Mot de passe fictif pour OAuth
      );
      user = result;
    }

    const userData = user.rows[0];

    // Générer le token JWT
    const token = jwt.sign(
      { id: userData.id, email: userData.email, role: userData.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      message: 'Connexion Google réussie',
      token,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        loyaltyPoints: userData.loyalty_points
      }
    });
  } catch (error) {
    console.error('Erreur Google OAuth:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
```

### 3.3 Routes d'authentification

**Fichier : `backend/src/routes/auth.js`**

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/google
router.post('/google', authController.googleLogin);

// POST /api/auth/facebook
router.post('/facebook', authController.facebookLogin);

module.exports = router;
```

### 3.4 Serveur principal

**Fichier : `backend/src/server.js`**

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const menuRoutes = require('./routes/menus');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menus', menuRoutes);

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
```

---

## 🔌 Étape 4 : Intégration Frontend

### 4.1 Configuration de l'API client

**Fichier : `src/lib/api.ts`**

```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Instance Axios configurée
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 4.2 Services API

**Fichier : `src/services/authService.ts`**

```typescript
import api from '../lib/api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  referralCode?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  // Inscription
  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  // Connexion
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  // Connexion Google
  googleLogin: async (googleToken: string) => {
    const response = await api.post('/auth/google', { googleToken });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  // Connexion Facebook
  facebookLogin: async (facebookToken: string) => {
    const response = await api.post('/auth/facebook', { facebookToken });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('authToken');
  },
};
```

### 4.3 Modification du composant Login

**Fichier : `src/pages/Login.tsx` (modifications à apporter)**

```typescript
// Remplacer la fonction handleSubmit par :

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    if (isSignUp) {
      // Inscription
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        referralCode: referralCodeInput || undefined,
      });
      
      setUser(response.user);
      toast.success('Compte créé avec succès !');
    } else {
      // Connexion
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });
      
      setUser(response.user);
      toast.success('Connexion réussie !');
    }
    
    onNavigate('user-home');
    onClose();
  } catch (error: any) {
    const message = error.response?.data?.message || 'Une erreur est survenue';
    toast.error(message);
  } finally {
    setIsLoading(false);
  }
};
```

### 4.4 Intégration Google OAuth dans le Frontend

**Fichier : `src/components/SocialLoginButtons.tsx` (modifications)**

```typescript
import { authService } from '../services/authService';
import { useApp } from '../lib/context';
import { toast } from 'sonner';

export function SocialLoginButtons({ onSuccess }: { onSuccess?: () => void }) {
  const { setUser } = useApp();

  const handleGoogleLogin = async () => {
    try {
      // Utiliser la bibliothèque @react-oauth/google
      // Installer : npm install @react-oauth/google
      
      // Le token sera obtenu via le composant GoogleLogin
      // Voir la documentation : https://www.npmjs.com/package/@react-oauth/google
      
      console.log('Google login initiated');
      toast.info('Connexion Google en cours...');
    } catch (error) {
      toast.error('Erreur lors de la connexion Google');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // Utiliser react-facebook-login
      // Installer : npm install react-facebook-login
      
      console.log('Facebook login initiated');
      toast.info('Connexion Facebook en cours...');
    } catch (error) {
      toast.error('Erreur lors de la connexion Facebook');
    }
  };

  // ... reste du code
}
```

---

## 🚀 Étape 5 : Déploiement

### 5.1 Variables d'environnement Frontend

**Fichier : `.env`**

```env
VITE_API_URL=https://votre-api.com/api
VITE_GOOGLE_CLIENT_ID=votre_google_client_id
VITE_FACEBOOK_APP_ID=votre_facebook_app_id
```

### 5.2 Déploiement Backend

**Options recommandées :**

- **Heroku** : Facile pour débuter
- **Railway** : Moderne et simple
- **DigitalOcean** : Plus de contrôle
- **AWS EC2** : Production à grande échelle

### 5.3 Déploiement Base de Données

**Options recommandées :**

- **Supabase** : PostgreSQL gratuit avec API
- **Railway** : PostgreSQL inclus
- **AWS RDS** : Production
- **Heroku Postgres** : Facile à configurer

---

## 📝 Checklist d'Intégration

- [ ] Backend API créé et fonctionnel
- [ ] Base de données configurée avec le schéma
- [ ] Authentification JWT implémentée
- [ ] Routes API créées pour toutes les fonctionnalités
- [ ] Frontend connecté à l'API
- [ ] OAuth Google configuré
- [ ] OAuth Facebook configuré
- [ ] Gestion des erreurs implémentée
- [ ] Variables d'environnement configurées
- [ ] Tests effectués
- [ ] Application déployée

---

## 🔒 Sécurité

### Bonnes pratiques :

1. **Hasher les mots de passe** avec bcrypt
2. **Utiliser HTTPS** en production
3. **Valider les entrées** côté serveur
4. **Limiter les tentatives** de connexion (rate limiting)
5. **Protéger contre les injections SQL** (utiliser des requêtes préparées)
6. **Configurer CORS** correctement
7. **Utiliser des tokens JWT** avec expiration
8. **Ne jamais exposer** les secrets dans le code

---

## 📚 Ressources Utiles

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)

---

## 💡 Support

Pour toute question ou problème d'intégration, consultez :
- La documentation officielle des technologies utilisées
- Stack Overflow
- Les issues GitHub des bibliothèques

---

**Dernière mise à jour :** Octobre 2025
