import styled from "styled-components";

export const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Hauteur de la page entière */
  background-color: #f4f4f4;
`;

export const FormContainer = styled.div`
  background-color: white;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

export const LogoImage = styled.img`
  width: 80px; /* Ajustez la taille du logo si nécessaire */
  margin-bottom: 20px; /* Espace entre le logo et le titre */
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

export const Message = styled.p`
  color: #555;
  font-size: 14px;
  margin-top: 20px;
`;
