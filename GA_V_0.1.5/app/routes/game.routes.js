const { verifyAdminRole } = require("../middleware/authJwt");
const gameController = require("../controllers/game.controller");

module.exports = (app) => {
  app.get("/api/games", async (req, res) => {
    try {
      const games = await gameController.getAllGames();
      res.status(200).json(games);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  app.get("/api/games/:game_id", async (req, res) => {
    try {
      const game = await gameController.getGame(req.params.game_id);
      res.status(200).json(game);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  app.post("/api/games", [verifyAdminRole], async (req, res) => {
    try {
      const newGame = await gameController.createGame(req.body);
      res.status(201).json(newGame);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  app.delete("/api/games/:game_id", [verifyAdminRole], async (req, res) => {
    try {
      await gameController.deleteGame(req.params.game_id);
      res.status(200).send({ message: "Game deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
};
