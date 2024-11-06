const Sequelize = require("sequelize");
const config = require("../config/db.config.js");

// Configuration de la connexion Sequelize
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

// Initialisation de l'objet db
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importation des modèles
db.user = require("./user.model.js")(sequelize, Sequelize.DataTypes);
db.role = require("./role.model.js")(sequelize, Sequelize.DataTypes);
db.token = require("./token.model.js")(sequelize, Sequelize.DataTypes);
db.tag = require("./Tag.model.js")(sequelize, Sequelize.DataTypes);
db.game = require("./game.model.js")(sequelize, Sequelize.DataTypes);

// Définition des relations


// Many-to-Many entre User et Role
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// One-to-One entre User et Token
db.user.hasOne(db.token, { foreignKey: "userId", onDelete: "CASCADE" });
db.token.belongsTo(db.user, { foreignKey: "userId" });

// Many-to-Many entre User et Game
db.user.belongsToMany(db.game, {
  through: "user_games",
  foreignKey: "userId",
  otherKey: "gameId"
});
db.game.belongsToMany(db.user, {
  through: "user_games",
  foreignKey: "gameId",
  otherKey: "userId"
});

// Many-to-Many entre Game et Tag
db.game.belongsToMany(db.tag, {
  through: "game_tags",
  as: "tags",
  foreignKey: "gameId",
});
db.tag.belongsToMany(db.game, {
  through: "game_tags",
  as: "games",
  foreignKey: "tagId",
});


// Définition des rôles disponibles
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
