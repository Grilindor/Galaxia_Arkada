import styled from "styled-components";

// Composants stylisés
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  background-color: #f4f4f4;
  border-bottom: 2px solid #ddd;
`;

export const LogoImage = styled.img`
  width: 80px;
  margin-right: 20px;
`;

export const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #2980b9;
  }
`;

// Nouveau composant stylisé pour les boutons Play et Installer
export const PlayInstallButton = styled(Button)`
  background-color: #e74c3c; /* Couleur différente */
  width: 200px; /* Longueur spécifique */

  &:hover {
    background-color: #c0392b; /* Couleur au survol */
  }
`;

export const EventImageContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export const PlayButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Centrer les boutons Play et Installer */
  gap: 20px; /* Espace entre les boutons */
  margin: 20px 0;
`;

export const GameInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

export const GameSummary = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const GameDetails = styled.div`
  flex: 1;
  margin-left: 20px;
  padding: 15px;
  background-color: #e9ecef;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const UpdateContactsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const UpdateSection = styled.div`
  flex: 2;
  margin-right: 20px;
`;

export const ContactsSection = styled.div`
  flex: 1;
  text-align: center;
`;

export const Footer = styled.div`
  text-align: center;
  margin: 20px;
`;
