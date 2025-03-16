import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  AdminContainer,
  Header,
  Content,
  Sidebar,
  SidebarItem,
  MainContent,
  SectionTitle,
  Logo,
} from "../styles/Admin_SC";
import logo from "../image/logo_1.png";
import dashboard from "../image/dashboard.png";
import userIcon from "../image/users.png"; // Renommé pour éviter le conflit
import game from "../image/game.png";
import produits from "../image/produit.png";
import stats from "../image/stats.png";
import notifications from "../image/notification.png";
import logs from "../image/logs.png";
import Settings from "../image/settings.png";
import logoutIcon from "../image/logouts.png";
import {
  Button,
  ProfileActionButton,
  ProfileDetailsContainer,
  ProfileImage,
  InputField,
} from "../styles/User_SC";
import imageUser from "../image/pub_Dev_Max.png";
import { Link } from "react-router-dom";
const AdminPageprofile = () => {
  const { user, fetchUserData, logout, update } = useAuth(); // Ajout des hooks nécessaires
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    userpseudo: user?.userpseudo || "",
    email: user?.email || "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    update(formData); // Appelle une fonction de mise à jour depuis `useAuth`
    setIsEditing(false);
  };

  const handleDeleteProfile = () => {
    // Implémente la suppression du profil utilisateur ici
    console.log("Profil supprimé");
  };

  const handleModifieProfile = () => {
    setIsEditing(!isEditing);
  };

  return (
    <AdminContainer>
      <Header>
        <Logo>
          <img src={logo} alt="Logo" />
          <h1
            style={{ marginLeft: "10px", fontSize: "1.5em", color: "orange" }}
          >
            Galaxia Arkada
          </h1>
        </Logo>
      </Header>
      <Content>
        <Sidebar>
          <SidebarItem as="h3">MAIN</SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={dashboard}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Dashboard
            </Link>
          </SidebarItem>
          <SidebarItem as="h3">LIST</SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/user"
              style={{
                display: "flex",
                alignitems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={userIcon}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Users
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/Game_submissions"
              style={{
                display: "flex",
                alignitems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={game}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Game Submissions
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/produits"
              style={{
                display: "flex",
                alignitems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={produits}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Products
            </Link>
          </SidebarItem>
          <SidebarItem as="h3">USEFUL</SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/stats"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={stats}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Stats
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/notifications"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={notifications}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Notifications
            </Link>
          </SidebarItem>
          <SidebarItem as="h3">Services</SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/logs"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={logs}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Logs
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/Settings"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={Settings}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Settings
            </Link>
          </SidebarItem>
          <SidebarItem as="h3">Users</SidebarItem>
          <SidebarItem>
            <Link
              to="/adminPage/Profile"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={userIcon}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Profile
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link
              to="/home"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={logoutIcon}
                alt="Dashboard Icon"
                style={{ width: "16px", marginRight: "8px" }}
              />
              Logout
            </Link>
          </SidebarItem>
        </Sidebar>
        <MainContent>
          <ProfileDetailsContainer>
            <ProfileImage src={imageUser} alt="Profil" />
            <h1>Profil</h1>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <div style={{ flex: 1 }}>
                <h2>Pseudo:</h2>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {user?.userpseudo || "Nom Du Profil"}
                </p>
                <h2>Prénom:</h2>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {user?.firstname || "Prénom"}
                </p>
                <h2>Nom:</h2>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user?.lastname || "Nom"}
                </p>
                <h2>Email:</h2>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user?.email || "Email"}
                </p>
                <h2>Password:</h2>
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
                    style={inputStyle}
                  />
                  {/* Autres champs */}
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
        </MainContent>
      </Content>
    </AdminContainer>
  );
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
};

const iconStyle = { width: "16px", marginRight: "8px" };
const inputStyle = { padding: "5px", marginBottom: "5px" };

export default AdminPageprofile;
