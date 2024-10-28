import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Interface pour les attributs du modèle Role
interface RoleAttributes {
  id: number;
  name: string;
}

// Interface pour les attributs optionnels lors de la création (id généré automatiquement)
interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

// Classe Role qui représente le modèle Sequelize
export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;

  // Les timestamps, si tu les utilises (sinon tu peux les enlever)
  public readonly createdAt!: Date; // Si vous avez besoin de la date de création
  public readonly updatedAt!: Date; // Si vous avez besoin de la date de mise à jour
}

// Fonction qui initialise le modèle Role avec Sequelize
export const RoleModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Role.init(
    {
      id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "roles", // Nom de la table
      timestamps: true, // Si vous souhaitez avoir des timestamps (createdAt, updatedAt)
    }
  );
  return Role;
};
