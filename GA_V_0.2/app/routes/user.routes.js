const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/user.controller");
const checkUserExistsByEmail = require("../middleware/checkUserExistsByEmail");
const { checkUserExists } = require("../middleware/user.middleware");
const signin = require("../controllers/user.signin")

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

  // Voir un utilisateur par UUID
  app.get("/api/users/:uuid", [authJwt.verifyToken, checkUserExists], controller.getUser);

  // Créer un utilisateur
  app.post("/api/users/signup", [checkUserExistsByEmail], controller.createUser);

  // connection d'un utilisateur
  app.post("/api/users/signin", signin.signIn);

  // Mettre à jour un utilisateur par UUID
  app.put("/api/users/:uuid", [authJwt.verifyToken, checkUserExists], controller.updateUser);

  // Supprimer un utilisateur par UUID
  app.delete("/api/users/:uuid", [authJwt.verifyToken, checkUserExists], controller.deleteUser);
};
