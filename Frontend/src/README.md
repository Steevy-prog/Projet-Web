# Restaurant Élégance - Application Web de Restauration

Une application web complète de restauration avec système de fidélité, réclamations et événements interactifs.

## 🎨 Design

- **Thème** : Fond très sombre (#0b0b0d) avec accents or ancien (#b88b1f)
- **Style** : Minimaliste avec grands espaces négatifs, coins arrondis doux (2xl)
- **Animations** : Transitions fluides avec Motion (Framer Motion)
- **Accessibilité** : Navigation au clavier, labels ARIA, contrastes suffisants

## 📱 Pages Principales

### Pages Publiques
- **Accueil** : Hero section, carrousel des menus populaires, features
- **Menus** : Liste complète avec recherche et filtres par catégorie
- **Réclamations** : Formulaire de réclamation + storytelling de l'entreprise
- **Connexion** : Authentification avec inscription

### Pages Utilisateur
- **Accueil Utilisateur** : Dashboard personnalisé avec actions rapides
- **Dashboard** : Statistiques (jeux joués, points, commandes, classement)
- **Commander** : Sélection des menus avec ajout au panier
- **Panier** : Récapitulatif des commandes avec validation
- **Jeux & Événements** : Mini-jeux interactifs pour gagner des points
- **Classement** : Leaderboard des meilleurs joueurs
- **Fidélité** : Programme de fidélité avec niveaux et récompenses
- **Réclamation** : Formulaire personnalisé pour utilisateur connecté

## 🛠️ Technologies

- **React** + **TypeScript**
- **Tailwind CSS v4.0**
- **Motion** (Framer Motion) pour les animations
- **Shadcn/ui** pour les composants
- **Lucide React** pour les icônes
- **Sonner** pour les notifications

## 🎯 Fonctionnalités

### Système de Fidélité
- 4 niveaux : Bronze, Argent, Or, Platine
- Accumulation de points via commandes (10 pts/€) et jeux (50-100 pts)
- Catalogue de récompenses échangeables
- Suivi de progression

### Mini-Jeux
- Quiz Culinaire
- Roue de la Fortune
- Carte à Gratter
- Memory Gourmand

### Panier & Commandes
- Ajout/suppression d'articles
- Gestion des quantités
- Calcul automatique du total
- Envoi de commande aux employés

### Réclamations
- Formulaire public et utilisateur
- Types de réclamations (service, qualité, livraison, autre)
- Suivi des réclamations

## 📊 Structure

```
/
├── components/
│   ├── Header.tsx          # Navigation avec menu hamburger
│   ├── Footer.tsx          # Pied de page
│   ├── MenuCard.tsx        # Carte de menu
│   ├── StatCard.tsx        # Carte de statistique
│   ├── GameCard.tsx        # Carte de jeu
│   └── ui/                 # Composants Shadcn
├── pages/
│   ├── Home.tsx            # Page d'accueil publique
│   ├── Menus.tsx           # Liste des menus
│   ├── Reclamations.tsx    # Réclamations publiques
│   ├── Login.tsx           # Connexion/Inscription
│   ├── UserHome.tsx        # Accueil utilisateur
│   ├── Dashboard.tsx       # Statistiques utilisateur
│   ├── UserMenus.tsx       # Commander des menus
│   ├── Cart.tsx            # Panier
│   ├── Games.tsx           # Jeux et événements
│   ├── Leaderboard.tsx     # Classement
│   ├── Loyalty.tsx         # Programme fidélité
│   └── UserReclamation.tsx # Réclamation utilisateur
├── lib/
│   ├── context.tsx         # Contexte global (Auth + Cart)
│   ├── types.ts            # Types TypeScript
│   └── data.ts             # Données de démo
└── styles/
    └── globals.css         # Thème et styles globaux
```

## 🎨 Palette de Couleurs

- **Background** : #0b0b0d (Très sombre)
- **Card** : #151518 (Sombre)
- **Primary** : #b88b1f (Or ancien)
- **Foreground** : #f5f5f5 (Clair)
- **Muted** : #a0a0a0 (Gris)

## ✨ Micro-interactions

- Hover effects sur les cartes
- Animations d'entrée au scroll
- Transitions fluides sur les boutons
- Scale effects sur les clics
- Menu hamburger animé

## 🚀 Utilisation

1. Naviguez dans l'application via le menu hamburger
2. Connectez-vous pour accéder aux fonctionnalités utilisateur
3. Commandez des menus et ajoutez-les au panier
4. Jouez aux mini-jeux pour gagner des points
5. Échangez vos points contre des récompenses
6. Consultez votre classement et vos statistiques

## 📝 Notes

- Les données sont mockées (pas de backend réel)
- Les jeux sont simulés (mode démo)
- Les commandes sont envoyées via toast notification
- Le système de points est fonctionnel côté frontend
