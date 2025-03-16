const Sequelize = require("sequelize");
const config = require("../config/db.config.js");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize.DataTypes);
db.Role = require("./role.model.js")(sequelize, Sequelize.DataTypes);
db.token = require("./token.model.js")(sequelize, Sequelize.DataTypes);
db.tag = require("./Tag.model.js")(sequelize, Sequelize.DataTypes);
db.game = require("./game.model.js")(sequelize, Sequelize.DataTypes);
db.Permission = require("./permission.model.js")(
  sequelize,
  Sequelize.DataTypes
);
db.RolePermission = require("./role_permission.model.js")(
  sequelize,
  Sequelize.DataTypes
);

// Association entre User et Token (relation un-à-un)
db.user.hasOne(db.token, { foreignKey: "userId", onDelete: "CASCADE" });
db.token.belongsTo(db.user, { foreignKey: "userId" });

// Association entre User et Game (relation plusieurs-à-plusieurs)
db.user.belongsToMany(db.game, {
  through: "user_games",
  foreignKey: "userId",
  otherKey: "gameId",
});
db.game.belongsToMany(db.user, {
  through: "user_games",
  foreignKey: "gameId",
  otherKey: "userId",
});

// Association entre Game et Tag (relation plusieurs-à-plusieurs)
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

// Association entre User et Role (relation plusieurs-à-plusieurs)

// Association entre Role et Permission (relation plusieurs-à-plusieurs)
db.Role.belongsToMany(db.Permission, {
  through: db.RolePermission,
  foreignKey: "roleId",
  otherKey: "permissionId",
  as: "permissions",
});
db.Permission.belongsToMany(db.Role, {
  through: db.RolePermission,
  foreignKey: "permissionId",
  otherKey: "roleId",
  as: "roles",
});

// Liste des rôles disponibles (stockée séparément pour éviter d'écraser db.Role)
db.ROLES = ["user", "admin", "developer"];

// Liste des permissions disponibles
db.PERMISSIONS = ["create_game", "delete_game", "manage_users"];

module.exports = db;
