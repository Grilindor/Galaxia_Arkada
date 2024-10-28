import styled from "styled-components";
import background from "../image/image_fond_home.webp";

// Composants stylisés
export const AppContainer = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--text-color);
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: var(--bg-color);
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

export const NavButton = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #eaf0f7;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const UserActions = styled.div`
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

export const ImportGameButton = styled.button`
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

export const Banner = styled.div`
  height: 200px;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Filters = styled.div`
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

export const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

export const Sidebar = styled.div`
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

export const GamesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 60%;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const Game = styled.div`
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

export const Footer = styled.footer`
  padding: 26px;
  text-align: center;
  background-color: #f1f1f1;
  position: relative;
  bottom: 0;
  width: 100%;
`;

// Liste des jeux (exemple)
export const gameData = [
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
