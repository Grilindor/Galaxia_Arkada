const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "Permission",
    {
      id: {
        type: DataTypes.UUID, // Passage à UUID
        defaultValue: DataTypes.UUIDV4, // Génère un UUID automatiquement
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "permissions",
      timestamps: false,
    }
  );

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: models.RolePermission,
      foreignKey: "permission_id",
      otherKey: "role_id",
    });
  };

  return Permission;
};
