module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define("game", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    genre: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT
    }
  });
  return Game;
};
