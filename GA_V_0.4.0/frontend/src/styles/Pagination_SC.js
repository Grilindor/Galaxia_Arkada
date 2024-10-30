import styled from "styled-components";


export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  margin: 0 5px;
  padding: 8px 12px;
  background-color: ${({ active }) => (active ? '#007bff' : '#ffffff')};
  color: ${({ active }) => (active ? '#ffffff' : '#007bff')};
  border: 1px solid #007bff;
  cursor: pointer;
  &:disabled {
    background-color: #e0e0e0;
    color: #888888;
    cursor: not-allowed;
  }
`;