import styled from "styled-components";
import background from "../image/espace.webp";
import jeux1 from "../image/thebeggarking.png";
import jeux2 from "../image/plafrom.webp";
import jeux3 from "../image/liondiff.webp";
import banderole from "../image/banderole.png";

// Breakpoints pour le responsive
const breakpoints = {
  mobile: "768px",
  tablet: "1024px",
};

// Conteneur principal
export const AppContainer = styled.div`
  background-color: var(--bg-color);
  color: var(--text-color);
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Header
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: var(--bg-color);

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 40px;

  img {
    width: 150px;
    height: auto;
  }
`;

// Boutons de navigation
export const NavButton = styled.button`
  margin: 0 10px;
  padding: 12px 24px;
  background-color: #eaf0f7;
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #cce0ff;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 20px;
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

// Section des actions utilisateur
export const UserActions = styled.div`
  display: flex;
  align-items: center;

  button {
    margin: 0 10px;
    padding: 12px 24px;
    background-color: white;
    color: black;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #ddd;
    }

    @media (max-width: ${breakpoints.tablet}) {
      padding: 10px 20px;
      font-size: 14px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      padding: 8px 16px;
      font-size: 12px;
    }
  }

  select {
    margin-left: 10px;
    padding: 10px;
    font-size: 16px;

    @media (max-width: ${breakpoints.mobile}) {
      padding: 8px;
      font-size: 14px;
    }
  }
`;

// Banderole (bannière)
export const Banner = styled.div`
  height: auto;
  background-color: #ddd;
  display: flex;
  background-image: url(${banderole});
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

// Filtres de recherche
export const Filters = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #f9f9f9;

  select,
  input {
    margin: 0 10px;
    padding: 12px;
    font-size: 16px;

    @media (max-width: ${breakpoints.mobile}) {
      padding: 10px;
      font-size: 14px;
    }
  }
`;

// Contenu principal
export const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

// Barre latérale
export const Sidebar = styled.div`
  width: 20%;
  background-color: #f0f0f0;
  padding: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 30%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    text-align: center;
  }
`;

// Liste des jeux
export const GamesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 60%;
  margin: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    width: 80%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
  }
`;

// Carte de jeu
export const Game = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  margin-bottom: 30px;
`;

// Bouton pour chaque jeu
export const PlayButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 20px;
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

// Footer
export const Footer = styled.footer`
  padding: 26px;
  text-align: center;
  background-color: #f1f1f1;
  position: relative;
  bottom: 0;
  width: 100%;
`;

export const ImportGameButton = styled.button`
  background-color: rgb(0, 0, 0);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.3s;

  &:hover {
    background-color: rgb(0, 0, 0);
  }
`;

export const ThemeToggleLabel = styled.label`
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

// Données des jeux
export const gameData = [
  {
    id: 1,
    name: "the beggar king",
    image: jeux1,
    rating: "4.5",
  },
  {
    id: 2,
    name: "Neon Strider",
    image: jeux2,
    rating: "4.0",
  },
  {
    id: 3,
    name: "Lynox le Gardien",
    image: jeux3,
    rating: "5.0",
  },
];
