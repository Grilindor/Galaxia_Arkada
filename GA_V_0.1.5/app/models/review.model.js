module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("review", {
    rating: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    comment: {
      type: Sequelize.TEXT
    }
  });
  return Review;
};
