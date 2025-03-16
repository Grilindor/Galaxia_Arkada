// bases de donnes
const request = require("supertest");
const app = require("../../server");
const db = require("../../app/models");
const initData = require("../../app/utils/initData");

// Mock dependencies
jest.mock("../../app/models");
jest.mock("../../app/utils/initData");
jest.mock("../../app/models", () => ({
  sequelize: {
    sync: jest.fn(),
  },
}));

jest.mock("../../app/utils/initData", () => ({
  initializeTags: jest.fn(),
}));
describe("Express App Configuration", () => {
  // Test CORS configuration
  test("should allow CORS from localhost:3000", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Origin", "http://localhost:3000");

    expect(response.headers["access-control-allow-origin"]).toBe(
      "http://localhost:3000"
    );
  });

  // Test error handling middleware
  test("should handle errors with 500 status code", async () => {
    // Create a route that throws an error
    app.get("/test-error", (req, res, next) => {
      throw new Error("Test error");
    });

    const response = await request(app).get("/test-error");

    expect(response.status).toBe(500);
    expect(response.text).toBe("Une erreur est survenue !");
  });

  // Test API routes existence
  test("should have user routes configured", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).not.toBe(404);
  });

  test("should have game routes configured", async () => {
    const response = await request(app).get("/api/games");
    expect(response.status).not.toBe(404);
  });

  test("should have tag routes configured", async () => {
    const response = await request(app).get("/api/tags");
    expect(response.status).not.toBe(404);
  });

  // Test database initialization
  test("should initialize database and tags", async () => {
    // Mock the sequelize sync method
    db.sequelize.sync.mockResolvedValue();

    // Mock the initializeTags method
    initData.initializeTags.mockResolvedValue();

    // Trigger the database initialization
    await db.sequelize.sync({ force: false });

    // Ensure sequelize.sync was called with the correct parameters
    expect(db.sequelize.sync).toHaveBeenCalledWith({ force: false });

    // Ensure initializeTags was called with db.tag
    expect(initData.initializeTags).toHaveBeenCalledWith(db.tag);
  });
});
