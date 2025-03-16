// Tests pour la création d'un utilisateur
const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../../app/models/user.model");

// ✅ Créer une instance Sequelize avec SQLite en mémoire
const sequelize = new Sequelize("sqlite::memory:", { logging: false });

// ✅ Initialiser le modèle User avec DataTypes
const User = UserModel(sequelize, DataTypes);

describe("User Model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Synchronise la DB
  });

  afterAll(async () => {
    await sequelize.close(); // Ferme la connexion après les tests
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

  test("Échec de création sans prénom", async () => {
    try {
      await User.create({
        lastname: "Doe",
        userpseudo: "johndoe",
        email: "john.doe@example.com",
        password: "securepassword123",
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain("notNull Violation");
    }
  });

  test("Échec de création sans email", async () => {
    try {
      await User.create({
        firstname: "John",
        lastname: "Doe",
        userpseudo: "johndoe",
        password: "securepassword123",
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain("notNull Violation");
    }
  });

  test("Échec de création avec email invalide", async () => {
    try {
      await User.create({
        firstname: "John",
        lastname: "Doe",
        userpseudo: "johndoe",
        email: "invalid-email",
        password: "securepassword123",
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain("Validation error");
    }
  });

  test("Création d'un utilisateur avec un pseudo unique", async () => {
    const user1 = await User.create({
      firstname: "Jane",
      lastname: "Smith",
      userpseudo: "janesmith",
      email: "jane.smith@example.com",
      password: "securepassword123",
    });
    expect(user1).toBeDefined();

    try {
      const user2 = await User.create({
        firstname: "Alice",
        lastname: "Brown",
        userpseudo: "janesmith",
        email: "alice.brown@example.com",
        password: "anotherpassword456",
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain("Validation error");
    }
  });

  test("Échec de création avec mot de passe trop court", async () => {
    try {
      await User.create({
        firstname: "Tom",
        lastname: "Lee",
        userpseudo: "tomlee",
        email: "tom.lee@example.com",
        password: "short",
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain("Validation len on password failed");
    }
  });
});
