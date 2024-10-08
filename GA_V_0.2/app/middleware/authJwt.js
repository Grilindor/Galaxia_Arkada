const jwt = require("jsonwebtoken");
const config = require("../config/db.config.js");
const db = require("../models");
const User = db.user;
const Token = db.token;
require('dotenv').config();

// Vérifie le token JWT
verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  // Vérifier si le token existe en base de données
  const storedToken = await Token.findOne({ where: { token } });
  if (!storedToken) {
    return res.status(401).send({ message: "Invalid token!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
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
