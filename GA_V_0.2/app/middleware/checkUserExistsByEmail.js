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

module.exports = checkUserExistsByEmail;
