// controllers/game.controller.js
const db = require('../models'); // Importe `db` pour accéder aux modèles configurés
const Game = db.game; // Accéder aux modèles via `db`
const Tag = db.tag;

const submitGameWithTags = async (req, res) => {
    try {
        // 1. Créer le jeu avec les informations reçues
        const gameData = {
            name: req.body.name,
            description: req.body.description,
            developer: req.body.developer,
            filePath: req.file.path, // chemin du fichier .zip
            gameEngine: req.body.gameEngine,
            platform: req.body.platform,
        };

        // Création du jeu
        const game = await Game.create(gameData);

        // 2. Gérer les tags
        // Récupérer les tags envoyés sous forme de JSON dans le corps de la requête
        const tagsData = JSON.parse(req.body.tags); // Assurez-vous que c'est bien en JSON

        // Vérifier ou créer chaque tag et les récupérer
        const tags = await Promise.all(tagsData.map(async tagName => {
            const [tag, created] = await Tag.findOrCreate({ where: { name: tagName } });
            return tag;
        }));

        // 3. Associer les tags au jeu
        await game.setTags(tags); // Sequelize gère automatiquement les associations via la table de liaison

        res.status(201).json({ message: 'Game created successfully with tags', game });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating game with tags', error });
    }
};

module.exports = { submitGameWithTags };
