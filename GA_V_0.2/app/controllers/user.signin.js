const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
require('dotenv').config();
const User = db.user;

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    // Comparer le mot de passe avec le mot de passe hashé
    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
    }

    // Générer un token JWT valide pendant 12 heures
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 43200, // 12 heures en secondes
    });

    res.status(200).send({
      message: "User successfully logged in!",
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
