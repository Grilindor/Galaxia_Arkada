'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Games", "imagePath", {
      type: Sequelize.STRING,
      allowNull: true, // Permet d'uploader une image facultativement
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Games", "imagePath");
  }
};

