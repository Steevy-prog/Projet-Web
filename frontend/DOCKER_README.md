# 🐳 Guide Docker - Restaurant Web App

## 📋 Prérequis

- Docker installé sur votre machine ([Télécharger Docker](https://www.docker.com/products/docker-desktop))
- Docker Compose (inclus avec Docker Desktop)

## 🚀 Démarrage rapide

### Option 1 : Avec Docker Compose (Recommandé)

```bash
# Build et démarrer l'application
docker-compose up -d

# Accéder à l'application
# Ouvrir http://localhost:3000 dans votre navigateur
```

### Option 2 : Avec Docker uniquement

```bash
# Build de l'image
docker build -t restaurant-web-app .

# Démarrer le conteneur
docker run -d -p 3000:80 --name restaurant-app restaurant-web-app

# Accéder à l'application
# Ouvrir http://localhost:3000 dans votre navigateur
```

## 🛠️ Commandes utiles

### Docker Compose

```bash
# Démarrer l'application
docker-compose up -d

# Arrêter l'application
docker-compose down

# Voir les logs
docker-compose logs -f

# Rebuild après modifications
docker-compose up -d --build

# Supprimer tout (conteneurs, volumes, images)
docker-compose down -v --rmi all
```

### Docker

```bash
# Lister les conteneurs actifs
docker ps

# Arrêter le conteneur
docker stop restaurant-app

# Démarrer le conteneur
docker start restaurant-app

# Supprimer le conteneur
docker rm restaurant-app

# Voir les logs
docker logs -f restaurant-app

# Accéder au shell du conteneur
docker exec -it restaurant-app sh
```

## 📁 Structure Docker

```
Restaurant Web App Design/
├── Dockerfile              # Configuration de l'image Docker
├── docker-compose.yml      # Orchestration des services
├── .dockerignore          # Fichiers exclus du build
├── nginx.conf             # Configuration Nginx pour la production
└── DOCKER_README.md       # Ce fichier
```

## 🏗️ Architecture

Le Dockerfile utilise une **build multi-stage** :

1. **Stage 1 (build)** : 
   - Image Node.js 20 Alpine
   - Installation des dépendances
   - Build de l'application Vite

2. **Stage 2 (production)** :
   - Image Nginx Alpine (légère)
   - Copie des fichiers build
   - Configuration Nginx optimisée

## ⚙️ Configuration

### Changer le port

Modifier le fichier `docker-compose.yml` :

```yaml
ports:
  - "8080:80"  # Changez 3000 par le port souhaité
```

### Variables d'environnement

Ajouter dans `docker-compose.yml` :

```yaml
environment:
  - NODE_ENV=production
  - VITE_API_URL=https://api.example.com
```

## 🔧 Optimisations incluses

- ✅ Build multi-stage pour une image légère (~25 MB)
- ✅ Compression Gzip activée
- ✅ Cache des assets statiques (1 an)
- ✅ Headers de sécurité configurés
- ✅ Support du routing SPA
- ✅ Logs optimisés

## 🐛 Dépannage

### Le conteneur ne démarre pas

```bash
# Vérifier les logs
docker-compose logs

# Vérifier que le port n'est pas déjà utilisé
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Linux/Mac
```

### Erreur de build

```bash
# Nettoyer le cache Docker
docker system prune -a

# Rebuild from scratch
docker-compose build --no-cache
```

### L'application ne se charge pas

1. Vérifier que le conteneur est actif : `docker ps`
2. Vérifier les logs : `docker-compose logs -f`
3. Vérifier l'URL : `http://localhost:3000`

## 📊 Monitoring

```bash
# Voir l'utilisation des ressources
docker stats restaurant-app

# Inspecter le conteneur
docker inspect restaurant-app
```

## 🚀 Déploiement en production

### Sur un serveur distant

```bash
# 1. Copier les fichiers sur le serveur
scp -r . user@server:/path/to/app

# 2. Se connecter au serveur
ssh user@server

# 3. Démarrer l'application
cd /path/to/app
docker-compose up -d
```

### Avec un registry Docker

```bash
# 1. Tag l'image
docker tag restaurant-web-app your-registry.com/restaurant-web-app:latest

# 2. Push vers le registry
docker push your-registry.com/restaurant-web-app:latest

# 3. Pull et démarrer sur le serveur
docker pull your-registry.com/restaurant-web-app:latest
docker run -d -p 80:80 your-registry.com/restaurant-web-app:latest
```

## 📝 Notes

- L'application est accessible sur le port **3000** par défaut
- Nginx écoute sur le port **80** à l'intérieur du conteneur
- Les fichiers de build sont dans `/usr/share/nginx/html`
- La configuration Nginx supporte le routing React Router

## 🆘 Support

Pour plus d'informations :
- [Documentation Docker](https://docs.docker.com/)
- [Documentation Nginx](https://nginx.org/en/docs/)
- [Documentation Vite](https://vitejs.dev/)
