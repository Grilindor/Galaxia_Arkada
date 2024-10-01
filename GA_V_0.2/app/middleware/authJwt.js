const jwt = require("jsonwebtoken");
const config = require("../config/db.config.js");
const db = require("../models");
const User = db.user;

// Vérifie le token JWT
verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
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
