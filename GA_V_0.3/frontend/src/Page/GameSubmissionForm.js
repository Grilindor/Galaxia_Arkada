import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Input,
  Textarea,
  Button,
  TagList,
  TagCheckbox,
  TagLabel
} from "../styles/GameSubmissionForm_SC";

const GameSubmission = ({ tags }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    zipFile: null, // Fichier zip, non obligatoire
    developerName: "",
    platform: "",
    gameEngine: "",
    selectedTags: [], // Les tags sélectionnés
    category: "", // Pour la catégorie
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "zipFile") return; // Ignorer les fichiers ici
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fonction de gestion du fichier zip
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      zipFile: e.target.files[0],
    }));
  };

  const handleTagChange = (tagId) => {
    setFormData((prevData) => {
      const selectedTags = prevData.selectedTags.includes(tagId)
        ? prevData.selectedTags.filter((id) => id !== tagId)
        : [...prevData.selectedTags, tagId];
      return { ...prevData, selectedTags };
    });
  };

  const handleGameSubmission = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "zipFile" && value) {
        formDataToSend.append("zipFile", value);
      } else {
        formDataToSend.append(key, value);
      }
    });
    try {
      const response = await axios.post("http://localhost:3000/api/games", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Soumission réussie :", response.data);
      navigate("/games");
    } catch (error) {
      setError("Erreur lors de la soumission du jeu. Veuillez réessayer.");
    }
  };

  return (
    <Container>
      <Title>Submit Your Game</Title>
      {error && <p>{error}</p>}
      <form onSubmit={handleGameSubmission}>
        <Input
          type="text"
          name="name"
          placeholder="Game Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Game Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Input
          type="file"
          name="zipFile"
          onChange={handleFileChange} // Utilise handleFileChange pour les fichiers
        />
        <Input
          type="text"
          name="developerName"
          placeholder="Developer Name"
          value={formData.developerName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="platform"
          placeholder="Platform"
          value={formData.platform}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="gameEngine"
          placeholder="Game Engine"
          value={formData.gameEngine}
          onChange={handleChange}
          required
        />

        {/* Menu déroulant pour les catégories, qui sont en fait des tags */}
        <label htmlFor="category">Select Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          style={{ display: 'block', width: '100%', padding: '10px' }}
        >
          <option value="">--Select Category--</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>

        <div>
          <h4>Select Tags:</h4>
          <TagList>
            {tags.map((tag) => (
              <TagLabel key={tag.id}>
                <TagCheckbox
                  type="checkbox"
                  checked={formData.selectedTags.includes(tag.id)}
                  onChange={() => handleTagChange(tag.id)}
                />
                {tag.name}
              </TagLabel>
            ))}
          </TagList>
        </div>

        <Button type="submit">Submit Game</Button>
      </form>
    </Container>
  );
};

export default GameSubmission;
