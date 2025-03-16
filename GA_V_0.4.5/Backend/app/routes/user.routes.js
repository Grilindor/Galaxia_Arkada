const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/user.controller");
const {
  checkUserExistsByEmail,
  checkUserExistsByID,
} = require("../middleware/checkUserExists");
const { signIn } = require("../controllers/user.signin");
const { signOut } = require("../controllers/user.signout");
const { loginLimiter } = require("../middleware/loginLimiter");
const captchaValidator = require("../middleware/captchaValidator");
const { checkPermission } = require("../middleware/checkPermission");

console.log("captchaValidator:", captchaValidator);
console.log("loginLimiter:", loginLimiter);
console.log("signIn:", signIn);
// Profil de l'utilisateur
router.get("/Profile", [authJwt.verifyToken], controller.getUserProfile);

// Inscription d'un utilisateur
router.post("/signup", [checkUserExistsByEmail], controller.createUser);

// Connexion
router.post("/signin", captchaValidator, loginLimiter, signIn);

// Mise à jour des informations de l'utilisateur
router.put(
  "/update",
  [authJwt.verifyToken],
  (req, res, next) => {
    const idFromToken = req.userId;
    req.params.id = idFromToken;
    next();
  },
  checkUserExistsByID,
  controller.updateUser
);

// Suppression de l'utilisateur
router.delete(
  "/delet",
  [authJwt.verifyToken],
  (req, res, next) => {
    const idFromToken = req.userId;
    req.params.id = idFromToken;
    next();
  },
  checkUserExistsByID,
  controller.deleteUser
);

// Déconnexion
router.post(
  "/auth/signout",
  [authJwt.verifyToken, checkUserExistsByID],
  signOut
);

// Attribution d'un rôle à un utilisateur
/*router.post(
  "/add-role",
  [authJwt.verifyToken, checkPermission("admin")],
  controller.addRoleToUser
);

// Route pour accéder au panneau d'administration
router.get(
  "/admin",
  [authJwt.verifyToken, checkPermission("can_access_admin_panel")],
  (req, res) => {
    res.json({ message: "Bienvenue dans l'administration" });
  }
);

router.get(
  "/user/:userId/roles",
  [authJwt.verifyToken],
  controller.getUserRoles
);
*/
module.exports = router;
