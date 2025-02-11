const db = require("../models"); // Import des modèles
const Game = db.game;
const Tag = db.tag;
const path = require("path");
const fs = require("fs");

const submitGameWithTags = async (req, res) => {
    let zipFile = null;
    let gameImage = null;

    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        // Vérification et récupération des fichiers
        zipFile = req.files.zipFile ? req.files.zipFile[0].path : null;
        gameImage = req.files.gameImage ? req.files.gameImage[0].path : null;

        // Vérification du format d'image
        if (gameImage && !gameImage.endsWith(".png")) {
            fs.unlinkSync(gameImage); // Supprime l'image si elle n'est pas au format PNG
            return res.status(400).json({ message: "Seuls les fichiers PNG sont autorisés." });
        }

        // Création du jeu avec les données et les fichiers
        const gameData = {
            name: req.body.name,
            description: req.body.description,
            developer: req.body.developer,
            filePath: zipFile, // Fichier .zip
            gameEngine: req.body.gameEngine,
            platform: req.body.platform,
            imagePath: gameImage, // Image .png
        };

        console.log("Game Data:", gameData);

        const game = await Game.create(gameData);
        console.log("Game Created:", game.dataValues);

        // Gestion des tags
        const tagsData = Array.isArray(req.body.tags) ? req.body.tags : [];
        console.log("Tags received:", tagsData);

        const tags = await Promise.all(tagsData.map(async (tagName) => {
            const [tag, created] = await Tag.findOrCreate({ where: { name: tagName } });
            console.log(`Tag processed: ${tagName} (Created: ${created})`);
            return tag;
        }));

        // Associer les tags au jeu
        await game.setTags(tags);
        console.log("Tags associated with game:", tags.map(tag => tag.name));

        res.status(201).json({ message: 'Game created successfully with tags', game });
    } catch (error) {
        console.error("Error in submitGameWithTags:", error);

        // Supprimer les fichiers en cas d'erreur
        if (zipFile) fs.unlinkSync(zipFile);
        if (gameImage) fs.unlinkSync(gameImage);

        res.status(500).json({ message: 'Error creating game with tags', error: error.message });
    }
};

module.exports = { submitGameWithTags };
