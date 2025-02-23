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

        // Vérification et récupération des fichiers
        zipFile = req.files.zipFile ? req.files.zipFile[0] : null;
        gameImage = req.files.gameImage ? req.files.gameImage[0].path : null;

        // Vérification du format d'image
        if (gameImage && !gameImage.endsWith(".png")) {
            fs.unlinkSync(gameImage);
            return res.status(400).json({ message: "Seuls les fichiers PNG sont autorisés." });
        }

        // Création du jeu en base sans le champ extractedPath (ajouté après extraction)
        const gameData = {
            name: req.body.name,
            description: req.body.description,
            developer: req.body.developer,
            filePath: zipFile ? zipFile.path : null,
            gameEngine: req.body.gameEngine,
            platform: req.body.platform,
            imagePath: gameImage,
        };

        console.log("✅ Game Data:", gameData);

        const game = await Game.create(gameData);
        console.log("✅ Game Created:", game.dataValues);

        // 🔄 Début de l'extraction du fichier ZIP
        console.log("🔍 Extraction en cours...");
        const extractedPath = await gameExtractAndSave(zipFile);
        console.log(`✅ Extraction réussie, chemin obtenu : ${extractedPath}`);

        // 🔹 Mise à jour du jeu avec le chemin extrait
        game.extractedPath = extractedPath;
        await game.save();
        console.log("✅ Jeu mis à jour avec le chemin extrait:", game.extractedPath);

        // Gestion des tags
        const tagsData = Array.isArray(req.body.tags) ? req.body.tags : [];
        console.log("🏷️ Tags reçus:", tagsData);

        const tags = await Promise.all(tagsData.map(async (tagName) => {
            const [tag, created] = await Tag.findOrCreate({ where: { name: tagName } });
            console.log(`🏷️ Tag traité: ${tagName} (Nouveau: ${created})`);
            return tag;
        }));

        // Associer les tags au jeu
        await game.setTags(tags);
        console.log("✅ Tags associés au jeu:", tags.map(tag => tag.name));

        res.status(201).json({ message: '🎮 Jeu créé avec succès avec ses tags', game });
    } catch (error) {
        console.error("❌ Erreur dans submitGameWithTags:", error);

        if (zipFile) fs.unlinkSync(zipFile.path);
        if (gameImage) fs.unlinkSync(gameImage);

        res.status(500).json({ message: '❌ Erreur lors de la création du jeu', error: error.message });
    }
};

const gameExtractAndSave = async (zipFile) => {
    try {
        if (!zipFile) throw new Error("⚠️ Aucun fichier .zip fourni.");

        const extractedFolderPath = path.join(__dirname, "../../../Extracted_Games");

        if (!fs.existsSync(extractedFolderPath)) {
            fs.mkdirSync(extractedFolderPath, { recursive: true });
            console.log(`📁 Dossier créé: ${extractedFolderPath}`);
        }

        const originalName = path.basename(zipFile.originalname, ".zip");
        const gameExtractedPath = path.join(extractedFolderPath, originalName);

        if (fs.existsSync(gameExtractedPath)) {
            throw new Error(`⚠️ Un jeu avec le nom \"${originalName}\" existe déjà.`);
        }

        console.log(`📂 Début de l'extraction vers: ${gameExtractedPath}`);

        await new Promise((resolve, reject) => {
            fs.createReadStream(zipFile.path)
                .pipe(unzipper.Extract({ path: gameExtractedPath }))
                .on("close", () => {
                    console.log(`✅ Extraction terminée avec succès: ${gameExtractedPath}`);
                    resolve();
                })
                .on("error", (err) => {
                    console.error("❌ Erreur lors de l'extraction:", err);
                    reject(new Error("Échec de l'extraction du jeu."));
                });
        });

        return `Extracted_Games/${originalName}`;
    } catch (error) {
        console.error("❌ Erreur lors de l'extraction du jeu:", error);
        throw new Error("Échec de l'extraction du jeu.");
    }
};

module.exports = { submitGameWithTags, gameExtractAndSave };
