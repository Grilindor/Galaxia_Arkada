const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const morgan = require("morgan");
const { initializeTags } = require("./app/data_tags/initData"); // initialisation des tags
const app = express();
const PORT = process.env.PORT || 5000;
const tagRoutes = require("./app/routes/tag.routes");

// Middleware de log des requêtes
app.use(morgan("dev"));

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware body-parser (intégré à Express)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
require("./app/routes/user.routes")(app);
require("./app/routes/game.routes")(app);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error("Erreur:", err.stack);
  res.status(err.status || 500).send(err.message || "Something broke!");
});

// Synchronisation de la base de données et initialisation des tags
db.sequelize
  .sync({ force: false })
  .then(async () => {
    console.log("Database synchronized.");
    try {
      await initializeTags(db.tag); // utiliser initializeTags avec db.tag
    } catch (error) {
      console.error("Failed to initialize tags:", error);
    }
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });

app.use(tagRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Server accessible at http://localhost:${PORT}`);
});

module.exports = app;
