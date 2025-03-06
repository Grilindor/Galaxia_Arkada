import React, { useState, useEffect } from "react";
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
import axios from "axios";
import TagDropdown from "./FuncTagDropdown";

const GameSubmissionForm = () => {
  const [gameData, setGameData] = useState({
    name: "",
    developer: "",
    description: "",
    platform: "",
    gameEngine: "",
  });
  const [zipFileName, setZipFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  // Récupère les tags depuis le backend au chargement du composant
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tags/all"); // Modifiez l'URL si nécessaire
        setTagOptions(response.data); // On utilise seulement les noms.map(tag => tag.name)
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tags :", error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData({ ...gameData, [name]: value });
  };

  const handleFileChange = (e) => {
    setZipFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Vous devez être connecté pour soumettre un jeu.");
      return;
    }

    const formData = new FormData();
    formData.append("name", gameData.name);
    formData.append("developer", gameData.developer);
    formData.append("description", gameData.description);
    formData.append("platform", gameData.platform);
    formData.append("gameEngine", gameData.gameEngine);
    selectedTags.forEach((tag) => formData.append("tags[]", tag)); // modif recent ici "tags" en "tags[]""
    formData.append("zipFile", zipFileName);
    formData.append("gameImage", imageFile);

    // Log pour vérifier les données envoyées
    console.log("Submitting form data:", {
      name: gameData.name,
      developer: gameData.developer,
      description: gameData.description,
      platform: gameData.platform,
      gameEngine: gameData.gameEngine,
      tags: selectedTags,
      zipFile: zipFileName,
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/games/submitWithTags",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        navigate("/home");
      }
    } catch (error) {
      setError(
        error.response
          ? error.response.data.message
          : "Erreur lors de la soumission du jeu"
      );
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
          name="name"
          placeholder="Nom du jeu"
          value={gameData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="developer"
          placeholder="Nom du développeur"
          value={gameData.developer}
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
          name="platform"
          value={gameData.platform}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez une plateforme</option>
          <option value="web">Web</option>
        </Select>
        <Select
          name="gameEngine"
          value={gameData.gameEngine}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez un moteur de jeu</option>
          <option value="Unity">Unity</option>
          <option value="Unreal">Unreal</option>
        </Select>
        <TagDropdown
          options={tagOptions}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <Input
          type="file"
          name="zipFile"
          accept=".zip"
          onChange={handleFileChange}
          required
        />
        <input
          type="file"
          name="gameImage"
          accept="image/png"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit">Soumettre</Button>
      </form>
    </Container>
  );
};

export default GameSubmissionForm;
