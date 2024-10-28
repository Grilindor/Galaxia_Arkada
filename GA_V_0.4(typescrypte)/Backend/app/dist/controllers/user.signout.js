"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// user.signout.js
const db = require("../models");
const Token = db.token; // Assurez-vous que c'est le bon modèle
exports.signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenToDelete = req.headers['authorization'].split(" ")[1]; // Extraire le token du header
        const userId = req.userId; // L'utilisateur extrait du token
        // Vérifie si le token existe
        const token = yield Token.findOne({ where: { token: tokenToDelete, userId: userId } });
        if (!token) {
            return res.status(404).send({ message: "Token not found." });
        }
        // Supprime le token
        yield Token.destroy({ where: { id: token.id } });
        return res.status(200).send({ message: "User signed out successfully." });
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
});
