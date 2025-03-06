const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../../app/models/user.model");
const request = require("supertest");
const app = require("../../server");
const authJwt = require("../../app/middleware/authJwt");
const { updateUser } = require("../../app/controllers/user.controller");

jest.mock("../../app/controllers/user.controller", () => {
  const actualController = jest.requireActual(
    "../../app/controllers/user.controller"
  );
  return {
    ...actualController,
    updateUser: jest.fn(
      (req, res, next) => actualController.updateUser(req, res, next) // Call the actual implementation if needed
    ),
  };
});

let sequelize;

beforeAll(async () => {
  sequelize = new Sequelize("g_a_v_4", "admin_antonin", "the_beggar_king", {
    host: "localhost",
    dialect: "postgres",
  });
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("User Model", () => {
  test("Créer un utilisateur valide", async () => {
    const User = UserModel(sequelize, DataTypes); // Ensure UserModel is initialized correctly
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
});
