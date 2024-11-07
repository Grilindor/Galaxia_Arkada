module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("token", {
    token: {
      type: Sequelize.STRING,
    },
    expiresAt: {
      type: Sequelize.DATE,
    },
    userId: {
      type: Sequelize.UUID, // Changer INTEGER par UUID
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  });

  return Token;
};
