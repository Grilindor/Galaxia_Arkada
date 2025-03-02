const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./app/models");
const initData = require("./app/utils/initData"); // Initialisation des tags
const path = require("path");
const fs = require("fs");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "x-access-token",
      "Origin",
      "Content-Type",
      "Accept",
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);

const helmet = require("helmet");
const escapeHtml = (str) =>
  str.replace(
    /[&<>"']/g,
    (match) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[match])
  );

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    xssFilter: true,
    noSniff: true,
    frameguard: { action: "deny" },
  })
);

// Logger HTTP pour le développement
app.use(morgan("dev"));

// Middleware de parsing des requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import des routes
const userRoutes = require("./app/routes/user.routes");
const gameRoutes = require("./app/routes/game.routes");
const tagRoutes = require("./app/routes/tag.routes");

const extractedGamesDir = path.join(__dirname, "../Extracted_Games");

if (!fs.existsSync(extractedGamesDir)) {
  fs.mkdirSync(extractedGamesDir);
}

// Utilisation des routes
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/tags", tagRoutes);
app.use('/Game_Images', express.static('Game_Images'));

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error("Erreur:", err.stack);
  res.status(500).send("Une erreur est survenue !");
});

// Synchronisation de la base de données et initialisation des données
db.sequelize
  .sync({ alter : true })
  .then(async () => {
    console.log("📦 Database synchronized.");

    // Initialisation des tags
    await initData.initializeTags(db.tag);
    console.log("Initialisation des données terminée.");
  })
  .catch((error) => {
    console.error("⚠️ Erreur de synchronisation de la base de données :", error);
  });

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  console.log(`Accédez à http://localhost:${PORT}`);
});

module.exports = app;
