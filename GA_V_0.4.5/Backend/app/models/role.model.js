const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "role",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Utilise UUIDV4 par défaut
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Chaque rôle doit être unique
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true, // Facultatif, description du rôle
      },
    },
    {
      timestamps: true, // Pour gérer automatiquement createdAt et updatedAt
      createdAt: "createdAt", // Nom du champ créé
      updatedAt: "updatedAt", // Nom du champ mis à jour
    }
  );

  return Role;
};
