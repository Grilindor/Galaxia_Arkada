const { Game } = require('../models');

exports.submitGame = async (req, res) => {
    try {
        const { name, description, developer, gameEngine, platform } = req.body;
        const tags = JSON.parse(req.body.tags); // Conversion de la chaîne JSON en tableau
        const filePath = req.file.path;

        // Sauvegarde des informations dans la base de données
        const game = await Game.create({
            name,
            description,
            developer,
            filePath,
            gameEngine,
            platform,
            tags
        });

        res.status(201).json({ message: 'Jeu soumis avec succès', game });
    } catch (error) {
        console.error("Erreur lors de la soumission du jeu:", error);
        res.status(500).json({ message: 'Erreur lors de la soumission du jeu' });
    }
};
