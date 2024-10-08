const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
require('dotenv').config();
const User = db.user;
const Token = db.token;

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    //const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 43200, // 12 heures
    });

    // Sauvegarder le token dans la base de données
    await Token.create({
      token: token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 43200 * 1000), // Expiration dans 12 heures
    });

    res.status(200).send({
      message: "User successfully logged in!",
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
