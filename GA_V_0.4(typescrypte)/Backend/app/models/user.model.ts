import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Interface pour les attributs du modèle User
interface UserAttributes {
  id: string;
  firstname: string;
  lastname: string;
  userpseudo: string;
  email: string;
  password: string;
  role: string;
}

// Interface pour les attributs optionnels (en création)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Classe User qui représente le modèle Sequelize
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public firstname!: string;
  public lastname!: string;
  public userpseudo!: string;
  public email!: string;
  public password!: string;
  public role!: string;

  // Les timestamps, si tu les utilises
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Fonction qui initialise le modèle User avec Sequelize
export const UserModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  User.init(
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true,
      },
      firstname: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      userpseudo: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: dataTypes.STRING,
        defaultValue: "user",
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true, // Si tu as des timestamps
    }
  );
  return User;
};
