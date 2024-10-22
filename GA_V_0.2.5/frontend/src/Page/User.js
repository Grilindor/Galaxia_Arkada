import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo_1.png";
import axios from "axios";
import { useAuth } from "./AuthContext";
import {
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
} from "../styles/User_SC";

function User() {
  const { user, fetchUserData, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); // État pour contrôler le formulaire

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    if (!userToken) {
      navigate("/login");
      return;
    }

    // Si l'utilisateur n'est pas encore défini, appelez fetchUserData
    if (!user) {
      fetchUserData();
    }
  }, [user, fetchUserData, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleModifieProfile = () => {
    setIsEditing(!isEditing); // Affiche ou masque le formulaire
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

        {/* Formulaire de modification de profil */}
        {isEditing && (
          <>
            <h2>Nom</h2>
            <InputField type="text" defaultValue={user?.lastName || ""} />
            <h2>Prénom</h2>
            <InputField type="text" defaultValue={user?.firstName || ""} />
            <h2>Email</h2>
            <InputField type="password" />
            <h2>Password</h2>
            <InputField type="email" defaultValue={user?.email || ""} />
            <Button> validation</Button>
          </>
        )}
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
