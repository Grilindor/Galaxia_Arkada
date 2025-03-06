const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./app/models");
const initData = require("./app/utils/initData");
const helmet = require("helmet");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
// Fonction pour échapper les entrées utilisateur
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

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./app/routes/user.routes");
const gameRoutes = require("./app/routes/game.routes");
const tagRoutes = require("./app/routes/tag.routes");

// Middleware pour échapper les entrées utilisateur avant de les traiter
app.use((req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = escapeHtml(req.body[key]);
      }
    }
  }
  next();
});

const extractedGamesDir = path.join(__dirname, "../Extracted_Games");

if (!fs.existsSync(extractedGamesDir)) {
  fs.mkdirSync(extractedGamesDir);
}

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/tags", tagRoutes);
app.use("/Game_Images", express.static("Game_Images"));

// Middleware global pour capturer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Une erreur est survenue !");
});

// Vérification de Sequelize
if (!db.sequelize) {
  throw new Error("Sequelize is not initialized");
}

// 🔒 Ne synchronise pas la DB en production pour éviter de tout effacer
if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "production") {
  db.sequelize
    .sync({ alter: true }) // ⚠️ Désactive `force: true` en prod pour éviter de vider la base !
    .then(async () => {
      await initData.initializeTags(db.tag);
    })
    .catch((error) => {
      console.error("Erreur de synchronisation DB :", error);
    });

  app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
  });
}

app.set("trust proxy", 1);

// Exporte l'application pour les tests
module.exports = app;
