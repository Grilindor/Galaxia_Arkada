const fs = require("fs");
const path = require("path");

module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define("Game", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4, // Utilise UUIDV4 par défaut
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    zipFileName: {
      type: Sequelize.STRING,
      allowNull: true, // Nom ou chemin du fichier .zip
    },
    zipFileSize: {
      type: Sequelize.INTEGER,
      allowNull: true, // Taille du fichier .zip en octets
    },
    developerName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    platform: {
      type: Sequelize.STRING,
      allowNull: false, // Plateforme est obligatoire dans le formulaire
    },
    gameEngine: {
      type: Sequelize.STRING, // Moteur de jeu utilisé (Unity, Unreal, etc.)
      allowNull: false, // Obligatoire pour indiquer avec quel moteur le jeu a été développé
    },
    submittedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  }, {
    hooks: {
      beforeCreate: (game) => {
        if (game.zipFileName) {
          const filePath = path.resolve("uploads", game.zipFileName);
          try {
            const stats = fs.statSync(filePath);
            game.zipFileSize = stats.size; // Affecte la taille du fichier au champ `zipFileSize`
          } catch (error) {
            console.error("Erreur lors de la lecture de la taille du fichier :", error);
            throw new Error("Impossible de lire la taille du fichier .zip.");
          }
        }
      },
    },
  });

  return Game;
};
