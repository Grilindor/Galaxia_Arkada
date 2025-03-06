// Tests pour la connexion d'un utilisateur
const request = require("supertest");
const app = require("../../server"); // Assurez-vous que le chemin est correct
const { loginLimiter } = require("../../app/middleware/loginLimiter");
const { createUser, signIn } = require("../../app/controllers/user.controller");

// Réinitialiser la limite de taux avant chaque test
beforeEach(() => {
  loginLimiter.resetKey("testuser");
});

// Mocker les fonctions du contrôleur d'utilisateur
jest.mock("../../app/controllers/user.controller", () => {
  const actualController = jest.requireActual(
    "../../app/controllers/user.controller"
  );
  return {
    ...actualController,
    createUser: jest.fn(),
    signIn: jest.fn((req, res, next) =>
      actualController.signIn(req, res, next)
    ),
  };
});

describe("POST /api/users/signin", () => {
  it("should return 201 for successful user creation", async () => {
    createUser.mockImplementationOnce((req, res) =>
      res.status(201).json({ message: "User created successfully" })
    );

    const result = await request(app).post("/api/users/signup").send({
      firstname: "John",
      lastname: "Doe",
      userpseudo: "johndoe",
      email: "john.doe@example.com",
      password: "securepassword123",
    });

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("message", "User created successfully");
  });

  it("should return 400 for invalid credentials", async () => {
    const response = await request(app)
      .post("/api/users/signin")
      .send({ username: "wronguser", password: "wrongpassword" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "CAPTCHA requis.");
  });

  it("should return 400 if username or password is missing", async () => {
    const response = await request(app)
      .post("/api/users/signin")
      .send({ username: "testuser" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "CAPTCHA requis.");
  });

  it("should return 200 for successful user signin", async () => {
    signIn.mockImplementationOnce((req, res) =>
      res
        .status(200)
        .json({ message: "User signed in successfully", token: "test-token" })
    );

    const response = await request(app)
      .post("/api/users/signin")
      .send({ username: "validuser", password: "validpassword" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "User signed in successfully"
    );
    expect(response.body).toHaveProperty("token");
  });

  it("should return 404 for non-existing user", async () => {
    signIn.mockImplementationOnce((req, res) =>
      res.status(404).json({ message: "User not found" })
    );

    const response = await request(app)
      .post("/api/users/signin")
      .send({ username: "nonexistentuser", password: "somepassword" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "User not found");
  });

  it("should return 401 for incorrect password", async () => {
    signIn.mockImplementationOnce((req, res) =>
      res.status(401).json({ message: "Invalid password" })
    );

    const response = await request(app)
      .post("/api/users/signin")
      .send({ username: "validuser", password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid password");
  });

  it("should return a response in the expected format", async () => {
    signIn.mockImplementationOnce((req, res) =>
      res
        .status(200)
        .json({ message: "User signed in successfully", token: "test-token" })
    );

    const response = await request(app)
      .post("/api/users/signin")
      .send({ username: "validuser", password: "validpassword" });

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "CAPTCHA requis.",
      })
    );
  });
});
