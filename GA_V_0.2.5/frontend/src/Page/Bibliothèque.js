import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../image/logo_1.png";

// Création des composants stylisés
const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  border-right: 2px solid #ddd;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const StyledImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 10px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4;
  padding: 10px 20px;
  border-bottom: 2px solid #ddd;
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

const Game = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const GameImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

const GameInfo = styled.div`
  text-align: center;
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: center;
`;

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
