import React from "react";
import styled from "styled-components";
import logo from "../image/logo_1.png";
import { useNavigate } from "react-router-dom";

// Composants stylisés
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  background-color: #f4f4f4;
  border-bottom: 2px solid #ddd;
`;

const LogoImage = styled.img`
  width: 80px;
  margin-right: 20px;
`;

const Button = styled.button`
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
const PlayInstallButton = styled(Button)`
  background-color: #e74c3c; /* Couleur différente */
  width: 1000px; /* Longueur spécifique */

  &:hover {
    background-color: #c0392b; /* Couleur au survol */
  }
`;

const EventImageContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const PlayButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Centrer les boutons Play et Installer */
  gap: 20px; /* Espace entre les boutons */
  margin: 20px 0;
`;

const GameInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const GameSummary = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const GameDetails = styled.div`
  flex: 1;
  margin-left: 20px;
  padding: 15px;
  background-color: #e9ecef;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const UpdateContactsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const UpdateSection = styled.div`
  flex: 2;
  margin-right: 20px;
`;

const ContactsSection = styled.div`
  flex: 1;
  text-align: center;
`;

const Footer = styled.div`
  text-align: center;
  margin: 20px;
`;

function Game() {
  const navigate = useNavigate();
  return (
    <div>
      <ButtonContainer>
        <LogoImage src={logo} alt="Logo" />
        <Button onClick={() => navigate("/home")}>Magasin</Button>
        <Button onClick={() => navigate("/Bibliothèque")}>Bibliothèque</Button>
        <Button onClick={() => navigate("/user")}>User</Button>
        <Button>Déconnexion</Button>
      </ButtonContainer>

      <EventImageContainer>
        <img src="URL_IMAGE_EVENT" alt="Événement du jeu" />
      </EventImageContainer>

      <PlayButtonContainer>
        <PlayInstallButton>Play</PlayInstallButton>
        <PlayInstallButton>Installer</PlayInstallButton>
      </PlayButtonContainer>

      <GameInfoContainer>
        <GameSummary>
          <h2>Résumé du jeu</h2>
          <p>Texte de résumé du jeu ici...</p>
        </GameSummary>

        <GameDetails>
          <h2>Détails du jeu</h2>
          <p>Texte des détails du jeu ici...</p>
        </GameDetails>
      </GameInfoContainer>

      <UpdateContactsContainer>
        <UpdateSection>
          <h2>Mise à jour</h2>
          <p>Titre de la mise à jour</p>
          <p>26 mai 2020</p>
        </UpdateSection>

        <ContactsSection>
          <h2>Contacts</h2>
          <img src="URL_IMAGE_CONTACT" alt="Contact" />
          <h6>Voir tous les contacts qui y jouent</h6>
        </ContactsSection>
      </UpdateContactsContainer>

      <Footer>
        <p>© 2024 Votre Société</p>
      </Footer>
    </div>
  );
}

export default Game;
