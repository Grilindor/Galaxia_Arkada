"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_model_1 = require("./user.model");
const role_model_1 = require("./role.model");
const token_model_1 = require("./token.model");
const Game_model_1 = require("./Game.model"); // Ton modèle Game importé
const db_config_1 = __importDefault(require("../config/db.config"));
// Créer une instance de Sequelize avec les paramètres de configuration
const sequelize = new sequelize_1.Sequelize(db_config_1.default.DB, db_config_1.default.USER, db_config_1.default.PASSWORD, {
    host: db_config_1.default.HOST,
    dialect: db_config_1.default.dialect, // Type "as any" pour éviter les erreurs de typage de Sequelize
    pool: {
        max: db_config_1.default.pool.max,
        min: db_config_1.default.pool.min,
        acquire: db_config_1.default.pool.acquire,
        idle: db_config_1.default.pool.idle,
    },
});
// Créer un objet pour stocker les modèles
const db = {}; // Utilisation de "any" pour permettre de stocker des modèles dynamiquement
// Ajouter l'instance de Sequelize à l'objet
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
// Initialiser les modèles et les ajouter à l'objet db
db.user = (0, user_model_1.UserModel)(sequelize, sequelize_1.DataTypes);
db.role = (0, role_model_1.RoleModel)(sequelize, sequelize_1.DataTypes);
db.token = (0, token_model_1.TokenModel)(sequelize);
db.game = (0, Game_model_1.GameModel)(sequelize, sequelize_1.DataTypes); // Initialisation de ton modèle Game
// Définir les relations entre les modèles
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
});
// Relation One-to-One entre User et Token
db.user.hasOne(db.token, { foreignKey: "userId", onDelete: "CASCADE" });
db.token.belongsTo(db.user, { foreignKey: "userId" });
// Ajouter d'autres relations ici (si besoin)
// Exporter l'objet contenant les modèles et l'instance Sequelize
console.log("Sequelize instance in index.js:", db.sequelize);
exports.default = db;
