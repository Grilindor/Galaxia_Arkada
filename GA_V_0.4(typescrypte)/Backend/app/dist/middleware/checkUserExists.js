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
const db = require("../models");
const User = db.user;
// Middleware pour vérifier si l'email de l'utilisateur existe déjà
const checkUserExistsByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield User.findOne({ where: { email } });
    if (user) {
        return res.status(400).send({ message: "Email is already in use!" });
    }
    next();
});
const checkUserExistsByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ where: { id: req.userId } });
        if (!user) {
            return res.status(404).send({ message: "User Not Found." });
        }
        req.user = user; // Attache l'utilisateur à la requête
        next();
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
module.exports = { checkUserExistsByEmail, checkUserExistsByID };
