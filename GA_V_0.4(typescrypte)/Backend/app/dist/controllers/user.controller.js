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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const saltRounds = 10;
// Voir tous les utilisateurs avec pagination
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    try {
        const users = yield User.findAndCountAll({
            limit,
            offset,
        });
        res.status(200).json({
            totalUsers: users.count,
            totalPages: Math.ceil(users.count / limit),
            currentPage: page,
            users: users.rows,
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
// Voir un utilisateur par ID
exports.getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Requête reçue pour récupérer le profil de l'utilisateur."); // Log de début
        // Vérifier si l'ID de l'utilisateur est bien extrait du token
        if (!req.userId) {
            console.error("Erreur : Aucun ID utilisateur trouvé dans le token.");
            return res.status(400).send({ message: "Invalid Token." });
        }
        console.log("ID de l'utilisateur extrait du token :", req.userId); // Affichage de l'ID utilisateur
        // Récupérer toutes les informations de l'utilisateur via son ID extrait du token (req.userId)
        const user = yield User.findByPk(req.userId);
        // Vérifier si l'utilisateur a été trouvé dans la base de données
        if (!user) {
            console.error("Erreur : Utilisateur non trouvé dans la base de données avec cet ID :", req.userId);
            return res.status(404).send({ message: "User Not Found." });
        }
        console.log("Utilisateur trouvé :", user); // Afficher les informations utilisateur trouvées
        // Renvoyer toutes les informations de l'utilisateur
        res.status(200).send(user);
        console.log("Informations de l'utilisateur renvoyées avec succès.");
    }
    catch (err) {
        console.error("Erreur lors de la récupération des informations de l'utilisateur :", err.message); // Log de l'erreur
        res.status(500).send({ message: err.message });
    }
});
// Créer un utilisateur avec le rôle
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, userpseudo, email, password, role } = req.body;
    try {
        const user = yield User.create({
            firstname,
            lastname,
            userpseudo,
            email,
            password: yield bcrypt.hash(password, saltRounds), // Hash le mot de passe avant de le stocker
            role: role || "user", // Valeur par défaut "user"
        });
        res.status(201).send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
});
// Mettre à jour un utilisateur par ID (y compris le rôle)
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId || req.params.id;
    const _a = req.body, { password } = _a, updateData = __rest(_a, ["password"]); //exclure le mot de passe temporairement
    try {
        const user = yield User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }
        // Si un mot de passe est fourni, le crypter
        if (password) {
            updateData.password = yield bcrypt.hash(password, saltRounds);
        }
        // Mettre à jour l'utilisateur avec les nouvelles données
        yield user.update(updateData);
        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
// Supprimer un utilisateur par ID depuis jwt
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }
        yield user.destroy();
        res.status(200).send({ message: "User was deleted successfully!" });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
