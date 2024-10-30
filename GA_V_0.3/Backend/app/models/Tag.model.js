const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define("Tag", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true, // éviter les doublon
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Tag;
};
