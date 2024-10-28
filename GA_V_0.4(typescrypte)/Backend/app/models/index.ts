import { Sequelize, DataTypes } from "sequelize";
import { UserModel } from "./user.model";
import { RoleModel } from "./role.model";
import { TokenModel } from "./token.model";
import { GameModel } from "./Game.model"; // Ton modèle Game importé
import dbConfig from "../config/db.config";

// Créer une instance de Sequelize avec les paramètres de configuration
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect as any, // Type "as any" pour éviter les erreurs de typage de Sequelize
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

// Créer un objet pour stocker les modèles
const db: any = {}; // Utilisation de "any" pour permettre de stocker des modèles dynamiquement

// Ajouter l'instance de Sequelize à l'objet
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialiser les modèles et les ajouter à l'objet db
db.user = UserModel(sequelize, DataTypes);
db.role = RoleModel(sequelize, DataTypes);
db.token = TokenModel(sequelize);
db.game = GameModel(sequelize, DataTypes); // Initialisation de ton modèle Game

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
export default db;
