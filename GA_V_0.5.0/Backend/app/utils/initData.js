async function initializeTags(tagModel) {
  const tags = [
    "Action", "Adventure", "Casual", "Co-op", "Cyberpunk", "Educational",
    "Fantasy", "Fighting", "Hardcore", "Historical", "Horror", "Kids",
    "Mature", "Multi-Player", "Mystery", "Open-World", "Platformer",
    "Post-Apocalyptic", "Racing", "RPG", "Roguelike", "Sandbox",
    "Shooter", "Single-Player", "Simulation", "Sports", "Stealth",
    "Survival", "Puzzle", "Western", "Zombie", "Pixel Art", "2D", "3D",
    "First-Person", "Third-Person",
  ];

  // Trier les tags pour une insertion cohérente
  tags.sort();

  for (const tagName of tags) {
    await tagModel.findOrCreate({ where: { name: tagName } });
  }
  console.log("Tags initialized.");
}

module.exports = { initializeTags };
