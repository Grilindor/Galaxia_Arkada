import styled from "styled-components";
import imagedefond from "../image/espace.webp";

// Conteneur principal
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-radius: 5px;
  background-color: lightgrey;
  width: 450px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${imagedefond});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  // Media queries pour rendre le formulaire responsive
  @media (max-width: 768px) {
    width: 80%;
    padding: 20px;
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 15px;
  }
`;

// Titre du formulaire
export const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

// Champ de saisie de texte
export const Input = styled.input`
  margin-bottom: 15px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  height: 40px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Champ de saisie de texte multilignes
export const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  height: 100px;
  resize: none;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Champ de sélection pour les catégories et plateformes
export const Select = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 103%;
  height: 50px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Bouton de soumission
export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #333;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px;
  }
`;

// Logo
export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;

  img {
    width: 150px;
    height: auto;
    cursor: pointer;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    img {
      width: 120px;
    }
  }
`;
