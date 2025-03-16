const { hasPermission } = require("../middleware/permission_middl");

function checkPermission(permissionName) {
  return async (req, res, next) => {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const allowed = await hasPermission(userId, permissionName);
    if (!allowed) {
      return res.status(403).json({ message: "Accès interdit" });
    }

    next();
  };
}

module.exports = { checkPermission };
