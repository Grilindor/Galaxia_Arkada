// user.signout.js
const db = require("../models");
const Token = db.token; // Assurez-vous que c'est le bon modèle

exports.signOut = async (req, res) => {
  try {
    const tokenToDelete = req.headers['authorization'].split(" ")[1]; // Extraire le token du header
    const userId = req.userId; // L'utilisateur extrait du token

    // Vérifie si le token existe
    const token = await Token.findOne({ where: { token: tokenToDelete, userId: userId } });
    if (!token) {
      return res.status(404).send({ message: "Token not found." });
    }

    // Supprime le token
    await Token.destroy({ where: { id: token.id } });

    return res.status(200).send({ message: "User signed out successfully." });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
