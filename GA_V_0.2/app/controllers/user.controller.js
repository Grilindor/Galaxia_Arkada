const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Voir tous les utilisateurs avec pagination
exports.getAllUsers = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const users = await User.findAndCountAll({
      limit,
      offset,
    });
    res.status(200).json({
      totalUsers: users.count,
      totalPages: Math.ceil(users.count / limit),
      currentPage: page,
      users: users.rows,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Voir un utilisateur par UUID
exports.getUser = async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({ where: { uuid } });
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Créer un utilisateur avec le rôle
exports.createUser = async (req, res) => {
  const { firstname, lastname, userpseudo, email, password, role } = req.body;
  try {
    const user = await User.create({
      firstname,
      lastname,
      userpseudo,
      email,
      password: await bcrypt.hash(password, saltRounds), // Hash le mot de passe avant de le stocker
      role: role || "user", // Valeur par défaut "user"
    });
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Mettre à jour un utilisateur par UUID (y compris le rôle)
exports.updateUser = async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({ where: { uuid } });
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }
    await user.update(req.body);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Supprimer un utilisateur par UUID
exports.deleteUser = async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({ where: { uuid } });
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }
    await user.destroy();
    res.status(200).send({ message: "User was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
