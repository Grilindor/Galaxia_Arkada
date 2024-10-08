exports.signOut = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(400).send({ message: "No token provided!" });
    }

    // Supprimer le token de la base de données
    await Token.destroy({ where: { token } });

    res.status(200).send({ message: "User successfully logged out!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
