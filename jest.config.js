module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/Backend/$1", // Redirige @ vers le dossier Backend
  },
  testEnvironment: "jsdom",
  verbose: true,
  transformIgnorePatterns: ["/node_modules/"],
};
