const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const { checkUserExistsByID } = require("../middleware/checkUserExists");
const gameController = require("../controllers/game.controller");
const { checkUnityZipFile, upload } = require("../middleware/CheckUnity");

// Route pour soumettre un jeu, protégée par les middlewares de vérification et de fichier .zip
router.post('/submit',
  [
    authJwt.verifyToken,
    upload.single("file")
  ],
  gameController.submitGame
);

module.exports = router;
