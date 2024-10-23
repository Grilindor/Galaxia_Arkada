import React, { useState } from "react";
import axios from "axios";
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
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const navigate = useNavigate();

  // Gère le changement de fichier pour l'image
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("gameFile", file);
    formData.append("name", name);
    formData.append("developerName", developerName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("platform", platform);
    formData.append("downloadLink", downloadLink);

    try {
      const response = await axios.post("/upload-game", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Game uploaded successfully!");
    } catch (error) {
      console.error("Error uploading game", error);
      alert("Error uploading game");
    }
  };

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          name="description"
          placeholder="Description du jeu"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="text"
          name="developerName"
          placeholder="Nom du développeur"
          value={developerName}
          onChange={(e) => setDeveloperName(e.target.value)}
          required
        />
        <Select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          <option value="action">Action</option>
          <option value="aventure">Aventure</option>
          <option value="puzzle">Puzzle</option>
          {/* Ajoute d'autres catégories ici */}
        </Select>
        <Select
          name="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          required
        >
          <option value="">Sélectionnez une plateforme</option>
          <option value="web">Web</option>
          <option value="pc">PC</option>
          {/* Ajoute d'autres plateformes ici */}
        </Select>
        <Input
          type="url"
          name="downloadLink"
          placeholder="Lien de téléchargement"
          value={downloadLink}
          onChange={(e) => setDownloadLink(e.target.value)}
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
