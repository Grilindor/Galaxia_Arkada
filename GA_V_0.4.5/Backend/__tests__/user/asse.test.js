const request = require("supertest");
const app = require("../../server");
const { signOut } = require("../../app/controllers/user.signout");

jest.mock("../../app/controllers/user.signout", () => ({
  signOut: jest.fn((req, res) => {
    console.log("signOut function called");
    res.status(200).json({ message: "Signed out" });
  }),
}));

jest.mock("../../app/middleware/authJwt", () => ({
  verifyToken: jest.fn((req, res, next) => {
    console.log("Received Authorization Header:", req.headers.authorization);
    if (req.headers.authorization === "Bearer test-token") {
      console.log("Token is valid, calling next()");
      next(); // Simule un token valide
    } else {
      console.log("Token is invalid!");
      res.status(401).json({ message: "Invalid token!" });
    }
  }),
}));

describe("POST /api/users/auth/signout", () => {
  it("should return 200 for successful signout", async () => {
    const result = await request(app)
      .post("/api/users/auth/signout")
      .set("Authorization", "Bearer test-token");

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("message", "Signed out");
  });
});
