const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Voir tous les utilisateurs avec pagination
exports.getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const users = await User.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']], // Optionnel : Tri par date de création
    });

    res.status(200).json({
      totalUsers: users.count,
      totalPages: Math.ceil(users.count / limit),
      currentPage: page,
      users: users.rows,
    });
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err.message);
    res.status(500).send({ message: err.message });
  }
};

// Voir un utilisateur par ID
exports.getUserProfile = async (req, res) => {
  try {
    //console.log("Requête reçue pour récupérer le profil de l'utilisateur.");  Log de début

    // Vérifier si l'ID de l'utilisateur est bien extrait du token
    if (!req.userId) {
      console.error("Erreur : Aucun ID utilisateur trouvé dans le token.");
      return res.status(400).send({ message: "Invalid Token." });
    }

    //console.log("ID de l'utilisateur extrait du token :", req.userId); // Affichage de l'ID utilisateur

    // Récupérer toutes les informations de l'utilisateur via son ID extrait du token (req.userId)
    const user = await User.findByPk(req.userId);

    // Vérifier si l'utilisateur a été trouvé dans la base de données
    if (!user) {
      console.error("Erreur : Utilisateur non trouvé dans la base de données avec cet ID :", req.userId);
      return res.status(404).send({ message: "User Not Found." });
    }

    //console.log("Utilisateur trouvé :", user); // Afficher les informations utilisateur trouvées

    // Renvoyer toutes les informations de l'utilisateur
    res.status(200).send(user);
    console.log("Informations de l'utilisateur renvoyées avec succès.");

  } catch (err) {
    console.error("Erreur lors de la récupération des informations de l'utilisateur :", err.message); // Log de l'erreur
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
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

// Mettre à jour un utilisateur par ID (y compris le rôle)
exports.updateUser = async (req, res) => {
  const id = req.userId || req.params.id;
  const { password, ...updateData } = req.body; //exclure le mot de passe temporairement

  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    // Si un mot de passe est fourni, le crypter
    if (password) {
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    // Mettre à jour l'utilisateur avec les nouvelles données
    await user.update(updateData);
    res.status(200).send(user);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", err.message);
    res.status(500).send({ message: err.message });
  }
};

// Supprimer un utilisateur par ID depuis jwt
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }
    await user.destroy();
    res.status(200).send({ message: "User was deleted successfully!" });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'utilisateur :", err.message);
    res.status(500).send({ message: err.message });
  }
};
