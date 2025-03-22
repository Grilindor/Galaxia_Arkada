// game.routes.js
const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const gameController = require("../controllers/game.controller");

const db = require('../models');
const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");
const Game = db.game;
const Tag = db.tag;
const extract = require("extract-zip");

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

router.delete("/:id", authJwt.verifyToken, async (req, res) => {
  try {
    const gameId = req.params.id;
    await gameController.GameDelete(gameId);
    res.status(200).json({ message: "Jeu supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du jeu", error: error.message });
  }
});

router.get("/api/check-path", (req, res) => {
  const requestedPath = path.join(__dirname, req.query.path);
  if (fs.existsSync(requestedPath)) {
      return res.status(200).send({ exists: true });
  } else {
      return res.status(404).send({ exists: false });
  }
});

router.get("/:id/files", async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`🔍 Recherche des fichiers du jeu avec l'ID : ${id}`);

    const game = await Game.findOne({ where: { id } });
    console.log("🔍 Données du jeu récupérées:", game);

    if (!game) {
      console.error("❌ Jeu non trouvé !");
      return res.status(404).json({ message: "Jeu non trouvé" });
    }

    console.log("✅ Jeu trouvé :", game);

    const extractedPath = path.join(__dirname, "../../../", game.extractedPath);
    console.log("🔍 Chemin d'extraction du jeu:", extractedPath);

    if (!fs.existsSync(extractedPath)) {
      console.error("❌ Dossier du jeu Unity introuvable :", extractedPath);
      return res.status(404).json({ error: "Fichiers du jeu introuvables" });
    }

    const buildPath = path.join(extractedPath, "Build");
    console.log("🔍 Recherche dans le dossier Build :", buildPath);

    const files = fs.readdirSync(buildPath);
    console.log("📂 Fichiers trouvés dans le dossier Build:", files);

    const gameFiles = {
      loader: files.find(f => f.endsWith(".loader.js")),
      data: files.find(f => f.endsWith(".data")),
      framework: files.find(f => f.endsWith(".framework.js")),
      wasm: files.find(f => f.endsWith(".wasm")),
    };

    console.log("🔍 Fichiers Unity récupérés:", gameFiles);

    if (!gameFiles.loader || !gameFiles.data || !gameFiles.framework || !gameFiles.wasm) {
      console.error("❌ Fichiers Unity manquants !");
      return res.status(404).json({ error: "Fichiers Unity introuvables" });
    }

    res.json({
      extractedPath: game.extractedPath,
      files: gameFiles,
    });
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


module.exports = router;
