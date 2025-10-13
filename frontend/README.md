# 🍽️ Zeduc Space - Restaurant Management System

Une application web moderne de gestion de restaurant construite avec React, TypeScript, Tailwind CSS et Framer Motion, offrant une expérience utilisateur exceptionnelle avec des animations 3D et des effets visuels avancés.

## ✨ Fonctionnalités

### 🏠 Pages Principales
- **Page d'accueil** - Hero section avec animations 3D et présentation des spécialités
- **Menu interactif** - Catalogue des plats avec recherche et filtres
- **Système d'authentification** - Connexion/inscription sécurisée

### 👤 Espace Utilisateur
- **Dashboard personnalisé** - Statistiques et progression
- **Centre de jeux** - Mini-jeux pour gagner des points de fidélité
- **Système de fidélité** - Points et récompenses
- **Commandes en ligne** - Interface intuitive de commande

### 👨‍💼 Espace Administrateur
- **Dashboard admin** - Vue d'ensemble des performances
- **Gestion du menu** - CRUD des plats et catégories
- **Gestion des utilisateurs** - Administration des comptes
- **Rapports et statistiques** - Analytics détaillées

## 🚀 Technologies Utilisées

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS avec configuration personnalisée
- **Animations**: Framer Motion pour les effets 3D et transitions
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **3D Effects**: Three.js + React Three Fiber

## 🎨 Design Features

- **Animations 3D avancées** avec Framer Motion
- **Effets de parallaxe** sur les cartes interactives
- **Éléments flottants** en arrière-plan
- **Dégradés dynamiques** et effets de glow
- **Interface responsive** adaptée à tous les écrans
- **Thème sombre** avec accents dorés

## 📦 Installation
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
