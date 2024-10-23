import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../image/logo_1.png";
import background from "../image/image_fond_home.webp";
//import logoImportGame from "../image/logoimportgame.jpg";
//import pub from "../image/devmax.png";
//import evenement from "../image/test_ev.png";

// Composants stylisés
const AppContainer = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--text-color);
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: var(--bg-color);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 40px;
  img {
    width: 150px;
    height: auto;
  }
`;

const NavButton = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #eaf0f7;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  button {
    margin: 0 10px;
    padding: 10px 20px;
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  select {
    margin-left: 10px;
    padding: 10px;
  }
`;

const ImportGameButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 10px;

  img {
    width: 24px;
    height: 24px;
    margin-right: 10px; /* Espace entre l'image et le texte */
  }

  &:hover {
    background-color: #eaf0f7;
  }
`;

const ThemeToggleLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
  input {
    display: none;
  }
  svg {
    width: 24px;
    height: 24px;
  }
  .swap-off {
    display: ${({ theme }) => (theme === "light" ? "block" : "none")};
  }
  .swap-on {
    display: ${({ theme }) => (theme === "dark" ? "block" : "none")};
  }
`;

const Banner = styled.div`
  height: 200px;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Filters = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #f9f9f9;
  select,
  input {
    margin: 0 10px;
    padding: 10px;
  }
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const Sidebar = styled.div`
  width: 20%;
  background-color: #f0f0f0;
  .ad,
  .event {
    margin: 20px;
    background-color: #ccc;
    padding: 20px;
    text-align: center;
  }
`;

const GamesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 60%;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

const Game = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  margin-bottom: 30px;
  .game-image {
    background-color: #ccc;
    height: 170px;
    margin-bottom: 10px;
  }
`;

const Footer = styled.footer`
  padding: 26px;
  text-align: center;
  background-color: #f1f1f1;
  position: relative;
  bottom: 0;
  width: 100%;
`;

// Liste des jeux (exemple)
const gameData = [
  {
    id: 1,
    name: "Jeu 1",
    image: "URL_IMAGE_JEU_1",
    rating: "4.5",
  },
  {
    id: 2,
    name: "Jeu 2",
    image: "URL_IMAGE_JEU_2",
    rating: "4.0",
  },
  {
    id: 3,
    name: "Jeu 3",
    image: "URL_IMAGE_JEU_3",
    rating: "5.0",
  },
];

function Home() {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("token") !== null;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppContainer className={`App ${theme}`}>
      <Header>
        <Logo>
          <img src={logo} alt="Logo" />
        </Logo>
        <nav>
          <NavButton onClick={() => navigate("/home")}>Magasin</NavButton>
          <NavButton onClick={() => navigate("/Bibliothèque")}>
            Bibliothèque
          </NavButton>
          <NavButton onClick={() => navigate("/user")}>User</NavButton>
        </nav>
        <UserActions>
          {!isLoggedIn ? (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/api/users/signup")}>
                Sign Up
              </button>
            </>
          ) : (
            <button onClick={handleLogout}>Déconnexion</button>
          )}
          <ImportGameButton onClick={() => navigate("/GameSubmissionForm")}>

            <span>Import Game</span>
          </ImportGameButton>
          <select>
            <option>Langue</option>
          </select>
          <ThemeToggleLabel theme={theme}>
            <input type="checkbox" onChange={toggleTheme} />
            <svg
              className="swap-off"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2v2m0 16v2m10-10h-2m-16 0H2m15.364-7.364l-1.414 1.414M6.343 17.657l-1.414 1.414m12.728 0l1.414-1.414M6.343 6.343l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
            <svg
              className="swap-on"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              />
            </svg>
          </ThemeToggleLabel>
        </UserActions>
      </Header>
      <Banner>
        <banner-content>
          <img
            //src={evenement}
            alt="Publicité"
            style={{ width: "20%", height: "auto", borderRadius: "5px" }}
          />
        </banner-content>
      </Banner>
      <Filters>
        <select>
          <option>Genre</option>
        </select>
        <select>
          <option>Prix</option>
        </select>
        <select>
          <option>Game Langue</option>
        </select>
        <select>
          <option>Note</option>
        </select>
        <select>
          <option>Date de sortie</option>
        </select>
        <input type="text" placeholder="Recherche..." />
      </Filters>
      <MainContent>
        <Sidebar>
          <img
            //src={pub}
            alt="Publicité"
            style={{ width: "100%", height: "auto", borderRadius: "5px" }}
          />
        </Sidebar>
        <GamesList>
          {gameData.map((game) => (
            <Game key={game.id}>
              <NavButton
                className="game-image"
                onClick={() => navigate("/game")}
              >
                <img src={game.image} alt={game.name} />
              </NavButton>
              <h3>{game.name}</h3>
              <p>Note : {game.rating}</p>
            </Game>
          ))}
        </GamesList>
        <Sidebar>
          <div className="event">Événement</div>
        </Sidebar>
      </MainContent>
      <Footer>
        <p>© 2023 Mon site. Tous droits réservés.</p>
      </Footer>
    </AppContainer>
  );
}

export default Home;
