# Utilise une image de base Node.js pour construire l'application
FROM node:lts as build


# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code et construire l'application
COPY . .
RUN npm run build

# Utiliser une image de serveur léger pour servir les fichiers statiques
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 5000 pour le serveur web
EXPOSE 3000

# Démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
