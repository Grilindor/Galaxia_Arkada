const db = require("../models");
const Game = db.game;
const Tag = db.tag;
const path = require("path");
const fs = require("fs");
const unzipper = require("unzipper");

const submitGameWithTags = async (req, res) => {
    let zipFile = null;
    let gameImage = null;

    try {
        console.log("📥 Request Body:", req.body);
        console.log("📂 Uploaded Files:", req.files);

        zipFile = req.files.zipFile ? req.files.zipFile[0] : null;
        gameImage = req.files.gameImage ? req.files.gameImage[0].path : null;

        if (gameImage && !gameImage.endsWith(".png")) {
            fs.unlinkSync(gameImage);
            return res.status(400).json({ message: "Seuls les fichiers PNG sont autorisés." });
        }

        const extractedPath = zipFile ? `Extracted_Games/${path.basename(zipFile.originalname, ".zip")}` : null;
        console.log("📂 Chemin d'extraction prévu:", extractedPath);

        const gameData = {
            name: req.body.name,
            description: req.body.description,
            developer: req.body.developer,
            filePath: zipFile ? zipFile.path : null,
            gameEngine: req.body.gameEngine,
            platform: req.body.platform,
            imagePath: gameImage,
            extractedPath: extractedPath,
        };

        console.log("✅ Game Data:", gameData);
        const game = await Game.create(gameData);
        console.log("✅ Game Created:", game.dataValues);

        console.log("🔍 Extraction en cours...");
        try {
            const extractedPathFinal = await gameExtractAndSave(zipFile);
            game.extractedPath = extractedPathFinal;
            await game.save();
            console.log("✅ Jeu mis à jour avec le chemin extrait:", game.extractedPath);
        } catch (error) {
            await GameDelete(game.id);
            return res.status(500).json({ message: "❌ Échec de l'extraction du jeu", error: error.message });
        }

        const tagsData = Array.isArray(req.body.tags) ? req.body.tags : [];
        console.log("🎂 Tags reçus:", tagsData);
        const tags = await Promise.all(tagsData.map(async (tagName) => {
            const [tag, created] = await Tag.findOrCreate({ where: { name: tagName } });
            return tag;
        }));

        await game.setTags(tags);
        console.log("✅ Tags associés au jeu:", tags.map(tag => tag.name));
        res.status(201).json({ message: 'Jeu créé avec succès avec ses tags', game });
    } catch (error) {
        console.error("❌ Erreur dans submitGameWithTags:", error);
        if (zipFile) fs.unlinkSync(zipFile.path);
        if (gameImage) fs.unlinkSync(gameImage);
        res.status(500).json({ message: 'Erreur lors de la création du jeu', error: error.message });
    }
};

const gameExtractAndSave = async (zipFile) => {
    try {
        if (!zipFile) throw new Error("Aucun fichier .zip fourni.");

        const extractedFolderPath = path.join(__dirname, "../../../Extracted_Games");
        if (!fs.existsSync(extractedFolderPath)) fs.mkdirSync(extractedFolderPath, { recursive: true });

        const originalName = path.basename(zipFile.originalname, ".zip");
        const gameExtractedPath = path.join(extractedFolderPath, originalName);

        if (fs.existsSync(gameExtractedPath)) throw new Error(`Un jeu avec le nom "${originalName}" existe déjà.`);
        console.log(`📂 Début de l'extraction vers: ${gameExtractedPath}`);

        await new Promise((resolve, reject) => {
            fs.createReadStream(zipFile.path)
                .pipe(unzipper.Extract({ path: gameExtractedPath }))
                .on("close", resolve)
                .on("error", reject);
        });

        return `Extracted_Games/${originalName}`;
    } catch (error) {
        console.error("❌ Erreur lors de l'extraction du jeu:", error);
        throw new Error("Échec de l'extraction du jeu.");
    }
};

const GameDelete = async (gameId) => {
    try {
        const game = await Game.findByPk(gameId);
        if (!game) throw new Error("Jeu introuvable.");

        if (game.filePath && fs.existsSync(game.filePath)) fs.unlinkSync(game.filePath);
        if (game.imagePath && fs.existsSync(game.imagePath)) fs.unlinkSync(game.imagePath);
        if (game.extractedPath && fs.existsSync(path.join(__dirname, "../../../", game.extractedPath))) {
            fs.rmSync(path.join(__dirname, "../../../", game.extractedPath), { recursive: true, force: true });
        }

        await game.destroy();
        console.log("✅ Jeu supprimé avec succès:", gameId);
    } catch (error) {
        console.error("❌ Erreur lors de la suppression du jeu:", error);
    }
};

module.exports = { submitGameWithTags, gameExtractAndSave, GameDelete };
