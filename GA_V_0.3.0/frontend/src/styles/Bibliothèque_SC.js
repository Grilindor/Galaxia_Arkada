import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Sidebar = styled.div`
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  border-right: 2px solid #ddd;
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
`;

export const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export const StyledImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 10px;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4;
  padding: 10px 20px;
  border-bottom: 2px solid #ddd;
`;

export const Button = styled.button`
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

export const Game = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const GameImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const GameInfo = styled.div`
  text-align: center;
`;

export const NavButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: center;
`;