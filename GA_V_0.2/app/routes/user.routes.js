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

  // Voir un utilisateur par ID
  app.get("/api/users/:id", [authJwt.verifyToken], controller.getUserById);

  // Créer un nouvel utilisateur
  app.post("/api/users", [authJwt.verifyToken], controller.createUser);

  // Mettre à jour un utilisateur
  app.put("/api/users/:id", [authJwt.verifyToken], controller.updateUser);

  // Supprimer un utilisateur
  app.delete("/api/users/:id", [authJwt.verifyToken], controller.deleteUser);
};
