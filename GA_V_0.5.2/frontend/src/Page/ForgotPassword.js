import React, { useState } from "react";
import logo from "../image/logo_1.png";
import { useNavigate } from "react-router-dom"; // Assurez-vous que le chemin est correct
import {
  ForgotPasswordContainer,
  FormContainer,
  LogoImage,
  Title,
  InputField,
  SubmitButton,
  Message,
} from "../styles/ForgotPassword_SC";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de traitement de la réinitialisation du mot de passe
    console.log("Email de réinitialisation envoyé à :", email);
  };

  const homenavigate = useNavigate();
  const handleHomeClick = () => {
    homenavigate("/home");
  };

  return (
    <ForgotPasswordContainer>
      <FormContainer>
        <LogoImage src={logo} alt="Logo" onClick={handleHomeClick} />
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
