module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true, // Assure l'unicité du tag
      }
  });

  Tag.associate = (models) => {
      Tag.belongsToMany(models.Game, {
          through: 'GameTags', // Nom de la table intermédiaire
          as: 'games',
          foreignKey: 'tagId',
      });
  };

  return Tag;
};
