"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = exports.Token = void 0;
const sequelize_1 = require("sequelize");
// Classe Token qui représente le modèle Sequelize
class Token extends sequelize_1.Model {
}
exports.Token = Token;
// Fonction qui initialise le modèle Token avec Sequelize
const TokenModel = (sequelize) => {
    Token.init({
        token: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false, // Assurez-vous que le token ne soit pas nul
        },
        expiresAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false, // Assurez-vous que la date d'expiration ne soit pas nulle
        },
        userId: {
            type: sequelize_1.DataTypes.UUID, // Utiliser UUID pour la référence à l'utilisateur
            allowNull: false,
            references: {
                model: 'users', // Nom de la table référencée
                key: 'id', // Clé primaire de la table référencée
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    }, {
        sequelize, // Passer l'instance Sequelize ici
        tableName: 'tokens', // Nom de la table (facultatif, par défaut c'est le nom du modèle en minuscules)
        timestamps: false, // Si vous utilisez les timestamps
    });
    return Token;
};
exports.TokenModel = TokenModel;
