const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
require("./app/routes/user.routes")(app);
// require("./app/routes/game.routes")(app);

// Synchronisation de la base de données
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
