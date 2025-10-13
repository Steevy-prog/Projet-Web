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

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build
```

## 🏗️ Structure du Projet

```
src/
├── components/
│   ├── common/          # Composants réutilisables
│   │   ├── AnimatedCard.tsx
│   │   ├── Button.tsx
│   │   ├── FloatingElements.tsx
│   │   ├── ParallaxCard.tsx
│   │   └── ProtectedRoute.tsx
│   └── layout/          # Composants de mise en page
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Layout.tsx
├── pages/
│   ├── main/            # Pages publiques
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── MenuPage.tsx
│   ├── user/            # Pages utilisateur
│   │   ├── UserDashboard.tsx
│   │   └── UserGames.tsx
│   └── admin/           # Pages administrateur
│       └── AdminDashboard.tsx
├── context/             # Contextes React
│   └── AuthContext.tsx
├── types/               # Types TypeScript
│   └── index.ts
└── App.tsx
```

## 🎯 Fonctionnalités Avancées

### Animations 3D
- **Cartes parallaxe** qui réagissent au mouvement de la souris
- **Éléments flottants** animés en continu
- **Transitions fluides** entre les pages
- **Effets de hover** sophistiqués

### Système de Gamification
- **Mini-jeux interactifs** pour engager les utilisateurs
- **Système de points** et récompenses
- **Classements** en temps réel
- **Succès et achievements**

### Interface Moderne
- **Design glassmorphism** avec effets de transparence
- **Micro-interactions** pour améliorer l'UX
- **Feedback visuel** sur toutes les actions
- **Navigation intuitive**

## 🔧 Configuration

### Tailwind CSS
Configuration personnalisée avec :
- Animations personnalisées (float, pulse-slow, etc.)
- Couleurs de marque (primary, secondary)
- Ombres 3D et effets de glow
- Classes utilitaires pour les effets de verre

### Framer Motion
Variants d'animation prédéfinis pour :
- Entrées en scène (fadeIn, slideUp, scaleIn)
- Interactions (hover, tap, drag)
- Transitions de page
- Animations de liste (stagger)

## 📱 Responsive Design

- **Mobile First** - Optimisé pour les appareils mobiles
- **Breakpoints personnalisés** pour tablettes et desktop
- **Navigation adaptative** selon la taille d'écran
- **Images optimisées** avec lazy loading

## 🎨 Personnalisation

Le thème peut être facilement personnalisé via :
- `tailwind.config.js` pour les couleurs et animations
- `src/index.css` pour les styles globaux
- Variables CSS pour les dégradés et effets

## 👨‍💻 Développement

Développé avec ❤️ pour Zeduc Space Restaurant

### Pages Converties
✅ **Pages Principales** (HTML → React + Tailwind)
- Page d'accueil avec animations 3D
- Page de connexion avec effets visuels
- Page menu interactive

✅ **Pages Utilisateur** (HTML → React + Tailwind)
- Dashboard utilisateur avec statistiques
- Centre de jeux avec gamification

✅ **Pages Admin** (HTML → React + Tailwind)
- Dashboard administrateur
- Gestion complète du restaurant

### Améliorations Apportées
- **Animations fluides** avec Framer Motion
- **Effets 3D** et parallaxe
- **Interface moderne** avec Tailwind CSS
- **Navigation dynamique** avec React Router
- **Système d'authentification** intégré
- **Composants réutilisables** et modulaires
