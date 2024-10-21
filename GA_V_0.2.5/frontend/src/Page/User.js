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
    const userToken = sessionStorage.getItem("token");
    if (!userToken) {
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:3000/api/user/Profile", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  }, [navigate]);
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  const handleDeleteProfile = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    try {
      await axios.delete("http://localhost:3000/api/users/delet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      sessionStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la suppression du profil :", error);
    }
  };
  return (
    <div>
      <ButtonContainer>
        <img src={logo} alt="Logo" />
        <button onClick={() => navigate("/home")}>Magasin</button>
        <button onClick={() => navigate("/Bibliothèque")}>Bibliothèque</button>
        <button onClick={() => navigate("/user")}>User</button>
        <button onClick={handleLogout}>Déconnexion</button>
      </ButtonContainer>
      <ProfileSectionContainer>
        <ProfileDetailsContainer>
          <ProfileImage src={ProfileImage} alt="Profil" />
          <h2>{userData?.userpseudo || "Nom Du Profil"}</h2>
          <ProfileActionButton>Modifier le profil</ProfileActionButton>
          <ProfileActionButton onClick={handleDeleteProfile}>
            Supprimer le profil
          </ProfileActionButton>
          <h6>info</h6>
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
