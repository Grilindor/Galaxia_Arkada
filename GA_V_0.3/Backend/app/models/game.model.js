// backend/models/Game.js
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      description: {
          type: DataTypes.TEXT,
          allowNull: false,
      },
      developer: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      filePath: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      gameEngine: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      platform: {
          type: DataTypes.STRING,
          allowNull: false,
      }
  });

  Game.associate = (models) => {
      Game.belongsToMany(models.Tag, {
          through: 'GameTags', // Nom de la table intermédiaire
          as: 'tags',
          foreignKey: 'gameId',
      });
  };

  return Game;
};
