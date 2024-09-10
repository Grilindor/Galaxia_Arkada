const express = require('express');
const app = express();

// Middleware pour traiter les données JSON
app.use(express.json());

// Exemple d'API
app.get('/home', (req, res) => {
  res.send('Hello from the backend! ');
});

app.get('/game', (req, res) => {
  res.send('Hello World! marc il va dormir ce .......!');
});

app.get('/login', (req, res) => {
  res.send('login');
});

app.get('/review', (req, res) => {
  res.send('review');
});

app.get('/Library', (req, res) => {
  res.send('Library');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
