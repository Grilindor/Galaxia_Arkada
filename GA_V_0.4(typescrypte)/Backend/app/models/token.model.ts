import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Interface pour les attributs du modèle Token
interface TokenAttributes {
  id?: number; // Optionnel, si vous avez un ID pour le token
  token: string; // Contenu du token
  expiresAt: Date; // Date d'expiration du token
  userId: string; // UUID de l'utilisateur
}

// Interface pour les attributs optionnels lors de la création (id est généré automatiquement si nécessaire)
interface TokenCreationAttributes extends Optional<TokenAttributes, 'id'> {}

// Classe Token qui représente le modèle Sequelize
export class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
  public id?: number; // ID du token (optionnel)
  public token!: string; // Contenu du token
  public expiresAt!: Date; // Date d'expiration du token
  public userId!: string; // UUID de l'utilisateur

  // Les timestamps, si vous les utilisez (sinon vous pouvez les enlever)
  public readonly createdAt!: Date; // Si vous avez besoin de la date de création
  public readonly updatedAt!: Date; // Si vous avez besoin de la date de mise à jour
}

// Fonction qui initialise le modèle Token avec Sequelize
export const TokenModel = (sequelize: Sequelize) => {
  Token.init(
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false, // Assurez-vous que le token ne soit pas nul
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false, // Assurez-vous que la date d'expiration ne soit pas nulle
      },
      userId: {
        type: DataTypes.UUID, // Utiliser UUID pour la référence à l'utilisateur
        allowNull: false,
        references: {
          model: 'users', // Nom de la table référencée
          key: 'id', // Clé primaire de la table référencée
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      sequelize, // Passer l'instance Sequelize ici
      tableName: 'tokens', // Nom de la table (facultatif, par défaut c'est le nom du modèle en minuscules)
      timestamps: false, // Si vous utilisez les timestamps
    }
  );

  return Token;
};
