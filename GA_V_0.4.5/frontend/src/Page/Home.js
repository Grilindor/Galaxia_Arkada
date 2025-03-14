import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo_1.png";
import {
  AppContainer,
  Header,
  Logo,
  NavButton,
  UserActions,
  ImportGameButton,
  ThemeToggleLabel,
  Banner,
  Filters,
  MainContent,
  Sidebar,
  GamesList,
  Game,
  Footer,
  gameData,
} from "../styles/Home_SC";
//import logoImportGame from "../image/logoimportgame.jpg";
import pub from "../image/pub_Dev_Max.png";
import evenement from "../image/flo-dans-le-game-jeu-video.jpg";
import banderole from "../image/banderole.png";

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
          <h1
            style={{ marginLeft: "10px", fontSize: "1.5em", color: "orange" }}
          >
            Galaxia Arkada
          </h1>
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
            <span>Soumettre un Jeu</span>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <img
              src={banderole}
              alt="Publicité"
              style={{
                width: "26%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </div>
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
          <option>Langage des jeux</option>
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
            src={pub}
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
                <img
                  src={game.image}
                  alt={game.name}
                  style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                />
              </NavButton>
              <h3>{game.name}</h3>
              <p>Note : {game.rating}</p>
            </Game>
          ))}
        </GamesList>
        <Sidebar>
          <img
            src={evenement}
            alt="Publicité"
            style={{ width: "100%", height: "auto", borderRadius: "5px" }}
          />
          <img
            src={evenement}
            alt="Publicité"
            style={{ width: "100%", height: "auto", borderRadius: "5px" }}
          />
        </Sidebar>
      </MainContent>
      <Footer>
        <p>© 2024 Galaxia Arkada</p>
      </Footer>
    </AppContainer>
  );
}

export default Home;
