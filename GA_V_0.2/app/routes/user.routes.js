const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Voir tous les utilisateurs avec pagination
  app.get("/api/users", [authJwt.verifyToken], controller.getAllUsers);

  // Voir un utilisateur par UUID
  app.get("/api/users/:uuid", [authJwt.verifyToken], controller.getUser);

  // Créer un utilisateur
  app.post("/api/users", [checkUserExistsByEmail], controller.createUser);

  // Mettre à jour un utilisateur par UUID
  app.put("/api/users/:uuid", [authJwt.verifyToken], controller.updateUser);

  // Supprimer un utilisateur par UUID
  app.delete("/api/users/:uuid", [authJwt.verifyToken], controller.deleteUser);
};
