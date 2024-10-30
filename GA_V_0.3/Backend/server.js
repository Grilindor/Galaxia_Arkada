const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
require("./app/routes/user.routes")(app);
// require("./app/routes/game.routes")(app);

// Middleware pour logger les erreurs
app.use((err, req, res, next) => {
  console.error("Erreur:", err.stack);
  res.status(500).send('Something broke!');
});

// Synchronisation de la base de données et initialisation des tags
db.sequelize.sync({ force: false })
  .then(async () => {
    console.log("Database synchronized.");

    // Initialisation des tags
    const tags = [
      "Action",
      "Adventure",
      "Casual",
      "Co-op",
      "Cyberpunk",
      "Educational",
      "Fantasy",
      "Fighting",
      "Hardcore",
      "Historical",
      "Horror",
      "Kids",
      "Mature",
      "Multi-Player",
      "Mystery",
      "Open-World",
      "Platformer",
      "Post-Apocalyptic",
      "Racing",
      "RPG",
      "Roguelike",
      "Sandbox",
      "Shooter",
      "Single-Player",
      "Simulation",
      "Sports",
      "Stealth",
      "Survival",
      "Puzzle",
      "Western",
      "Zombie",
      "Pixel Art",
      "2D",
      "3D",
      "First-Person",
      "Third-Person",
    ];

    // Trier les tags par ordre alphabétique
    tags.sort();

    for (const tagName of tags) {
      await db.tag.findOrCreate({ where: { name: tagName } }); // Utiliser db.tag
    }
    console.log("Tags initialized.");
  })
  .catch((err) => {
    console.error("Failed to sync database: ", err);
  });

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Server accessible at http://localhost:${PORT}`);
});

module.exports = app;
