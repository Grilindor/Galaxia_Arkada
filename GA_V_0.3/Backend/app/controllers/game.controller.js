const { Game, Tag } = require("../models");
const { Op } = require("sequelize"); // Assurez-vous d'importer Op

const createGame = async (req, res) => {
  const {
    name,
    developerName,
    description,
    category,
    platform,
    gameEngine,
    tags,
  } = req.body;
  const zipFileSize = req.file ? req.file.size : null; // Assurez-vous que zipFileSize est défini ici

  // Ajout de logs pour vérifier les données reçues
  console.log("Soumission du jeu - Données reçues :");
  console.log("Nom du jeu:", name);
  console.log("Nom du développeur:", developerName);
  console.log("Description:", description);
  console.log("Catégorie:", category);
  console.log("Plateforme:", platform);
  console.log("Moteur de jeu:", gameEngine);
  console.log("Tags:", tags);
  console.log("Taille du fichier zip:", zipFileSize);

  try {
    // Crée le jeu sans les tags
    const game = await Game.create({
      name, // Assurez-vous que le champ name est ici
      zipFileSize,
      developerName,
      description,
      category,
      platform,
      gameEngine,
    });

    // Récupère les instances de tags sélectionnés dans la base
    const tagsToAssociate = await Tag.findAll({
      where: { name: { [Op.in]: tags } }, // Utilisation de Op.in pour un tableau
    });

    // Ajout de log pour voir les tags à associer
    console.log("Tags trouvés dans la base de données:", tagsToAssociate);

    // Associe les tags au jeu si des tags ont été trouvés
    if (tagsToAssociate.length) {
      await game.addTags(tagsToAssociate);
      console.log("Tags associés au jeu:", tagsToAssociate);
    } else {
      console.log("Aucun tag trouvé à associer.");
    }

    res.status(201).json({ message: "Jeu créé avec succès", game });
  } catch (error) {
    console.error("Erreur lors de la création du jeu :", error);
    res.status(500).json({
      message: "Erreur lors de la création du jeu",
      error: error.message,
    });
  }
};

module.exports = {
  createGame,
};
