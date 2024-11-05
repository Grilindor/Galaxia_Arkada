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
import TagDropdown from './FuncTagDropdown';

const GameSubmissionForm = () => {
  const [gameData, setGameData] = useState({
    name: "",
    developerName: "",
    description: "",
    platform: "",
    gameEngine: "",
    tags: [],
  });
  const [zipFileName, setZipFile] = useState(null);
  const [availableTags, setAvailableTags] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tags/all");
        console.log(response.data);
        setAvailableTags(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tags:", error);
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
    formData.append("developerName", gameData.developerName);
    formData.append("description", gameData.description);
    formData.append("platform", gameData.platform);
    formData.append("gameEngine", gameData.gameEngine);
    gameData.tags.forEach((tag) => formData.append("tags", tag));
    formData.append("zipFile", zipFileName);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Game/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        navigate("/games");
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          name="developerName"
          placeholder="Nom du développeur"
          value={gameData.developerName}
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
        <Select
          name="tags"
          multiple
          value={gameData.tags}
          onChange={(e) => {
            const selectedTags = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            setGameData({ ...gameData, tags: selectedTags });
          }}
          required
        >
          <option value="">Sélectionnez des tags</option>
          {availableTags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </Select>
        <Input
          type="file"
          name="zipFile"
          accept=".zip"
          onChange={handleFileChange}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit">Soumettre</Button>
      </form>
    </Container>
  );
};
export default GameSubmissionForm;
