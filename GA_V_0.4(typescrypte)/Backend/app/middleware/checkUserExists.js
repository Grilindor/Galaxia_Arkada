const db = require("../models");
const User = db.user;

// Middleware pour vérifier si l'email de l'utilisateur existe déjà
const checkUserExistsByEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).send({ message: "Email is already in use!" });
  }
  next();
};

const checkUserExistsByID = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }
    req.user = user; // Attache l'utilisateur à la requête
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { checkUserExistsByEmail, checkUserExistsByID };
