import styled from "styled-components";
import background from "../image/espace.webp";
import jeux1 from "../image/thebeggarking.png";
import jeux2 from "../image/plafrom.webp";
import jeux3 from "../image/liondiff.webp";
import banderole from "../image/banderole.png";

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
    margin-right: 10px;
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
  height: auto;
  background-color: #ddd;
  display: flex;
  background-image: url(${banderole});
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
  height: 5%;
  background-color: #f0f0f0;
  .ad,
  .event {
    margin: 10px;
    background-color: #ccc;
    padding: 10px;
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
