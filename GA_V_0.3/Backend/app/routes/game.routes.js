const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const { checkUserExistsByID } = require("../middleware/checkUserExists");
const gameController = require("../controllers/game.controller");
const { checkUnityZipFile, upload } = require("../middleware/CheckUnity");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Route pour obtenir tous les jeux, protégée par le token
  //router.get('/api/Game/all', [authJwt.verifyToken], gameController.getAllGames);

  // Route pour soumettre un jeu, protégée et inclut les middlewares pour le fichier .zip
  router.post('/api/Game/submit', [
    authJwt.verifyToken,
  ], gameController.createGame);

  // Route pour obtenir les informations d'un jeu spécifique
  //router.get('/api/Game/:id', gameController.getGame);

  // Route pour mettre à jour un jeu spécifique, protégée par le token
  //router.put('/api/Game/update/:id', [authJwt.verifyToken, checkUserExistsByID], gameController.updateGame);

  // Route pour supprimer un jeu, protégée par le token
  //router.delete('/api/Game/delete/:id', [authJwt.verifyToken, checkUserExistsByID], gameController.deleteGame);

  // Intégrer les routes dans l'application
  app.use(router);
};
