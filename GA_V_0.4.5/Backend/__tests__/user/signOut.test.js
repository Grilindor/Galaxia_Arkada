const request = require("supertest");
const app = require("../../server");
const { signOut } = require("../../app/controllers/user.signout");
const { v4: uuidv4 } = require("uuid");
import { captchaValidator } from "../../app/middleware/captchaValidator";

jest.mock("../../app/controllers/user.signout", () => ({
  signOut: jest.fn((req, res) =>
    res.status(200).json({ message: "Signed out" })
  ),
}));

jest.mock("../../app/middleware/authJwt", () => {
  const { v4: uuidv4 } = require("uuid");
  return {
    verifyToken: jest.fn((req, res, next) => {
      if (req.headers.authorization === "Bearer test-token") {
        req.userId = uuidv4();
        next();
      } else {
        res.status(401).json({ message: "Invalid token" });
      }
    }),
  };
});

signOut.mockImplementationOnce((req, res) => {
  console.log("userId:", req.userId);
  res.status(200).json({ message: "Signed out" });
});

describe("POST /api/users/auth/signout", () => {
  it("should return 200 for successful signout", async () => {
    const result = await request(app)
      .post("/api/users/auth/signout")
      .set("Authorization", "Bearer test-token")
      .send({ captchaToken: "test-captcha-token" });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("message", "Signed out");
  });
  it("should return 401 if no token is provided", async () => {
    const result = await request(app).post("/api/users/auth/signout");

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message", "Invalid token");
  });

  it("should return 401 for invalid token", async () => {
    const result = await request(app)
      .post("/api/users/auth/signout")
      .set("Authorization", "Bearer invalid-token");

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message", "Invalid token");
  });

  it("should return 500 for server errors", async () => {
    signOut.mockImplementationOnce((req, res) =>
      res.status(500).json({ message: "Server error" })
    );

    const result = await request(app)
      .post("/api/users/auth/signout")
      .set("Authorization", "Bearer test-token");

    expect(result.status).toBe(500);
    expect(result.body).toHaveProperty(
      "message",
      "operator does not exist: uuid = integer"
    );
  });
});
