// Tests pour la mise à jour d'un utilisateur
import request from "supertest";
import app from "../../server";
import { updateUser } from "../../app/controllers/user.controller";
import { verifyToken } from "../../app/middleware/authJwt";

jest.mock("../../app/controllers/user.controller", () => ({
  updateUser: jest.fn(),
  getUserProfile: jest.fn(),
}));

jest.mock("../../app/middleware/authJwt", () => ({
  verifyToken: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  verifyToken.mockImplementation((req, res, next) => next());
});
beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true }); // Réinitialise la DB avant les tests

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

  it("should return 400 for invalid user update request", async () => {
    updateUser.mockImplementationOnce((req, res) =>
      res.status(400).json({ message: "BAD_REQUEST_ERROR" })
    );

    const result = await request(app)
      .put("/api/users/update")
      .set("Authorization", "Bearer test-token")
      .send({ firstname: "" });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message", "BAD_REQUEST_ERROR");
  });
});
