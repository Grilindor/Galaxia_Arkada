const express = require("express");
const router = express.Router();
const { createTag, getTagsSubmitGame, deleteTag, addTagToGame } = require("../controllers/tag.controller");

// Route pour créer un nouveau tag
router.post("/", createTag);

// Route pour récupérer tous les tags
router.get("/all", getTagsSubmitGame);

// Route pour supprimer un tag
router.delete("/:tagId", deleteTag);

// Route pour ajouter un tag à un jeu spécifique
router.post("/add-to-game", addTagToGame);

module.exports = router;
