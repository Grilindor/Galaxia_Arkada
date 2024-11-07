// app/controllers/tag.controller.js
const db = require("../models");
const Tag = db.tag;
const Game = db.Game;

// Créer un nouveau tag
exports.createTag = async (req, res) => {
  const { name } = req.body;
  try {
    const tag = await Tag.create({ name });
    res.status(201).json(tag);
  } catch (error) {
    console.error("Erreur lors de la création du tag :", error);
    res.status(500).json({ message: "Erreur lors de la création du tag." });
  }
};

// Récupérer tous les tags
exports.getTagsSubmitGame = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    console.error("Erreur lors de la récupération des tags :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des tags." });
  }
};

// Supprimer un tag
exports.deleteTag = async (req, res) => {
  const { tagId } = req.params;
  try {
    await Tag.destroy({ where: { id: tagId } });
    res.status(200).json({ message: "Tag supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du tag :", error);
    res.status(500).json({ message: "Erreur lors de la suppression du tag." });
  }
};

// Associer un tag à un jeu
exports.addTagToGame = async (req, res) => {
  const { gameId, tagId } = req.body;
  try {
    const game = await Game.findByPk(gameId);
    const tag = await Tag.findByPk(tagId);
    if (game && tag) {
      await game.addTag(tag);
      res.status(200).json({ message: "Tag ajouté au jeu avec succès." });
    } else {
      res.status(404).json({ message: "Jeu ou tag non trouvé." });
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du tag au jeu :", error);
    res.status(500).json({ message: "Erreur lors de l'ajout du tag au jeu." });
  }
};
