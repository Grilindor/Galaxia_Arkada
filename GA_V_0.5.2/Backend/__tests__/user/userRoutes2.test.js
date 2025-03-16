// Mock des contrôleurs
jest.mock("../../app/controllers/user.controller", () => {
  const actualController = jest.requireActual(
    "../../app/controllers/user.controller"
  );
  return {
    ...actualController,
    getUserProfile: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    signOut: jest.fn(),
    signIn: jest.fn((req, res, next) =>
      actualController.signIn(req, res, next)
    ),
  };
});

// Mock des middlewares
jest.mock("../../app/middleware/authJwt", () => ({
  verifyToken: jest.fn(),
}));

jest.mock("../../app/middleware/checkUserExists", () => ({
  checkUserExistsByEmail: jest.fn(),
  checkUserExistsByID: jest.fn(),
}));

jest.mock("../../app/middleware/captchaValidator", () =>
  jest.fn((req, res, next) => next())
);

jest.mock("../../app/middleware/loginLimiter", () => ({
  loginLimiter: jest.fn(),
}));

jest.mock("../../app/controllers/user.signout", () => ({
  signOut: jest.fn((req, res) =>
    res.status(200).json({ message: "Signed out" })
  ),
}));

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(() => null),
}));

// Importation des fonctions nécessaires
import {
  getUserProfile,
  createUser,
  updateUser,
  deleteUser,
} from "../../app/controllers/user.controller";
import { signIn } from "../../app/controllers/user.signin";
import { signOut } from "../../app/controllers/user.signout";

import { verifyToken } from "../../app/middleware/authJwt";
import {
  checkUserExistsByEmail,
  checkUserExistsByID,
} from "../../app/middleware/checkUserExists";
import { captchaValidator } from "../../app/middleware/captchaValidator";
import { loginLimiter } from "../../app/middleware/loginLimiter";
import request from "supertest";
import app from "../../server"; // Assurez-vous que le serveur est correctement exporté

const UserModel = require("../../app/models/user.model");

const { Sequelize, DataTypes } = require("sequelize");
// ✅ Créer une instance Sequelize avec SQLite en mémoire
const sequelize = new Sequelize("sqlite::memory:", { logging: false });

// ✅ Initialiser le modèle User avec DataTypes
const User = UserModel(sequelize, DataTypes);
import bcrypt from "bcryptjs";

// Initialisation avant tous les tests
beforeAll(async () => {
  console.log("Sequelize instance:", sequelize);
  if (!sequelize)
    throw new Error("Sequelize is not defined. Check your imports.");

  await sequelize.authenticate();
  await sequelize.sync({ force: true }); // Synchroniser la DB avec la création des tables
  console.log("Suppression des utilisateurs existants...");
  await User.destroy({ where: {} }); // Supprimer tous les utilisateurs existants avant chaque test

  console.log("Création d'un utilisateur test...");
  const hashedPassword = await bcrypt.hash("password123", 10);
  await User.create({
    firstname: "Test",
    lastname: "User",
    userpseudo: "testuser",
    email: "user@example.com",
    password: hashedPassword,
    role: "user",
  });
});

// Réinitialisation des mocks avant chaque test
beforeEach(() => {
  jest.clearAllMocks();
  verifyToken.mockImplementation((req, res, next) => next());
  checkUserExistsByEmail.mockImplementation((req, res, next) => next());
  checkUserExistsByID.mockImplementation((req, res, next) => next());
  loginLimiter.mockImplementation((req, res, next) => next());
});

describe("User Routes", () => {
  // Tests de création d'utilisateur
  describe("POST /api/users/signup", () => {
    it("should return 201 for successful user creation", async () => {
      createUser.mockImplementationOnce((req, res) =>
        res.status(201).json({ message: "User created successfully" })
      );
      const result = await request(app).post("/api/users/signup").send({
        firstname: "New",
        lastname: "User",
        email: "newuser@example.com",
        password: "password123",
        userpseudo: "newuser",
      });
      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty(
        "message",
        "User created successfully"
      );
    });

    it("should return 400 for invalid user creation", async () => {
      createUser.mockImplementationOnce((req, res) =>
        res.status(400).json({ message: "BAD_REQUEST_ERROR" })
      );
      const result = await request(app).post("/api/users/signup").send({
        email: "invalidEmail", // Email invalide
        password: "password123",
      });
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("message", "BAD_REQUEST_ERROR");
    });
  });

  // Tests de récupération de profil utilisateur
  describe("GET /api/users/Profile", () => {
    it("should return 200 for successful get user profile", async () => {
      getUserProfile.mockImplementationOnce((req, res) =>
        res.status(200).json({ firstname: "Test", lastname: "User" })
      );
      const result = await request(app)
        .get("/api/users/Profile")
        .set("Authorization", "Bearer test-token");
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("firstname", "Test");
      expect(result.body).toHaveProperty("lastname", "User");
    });
  });

  // Tests de mise à jour du profil utilisateur
  describe("PUT /api/users/update", () => {
    it("should return 200 for successful user profile update", async () => {
      updateUser.mockImplementationOnce((req, res) =>
        res.status(200).json({ message: "Profile updated successfully" })
      );
      const result = await request(app)
        .put("/api/users/update")
        .set("Authorization", "Bearer test-token")
        .send({ firstname: "Updated", lastname: "User" });
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty(
        "message",
        "Profile updated successfully"
      );
    });
  });

  // Tests de suppression d'utilisateur
  describe("DELETE /api/users/delet", () => {
    it("should return 200 for successful user deletion", async () => {
      deleteUser.mockImplementationOnce((req, res) =>
        res.status(200).json({ message: "User deleted successfully" })
      );
      const result = await request(app)
        .delete("/api/users/delet")
        .set("Authorization", "Bearer test-token");
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty(
        "message",
        "User deleted successfully"
      );
    });

    it("should return 401 for invalid token on user deletion", async () => {
      deleteUser.mockImplementationOnce((req, res) =>
        res.status(401).json({ message: "Invalid token" })
      );
      const result = await request(app)
        .delete("/api/users/delet")
        .set("Authorization", "Bearer wrong-token");
      expect(result.status).toBe(401);
      expect(result.body).toHaveProperty("message", "Invalid token");
    });
  });

  // Test de déconnexion
  describe("POST /api/users/auth/signout", () => {
    it("should return 200 for successful signout", async () => {
      signOut.mockImplementation((req, res) =>
        res.status(200).json({ message: "Signed out" })
      );
      const result = await request(app)
        .post("/api/users/auth/signout")
        .set("Authorization", "Bearer test-token");
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("message", "Signed out");
    });
  });
});
