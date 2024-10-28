const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/dist/models/index");
const app = express();
const multer = require("multer");
const path = require("path");
const PORT = process.env.PORT || 5000;

console.log("dans server.js", db);
console.log("Sequelize instance in sever.js:", db.sequelize);
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
require("./app/dist/routes/user.routes")(app);
// require("./app/routes/game.routes")(app);

// Middleware pour logger les erreurs
app.use((err, req, res, next) => {
  console.error("Erreur:", err.stack); // Log l'erreur dans la console
  res.status(500).send("Something broke!"); // Répond avec un message d'erreur
});

// Vérifiez la connexion à la base de données
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
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


// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Server accessible at http://localhost:${PORT}`);
});

module.exports = app; // used for tests
