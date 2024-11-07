const express = require("express");
const db = require("../models"); // Importation de la base de données

// Fonction pour configurer les routes des tags
module.exports = function (app) {
  // Route pour obtenir tous les tags
  app.get("/api/tags", async (req, res) => {
    console.log("Accès à la route des tags"); // Message de log pour le débogage
    try {
      const Tags = await db.tag.findAll({
        attributes: ["id", "name"], // Sélectionner uniquement les colonnes nécessaires
        order: [["name", "ASC"]], // Tri par nom en ordre alphabétique
      });
      res.status(200).json(tags);
    } catch (error) {
      console.error("Erreur lors de la récupération des tags:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des tags" });
    }
  });
};
