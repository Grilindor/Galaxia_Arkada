// routes/game.route.js
const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const gameController = require("../controllers/game.controller");
const { upload } = require("../middleware/CheckUnity");
const db = require('../models'); // Accéder aux modèles via `db`
const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");
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

router.get('/all', async (req, res) => {
  try {
      const games = await Game.findAll({
          include: [
              {
                  model: Tag,
                  as: 'tags',
              }
          ]
      });
      res.status(200).json(games);
  } catch (error) {
      console.error('Error fetching games:', error);
      res.status(500).json({ message: 'Error fetching games', error });
  }
});

router.post('/play/:id', authJwt.verifyToken, async (req, res) => {
  try {
      const gameId = req.params.id;
      const game = await Game.findByPk(gameId);

      if (!game) {
          return res.status(404).json({ message: "Game not found" });
      }

      const zipPath = path.join(__dirname, "../temp", game.filePath); // Chemin du fichier compressé
      const extractPath = path.join(__dirname, "../temp/extracted", gameId); // Dossier temporaire

      // Créer le dossier d'extraction s'il n'existe pas
      if (!fs.existsSync(extractPath)) {
          fs.mkdirSync(extractPath, { recursive: true });
      }

      // Décompression
      fs.createReadStream(zipPath)
          .pipe(unzipper.Extract({ path: extractPath }))
          .on("close", () => {
              res.status(200).json({ message: "Game ready to play", path: extractPath });
          })
          .on("error", (err) => {
              console.error("Error extracting game:", err);
              res.status(500).json({ message: "Error extracting game", error: err });
          });
  } catch (error) {
      console.error("Error playing game:", error);
      res.status(500).json({ message: "Error playing game", error });
  }
});


module.exports = router;
