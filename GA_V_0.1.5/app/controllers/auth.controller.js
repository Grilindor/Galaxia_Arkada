const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || "user"
    });
    res.status(201).send({ message: "User created", user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, "your-secret-key", {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({ accessToken: token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
