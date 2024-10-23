const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const app = express();
const multer = require("multer");
const path = require("path");
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Spécifie l'URL de ton frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
require("./app/routes/user.routes")(app);
// require("./app/routes/game.routes")(app);

// Middleware pour logger les erreurs
app.use((err, req, res, next) => {
  console.error("Erreur:", err.stack); // Log l'erreur dans la console
  res.status(500).send("Something broke!"); // Répond avec un message d'erreur
});

// Synchronisation de la base de données
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Drop and re-sync db.");
    console.log("Database synchronized.");
  })
  .catch((err) => {
    console.error("Failed to sync database: ", err);
  });

// Configuration de multer pour stoker les jeux
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Data.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Route pour uploader un jeu et sauvegarder les informations dans la base de données
app.post("/upload-game", upload.single("gameFile"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    // Enregistrer les informations du jeu dans la base de données
    console.log(
      "Saving game:",
      req.body.name,
      req.file.filename,
      req.body.developerName,
      req.body.description,
      req.body.category,
      req.body.platform
    );
    if (
      !req.body.name ||
      !req.body.developerName ||
      !req.body.description ||
      !req.body.category ||
      !req.body.platform
    ) {
      return res.status(400).send("Missing required fields.");
    }
    const game = await Game.create({
      name: req.body.name || "Untitled Game", // Tu peux passer le nom via un champ de formulaire
      fileName: req.file.filename, // Nom du fichier sauvegardé
      developerName: req.body.developerName || "Anonymous", // Nom du développeur optionnel
      description: req.body.description || "", // Description optionnelle
      category: req.body.category,
      platform: req.body.platform,
      downloadLink: req.body.downloadLink,
    });

    res.status(201).send(`Game uploaded and saved: ${game.name}`);
  } catch (error) {
    console.error("Error saving game to the database", error);
    res.status(500).send("Error saving game to the database");
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Server accessible at http://localhost:${PORT}`);
});

module.exports = app; // used for tests
