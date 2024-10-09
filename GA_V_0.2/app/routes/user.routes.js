const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/user.controller");
const checkUserExistsByEmail = require("../middleware/checkUserExistsByEmail");
const { checkUserExists } = require("../middleware/user.middleware");
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
  app.get("/api/users", [authJwt.verifyToken, checkUserExists], controller.getAllUsers);

  // Voir un utilisateur par ID
  app.get("/api/users/:id", [authJwt.verifyToken, checkUserExists], controller.getUser);

  // Créer un utilisateur
  app.post("/api/users/signup", [checkUserExistsByEmail], controller.createUser);

  // connection d'un utilisateur
  app.post("/api/users/signin", signin.signIn);

  // Mettre à jour un utilisateur par ID
  app.put("/api/users/update", [authJwt.verifyToken], (req, res, next) => {
    const idFromToken = req.userId; // récupéré depuis le middleware authJwt.verifyToken
    req.params.id = idFromToken; // Ajoute l'ID dans les paramètres de la requête
    next();
  }, checkUserExists, controller.updateUser); // Appelle le contrôleur


  // Supprimer un utilisateur par UUID
  app.delete("/api/users/delet", [authJwt.verifyToken, checkUserExists], controller.deleteUser);

  // déconnection d'un utilisateur
  app.post("/api/auth/signout", signOut);
};
