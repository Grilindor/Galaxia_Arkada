const db = require("../models");
const User = db.user;

// Middleware pour vérifier si l'utilisateur existe
const checkUserExists = async (req, res, next) => {
  const id = req.params.id;// ici que j'ai changer en dernier et l'erreur est passer de uuid a id
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(404).send({ message: "User Not Found." });
  }
  next();
};

module.exports = {
  checkUserExists,
};
