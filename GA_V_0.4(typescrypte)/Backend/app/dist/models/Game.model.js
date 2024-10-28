"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = exports.Game = void 0;
const sequelize_1 = require("sequelize");
// Classe Game qui représente le modèle Sequelize
class Game extends sequelize_1.Model {
}
exports.Game = Game;
// Fonction qui initialise le modèle Game avec Sequelize
const GameModel = (sequelize, dataTypes) => {
    Game.init({
        id: {
            type: dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        zipFileName: {
            type: dataTypes.STRING, // Nom ou chemin du fichier .zip
            allowNull: true, // Peut être vide si aucun fichier .zip n'est soumis
        },
        zipFileSize: {
            type: dataTypes.INTEGER, // Taille du fichier .zip en octets
            allowNull: true, // Peut être nul si aucun fichier .zip n'est soumis
        },
        developerName: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: true,
        },
        category: {
            type: dataTypes.STRING,
            allowNull: false, // Catégorie est obligatoire dans le formulaire
        },
        platform: {
            type: dataTypes.STRING,
            allowNull: false, // Plateforme est obligatoire dans le formulaire
        },
        gameEngine: {
            type: dataTypes.STRING, // Moteur de jeu utilisé (Unity, Unreal, etc.)
            allowNull: false, // Obligatoire pour indiquer avec quel moteur le jeu a été développé
        },
        submittedAt: {
            type: dataTypes.DATE,
            allowNull: false,
            defaultValue: dataTypes.NOW,
        },
    }, {
        sequelize,
        tableName: "games", // Optionnel, si tu veux définir un nom explicite pour la table
        timestamps: true, // Si tu utilises des timestamps (createdAt, updatedAt)
    });
    return Game;
};
exports.GameModel = GameModel;
