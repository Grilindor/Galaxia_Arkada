import React, { useState } from "react";

import logo from "../image/logo_1.png";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Input,
  Textarea,
  Select,
  Button,
  Logo,
} from "../styles/GameSubmissionForm_SC";

// Composant de formulaire de soumission de jeu
const GameSubmissionForm = () => {
  // État pour les données du formulaire
  const [gameData, setGameData] = useState({
    title: "",
    description: "",
    category: "",
    platform: "",
    downloadLink: "",
    image: null,
  });

  // Met à jour l'état lorsque l'utilisateur saisit des données
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData({ ...gameData, [name]: value });
  };

  // Gère le changement de fichier pour l'image
  const handleFileChange = (e) => {
    setGameData({ ...gameData, image: e.target.files[0] });
  };

  // Gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(gameData); // Affiche les données dans la console (vous pouvez envoyer ces données à votre backend)
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Logo>
        <img src={logo} alt="Logo" onClick={() => navigate("/home")} />
      </Logo>
      <Title>Soumettre un Jeu</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Nom du jeu"
          value={gameData.title}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Description du jeu"
          rows="4"
          value={gameData.description}
          onChange={handleChange}
          required
        />
        <Select
          name="category"
          value={gameData.category}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          <option value="action">Action</option>
          <option value="aventure">Aventure</option>
          <option value="puzzle">Puzzle</option>
          {/* Ajoutez d'autres catégories ici */}
        </Select>
        <Select
          name="platform"
          value={gameData.platform}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez une plateforme</option>
          <option value="web">Web</option>
          {/* Ajoutez d'autres plateformes ici */}
        </Select>
        <Input
          type="url"
          name="downloadLink"
          placeholder="Lien de téléchargement"
          value={gameData.downloadLink}
          onChange={handleChange}
          required
        />
        <Input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button type="submit">Soumettre</Button>
      </form>
    </Container>
  );
};

export default GameSubmissionForm;
