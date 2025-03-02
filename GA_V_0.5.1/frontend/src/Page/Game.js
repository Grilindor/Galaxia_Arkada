import React, { useState, useEffect } from "react";
import logo from "../image/logo_1.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // ✅ Empêche les requêtes multiples

  useEffect(() => {
    if (isLoaded) return; // ✅ Empêche un second appel

    const fetchGameDetails = async () => {
      try {
        console.log(`🔹 Récupération des détails du jeu ${id}...`);
        const response = await axios.get(`http://localhost:3000/api/games/${id}`);
        setGame(response.data);
        setIsLoaded(true); // ✅ Marque le jeu comme chargé
        console.log("✅ Détails du jeu récupérés :", response.data);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des détails du jeu :", error);
      }
    };

    fetchGameDetails();
  }, [id, isLoaded]); // ✅ Dépendances mises à jour

  if (!game) {
    return <p>Chargement...</p>;
  }

  const handlePlayClick = () => {
    navigate(`/play/${id}`);
  };

  const handleInstallClick = () => {
    alert("Installer le jeu !");
  };

  const handleDeleteClick = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce jeu ?")) return;

    const token = sessionStorage.getItem("token"); // Récupération du token

    try {
      await axios.delete(`http://localhost:5000/api/games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Le jeu a été supprimé avec succès !");
      navigate("/Home");
    } catch (error) {
      console.error("❌ Erreur lors de la suppression du jeu :", error);
      alert("Erreur lors de la suppression du jeu.");
    }
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
        <img
          src={`http://localhost:3000/${game.imagePath}`}
          alt={game.name}
          style={{ width: "30%", height: "50%", borderRadius: "5px" }}
        />
      </EventImageContainer>

      <PlayButtonContainer>
        <PlayInstallButton onClick={handlePlayClick}>Play</PlayInstallButton>
        <PlayInstallButton onClick={handleInstallClick}>Installer</PlayInstallButton>
        <PlayInstallButton onClick={handleDeleteClick} style={{ backgroundColor: "red" }}>
          Supprimer
        </PlayInstallButton>
      </PlayButtonContainer>

      {/* ✅ Informations sur le jeu */}
      <GameInfoContainer>
        <GameSummary>
          <h2>{game.name}</h2>
          <p>{game.description}</p>
          <p>
            <strong>Tags :</strong> {game.tags.map((tag) => tag.name).join(", ")}
          </p>
        </GameSummary>

        <GameDetails>
          <h2>Détails du jeu</h2>
          <p>Date de sortie : {new Date(game.createdAt).toLocaleDateString("fr-FR")}</p>
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
        <p>© 2024 Galaxia Arkada</p>
      </Footer>
    </div>
  );
}

export default Game;
