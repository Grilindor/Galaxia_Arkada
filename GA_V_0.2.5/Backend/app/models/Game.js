const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Game = sequelize.define("Game", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  submittedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  developerName: {
    type: DataTypes.STRING,
    allowNull: true, // Ce champ pourrait être optionnel
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Game;
