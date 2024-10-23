import styled from "styled-components";

// Conteneur principal pour le formulaire
export const Container = styled.div`
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
export const Title = styled.h1`
  margin-bottom: 20px; // Espace en dessous du titre
  font-size: 20px; // Taille de la police
  text-align: center; // Centre le texte
`;

// Champ de saisie de texte
export const Input = styled.input`
  margin-bottom: 15px; // Espace en dessous de chaque champ
  padding: 5px; // Espacement intérieur
  border: 1px solid #ccc; // Bordure grise claire
  border-radius: 4px; // Coins légèrement arrondis
  font-size: 16px; // Taille de la police
  width: 100%; // Prend toute la largeur du conteneur
  height: 40px; // Hauteur uniforme pour les inputs
`;

// Champ de saisie de texte multilignes
export const Textarea = styled.textarea`
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
export const Select = styled.select`
  margin-bottom: 15px; // Espace en dessous de chaque champ
  padding: 10px; // Espacement intérieur
  border: 1px solid #ccc; // Bordure grise claire
  border-radius: 4px; // Coins légèrement arrondis
  font-size: 16px; // Taille de la police
  width: 103%; // Prend toute la largeur du conteneur
  height: 50px; // Hauteur uniforme pour les selects
`;

// Bouton de soumission
export const Button = styled.button`
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

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
  img {
    width: 150px;
    height: auto;
    cursor: pointer; // Change le curseur pour indiquer qu'il est cliquable
  }
`;
