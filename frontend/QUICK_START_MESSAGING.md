# Guide de démarrage rapide - Messagerie

## ✅ Problème résolu

**Problème initial :** Les utilisateurs ne pouvaient pas envoyer de messages car ils n'avaient aucune conversation existante.

**Solution implémentée :** Ajout d'un bouton "Nouvelle conversation" permettant aux utilisateurs de créer une conversation avec n'importe quel employé.

## 🚀 Comment utiliser la messagerie

### Pour les utilisateurs

1. **Se connecter** à l'application
2. Cliquer sur **"Messagerie"** dans le menu
3. Deux options :
   - **Si vous avez déjà des conversations** : Cliquez sur une conversation pour l'ouvrir
   - **Si vous n'avez pas de conversations** : Cliquez sur "Nouvelle conversation"
4. **Sélectionner un employé** dans la liste (Admin, Gérant, Employé)
5. **Taper votre message** et appuyer sur Entrée ou cliquer sur le bouton d'envoi

### Pour les employés

1. **Se connecter** en tant qu'employé
2. Cliquer sur **"Messagerie"** dans le menu
3. **Voir toutes les conversations** avec les clients
4. **Cliquer sur une conversation** pour répondre
5. Les messages non lus sont indiqués par un badge rouge

## 🔧 Fonctionnalités clés

### Création de conversation
- Bouton "Nouvelle conversation" en haut à droite
- Liste de tous les employés disponibles
- Détection automatique des conversations existantes (pas de doublons)
- Notification de succès après création

### Envoi de messages
- Zone de texte avec validation
- Appuyer sur **Entrée** pour envoyer
- **Shift+Entrée** pour une nouvelle ligne
- Bouton d'envoi avec icône

### Notifications
- Badge rouge sur le bouton "Messagerie" indiquant le nombre de messages non lus
- Marquage automatique comme lu lors de l'ouverture d'une conversation
- Toasts de confirmation pour les actions importantes

## 📱 Interface responsive

### Desktop
- Liste des conversations à gauche (fixe)
- Fenêtre de discussion à droite
- Vue simultanée des deux panneaux

### Mobile
- Basculement entre liste et discussion
- Bouton retour pour revenir à la liste
- Interface optimisée pour les petits écrans

## 💾 Persistance des données

- Toutes les conversations sont sauvegardées dans **localStorage**
- Les messages persistent après rechargement de la page
- Synchronisation automatique entre les onglets

## 🎨 Design

- Respect strict de la charte graphique existante
- Animations fluides et simples
- Bulles de messages alignées (droite pour l'utilisateur, gauche pour l'interlocuteur)
- Avatars avec initiales
- Horodatage relatif ("Il y a 2h", etc.)

## 🔍 Données de test

Le fichier `src/data/messages.json` contient des conversations de démonstration :
- 3 conversations existantes
- 11 messages d'exemple
- Utilisateurs : u1, u2, u3
- Employés : emp1 (Admin), emp2 (Gérant), emp3 (Employé)

**Note :** Les nouveaux utilisateurs qui se connectent auront un ID différent (par exemple "1") et devront créer une nouvelle conversation via le bouton dédié.

## 🐛 Dépannage

### "Je ne vois aucune conversation"
✅ **Solution :** Cliquez sur "Nouvelle conversation" pour créer votre première conversation avec un employé.

### "Le bouton d'envoi est désactivé"
✅ **Solution :** Assurez-vous d'avoir tapé du texte dans la zone de message.

### "Mes messages ne s'affichent pas"
✅ **Solution :** Vérifiez que vous êtes bien connecté et que vous avez sélectionné une conversation.

### "Je ne vois pas le badge de messages non lus"
✅ **Solution :** Le badge n'apparaît que s'il y a des messages non lus. Ouvrez une conversation pour marquer les messages comme lus.

## 📚 Documentation complète

Pour plus de détails techniques, consultez `MESSAGING_SYSTEM.md`
