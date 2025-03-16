import styled from "styled-components";

// Container principal du StatCard
export const StatCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Icône de statistique
export const StatIcon = styled.div`
  img {
    width: 40px;
    height: 40px;
  }
`;

// Contenu des statistiques
export const StatContent = styled.div`
  text-align: right;

  .stat-title {
    font-size: 16px;
    color: #666;
    margin: 0;
  }

  .stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;
