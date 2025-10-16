# Système de Messagerie Interne

## Vue d'ensemble

Le système de messagerie interne permet une communication bidirectionnelle entre les utilisateurs (clients) et les employés du restaurant. Il est intégré de manière transparente dans l'application existante sans modifier la structure ou l'esthétique générale.

## Architecture

### Structure des fichiers

```
src/
├── components/
│   └── messaging/
│       ├── ChatList.tsx          # Liste des conversations
│       ├── ChatWindow.tsx        # Fenêtre de discussion principale
│       ├── MessageInput.tsx      # Zone de saisie de message
│       └── MessageBubble.tsx     # Bulle de message individuelle
├── data/
│   └── messages.json             # Données de messagerie (conversations et messages)
├── lib/
│   └── messagingContext.tsx      # Contexte React pour la gestion de l'état
└── pages/
    ├── UserMessaging.tsx         # Page de messagerie pour les utilisateurs
    └── EmployeeMessaging.tsx     # Page de messagerie pour les employés
```

## Composants

### 1. MessageBubble
**Rôle :** Affiche une bulle de message individuelle

**Props :**
- `message` : Objet message contenant l'ID, contenu, expéditeur, timestamp
- `isCurrentUser` : Boolean indiquant si le message est de l'utilisateur courant

**Caractéristiques :**
- Messages alignés à droite pour l'utilisateur courant
- Messages alignés à gauche pour l'interlocuteur
- Avatar de l'expéditeur
- Horodatage formaté
- Animation d'apparition

### 2. MessageInput
**Rôle :** Zone de saisie et d'envoi de messages

**Props :**
- `onSendMessage` : Callback pour envoyer un message
- `disabled` : Désactive la saisie si nécessaire

**Caractéristiques :**
- Textarea redimensionnable
- Envoi avec la touche Entrée
- Nouvelle ligne avec Shift+Entrée
- Bouton d'envoi avec icône
- Validation du contenu avant envoi

### 3. ChatList
**Rôle :** Liste des conversations avec aperçu

**Props :**
- `conversations` : Tableau des conversations
- `selectedConversationId` : ID de la conversation sélectionnée
- `onSelectConversation` : Callback de sélection
- `currentUserId` : ID de l'utilisateur courant
- `userType` : Type d'utilisateur ('user' ou 'employee')

**Caractéristiques :**
- Barre de recherche pour filtrer les conversations
- Aperçu du dernier message
- Badge pour les messages non lus
- Horodatage relatif (Il y a Xh, etc.)
- Responsive (masquable sur mobile)

### 4. ChatWindow
**Rôle :** Fenêtre principale de discussion

**Props :**
- `conversation` : Conversation actuelle
- `messages` : Tableau des messages de la conversation
- `currentUserId` : ID de l'utilisateur courant
- `userType` : Type d'utilisateur
- `onSendMessage` : Callback pour envoyer un message
- `onBack` : Callback pour retourner à la liste (mobile)

**Caractéristiques :**
- En-tête avec informations de l'interlocuteur
- Zone de messages avec défilement automatique
- Intégration de MessageInput
- État vide si aucune conversation sélectionnée
- Bouton retour pour mobile

## Pages

### UserMessaging
Page de messagerie pour les utilisateurs connectés

**Fonctionnalités :**
- Affichage des conversations avec les employés
- **Création de nouvelles conversations** via un bouton "Nouvelle conversation"
- **Sélection d'un employé** dans une liste pour démarrer une conversation
- Envoi et réception de messages
- Marquage automatique des messages comme lus
- Interface responsive (liste/fenêtre séparées sur mobile)
- Message d'information si aucune conversation avec bouton d'action
- Détection automatique des conversations existantes (évite les doublons)

### EmployeeMessaging
Page de messagerie pour les employés (employé, gérant, admin)

**Fonctionnalités :**
- Affichage des conversations avec les clients
- Réponse aux messages des clients
- Marquage automatique des messages comme lus
- Interface responsive
- Même structure que UserMessaging

## Contexte de messagerie

### MessagingContext
Gère l'état global de la messagerie avec persistance dans localStorage

**Fonctions disponibles :**
- `getConversationById(id)` : Récupère une conversation par son ID
- `getMessagesByConversationId(id)` : Récupère tous les messages d'une conversation
- `getConversationsByUserId(id)` : Récupère les conversations d'un utilisateur
- `getConversationsByEmployeeId(id)` : Récupère les conversations d'un employé
- `sendMessage(conversationId, senderId, senderName, senderType, content)` : Envoie un message
- `markConversationAsRead(conversationId, userId)` : Marque une conversation comme lue
- `createConversation(userId, userName, employeeId, employeeName)` : Crée une nouvelle conversation
- `getUnreadCount(userId, userType)` : Obtient le nombre de messages non lus

**Persistance :**
- Clés localStorage : `messaging_conversations` et `messaging_messages`
- Chargement automatique au démarrage
- Sauvegarde automatique à chaque modification

## Données

### Structure d'une conversation
```typescript
{
  id: string;
  userId: string;
  userName: string;
  employeeId: string;
  employeeName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
```

### Structure d'un message
```typescript
{
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'employee';
  content: string;
  timestamp: string;
  read: boolean;
}
```

## Intégration dans l'application

### Headers
Le bouton "Messagerie" a été ajouté dans tous les headers :
- **Header** (utilisateurs) : Avec badge pour messages non lus
- **EmployeeHeader** (employés)
- **GerantHeader** (gérants)
- **AdminHeader** (administrateurs)

### Routes
Nouvelles routes ajoutées dans App.tsx :
- `user-messaging` : Page de messagerie utilisateur
- `employee-messaging` : Page de messagerie employé (partagée par tous les rôles employés)

### Provider
Le `MessagingProvider` enveloppe l'application dans App.tsx :
```tsx
<AppProvider>
  <EmployeeProvider>
    <MessagingProvider>
      <AppContent />
    </MessagingProvider>
  </EmployeeProvider>
</AppProvider>
```

## Caractéristiques techniques

### Responsive Design
- **Desktop** : Liste des conversations et fenêtre de discussion côte à côte
- **Mobile** : Basculement entre liste et fenêtre de discussion
- Bouton retour sur mobile pour revenir à la liste

### Animations
- Apparition en fondu des messages
- Transitions douces lors du changement de conversation
- Animations de hover sur les éléments interactifs
- Respect des contraintes : animations simples uniquement

### Accessibilité
- Labels ARIA appropriés
- Navigation au clavier
- Contraste de couleurs conforme
- Indicateurs visuels clairs

### Performance
- Chargement lazy des messages
- Défilement automatique optimisé
- Mise à jour locale avant persistance
- Pas de rechargement inutile

## Style visuel

Le système de messagerie respecte strictement la charte graphique existante :
- Utilisation des classes Tailwind CSS du projet
- Couleurs primaires et secondaires cohérentes
- Typographie identique
- Bordures arrondies (rounded-2xl, rounded-3xl)
- Ombres et effets de hover standards
- Badges pour les notifications

## Utilisation

### Pour les utilisateurs
1. Cliquer sur "Messagerie" dans le menu
2. Sélectionner une conversation ou en démarrer une nouvelle
3. Taper un message dans la zone de saisie
4. Appuyer sur Entrée ou cliquer sur le bouton d'envoi

### Pour les employés
1. Cliquer sur "Messagerie" dans le menu employé
2. Voir toutes les conversations avec les clients
3. Sélectionner une conversation pour répondre
4. Les messages non lus sont indiqués par un badge

## Évolutions futures possibles

- Notifications push en temps réel
- Pièces jointes (images, fichiers)
- Indicateur "en train d'écrire..."
- Recherche dans les messages
- Archivage des conversations
- Messages vocaux
- Émojis et réactions
- Conversations de groupe
