import styled from "styled-components";

export const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: "Arial", sans-serif;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #343a40;
  color: #fff;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export const LogoutButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #ff4b4b;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
`;

export const Sidebar = styled.nav`
  width: 250px;
  background-color: #212529;
  color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center; /* Aligne l'image et le texte au centre */
  padding: 10px 15px;
  font-size: ${(props) => (props.as === "h3" ? "1.2em" : "1em")};
  font-weight: ${(props) => (props.as === "h3" ? "bold" : "normal")};
  color: ${(props) => (props.as === "h3" ? "orange" : "white")};
  cursor: pointer;

  img {
    width: 16px; /* Taille de l'icône */
    height: 16px;
    margin-right: 8px; /* Espacement entre l'icône et le texte */
  }

  &:hover {
    background-color: #f0f0f0; /* Couleur d'arrière-plan au survol */
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #ffffff;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

export const Section = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  flex: 1 1 calc(33.333% - 1.5rem);
  background-color: #f1f3f5;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  color: #6c757d;
`;

export const Logo = styled.div`
  font-size: 10px;
  font-weight: bold;
  margin-left: 40px;
  img {
    width: 100px;
    height: auto;
  }
`;
