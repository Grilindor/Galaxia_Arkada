const express = require('express');
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/user.controller");
const { checkUserExistsByEmail, checkUserExistsByID } = require("../middleware/checkUserExists");
const signin = require("../controllers/user.signin");
const { signOut } = require('../controllers/user.signout');
const { loginLimiter } = require("../middleware/loginLimiter");
const captchaValidator = require('../middleware/captchaValidator');


// Voir un utilisateur par son jwt
router.get("/Profile", [authJwt.verifyToken], controller.getUserProfile);

// Créer un utilisateur
router.post("/signup", [checkUserExistsByEmail], controller.createUser);

// Connexion d'un utilisateur
router.post("/signin", captchaValidator, loginLimiter, signin.signIn );

// Mettre à jour un utilisateur par ID
router.put("/update", [authJwt.verifyToken], (req, res, next) => {
    const idFromToken = req.userId; // récupéré depuis le middleware authJwt.verifyToken
    req.params.id = idFromToken; // Ajoute l'ID dans les paramètres de la requête
    next();
}, checkUserExistsByID, controller.updateUser); // Appelle le contrôleur

// Supprimer un utilisateur par UUID
router.delete("/delet", [authJwt.verifyToken], (req, res, next) => {
    const idFromToken = req.userId; // récupéré depuis le middleware authJwt.verifyToken
    req.params.id = idFromToken;
    next();
}, checkUserExistsByID, controller.deleteUser);

// Déconnexion d'un utilisateur
router.post("/auth/signout", [authJwt.verifyToken, checkUserExistsByID], signOut);

module.exports = router;
