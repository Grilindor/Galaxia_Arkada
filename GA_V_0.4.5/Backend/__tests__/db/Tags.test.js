// TAG
const { initializeTags } = require("../../app/utils/initData");
const { sequelize } = require("../../app/models/Tag.model");

describe("Tests pour initializeTags", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("devrait insérer tous les tags sans doublons", async () => {
    await initializeTags();

    const tagsInDB = await Tag.findAll();
    const tagNames = tagsInDB.map((tag) => tag.name);

    const expectedTags = [
      "Action",
      "Adventure",
      "Casual",
      "Co-op",
      "Cyberpunk",
      "Educational",
      "Fantasy",
      "Fighting",
      "Hardcore",
      "Historical",
      "Horror",
      "Kids",
      "Mature",
      "Multi-Player",
      "Mystery",
      "Open-World",
      "Platformer",
      "Post-Apocalyptic",
      "Racing",
      "RPG",
      "Roguelike",
      "Sandbox",
      "Shooter",
      "Single-Player",
      "Simulation",
      "Sports",
      "Stealth",
      "Survival",
      "Puzzle",
      "Western",
      "Zombie",
      "Pixel Art",
      "2D",
      "3D",
      "First-Person",
      "Third-Person",
    ];

    expect(tagNames.sort()).toEqual(expectedTags.sort());
  });
});
