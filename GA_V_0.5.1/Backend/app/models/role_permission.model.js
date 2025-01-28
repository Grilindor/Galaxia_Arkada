module.exports = (sequelize, Sequelize) => {
  const RolePermission = sequelize.define('RolePermission', {
    role_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'roles', // Table de rôles
        key: 'id',
      },
    },
    permission_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'permissions', // Table de permissions
        key: 'id',
      },
    },
  }, {
    tableName: 'role_permissions', // Nom de la table de jointure
    timestamps: false, // Pas de champs createdAt/updatedAt
  });

  return RolePermission;
};
