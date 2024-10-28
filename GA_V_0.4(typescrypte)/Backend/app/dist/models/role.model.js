"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = exports.Role = void 0;
const sequelize_1 = require("sequelize");
// Classe Role qui représente le modèle Sequelize
class Role extends sequelize_1.Model {
}
exports.Role = Role;
// Fonction qui initialise le modèle Role avec Sequelize
const RoleModel = (sequelize, dataTypes) => {
    Role.init({
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "roles", // Nom de la table
        timestamps: true, // Si vous souhaitez avoir des timestamps (createdAt, updatedAt)
    });
    return Role;
};
exports.RoleModel = RoleModel;
