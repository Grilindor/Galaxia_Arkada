import styled, { createGlobalStyle } from "styled-components";

// Styles globaux
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: transparent;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
  }
`;

// Conteneur principal
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1200px;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

export const LogoImage = styled.img`
  width: 80px;
  margin-right: 20px;
`;

// Boutons et navigation
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #f4f4f4;
  border-bottom: 2px solid #ddd;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-size: 16px;

  &:hover {
    background-color: #2980b9;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const PlayInstallButton = styled(Button)`
  background-color: #e74c3c;
  width: 200px;

  &:hover {
    background-color: #c0392b;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Sections de profil
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
export const ProfileSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

export const ProfileDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  width: 100%;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 15px auto;
`;

export const InputField = styled.input`
  margin: 8px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  text-align: center;
`;

// Section des jeux
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

export const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

export const Game = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const GameDetails = styled.div`
  flex: 1;
  margin-left: 20px;
  padding: 15px;
  background-color: #e9ecef;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const GameImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 10px;
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

export const Footer = styled.footer`
  text-align: center;
  padding: 15px;
  background-color: #f4f4f4;
  border-top: 1px solid #ddd;
  width: 100%;
`;
