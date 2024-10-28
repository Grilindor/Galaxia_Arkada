import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Interface pour les attributs du modèle Game
interface GameAttributes {
  id: string;
  name: string;
  zipFileName?: string | null; // Optionnel, peut être null
  zipFileSize?: number | null; // Optionnel, peut être null
  developerName?: string | null;
  description?: string | null;
  category: string;
  platform: string;
  gameEngine: string;
  submittedAt: Date;
}

// Interface pour les attributs optionnels lors de la création (id et submittedAt générés automatiquement)
interface GameCreationAttributes extends Optional<GameAttributes, 'id' | 'submittedAt'> {}

// Classe Game qui représente le modèle Sequelize
export class Game extends Model<GameAttributes, GameCreationAttributes> implements GameAttributes {
  public id!: string;
  public name!: string;
  public zipFileName?: string | null;
  public zipFileSize?: number | null;
  public developerName?: string | null;
  public description?: string | null;
  public category!: string;
  public platform!: string;
  public gameEngine!: string;
  public submittedAt!: Date;

  // Les timestamps, si tu les utilises (sinon tu peux les enlever)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Fonction qui initialise le modèle Game avec Sequelize
export const GameModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Game.init(
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      zipFileName: {
        type: dataTypes.STRING, // Nom ou chemin du fichier .zip
        allowNull: true, // Peut être vide si aucun fichier .zip n'est soumis
      },
      zipFileSize: {
        type: dataTypes.INTEGER, // Taille du fichier .zip en octets
        allowNull: true, // Peut être nul si aucun fichier .zip n'est soumis
      },
      developerName: {
        type: dataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: dataTypes.TEXT,
        allowNull: true,
      },
      category: {
        type: dataTypes.STRING,
        allowNull: false, // Catégorie est obligatoire dans le formulaire
      },
      platform: {
        type: dataTypes.STRING,
        allowNull: false, // Plateforme est obligatoire dans le formulaire
      },
      gameEngine: {
        type: dataTypes.STRING, // Moteur de jeu utilisé (Unity, Unreal, etc.)
        allowNull: false, // Obligatoire pour indiquer avec quel moteur le jeu a été développé
      },
      submittedAt: {
        type: dataTypes.DATE,
        allowNull: false,
        defaultValue: dataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "games", // Optionnel, si tu veux définir un nom explicite pour la table
      timestamps: true, // Si tu utilises des timestamps (createdAt, updatedAt)
    }
  );
  return Game;
};
