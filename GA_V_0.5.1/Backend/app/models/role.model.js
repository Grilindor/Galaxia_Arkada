module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Unicité du nom du rôle
      },
    },
    {
      tableName: "roles", // Spécifie le nom de la table (si tu veux un nom personnalisé)
      timestamps: false, // Désactiver les champs createdAt et updatedAt (si non nécessaires)
    }
  );

  // Définition des associations
  Role.associate = (models) => {
    // Un rôle peut avoir plusieurs permissions (relation many-to-many)
    Role.belongsToMany(models.Permission, {
      through: models.RolePermission, // Table de jointure
      foreignKey: "role_id", // Clé étrangère dans la table de jointure
      otherKey: "permission_id", // Autre clé étrangère dans la table de jointure
    });
  };

  return Role;
};
