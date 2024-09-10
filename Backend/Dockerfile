# Utilise une image de base Node.js
FROM node:lts as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Exposer le port sur lequel l'application sera servie
EXPOSE 5000

# Démarrer l'application
CMD ["npm", "start"]
