// game.routes.js
const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const gameController = require("../controllers/game.controller");

// Import des middlewares distincts
const uploadZip = require("../middleware/uploadZipFile");   // Upload des fichiers .zip
const uploadImage = require("../middleware/uploadGameImage"); // Upload des images .png

const db = require('../models');
const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");
const Game = db.game;
const Tag = db.tag;
const extract = require("extract-zip");

const gamesDirectory = path.join(__dirname, "../../Game_Files"); // Dossier où les jeux sont stockés
const extractedGamesDir = path.join(__dirname, "../../Extracted_Games"); // Dossier pour extraction

console.log('Game model:', Game);
console.log('Tag model:', Tag);

// Import d'un seul middleware Multer pour gérer plusieurs fichiers
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = file.mimetype === "image/png" ? "Game_Images/" : "Game_Files/";
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, uniqueName);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "application/zip" || file.mimetype === "application/x-zip-compressed") {
      cb(null, true);
    } else {
      cb(new Error("Seuls les fichiers .zip et .png sont autorisés !"), false);
    }
  }
});

router.post('/submitWithTags',
    [
      authJwt.verifyToken,
      upload.fields([
        { name: "zipFile", maxCount: 1 },
        { name: "gameImage", maxCount: 1 }
      ])
    ],
    gameController.submitGameWithTags
  );

router.get('/all', async (req, res) => {
  try {
      const games = await Game.findAll({
          include: [{ model: Tag, as: 'tags' }]
      });
      res.status(200).json(games);
  } catch (error) {
      console.error('Error fetching games:', error);
      res.status(500).json({ message: 'Error fetching games', error });
  }
});


/*
router.get("/:id/play", async (req, res) => {
  const { id } = req.params;

  try {
    // 🔍 Récupérer les infos du jeu en DB
    const game = await Game.findOne({ where: { id } });

    if (!game) {
      return res.status(404).json({ message: "Jeu non trouvé" });
    }

    // 🔗 Utiliser `game.filePath` au lieu de `id.zip`
    const gamePath = path.join(__dirname, "../../", game.filePath);
    const extractedPath = path.join(extractedGamesDir, id);

    console.log("Requête reçue pour jouer au jeu:", id);
    console.log("Chemin du fichier ZIP :", gamePath);
    console.log("Chemin d'extraction :", extractedPath);

    // Vérifier si le fichier ZIP existe
    if (!fs.existsSync(gamePath)) {
      console.error("Fichier ZIP introuvable :", gamePath);
      return res.status(404).json({ error: "Jeu non trouvé" });
    }

    // Décompression si le jeu n'est pas déjà extrait
    if (!fs.existsSync(extractedPath)) {
      console.log("Extraction en cours...");
      await extract(gamePath, { dir: extractedPath });
    }

    const gameJsonPath = path.join(extractedPath, "Build/game.json");
    if (!fs.existsSync(gameJsonPath)) {
      console.error("game.json introuvable dans le dossier extrait :", gameJsonPath);
      return res.status(404).json({ error: "Fichier du jeu introuvable" });
    }

    // Servir les fichiers du jeu
    return res.json({ url: `/games/${id}/Build/game.json` });

  } catch (error) {
    console.error("Erreur lors du lancement du jeu :", error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
});
*/

router.get("/:id/download", async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`🔍 Recherche du jeu avec l'ID : ${id}`);

    const game = await Game.findOne({ where: { id } });

    if (!game) {
      console.error("❌ Jeu non trouvé en base de données !");
      return res.status(404).json({ message: "Jeu non trouvé" });
    }

    console.log("✅ Jeu trouvé :", game);

    const gamePath = path.join(__dirname, "../../../", game.filePath);
    console.log("🔍 __dirname :", __dirname);
    console.log(`📁 Chemin du fichier : ${gamePath}`);

    if (!fs.existsSync(gamePath)) {
      console.error("❌ Fichier du jeu introuvable :", gamePath);
      return res.status(404).json({ error: "Fichier du jeu introuvable" });
    }

    console.log("📤 Envoi du fichier...");

    res.download(gamePath, `${id}.zip`, (err) => {
      if (err) {
        console.error("❌ Erreur lors du téléchargement :", err);
        res.status(500).json({ error: "Erreur lors du téléchargement" });
      }
    });

  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});



// Récupérer un jeu spécifique par ID
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id, {
      include: [{ model: Tag, as: "tags" }], // Inclure les tags liés au jeu
    });

    if (!game) {
      return res.status(404).json({ message: "Jeu non trouvé" });
    }

    res.json(game);
  } catch (error) {
    console.error("Erreur lors de la récupération du jeu:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


module.exports = router;
