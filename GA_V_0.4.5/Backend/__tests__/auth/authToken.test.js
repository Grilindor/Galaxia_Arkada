// Tests pour la validation des tokens

const request = require("supertest");
const app = require("../../server");

describe("Token validation tests", () => {
  it("should return 403 if no token is provided for get user profile", async () => {
    const result = await request(app).get("/api/users/Profile");
    expect(result.status).toBe(403);
    expect(result.body).toHaveProperty("message", "No token provided!");
  });

  it("should return 403 if no token is provided for profile update", async () => {
    const result = await request(app)
      .put("/api/users/update")
      .send({ firstname: "Updated", lastname: "User" });
    expect(result.status).toBe(403);
    expect(result.body).toHaveProperty("message", "No token provided!");
  });

  it("should return 403 if no token is provided for user deletion", async () => {
    const result = await request(app).delete("/api/users/delet");
    expect(result.status).toBe(403);
    expect(result.body).toHaveProperty("message", "No token provided!");
  });
});
