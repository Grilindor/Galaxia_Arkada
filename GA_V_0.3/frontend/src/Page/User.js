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
import imageUser from "../image/pub_Dev_Max.png";

function User() {
  const { user, fetchUserData, logout, update } = useAuth(); // Ajout de update
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); // État pour contrôler le formulaire
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    userpseudo: user?.userpseudo || "",
    email: user?.email || "",
    password: "", // Le champ mot de passe ne devrait pas être pré-rempli
  });

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    if (!userToken) {
      navigate("/login");
      return;
    }
    console.log("User dans useEffect:", user); // Voir l'état de user
    console.log("Fonctions disponibles:", { fetchUserData, update }); // Voir les fonctions disponibles
    // Si l'utilisateur n'est pas encore défini, appelez fetchUserData
    if (!user) {
      fetchUserData();
    }
  }, [user, fetchUserData, navigate, update]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      // Appeler update avec les nouvelles données
      await update(formData);
      // Recharger les informations utilisateur après la mise à jour
      await fetchUserData();
      setIsEditing(false); // Fermer le formulaire après la validation
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <ButtonContainer>
        <LogoImage src={logo} alt="Logo" />
        <h1 style={{ marginLeft: "5px", fontSize: "1.5em", color: "orange" }}>
          Galaxia Arkada
        </h1>
        <Button onClick={() => navigate("/home")}>Magasin</Button>
        <Button onClick={() => navigate("/Bibliothèque")}>Bibliothèque</Button>
        <Button onClick={() => navigate("/user")}>User</Button>
        <Button onClick={handleLogout}>Déconnexion</Button>
      </ButtonContainer>

      <ProfileSectionContainer>
        <ProfileDetailsContainer>
          <ProfileImage src={imageUser} alt="Profil" />
          <h1>Profil</h1>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <div style={{ flex: 1 }}>
              <h2>Pseudo:</h2>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {user?.userpseudo || "Nom Du Profil"}
              </p>
              <h2>Prénom:</h2>
              <p>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {user?.firstname || "Prénom"}
              </p>
              <h2>Nom: </h2>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user?.lastname || "Nom"}
              </p>
              <h2>Email: </h2>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user?.email || "Email"}
              </p>
              <h2>Password: </h2>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"#######"}</p>
            </div>

            {isEditing && (
              <div style={{ flex: 1, paddingLeft: "20px" }}>
                <h2 style={{ marginBottom: "10px" }}>Pseudo</h2>
                <InputField
                  type="text"
                  name="userpseudo"
                  value={formData.userpseudo}
                  onChange={handleInputChange}
                  style={{ padding: "5px", marginBottom: "5px" }}
                />
                <h2 style={{ marginBottom: "10px" }}>Prénom</h2>
                <InputField
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  style={{ padding: "5px", marginBottom: "5px" }}
                />
                <h2 style={{ marginBottom: "10px" }}>Nom</h2>
                <InputField
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  style={{ padding: "5px", marginBottom: "5px" }}
                />
                <h2 style={{ marginBottom: "10px" }}>Email</h2>
                <InputField
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{ padding: "5px", marginBottom: "5px" }}
                />
                <h2 style={{ marginBottom: "10px" }}>Password</h2>
                <InputField
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{ padding: "5px", marginBottom: "5px" }}
                />
                <Button onClick={handleFormSubmit}>Valider</Button>
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <ProfileActionButton onClick={handleModifieProfile}>
              {isEditing ? "Annuler" : "Modifier le profil"}
            </ProfileActionButton>
            <ProfileActionButton onClick={handleDeleteProfile}>
              Supprimer le profil
            </ProfileActionButton>
          </div>
        </ProfileDetailsContainer>

        <OnlineFriendsContainer>
          <h2>En ligne</h2>
          {/* Liste des amis en ligne */}
        </OnlineFriendsContainer>
      </ProfileSectionContainer>

      <FooterContainer>
        <p>© 2024 Galaxia Arkada</p>
      </FooterContainer>
    </div>
  );
}

export default User;
