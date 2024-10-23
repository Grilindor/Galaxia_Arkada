import React from "react";
import logo from "../image/logo_1.png";
import { useNavigate } from "react-router-dom";
import {
  ButtonContainer,
  LogoImage,
  Button,
  PlayInstallButton,
  EventImageContainer,
  PlayButtonContainer,
  GameInfoContainer,
  GameSummary,
  GameDetails,
  UpdateContactsContainer,
  UpdateSection,
  ContactsSection,
  Footer,
} from "../styles/Game_SC";

function Game() {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    window.open("http://localhost:3000/thebeggarking/", "_blank"); // Ouvre le jeu dans un nouvel onglet
  };

  const handleInstallClick = () => {
    alert("Installer le jeu !"); // Remplace par la logique d'installation
  };

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
        <PlayInstallButton onClick={handlePlayClick}>Play</PlayInstallButton>
        <PlayInstallButton onClick={handleInstallClick}>
          Installer
        </PlayInstallButton>
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
