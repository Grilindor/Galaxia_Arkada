// controllers/game.controller.js
const db = require('../models'); // Importe `db` pour accéder aux modèles configurés
const Game = db.game; // Accéder aux modèles via `db`
const Tag = db.tag;

const submitGameWithTags = async (req, res) => {
    try {
        // Log pour vérifier les données reçues dans le corps de la requête
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        // 1. Créer le jeu avec les informations reçues
        const gameData = {
            name: req.body.name,
            description: req.body.description,
            developer: req.body.developer,
            filePath: req.file ? req.file.path : null, // vérifier si le fichier est bien reçu
            gameEngine: req.body.gameEngine,
            platform: req.body.platform,
        };

        // Log pour confirmer les données du jeu avant la création
        console.log("Game Data to be created from game.controller:", gameData);

        // Création du jeu
        const game = await Game.create(gameData);
        console.log("Game created from game.controller:", game.dataValues);

        // 2. Gérer les tags
        // Récupérer les tags envoyés sous forme de JSON dans le corps de la requête
        const tagsData = req.body.tags; // MODIF RECENT ICI
        console.log("Tags received from game.controller:", tagsData);

        // Vérifier ou créer chaque tag et les récupérer
        const tags = await Promise.all(tagsData.map(async (tagName) => {
            const [tag, created] = await Tag.findOrCreate({ where: { name: tagName } });
            console.log(`Tag processed from game.controller: ${tagName} (Created: ${created})`);
            return tag;
        }));

        // 3. Associer les tags au jeu
        await game.setTags(tags); // Sequelize gère automatiquement les associations via la table de liaison
        console.log("Tags associated with game:", tags.map(tag => tag.name));

        res.status(201).json({ message: 'Game created successfully with tags from game.controller', game });
    } catch (error) {
        console.error("Error in submitGameWithTags from game.controller:", error);
        res.status(500).json({ message: 'Error creating game with tags from game.controller', error });
    }
};

module.exports = { submitGameWithTags };
