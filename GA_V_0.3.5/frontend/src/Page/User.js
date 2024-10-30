import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo_1.png";
import axios from "axios";
import { useAuth } from "./AuthContext";
import {
  MainContainer,
  ButtonContainer,
  LogoImage,
  Button,
  ProfileActionButton,
  ProfileSectionContainer,
  ProfileDetailsContainer,
  ProfileImage,
  InputField,
  OnlineFriendsContainer,
  FooterContainer,
  FormContainer, // Ajout d'un conteneur pour le formulaire
} from "../styles/User_SC";

function User() {
  const { user, fetchUserData, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    if (!userToken) {
      navigate("/login");
      return;
    }

    if (!user) {
      fetchUserData();
    }
  }, [user, fetchUserData, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleModifieProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteProfile = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    try {
      await axios.delete("http://localhost:3000/api/users/delet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleLogout();
    } catch (error) {
      console.error("Erreur lors de la suppression du profil :", error);
    }
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <MainContainer>
      <ButtonContainer>
        <LogoImage src={logo} alt="Logo" />
        <Button onClick={() => navigate("/home")}>Magasin</Button>
        <Button onClick={() => navigate("/Bibliothèque")}>Bibliothèque</Button>
        <Button onClick={() => navigate("/user")}>User</Button>
        <Button onClick={handleLogout}>Déconnexion</Button>
      </ButtonContainer>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ProfileSectionContainer>
          <ProfileDetailsContainer>
            <ProfileImage
              src={user?.profileImage || "path/to/default/image.png"}
              alt="Profil"
            />
            <h2>{user?.userpseudo || "Nom Du Profil"}</h2>
            <ProfileActionButton onClick={handleModifieProfile}>
              {isEditing ? "Annuler" : "Modifier le profil"}
            </ProfileActionButton>
            <ProfileActionButton onClick={handleDeleteProfile}>
              Supprimer le profil
            </ProfileActionButton>
            <h6>info</h6>
          </ProfileDetailsContainer>

          {isEditing && (
            <FormContainer>
              {" "}
              {/* Ajout d'un conteneur pour le formulaire */}
              <h2>Nom</h2>
              <InputField type="text" defaultValue={user?.lastName || ""} />
              <h2>Prénom</h2>
              <InputField type="text" defaultValue={user?.firstName || ""} />
              <h2>Mot de passe</h2>
              <InputField type="password" />
              <h2>Email</h2>
              <InputField type="email" defaultValue={user?.email || ""} />
              <Button onClick={() => console.log("Formulaire validé")}>
                Validation
              </Button>
            </FormContainer>
          )}
        </ProfileSectionContainer>

        <OnlineFriendsContainer>
          <h2>En ligne</h2>
          {/* Liste des amis en ligne */}
        </OnlineFriendsContainer>
      </div>

      <FooterContainer>
        <p>© 2024 Votre Société</p>
      </FooterContainer>
    </MainContainer>
  );
}

export default User;
