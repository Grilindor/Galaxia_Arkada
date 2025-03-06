const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../../app/models/user.model");

// ✅ Créer une instance Sequelize avec SQLite en mémoire
const sequelize = new Sequelize("sqlite::memory:", { logging: false });

// ✅ Initialiser le modèle User avec DataTypes
const User = UserModel(sequelize, DataTypes);

describe("User Model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // ✅ Synchronise la DB
  });

  afterAll(async () => {
    await sequelize.close(); // ✅ Ferme la connexion après les tests
  });

  test("Créer un utilisateur valide", async () => {
    const user = await User.create({
      firstname: "John",
      lastname: "Doe",
      userpseudo: "johndoe",
      email: "john.doe@example.com",
      password: "securepassword123",
    });
    expect(user).toBeDefined();
    expect(user.firstname).toBe("John");
  });
});
