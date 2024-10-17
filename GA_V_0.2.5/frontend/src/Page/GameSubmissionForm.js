import React, { useState } from "react";
import styled from "styled-components";
import logo from "../image/logo_1.png";
import { useNavigate } from "react-router-dom";

// Conteneur principal pour le formulaire
const Container = styled.div`
  display: flex; // Utilise le flexbox pour l'alignement
  flex-direction: column; // Aligne les éléments en colonne
  align-items: center; // Centre les éléments horizontalement
  justify-content: center; // Centre les éléments verticalement
  padding: 40px; // Ajoute un espacement intérieur
  border-radius: 5px; // Coins arrondis
  background-color: lightgrey; // Couleur de fond
  width: 450px; // Largeur du conteneur augmentée
  margin: 0 auto; // Centre le conteneur horizontalement
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Ombre autour du conteneur
  position: absolute; // Pour centrer verticalement
  top: 50%; // Positionner à 50% de la hauteur
  left: 50%; // Positionner à 50% de la largeur
  transform: translate(-50%, -50%); // Centrer le conteneur
`;

// Titre du formulaire
const Title = styled.h1`
  margin-bottom: 20px; // Espace en dessous du titre
  font-size: 20px; // Taille de la police
  text-align: center; // Centre le texte
`;

// Champ de saisie de texte
const Input = styled.input`
  margin-bottom: 15px; // Espace en dessous de chaque champ
  padding: 5px; // Espacement intérieur
  border: 1px solid #ccc; // Bordure grise claire
  border-radius: 4px; // Coins légèrement arrondis
  font-size: 16px; // Taille de la police
  width: 100%; // Prend toute la largeur du conteneur
  height: 40px; // Hauteur uniforme pour les inputs
`;

// Champ de saisie de texte multilignes
const Textarea = styled.textarea`
  margin-bottom: 15px; // Espace en dessous de chaque champ
  padding: 5px; // Espacement intérieur
  border: 1px solid #ccc; // Bordure grise claire
  border-radius: 4px; // Coins légèrement arrondis
  font-size: 16px; // Taille de la police
  width: 100%; // Prend toute la largeur du conteneur
  height: 100px; // Hauteur uniforme pour le textarea
  resize: none; // Empêche le redimensionnement manuel
`;

// Champ de sélection pour les catégories et plateformes
const Select = styled.select`
  margin-bottom: 15px; // Espace en dessous de chaque champ
  padding: 10px; // Espacement intérieur
  border: 1px solid #ccc; // Bordure grise claire
  border-radius: 4px; // Coins légèrement arrondis
  font-size: 16px; // Taille de la police
  width: 103%; // Prend toute la largeur du conteneur
  height: 50px; // Hauteur uniforme pour les selects
`;

// Bouton de soumission
const Button = styled.button`
  padding: 10px; // Espacement intérieur
  font-size: 16px; // Taille de la police
  background-color: black; // Couleur de fond noire
  color: white; // Couleur du texte en blanc
  border: none; // Pas de bordure
  border-radius: 4px; // Coins légèrement arrondis
  cursor: pointer; // Change le curseur en main sur hover
  transition: background-color 0.3s ease; // Transition pour l'effet de survol

  &:hover {
    // Style lorsque la souris survole le bouton
    background-color: #333; // Couleur de fond plus foncée
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
  img {
    width: 150px;
    height: auto;
    cursor: pointer; // Change le curseur pour indiquer qu'il est cliquable
  }
`;
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
