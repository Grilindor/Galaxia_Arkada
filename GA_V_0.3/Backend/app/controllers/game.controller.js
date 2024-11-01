const { Game, Tag } = require("../models");

const createGame = async (req, res) => {
  const { name, developerName, category, platform, gameEngine, tags } = req.body;
  console.log("body", req.body);
  try {
    // Crée le jeu sans les tags
    const game = await Game.create({
      zipFileSize,
      developerName,
      description,
      category,
      platform,
      gameEngine,
    });

    console.log(game);

    // Récupère les instances de tags sélectionnés dans la base
    const tagsToAssociate = await Tag.findAll({
      where: { name: tags }, // `tags` est un tableau de noms de tags
    });

    // Associe les tags au jeu
    await game.addTags(tagsToAssociate);

    res.status(201).json({ message: "Jeu créé avec succès", game });
  } catch (error) {
    console.error("Erreur lors de la création du jeu :", error);
    res.status(500).json({ message: "Erreur lors de la création du jeu" });
  }
};

module.exports = {
  createGame,
};
