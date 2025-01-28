import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo_1.png";
import {
  Container,
  Sidebar,
  ContentArea,
  GamesGrid,
  StyledImage,
  Nav,
  Button,
  Game,
  GameImage,
  GameInfo,
  NavButton,
} from "../styles/Bibliothèque_SC";

function Bibliothèque() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = sessionStorage.getItem("token");
    if (!token) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Container>
      <Sidebar>
        <h3>Accueil</h3>
        <input type="text" placeholder="Recherche..." />
        <ul>
          <li>
            <label>
              <input type="checkbox" /> Not selected
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" /> Selected
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" /> Indeterminate
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" /> Disabled
            </label>
          </li>
        </ul>
      </Sidebar>
      <ContentArea>
        <Nav>
          <StyledImage src={logo} alt="Logo" />
          <h1
            style={{ marginLeft: "10px", fontSize: "1.5em", color: "orange" }}
          >
            Galaxia Arkada
          </h1>
          {isAuthenticated && (
            <>
              <Button onClick={() => navigate("/home")}>Magasin</Button>
              <Button onClick={() => navigate("/Bibliothèque")}>
                Bibliothèque
              </Button>
              <Button onClick={() => navigate("/user")}>User</Button>
              <Button onClick={handleLogout}>Déconnexion</Button>
            </>
          )}
        </Nav>
        {isAuthenticated ? (
          <GamesGrid>
            {[...Array(12)].map((_, index) => (
              <Game key={index}>
                <NavButton onClick={() => navigate("/game")}>
                  <GameImage>
                    <span>Image ici</span>
                  </GameImage>
                </NavButton>
                <GameInfo>
                  <p>Nom du jeu</p>
                  <p>Note du jeu</p>
                </GameInfo>
              </Game>
            ))}
          </GamesGrid>
        ) : (
          <p>Vous devez être connecté pour voir les jeux.</p>
        )}
      </ContentArea>
    </Container>
  );
}

export default Bibliothèque;
