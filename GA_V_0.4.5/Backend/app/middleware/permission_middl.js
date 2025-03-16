const { user, roles, permission } = require("../models");

async function hasPermission(userId, permissionName) {
  try {
    const userWithRolesAndPermissions = await user.findByPk(userId, {
      include: {
        model: role,
        as: "roles",
        include: {
          model: permission,
          as: "permission",
          where: { name: permissionName },
        },
      },
    });

    return userWithRolesAndPermissions !== null;
  } catch (error) {
    console.error("Erreur lors de la vérification des permissions :", error);
    return false;
  }
}

module.exports = { hasPermission };
