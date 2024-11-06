// routes/game.route.js
const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const gameController = require("../controllers/game.controller");
const { upload } = require("../middleware/CheckUnity");
const db = require('../models'); // Accéder aux modèles via `db`
const Game = db.game;
const Tag = db.tag;

console.log('Game model:', Game); // Vérifie le modèle Game
console.log('Tag model:', Tag);   // Vérifie le modèle Tag

router.post('/submitWithTags',
  [
    authJwt.verifyToken,
    upload.single("zipFile")
  ],
  gameController.submitGameWithTags
);

module.exports = router;
