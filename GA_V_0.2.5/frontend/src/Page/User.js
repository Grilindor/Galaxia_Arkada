import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo_1.png";
// Création des composants stylisés
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  background-color: #F4F4F4;
  border-bottom: 2px solid #ddd;
`;
const LogoImage = styled.img`
  width: 80px;
  margin-right: 20px;
`;
const Button = styled.button`
  background-color: #3498DB;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #2980B9;
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
  background-color: #F0F0F0;
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
  background-color: #E9ECEF;
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
  background-color: #F4F4F4; // Optionnel : ajoute une couleur de fond pour le pied de page
`;
// Composant principal
function User() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Vérifie si l'utilisateur est connecté
    const userToken = sessionStorage.getItem("token");
    const userInfo = JSON.parse(sessionStorage.getItem("user")); // On suppose que les infos utilisateur sont dans le localStorage
    if (!userToken) {
      // Redirige vers la page de login si l'utilisateur n'est pas connecté
      navigate("/login");
    } else {
      // Sinon, on charge les informations de l'utilisateur
      setUserData(userInfo);
    }
  }, [navigate]);
  const handleLogout = () => {
    // Supprime le token et les infos utilisateur
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login"); // Redirige vers la page de login après déconnexion
  };
  // Exemple de nombre d'amis, à remplacer par votre logique
  const amis = 5;
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
          <ProfileImage src="URL_DU_PROFIL" alt="Profil" />
          <h2>Nom Du Profil</h2>
          <h6>Information sur le profil</h6>
          <ProfileActionButton>Modifier le profil</ProfileActionButton>
          <ProfileActionButton>Supprimer le profil</ProfileActionButton>
          <h6>Autres informations</h6>
          <h2>Nom</h2>
          <InputField type="text" />
          <h2>Prénom</h2>
          <InputField type="text" />
          <h2>Mot de passe</h2>
          <InputField type="password" />
          <h2>Email</h2>
          <InputField type="email" />
        </ProfileDetailsContainer>
        <OnlineFriendsContainer>
          <h2>En ligne</h2>
          <img src="URL_IMAGE_1" alt="Ami 1" />
          <img src="URL_IMAGE_2" alt="Ami 2" />
          <img src="URL_IMAGE_3" alt="Ami 3" />
          <h2>Jeux</h2>
          <h2>Capture d'écran</h2>
          <h2>Contacts ({amis} amis)</h2>
        </OnlineFriendsContainer>
      </ProfileSectionContainer>
      <FooterContainer>
        <p>© 2024 Votre Société</p>
      </FooterContainer>
    </div>
  );
}
export default User;
