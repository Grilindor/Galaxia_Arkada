const request = require("supertest");
const app = require("../server"); // Assure-toi que le chemin vers ton app est correct
const db = require("../app/models"); // Importer tes modèles

describe("User API Tests", () => {
  beforeAll(async () => {
    // Optionnel : nettoyer la base de données avant de commencer les tests
    await db.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Optionnel : fermer la connexion à la base de données après les tests
    await db.sequelize.close();
  });

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        firstname: "John",
        lastname: "Doe",
        userpseudo: "johndoe",
        email: "test@example.com",
        password: "testpassword",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("firstname", "John");
    expect(response.body).toHaveProperty("lastname", "Doe");
    expect(response.body).toHaveProperty("userpseudo", "johndoe");
    expect(response.body).toHaveProperty("email", "test@example.com");
    expect(response.body).toHaveProperty("role", "user");
  });
});
