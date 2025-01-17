const { user, role, permission } = require("./models");

// Exemple : Vérifier si un utilisateur a une permission spécifique
async function hasPermission(userId, permissionName) {
  const userWithRolesAndPermissions = await user.findByPk(userId, {
    include: {
      model: role,
      include: {
        model: permission,
        where: { name: permissionName },
      },
    },
  });

  return !!userWithRolesAndPermissions;
}
