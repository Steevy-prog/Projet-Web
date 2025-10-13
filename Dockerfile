# STAGE 1 : Build de l'application React
FROM node:lts-alpine as build-stage

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier seulement les fichiers de dépendances pour tirer parti du cache Docker
COPY package*.json ./

# Installer les dépendances
# Utilisez 'npm ci' si vous avez un package-lock.json pour une installation plus fiable
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application (crée le dossier 'build')
RUN npm run build
# STAGE 2 : Serveur de production (Nginx)
FROM nginx:stable-alpine as production-stage

# Copier le dossier de build de l'étape précédente vers le répertoire de service par défaut de Nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

# Optionnel : copier une configuration Nginx personnalisée si nécessaire
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Le port 80 est le port par défaut de Nginx
EXPOSE 80
#docker run -d -p 8080:80 --name container name-image:latest
