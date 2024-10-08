import React, { useState } from "react";
import styled from "styled-components";
import logo from "../image/logo_1.png"; // Assurez-vous que le chemin est correct

// Composants stylisés
const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Hauteur de la page entière */
  background-color: #f4f4f4;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const LogoImage = styled.img`
  width: 80px; /* Ajustez la taille du logo si nécessaire */
  margin-bottom: 20px; /* Espace entre le logo et le titre */
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
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

const Message = styled.p`
  color: #555;
  font-size: 14px;
  margin-top: 20px;
`;

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de traitement de la réinitialisation du mot de passe
    console.log("Email de réinitialisation envoyé à :", email);
  };

  return (
    <ForgotPasswordContainer>
      <FormContainer>
        <LogoImage src={logo} alt="Logo" />
        <Title>Mot de passe oublié</Title>
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Entrez votre adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton type="submit">Envoyer</SubmitButton>
        </form>
        <Message>
          Un lien de réinitialisation sera envoyé à cette adresse e-mail.
        </Message>
      </FormContainer>
    </ForgotPasswordContainer>
  );
}

export default ForgotPassword;
