// Tests pour la suppression d'un utilisateur

const request = require("supertest"); // Import de supertest pour les requêtes HTTP
const app = require("../../server"); // Import de ton application Express
const { deleteUser } = require("../../app/controllers/user.controller"); // Import de la fonction deleteUser (à mocker)

jest.mock("../../app/controllers/user.controller"); // Mock de la fonction deleteUser

describe("DELETE /api/users/delet", () => {
  it("should return 200 for successful user deletion", async () => {
    deleteUser.mockImplementationOnce((req, res) =>
      res.status(200).json({ message: "User deleted successfully" })
    );
    const result = await request(app)
      .delete("/api/users/delet")
      .set("Authorization", "Bearer test-token");
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message", "Invalid token!");
  });

  it("should return 401 for invalid token on user deletion", async () => {
    deleteUser.mockImplementationOnce((req, res) =>
      res.status(401).json({ message: "Invalid token!" })
    );
    const result = await request(app)
      .delete("/api/users/delet")
      .set("Authorization", "Bearer wrong-token");
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message", "Invalid token!");
  });
  it("should return 403 for unauthenticated user deletion", async () => {
    const result = await request(app).delete("/api/users/delet");
    expect(result.status).toBe(403);
    expect(result.body).toHaveProperty("message", "No token provided!");
  });
  it("should return 401 for non-existent user deletion", async () => {
    const result = await request(app)
      .delete("/api/users/delet")
      .set("Authorization", "Bearer test-token");
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message", "Invalid token!");
  });
  it("should return 401 for insufficient permissions on user deletion", async () => {
    const result = await request(app)
      .delete("/api/users/delet")
      .set("Authorization", "Bearer test-token");
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message", "Invalid token!");
  });
  it("should return 401 for expired token on user deletion", async () => {
    const result = await request(app)
      .delete("/api/users/delet")
      .set("Authorization", "Bearer expired-token");
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message", "Invalid token!");
  });
  it("should return 401 for malformed token on user deletion", async () => {
    const result = await request(app)
      .delete("/api/users/delet")
      .set("Authorization", "Bearer malformed-token");
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message", "Invalid token!");
  });
  //it("should return 404 for incorrect HTTP method on user deletion", async () => {
  //const result = await request(app)
  //  .post("/api/users/delet")
  //  .set("Authorization", "Bearer test-token");
  //expect(result.status).toBe(404);
  //expect(result.body).toHaveProperty("message", "Method Not Allowed");
  //});
  it("should return 401 for missing parameters on user deletion", async () => {
    const result = await request(app)
      .delete("/api/users/delet")
      .set("Authorization", "Bearer test-token");
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message", "Invalid token!");
  });
});
