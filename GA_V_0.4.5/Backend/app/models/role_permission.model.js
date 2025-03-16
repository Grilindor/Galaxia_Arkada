const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    "RolePermission",
    {
      role_id: {
        type: DataTypes.UUID, // Passage à UUID
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      permission_id: {
        type: DataTypes.UUID, // Passage à UUID
        allowNull: false,
        references: {
          model: "permissions",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "role_permissions",
      timestamps: false,
    }
  );

  return RolePermission;
};
