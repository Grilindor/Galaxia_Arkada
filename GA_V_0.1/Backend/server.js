const express = require('express');
const app = express();

// Middleware pour traiter les données JSON
app.use(express.json());

// Exemple d'API
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
