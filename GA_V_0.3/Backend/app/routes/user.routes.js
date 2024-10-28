const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/user.controller");
const { checkUserExistsByEmail, checkUserExistsByID } = require("../middleware/checkUserExists");
const signin = require("../controllers/user.signin");
const { signOut } = require('../controllers/user.signout');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Voir tous les utilisateurs avec pagination
  app.get("/api/users", [authJwt.verifyToken, checkUserExistsByEmail], controller.getAllUsers);

  // Voir un utilisateur par son jwt
  app.get("/api/user/Profile", [authJwt.verifyToken], controller.getUserProfile);

  // Créer un utilisateur
  app.post("/api/users/signup", [checkUserExistsByEmail], controller.createUser);

  // connection d'un utilisateur
  app.post("/api/users/signin", signin.signIn);

  // Mettre à jour un utilisateur par ID
  app.put("/api/users/update", [authJwt.verifyToken], (req, res, next) => {
    const idFromToken = req.userId; // récupéré depuis le middleware authJwt.verifyToken
    req.params.id = idFromToken; // Ajoute l'ID dans les paramètres de la requête
    next();
  }, checkUserExistsByID, controller.updateUser); // Appelle le contrôleur


  // Supprimer un utilisateur par UUID
  app.delete("/api/users/delet", [authJwt.verifyToken], (req, res, next) => {
    const idFromToken = req.userId; // récupéré depuis le middleware authJwt.verifyToken
    req.params.id = idFromToken;
    next();
  }, checkUserExistsByID, controller.deleteUser);

  // déconnection d'un utilisateur
  app.post("/api/auth/signout", [authJwt.verifyToken, checkUserExistsByID], signOut);
};
