const db = require("../models");
const User = db.user;

// Middleware pour vérifier si l'utilisateur existe
const checkUserExists = async (req, res, next) => {
  const { uuid } = req.params;
  const user = await User.findOne({ where: { uuid } });
  if (!user) {
    return res.status(404).send({ message: "User Not Found." });
  }
  next();
};

// Middleware pour vérifier si l'utilisateur est admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Require Admin Role!" });
  }
  next();
};

module.exports = {
  checkUserExists,
  isAdmin,
};
