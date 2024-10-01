const db = require("../models");
const Game = db.game;

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    res.status(200).send(games);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).send(game);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
