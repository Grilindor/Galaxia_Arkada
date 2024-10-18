import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo_1.png";
import axios from "axios";

// Création des composants stylisés
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
const ProfileActionButton = styled(Button)`
  margin: 10px; // Ajoute un espacement entre les boutons
`;
const ProfileSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;
const ProfileDetailsContainer = styled.div`
  flex: 2;
  margin-right: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px;
`;
const InputField = styled.input`
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 80%;
`;
const OnlineFriendsContainer = styled.div`
  flex: 1;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 8px;
  text-align: center;
  img {
    margin: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
const FooterContainer = styled.div`
  text-align: center; // Centre le texte horizontalement
  margin-top: 20px; // Ajoute un peu d'espace au-dessus du pied de page
  padding: 10px;
  background-color: #f4f4f4; // Optionnel : ajoute une couleur de fond pour le pied de page
`;

// Composant principal
function User() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log("Composant User monté"); // Vérifier quand le composant est monté

    // Vérifie si l'utilisateur est connecté
    const userToken = sessionStorage.getItem("token");
    console.log("Token récupéré depuis sessionStorage :", userToken); // Affiche le token récupéré

    if (!userToken) {
      console.warn("Aucun token trouvé. Redirection vers la page de login.");
      // Redirige vers la page de login si l'utilisateur n'est pas connecté
      navigate("/login");
    } else {
      console.log("Token trouvé. Récupération des informations utilisateur...");

      // Récupère les informations de l'utilisateur depuis le backend
      axios
        .get("http://localhost:3000/api/user/Profile", {
          headers: {
            Authorization: `Bearer ${userToken}`, // On utilise le token pour l'authentification
          },
        })
        .then((response) => {
          console.log("Réponse du backend :", response); // Affiche la réponse complète du backend
          setUserData(response.data); // Mettre à jour les informations utilisateur
          console.log("Données utilisateur mises à jour :", response.data); // Vérifie si les infos utilisateur sont bien mises à jour
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des informations utilisateur :", error);
          navigate("/login"); // Rediriger l'utilisateur vers la page de connexion en cas d'erreur
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    console.log("Déconnexion en cours...");
    // Supprime le token et les infos utilisateur
    sessionStorage.removeItem("token");
    console.log("Token supprimé de sessionStorage.");
    // Redirige vers la page de login après déconnexion
    navigate("/login");
  };

  return (
    <div>
      <ButtonContainer>
        <LogoImage src={logo} alt="Logo" />
        <Button onClick={() => navigate("/home")}>Magasin</Button>
        <Button onClick={() => navigate("/Bibliothèque")}>Bibliothèque</Button>
        <Button onClick={() => navigate("/user")}>User</Button>
        <Button onClick={handleLogout}>Déconnexion</Button>
      </ButtonContainer>

      <ProfileSectionContainer>
        <ProfileDetailsContainer>
          <ProfileImage
            src={userData?.profileImage || "URL_DU_PROFIL"}
            alt="Profil"
          />
          <h2>{userData?.name || "Nom Du Profil"}</h2>
          <h6>{userData?.info || "Information sur le profil"}</h6>
          {/* Autres champs de profil */}
        </ProfileDetailsContainer>
        <OnlineFriendsContainer>
          <h2>En ligne</h2>
          {/* Liste des amis en ligne */}
        </OnlineFriendsContainer>
      </ProfileSectionContainer>
      <FooterContainer>
        <p>© 2024 Votre Société</p>
      </FooterContainer>
    </div>
  );
}

export default User;
