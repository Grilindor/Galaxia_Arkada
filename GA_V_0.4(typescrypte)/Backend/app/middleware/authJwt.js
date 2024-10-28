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

const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const User = db.user;
const Token = db.token;
require('dotenv').config();

// Vérifie le token JWT
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Request Headers:', req.headers);
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length); // Retirer 'Bearer ' pour récupérer uniquement le token
    }
    console.log("Received token:", token);
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    try {
        const storedToken = yield Token.findOne({ where: { token } });
        if (!storedToken) {
            console.log("Token not found in DB");
            return res.status(401).send({ message: "Invalid token!" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.token = token; // Sauvegarde aussi le token
        next();
    } catch (error) {
        console.log("Error during token verification:", error);
        return res.status(401).send({ message: "Unauthorized!" });
    }
});

// Vérifie si l'utilisateur est un modérateur
const isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user && user.role === "moderator") {
            next();
        } else {
            res.status(403).send({ message: "Require Moderator Role!" });
        }
    }).catch(err => {
        console.error("Error fetching user for moderator check:", err);
        res.status(500).send({ message: "Error retrieving user!" });
    });
};

// Vérifie si l'utilisateur est un administrateur
const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user && user.role === "admin") {
            next();
        } else {
            res.status(403).send({ message: "Require Admin Role!" });
        }
    }).catch(err => {
        console.error("Error fetching user for admin check:", err);
        res.status(500).send({ message: "Error retrieving user!" });
    });
};

module.exports = {
    verifyToken,
    isModerator,
    isAdmin,
};
