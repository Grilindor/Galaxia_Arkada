"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
// Classe User qui représente le modèle Sequelize
class User extends sequelize_1.Model {
}
exports.User = User;
// Fonction qui initialise le modèle User avec Sequelize
const UserModel = (sequelize, dataTypes) => {
    User.init({
        id: {
            type: dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4,
            primaryKey: true,
        },
        firstname: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        userpseudo: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: dataTypes.STRING,
            defaultValue: "user",
        },
    }, {
        sequelize,
        tableName: "users",
        timestamps: true, // Si tu as des timestamps
    });
    return User;
};
exports.UserModel = UserModel;
