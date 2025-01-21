import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1500px;
  height: 200px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  margin-bottom: 40px;

  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.05);
  }
`;

export const Icon = styled.div`
  font-size: 50px;
  color: #007bff;
  margin-bottom: 15px;
`;

export const Title = styled.h3`
  font-size: 18px;
  color: #333;
`;
