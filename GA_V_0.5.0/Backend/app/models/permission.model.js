module.exports = (sequelize, Sequelize) => {
  const Permission = sequelize.define('Permission', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Unicité du nom de la permission
    },
  }, {
    tableName: 'permissions', // Spécifie le nom de la table
    timestamps: false, // Désactiver les champs createdAt et updatedAt
  });

  // Définition des associations
  Permission.associate = (models) => {
    // Une permission peut être attribuée à plusieurs rôles (relation many-to-many)
    Permission.belongsToMany(models.Role, {
      through: models.RolePermission, // Table de jointure
      foreignKey: 'permission_id', // Clé étrangère dans la table de jointure
      otherKey: 'role_id', // Autre clé étrangère dans la table de jointure
    });
  };

  return Permission;
};
