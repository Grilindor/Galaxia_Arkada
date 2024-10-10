const jwt = require("jsonwebtoken");
const config = require("../config/db.config.js");
const db = require("../models");
const User = db.user;
const Token = db.token;
require('dotenv').config();

// Vérifie le token JWT
verifyToken = async (req, res, next) => {
  console.log('Request Headers:', req.headers);
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  // Si le token est dans l'en-tête 'Authorization', il sera sous la forme 'Bearer <token>'
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);  // Retirer 'Bearer ' pour récupérer uniquement le token
  }

  console.log("Received token:", token);

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  // Vérifier si le token existe en base de données
  const storedToken = await Token.findOne({ where: { token } });
  if (!storedToken) {
    console.log("Token not found in DB");
    return res.status(401).send({ message: "Invalid token!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "Unauthorized!" });
    }
    // Attacher l'UUID de l'utilisateur à l'objet req
    req.userId = decoded.id;
    req.token = token; // Sauvegarde aussi le token
    next();
  });
};

// Vérifie si l'utilisateur est un modérateur
isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user && user.role === "moderator") {
      next();
      return;
    }
    res.status(403).send({ message: "Require Moderator Role!" });
  });
};

// Vérifie si l'utilisateur est un administrateur
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user && user.role === "admin") {
      next();
      return;
    }
    res.status(403).send({ message: "Require Admin Role!" });
  });
};

module.exports = {
  verifyToken,
  isModerator,
  isAdmin,
};
