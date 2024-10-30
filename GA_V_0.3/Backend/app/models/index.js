const Sequelize = require("sequelize");
const config = require("../config/db.config.js");

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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Charger les modèles
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.token = require("./token.model.js")(sequelize, Sequelize);
db.tag = require("./Tag.model.js")(sequelize, Sequelize);
db.game = require("./game.model.js")(sequelize, Sequelize);

// Relations entre modèles
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

// Relation One-to-One entre User et Token
db.user.hasOne(db.token, { foreignKey: "userId", onDelete: "CASCADE" });
db.token.belongsTo(db.user, { foreignKey: "userId" });

// Relation Many-to-Many entre User et Game
db.user.belongsToMany(db.game, { through: "user_games", foreignKey: "userId" });
db.game.belongsToMany(db.user, { through: "user_games", foreignKey: "gameId" });

// Relation Many-to-Many entre Game et Tag
db.game.belongsToMany(db.tag, { through: "game_tags", foreignKey: "gameId" });
db.tag.belongsToMany(db.game, { through: "game_tags", foreignKey: "tagId" });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
